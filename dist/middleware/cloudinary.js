"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadtocloudinary = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
const uploadtocloudinary = async (fileBuffer) => {
    try {
        const options = {
            use_filename: true,
            folder: 'fiverr',
            public_id: 'custom',
        };
        const result = await new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader
                .upload_stream(options, (error, result) => {
                if (error) {
                    console.log('error from uploads ::::::::: ', error);
                    reject(error);
                }
                else {
                    console.log('result from upload :::::::: ', result);
                    resolve({ message: 'success', url: result?.secure_url });
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
};
exports.uploadtocloudinary = uploadtocloudinary;
