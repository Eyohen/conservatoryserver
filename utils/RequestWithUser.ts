import { Request } from 'express';
import db from '../models';
const { User }  = db; // Import the User model or adjust the import as needed

// Define the RequestWithUser type by extending the Express Request type
interface RequestWithUser extends Request {
  user?: typeof User; // Add a user property of type User, which represents the authenticated user
}

export default RequestWithUser;