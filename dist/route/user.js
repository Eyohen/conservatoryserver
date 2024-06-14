"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
// import TodoValidator from '../validator';
// import Middleware from '../../middleware';
const user_1 = __importDefault(require("../controller/user"));
// const router = express.Router();
const router = express_1.default.Router();
router.post('/register', user_1.default.create);
router.post('/login', user_1.default.login);
router.post('/adminlogin', user_1.default.adminLogin);
router.get('/refresh', user_1.default.refresh);
router.get('/', user_1.default.readPagination);
router.get('/:id', 
// authMiddleware,
// verifyToken, requireAdmin,
user_1.default.readByID);
router.put('/:id', user_1.default.update);
router.delete('/:id', user_1.default.delete);
module.exports = router;
