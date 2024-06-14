"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const booking_1 = __importDefault(require("../controller/booking"));
// import verifyToken from '../middleware/verifyToken';
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post('/create', 
// verifyToken,
booking_1.default.create);
router.get('/', booking_1.default.readPagination);
router.get('/:id', 
// verifyToken,
booking_1.default.readByID);
router.put('/:id', authMiddleware_1.verifyToken, booking_1.default.update);
router.delete('/:id', authMiddleware_1.verifyToken, booking_1.default.delete);
module.exports = router;
