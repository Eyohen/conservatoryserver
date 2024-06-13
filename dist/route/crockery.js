"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const crockery_1 = __importDefault(require("../controller/crockery"));
const multer_1 = __importDefault(require("multer"));
const router = express_1.default.Router();
// set up multer storage for file uploads
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
router.post('/create', upload.single('imageUrl'), crockery_1.default.create);
router.get('/', crockery_1.default.readPagination);
router.get('/:id', 
// verifyToken,
crockery_1.default.readByID);
router.put('/:id', crockery_1.default.update);
router.delete('/:id', crockery_1.default.delete);
module.exports = router;
