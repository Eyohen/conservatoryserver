const express = require('express');
const db = require ('./models');
const user = require("./route/user");
const auth =  require("./route/auth");
const menu =  require('./route/menu');
const bloomingTea =  require('./route/bloomingTea');
const exoticTea = require("./route/exoticTea");
const classicTea =  require("./route/classicTea");
const greenTea =  require('./route/greenTea');
const specialtyTea =  require('./route/specialtyTea');
const payment = require('./route/payment');
const booking = require('./route/booking');
const coffee = require('./route/coffee');
const iceTea = require('./route/iceTea');
const crockery = require('./route/crockery');
const bookedTime = require('./route/bookedTime');
const homeImage = require('./route/homeImage');


// import crockery from './route/crockery';
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');


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
    .catch((err) => {
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
    

app.use((req, res, next)=>{
    console.log(`incoming request... ${req.method} ${req.path}`)
    next()
})

app.use("/api/auth", auth);
app.use("/api/users", user);
app.use("/api/menus", menu);
app.use("/api/bloomingTeas", bloomingTea);
app.use("/api/exoticTeas", exoticTea);
app.use("/api/classicTeas", classicTea);
app.use("/api/greenTeas", greenTea);
app.use("/api/specialtyTeas", specialtyTea);
app.use("/api/payments", payment);
app.use("/api/bookings", booking)
app.use("/api/coffees", coffee);
app.use("/api/iceTeas", iceTea);
app.use("/api/crockerys", crockery);
app.use("/api/booked-timeslots", bookedTime);
app.use("/api/homeImages", homeImage);


if (process.env.NODE_ENV === 'development') {
    // PORT = process.env.TEST_PORT;
    drop = { force: true };
}

db.sequelize.sync({alter:true}).then(() => {
    console.log('All models were synchronized successfully')
    app.listen(port, () => {
        console.log(`App listening on port ${port}`)
    })
})