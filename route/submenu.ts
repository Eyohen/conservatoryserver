import express, {Router} from 'express';

import SubMenuController from '../controller/submenu'
// import verifyToken from '../middleware/verifyToken';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware'; 
import multer from 'multer';


const router: Router = express.Router();


router.post(
	'/create',
    SubMenuController.create	
);

router.get(
    '/',
    SubMenuController.readPagination
);
router.get(
	'/:id',

    // verifyToken,
    SubMenuController.readByID	
);
router.put(
    '/:id',
    SubMenuController.update
);
router.delete(
    '/:id',
    SubMenuController.delete
);

export = router;