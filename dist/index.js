"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("./models"));
const user_1 = __importDefault(require("./route/user"));
const menu_1 = __importDefault(require("./route/menu"));
const booking_1 = __importDefault(require("./route/booking"));
const payment_1 = __importDefault(require("./route/payment"));
const submenu_1 = __importDefault(require("./route/submenu"));
const crockery_1 = __importDefault(require("./route/crockery"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.API_PORT;
app.use((0, morgan_1.default)('dev'));
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
models_1.default.sequelize
    .authenticate()
    .then(() => {
    console.log(`postgres connection has been established successfully... ${process.env.NODE_ENV}`);
})
    .catch((err) => {
    console.log(`unable to connect to the databse ${err.message}`);
    if (err.name === 'SequelizeConnectionError' || err.name === 'SequelizeConnectionRefuseError') {
        console.log('the databse is disconnected please check the connection and try again');
    }
    else {
        console.log(`An error occured while connecting to the database: ${err.message}`);
    }
});
app.use((req, res, next) => {
    console.log(`incoming request... ${req.method} ${req.path}`);
    next();
});
app.use("/api/auth", user_1.default);
app.use("/api/menus", menu_1.default);
app.use("/api/submenus", submenu_1.default);
app.use("/api/bookings", booking_1.default);
app.use("/api/payments", payment_1.default);
app.use("/api/crockerys", crockery_1.default);
let drop;
if (process.env.NODE_ENV === 'development') {
    // PORT = process.env.TEST_PORT;
    drop = { force: true };
}
models_1.default.sequelize.sync().then(() => {
    console.log('All models were synchronized successfully');
    app.listen(port, "0.0.0.0", () => {
        console.log(`App listening on port ${port}`);
    });
});
