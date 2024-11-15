const { Request, Response } = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const db = require("../models");
const {Booking} = db;



	const create = async (req, res) => {
		
		try {
			const record = await Booking.create({...req.body });
			return res.status(200).json({ record, msg: "Successfully create Booking" });
		} catch (error) {
			console.log("henry",error)
			return res.status(500).json({ msg: "fail to create", error});
		}
	}


	const readall = async (req, res) => {
		try {
			const { date } = req.query;
			
			if (!date) {
			  return res.status(400).json({ message: 'Date parameter is required' });
			}
		
			const bookings = await Booking.findAll({
			  where: { date },
			  attributes: ['time']
			});
			
			const bookedTimeSlots = bookings.map(booking => booking.time);
			
			res.json({ bookedTimeSlots });
		  } catch (error) {
			console.error('Error fetching booked time slots:', error);
			res.status(500).json({ 
			  message: 'Error fetching booked time slots',
			  error: error.message  // This will give more details about the error
			});
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


module.exports = {create, readall, readId, update, deleteId};