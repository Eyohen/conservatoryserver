"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const submenu_1 = __importDefault(require("../controller/submenu"));
const router = express_1.default.Router();
router.post('/create', submenu_1.default.create);
router.get('/', submenu_1.default.readPagination);
router.get('/:id', 
// verifyToken,
submenu_1.default.readByID);
router.put('/:id', submenu_1.default.update);
router.delete('/:id', submenu_1.default.delete);
module.exports = router;
