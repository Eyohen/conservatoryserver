import { Request, Response } from "express";
import multer from "multer";
import cloudinary from "cloudinary";
import path from "path";
import { uploadtocloudinary, uploadType } from "../middleware/cloudinary";
import db from "../models";
const { Menu, SubMenu } = db;

// const upload = multer({dest: 'uploads/'}); // configure Multer storage

//configure cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer configuration for file uploads
// const storage = multer.memoryStorage();
// const upload = multer({ storage });

class MenuController {
  async create(req: Request, res: Response) {
    try {
      const { title, description, imageUrl } = req.body;

      // Check if image was uploaded
      let imageurl: string | undefined;
      if (req.file) {
        console.log(req.file);
        // Upload image to Cloudinary

        const uploadresult: uploadType = await uploadtocloudinary(
          req.file.buffer
        );
        if (uploadresult.message === "error") {
          throw new Error(uploadresult.error.message);
        }
 
        imageurl = uploadresult.url;
      }

      // create menu record in the database
      const record = await Menu.create({ ...req.body, imageUrl: imageurl });
      return res.status(200).json({ record, msg: "Successfully create Menu" });
    } catch (error) {
      console.log("henry", error);
      return res.status(500).json({ msg: "failed to create", error });
    }
  }

  async readPagination(req: Request, res: Response) {
    try {
       
    //   const limit = (req.query.limit as number | undefined) || 10;
    //   const offset = req.query.offset as number | undefined;

    //   const records = await Menu.findAll({ where: {}, limit, offset });
      const records = await Menu.findAll({
      
        include:[{model:SubMenu, as: 'subMenu'}]
        // include: db.SubMenu
      });
      return res.json(records);
    } catch (e) {
      return res.json({ msg: "failed to read", status: 500, });
    }
  }

  async readByID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await Menu.findOne({ where: { id },
        include:[{model:SubMenu, as: 'subMenu'}]
    });
      return res.json(record);
    } catch (e) {
      return res.json({ msg: "failed to read", status: 500, route: "/read/:id" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      // const { title, content } = req.body;
      const updated = await Menu.update(
        { ...req.body },
        { where: { id: req.params.id } }
      );
      if (updated) {
        const updatedMenu = await Menu.findByPk(req.params.id);
        res.status(200).json(updatedMenu);
      } else {
        res.status(404).json({ message: "Menu not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating the Menu", error });
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await Menu.findOne({ where: { id } });

      if (!record) {
        return res.json({ msg: "Can not find existing record" });
      }

      const deletedRecord = await record.destroy();
      return res.json({ record: deletedRecord });
    } catch (e) {
      return res.json({
        msg: "fail to read",
        status: 500,
        route: "/delete/:id",
      });
    }
  }
}

export default new MenuController();
