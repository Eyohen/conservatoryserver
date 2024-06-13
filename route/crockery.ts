import express, {Router} from 'express';

import CrockeryController from '../controller/crockery'
// import verifyToken from '../middleware/authMiddleware';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware'; 
import multer from 'multer';


const router: Router = express.Router();

// set up multer storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({storage});

router.post(
	'/create',
    upload.single('imageUrl'),
    CrockeryController.create	
);

router.get(
    '/',
    CrockeryController.readPagination
);
router.get(
	'/:id',
  
    // verifyToken,
    CrockeryController.readByID	
);
router.put(
    '/:id',
    CrockeryController.update
);
router.delete(
    '/:id',
    CrockeryController.delete
);

export = router;