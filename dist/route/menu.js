"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const menu_1 = __importDefault(require("../controller/menu"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// set up multer storage for file uploads
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.post('/create', upload.single('imageUrl'), menu_1.default.create);
router.get('/', menu_1.default.readPagination);
router.get('/:id', 
// verifyToken,
menu_1.default.readByID);
router.put('/:id', menu_1.default.update);
router.delete('/:id', menu_1.default.delete);
module.exports = router;
