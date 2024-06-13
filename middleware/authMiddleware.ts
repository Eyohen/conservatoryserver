import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend the Request interface to include a user property
declare global {
    namespace Express {
      interface Request {
        userId?: any;
        role?:any;
      }
    }
  }

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers?.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json("You are not authenticated!");
    }
    jwt.verify(token, process.env.JWT_SECRET as string, async (err, decoded: any) => {
        if (err) {
            return res.status(403).json("Token is not valid!");
        }
        
        req.userId = decoded.userId; // Assuming _id is the user ID field in the JWT payload
        req.role = decoded.role;
        
        next();
    });

  };

    const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
      if (req.role !== 'admin') {
          return res.status(403).json("Unauthorized access: Only admins are allowed!");
      }
      next();
  };


// export default verifyToken;
export {verifyToken, requireAdmin };