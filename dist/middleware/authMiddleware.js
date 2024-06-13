"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json("You are not authenticated!");
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }
        req.userId = decoded.userId; // Assuming _id is the user ID field in the JWT payload
        req.role = decoded.role;
        next();
    });
};
exports.verifyToken = verifyToken;
const requireAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).json("Unauthorized access: Only admins are allowed!");
    }
    next();
};
exports.requireAdmin = requireAdmin;
