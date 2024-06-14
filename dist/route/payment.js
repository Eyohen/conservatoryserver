"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const payment_1 = __importDefault(require("../controller/payment"));
const router = express_1.default.Router();
router.post('/create', payment_1.default.create);
router.get('/', payment_1.default.readPagination);
router.get('/:id', payment_1.default.readByID);
router.put('/:id', payment_1.default.update);
router.delete('/:id', payment_1.default.delete);
module.exports = router;
