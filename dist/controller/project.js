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
const models_1 = __importDefault(require("../models"));
const { Project } = models_1.default;
class ProjectController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const record = yield Project.create(Object.assign({}, req.body));
                return res.status(200).json({ record, msg: "Successfully create Project" });
            }
            catch (error) {
                console.log("henry", error);
                return res.status(500).json({ msg: "fail to create", error });
            }
        });
    }
    readPagination(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const limit = req.query.limit || 10;
                const offset = req.query.offset;
                const records = yield Project.findAll({ where: {}, limit, offset });
                return res.json(records);
            }
            catch (e) {
                return res.json({ msg: "fail to read", status: 500, route: "/read" });
            }
        });
    }
    readByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield Project.findOne({ where: { id } });
                return res.json(record);
            }
            catch (e) {
                return res.json({ msg: "fail to read", status: 500, route: "/read/:id" });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // const { title, content } = req.body;
                const updated = yield Project.update(Object.assign({}, req.body), { where: { id: req.params.id } });
                if (updated) {
                    const updatedProject = yield Project.findByPk(req.params.id);
                    res.status(200).json(updatedProject);
                }
                else {
                    res.status(404).json({ message: 'Project not found' });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating the Project', error });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const record = yield Project.findOne({ where: { id } });
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
exports.default = new ProjectController();
