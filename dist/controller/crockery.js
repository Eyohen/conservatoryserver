"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cloudinary_2 = require("../middleware/cloudinary");
const models_1 = __importDefault(require("../models"));
const { Crockery } = models_1.default;
// const upload = multer({dest: 'uploads/'}); // configure Multer storage
//configure cloudinary
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
// Multer configuration for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
class CrockeryController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { crockery, imageUrl } = req.body;
                // Check if image was uploaded
                let imageurl;
                if (req.file) {
                    console.log(req.file);
                    // Upload image to Cloudinary
                    const uploadresult = yield (0, cloudinary_2.uploadtocloudinary)(req.file.buffer);
                    if (uploadresult.message === "error") {
                        throw new Error(uploadresult.error.message);
                    }
                    imageurl = uploadresult.url;
                }
                // create Crockery record in the database
                const record = yield Crockery.create(Object.assign(Object.assign({}, req.body), { imageUrl: imageurl }));
                return res.status(200).json({ record, msg: "Successfully create Crockery" });
            }
            catch (error) {
                console.log("henry", error);
                return res.status(500).json({ msg: "failed to create", error });
            }
        });
    }
    readPagination(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //   const limit = (req.query.limit as number | undefined) || 10;
                //   const offset = req.query.offset as number | undefined;
                //   const records = await Crockery.findAll({ where: {}, limit, offset });
                const records = yield Crockery.findAll({
                // include: db.SubCrockery
                });
                return res.json(records);
            }
            catch (e) {
                return res.json({ msg: "failed to read", status: 500, });
            }
        });
    }
    readByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield Crockery.findOne({ where: { id },
                });
                return res.json(record);
            }
            catch (e) {
                return res.json({ msg: "failed to read", status: 500, route: "/read/:id" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const { title, content } = req.body;
                const updated = yield Crockery.update(Object.assign({}, req.body), { where: { id: req.params.id } });
                if (updated) {
                    const updatedCrockery = yield Crockery.findByPk(req.params.id);
                    res.status(200).json(updatedCrockery);
                }
                else {
                    res.status(404).json({ message: "Crockery not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error updating the Crockery", error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield Crockery.findOne({ where: { id } });
                if (!record) {
                    return res.json({ msg: "Can not find existing record" });
                }
                const deletedRecord = yield record.destroy();
                return res.json({ record: deletedRecord });
            }
            catch (e) {
                return res.json({
                    msg: "fail to read",
                    status: 500,
                    route: "/delete/:id",
                });
            }
        });
    }
}
exports.default = new CrockeryController();
