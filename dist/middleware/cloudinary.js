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
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadtocloudinary = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadtocloudinary = (fileBuffer) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = {
            use_filename: true,
            folder: 'fiverr',
            public_id: 'custom',
        };
        const result = yield new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream(options, (error, result) => {
                if (error) {
                    console.log('error from uploads ::::::::: ', error);
                    reject(error);
                }
                else {
                    console.log('result from upload :::::::: ', result);
                    resolve({ message: 'success', url: result === null || result === void 0 ? void 0 : result.secure_url });
                }
            })
                .end(fileBuffer);
        });
        return result;
    }
    catch (error) {
        console.log(error);
        return { message: 'error', error };
    }
});
exports.uploadtocloudinary = uploadtocloudinary;
