import express, {Router} from 'express';

import MenuController from '../controller/menu'
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
    MenuController.create	
);

router.get(
    '/',
    MenuController.readPagination
);
router.get(
	'/:id',
  
    // verifyToken,
    MenuController.readByID	
);
router.put(
    '/:id',
    MenuController.update
);
router.delete(
    '/:id',
    MenuController.delete
);

export = router;