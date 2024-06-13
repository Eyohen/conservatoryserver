"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("../models"));
const { User, Re } = models_1.default;
class UserController {
    async create(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body;
            //check if user with the given email already exists
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ msg: 'User with this email already exists' });
            }
            // hash the password
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            // create the user record with hashed password
            const record = await User.create({ ...req.body, email, password: hashedPassword });
            return res.status(200).json({ record, msg: "User successfully created" });
        }
        catch (error) {
            console.log("henry", error);
            return res.status(500).json({ msg: "failed to register user", error });
        }
    }
    // async login(req:Request, res:Response){
    // 	try{
    // 		const {email, password} = req.body;
    // 		//check if user with the given email exists
    // 		const user = await User.findOne({where:{email}});
    // 		if(!user){
    // 			return res.status(404).json({msg: 'User not found'});
    // 		}
    // 		  // Compare the provided password with the hashed password in the database
    // 		  const isPasswordValid = await bcrypt.compare(password, user.password);
    // 		  if (!isPasswordValid) {
    // 			return res.status(401).json({ msg: 'Invalid credentials' });
    // 		  }
    // 		  // Generate JWT token
    // 		  const accessToken = jwt.sign(
    // 		{user:	{ userId: user.id, email: user.email , fname: user.firstName} },
    // 			process.env.JWT_SECRET!, // Use a secure secret key, preferably from environment variables
    // 			{ expiresIn: '14d' } // Token expiration time
    // 		  );
    // 		  return res.status(200).json({ accessToken });
    // 	}catch (error) {
    // 		console.error('Error logging in:', error);
    // 		return res.status(500).json({ msg: 'Failed to log in', error });
    // 	  }
    // }
    async login(req, res) {
        try {
            const { firstName, lastName, email, password } = req.body;
            // Check if user with the given email exists
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ msg: 'Invalid credentials' });
            }
            const userPayload = {
                id: user.id,
                email: user.email,
                fname: user.firstName,
                lname: user.lastName
            };
            // Generate JWT token with user object
            const accessToken = jsonwebtoken_1.default.sign(
            // { data: { id: user.id, email: user.email, fname: user.firstName, role: user.role } }, 
            { user: userPayload }, process.env.JWT_SECRET, // Use a secure secret key, preferably from environment variables
            { expiresIn: '14d' } // Token expiration time
            );
            // Generate Refresh Token
            const refreshToken = jsonwebtoken_1.default.sign({ user: userPayload }, process.env.JWT_REFRESH_SECRET, // Use a secure refresh secret key
            { expiresIn: '1y' } // Refresh token expiration time
            );
            return res.status(200).json({ accessToken, refreshToken, user: userPayload });
        }
        catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ msg: 'Failed to log in', error });
        }
    }
    async adminLogin(req, res) {
        try {
            const { email, password } = req.body;
            // Check if user with the given email exists
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            // Check if user's role is admin
            if (user.role !== 'admin') {
                return res.status(401).json({ msg: 'Unauthorized access: Only admins are allowed' });
            }
            // Compare the provided password with the hashed password in the database
            const isPasswordValid = await bcrypt_1.default.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ msg: 'Invalid credentials' });
            }
            // Generate JWT token
            const accessToken = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, // Use a secure secret key, preferably from environment variables
            { expiresIn: '14d' } // Token expiration time
            );
            return res.status(200).json({ accessToken });
        }
        catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ msg: 'Failed to log in', error });
        }
    }
    async refresh(req, res) {
        const token = req.headers?.authorization?.split(' ')[1];
        if (!token) {
            res.status(401).json({ error: "Unauthorized - Missing token" });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            res.status(200).json({ ...decoded, access_token: token });
        }
        catch (err) {
            res.status(401).json({ error: "Unauthorized - Invalid token" });
        }
    }
    ;
    async profile(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ msg: 'Unauthorized' });
            }
            const userId = req.user.id;
            const user = await User.findByPk(userId);
            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }
            return res.status(200).json({ user });
        }
        catch (error) {
            console.error('Error fetching user profile:', error);
            return res.status(500).json({ msg: 'Internal server error' });
        }
    }
    ;
    async readPagination(req, res) {
        try {
            const limit = req.query.limit || 10;
            const offset = req.query.offset;
            const records = await User.findAll({ where: {}, limit, offset });
            return res.json(records);
        }
        catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: "/read" });
        }
    }
    async readByID(req, res) {
        try {
            const { id } = req.params;
            const record = await User.findOne({ where: { id } });
            return res.json(record);
        }
        catch (e) {
            return res.json({ msg: "fail to read", status: 500, route: "/read/:id" });
        }
    }
    async update(req, res) {
        try {
            // const { title, content } = req.body;
            const updated = await User.update({ ...req.body }, { where: { id: req.params.id } });
            if (updated) {
                const updatedUser = await User.findByPk(req.params.id);
                res.status(200).json(updatedUser);
            }
            else {
                res.status(404).json({ message: 'User not found' });
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Error updating the User', error });
        }
    }
    async delete(req, res) {
        try {
            const { id } = req.params;
            const record = await User.findOne({ where: { id } });
            if (!record) {
                return res.json({ msg: "Can not find existing record" });
            }
            const deletedRecord = await record.destroy();
            return res.json({ record: deletedRecord });
        }
        catch (e) {
            return res.json({
                msg: "fail to read",
                status: 500,
                route: "/delete/:id",
            });
        }
    }
}
exports.default = new UserController();
