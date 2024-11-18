const { Request, Response } = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const db = require("../models");
const {Booking, User} = db;
const sendEmail = require('../utils/sendEmail.js');
const sendGiftMail = require("../utils/sendGiftMail.js");

	const create = async (req, res) => {
		const {
			email,
			giftemail,
			tea,
			time,
			price,
			coffee,
			iceTea,
			menu,
			date,
			crockery,
			userId,
			giftname
		} = req.body;
	
		try {
			// Check if user exists
			let user = await Booking.findOne({ email: req.body.email });
	
			// Create booking record
			const record = await Booking.create({
				...req.body,
				email: req.body.email,
				giftemail,
				giftname,
				time,
				date,
				menu,
				crockery,
				tea,
				coffee,
				iceTea,
				userId
			});
	
			// Always send the primary email
			await sendEmail(
				"theconservatoryatirolagos@zohomail.com",
				record.email,
				"Order Confirmation",
				"Order Confirmed!",
				record.date,
				record.time,
				record.menu,
				record.crockery,
				record.tea,
				record.coffee,
				record.iceTea
			);
	
		// Send gift email only if both giftemail and giftname are present
		if (record.giftemail && record.giftname) {
			await sendGiftMail(
				"theconservatoryatirolagos@zohomail.com",
				record.giftemail,
				"Order Confirmation",
					"Order Confirmed!",
					record.giftname,
					record.date,
					record.time,
					record.menu,
					record.crockery,
					record.tea,
					record.coffee,
					record.iceTea
				);
			}
	
			return res.status(200).json({ record, msg: "Successfully create Booking" });
		} catch (error) {
			console.log("henry", error);
			return res.status(500).json({ msg: "error creating booking", error });
		}
	}

	const checkAvailability = async (req, res) => {
		const {time, date} = req.body;

		const parsedDate = new Date(date);

	
		const formattedDate = parsedDate.toISOString();

		try {
			const existingBooking = await Booking.findOne({
				where:{time, 
					date
					// date:formattedDate
				}});
			if(existingBooking){
				return res.status(200).json({available: false})
			}
			return res.status(200).json({available:true});
		} catch(error) {
			console.log("Error", error);
			return res.status(500).json({msg:"Failed to check availability", error});
		}
	} 

	const readall = async (req, res) => {
		try {
			const limit = req.query.limit || 10;
			const offset = req.query.offset;

			const records = await Booking.findAll({});
			return res.json(records);
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read" });
		}
	}


	const readId = async (req, res) => {
		try {
			const { id } = req.params;
			const record = await Booking.findOne({ where: { id } });
			return res.json(record);
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read/:id" });
		}
	}
	
	const update = async (req, res) => {
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


	const deleteId = async (req, res) => {
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


	const getUserBookings = async (req, res) => {
		try {
		  const { userId } = req.params;
		  
		  const userBookings = await Booking.findAll({
			where: { userId },
			order: [['createdAt', 'DESC']], // Optional: order by creation date, newest first
		  });
	  
		  if (!userBookings || userBookings.length === 0) {
			return res.status(404).json({ msg: "No bookings found for this user" });
		  }
	  
		  return res.status(200).json(userBookings);
		} catch (error) {
		  console.error("Error fetching user bookings:", error);
		  return res.status(500).json({ msg: "Failed to fetch user bookings", error: error.message });
		}
	  };

module.exports = {create, readall, readId, update, deleteId, checkAvailability, getUserBookings};