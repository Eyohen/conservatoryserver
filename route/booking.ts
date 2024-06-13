import express, {Router} from 'express';

import BookingController from '../controller/booking'
// import verifyToken from '../middleware/verifyToken';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware'; 
import multer from 'multer';


const router: Router = express.Router();


router.post(
	'/create',
    // verifyToken,
    BookingController.create	
);

router.get(
    '/',
  
    BookingController.readPagination
);
router.get(
	'/:id',
    // verifyToken,
    BookingController.readByID	
);
router.put(
    '/:id',
    verifyToken,
    BookingController.update
);
router.delete(
    '/:id',
    verifyToken,
    BookingController.delete
);

export = router;