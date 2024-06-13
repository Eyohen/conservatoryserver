import express, {Router} from 'express';

import PaymentController from '../controller/payment'
// import verifyToken from '../middleware/authMiddleware';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware'; 
import multer from 'multer';


const router: Router = express.Router();


router.post(
	'/create',
    PaymentController.create	
);

router.get(
    '/',
    PaymentController.readPagination
);
router.get(
	'/:id',
    PaymentController.readByID	
);
router.put(
    '/:id',
    PaymentController.update
);
router.delete(
    '/:id',
    PaymentController.delete
);

export = router;