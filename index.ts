import express,{Request,Response,NextFunction} from 'express';
import db from './models';
import user from "./route/user";
import menu from "./route/menu";
import booking from './route/booking';
import payment from './route/payment';
import submenu from './route/submenu';
import crockery from './route/crockery';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

const app = express();
const port = process.env.API_PORT;


app.use(morgan('dev'))
app.use(helmet());
app.use(express.json());
app.use(cors());

db.sequelize
    .authenticate()
    .then(() => {
        console.log(`postgres connection has been established successfully... ${process.env.NODE_ENV}`)
    })
    .catch((err:Error) => {
        console.log(`unable to connect to the databse ${err.message}`)
        if(
            err.name === 'SequelizeConnectionError' || err.name === 'SequelizeConnectionRefuseError'
        ){
            console.log('the databse is disconnected please check the connection and try again')
        }
        else{
            console.log(`An error occured while connecting to the database: ${err.message}`)
        }
    })
    

app.use((req:Request, res:Response, next:NextFunction)=>{
    console.log(`incoming request... ${req.method} ${req.path}`)
    next()
})

app.use("/api/auth", user);
app.use("/api/menus", menu);
app.use("/api/submenus", submenu);
app.use("/api/bookings", booking);
app.use("/api/payments", payment);
app.use("/api/crockerys", crockery);

let drop: { force?: boolean } | undefined;
if (process.env.NODE_ENV === 'development') {
    // PORT = process.env.TEST_PORT;
    drop = { force: true };
}

db.sequelize.sync().then(() => {
    console.log('All models were synchronized successfully')
    app.listen(port as unknown as number, "0.0.0.0",() => {
        console.log(`App listening on port ${port}`)
    });
})