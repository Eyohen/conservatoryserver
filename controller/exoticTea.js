const { Request, Response } = require("express");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require('bcrypt');
const db = require("../models");
const {ExoticTea} = db;



	const create = async (req, res) => {
		
		try {
			const record = await ExoticTea.create({...req.body });
			return res.status(200).json({ record, msg: "Successfully create ExoticTea" });
		} catch (error) {
			console.log("henry",error)
			return res.status(500).json({ msg: "fail to create", error});
		}
	}


	const readall = async (req, res) => {
		try {
			const limit = req.query.limit || 10;
			const offset = req.query.offset;

			const records = await ExoticTea.findAll({});
			return res.json(records);
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read" });
		}
	}


	const readId = async (req, res) => {
		try {
			const { id } = req.params;
			const record = await ExoticTea.findOne({ where: { id } });
			return res.json(record);
		} catch (e) {
			return res.json({ msg: "fail to read", status: 500, route: "/read/:id" });
		}
	}
	
	const update = async (req, res) => {
        try {
            // const { title, content } = req.body;
            const updated = await ExoticTea.update({...req.body}, { where: { id: req.params.id } });
            if (updated) {
                const updatedExoticTea = await ExoticTea.findByPk(req.params.id);
                res.status(200).json(updatedExoticTea);
            } else {
                res.status(404).json({ message: 'ExoticTea not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating the ExoticTea', error });
        }
    }


	const deleteId = async (req, res) => {
		try {
			const { id } = req.params;
			const record = await ExoticTea.findOne({ where: { id } });

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