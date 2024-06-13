import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt'
import db from "../models";
const {Booking, Payment, User} = db;


class BookingController {

	async create(req:Request, res:Response) {
		
		try {
			const record = await Booking.create({...req.body });
			return res.status(200).json({ record, msg: "Successfully create Booking" });
		} catch (error) {
			console.log("henry",error)
			return res.status(500).json({ msg: "fail to create", error});
		}
	}


	async readPagination(req: Request, res: Response) {
		try {
			const limit = (req.query.limit as number | undefined) || 10;
			const offset = req.query.offset as number | undefined;

			const records = await Booking.findAll({ 
                include:[{model:Payment, as: 'Payment'},{model:User, as: 'User'}]
             });
			return res.json(records);
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read" });
		}
	}


	async readByID(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const record = await Booking.findOne({ where: { id } });
			return res.json(record);
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read/:id" });
		}
	}
	
	async update(req: Request, res: Response) {
        try {
            // const { title, content } = req.body;
            const updated = await Booking.update({...req.body}, { where: { id: req.params.id } });
            if (updated) {
                const updatedBooking = await Booking.findByPk(req.params.id);
                res.status(200).json(updatedBooking);
            } else {
                res.status(404).json({ message: 'Booking not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating the Booking', error });
        }
    }
	async delete(req: Request, res: Response) {
		try {
			const { id } = req.params;
			const record = await Booking.findOne({ where: { id } });

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

export default new BookingController();