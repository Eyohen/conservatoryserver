import express, {Router} from 'express';
// import TodoValidator from '../validator';
// import Middleware from '../../middleware';
import UserController from '../controller/user'
// import verifyToken from '../middleware/verifyToken';
import { verifyToken, requireAdmin } from '../middleware/authMiddleware'; 
// const router = express.Router();

const router: Router = express.Router();

router.post(
	'/register',
    UserController.create	
);
router.post(
    '/login',
    UserController.login
);
router.post(
    '/adminlogin',
    UserController.adminLogin
);
router.get(
    '/refresh',
    UserController.refresh
);

router.get(
    '/',
    UserController.readPagination
);
router.get(
	'/:id',
    // authMiddleware,
    // verifyToken, requireAdmin,
    UserController.readByID	
);
router.put(
    '/:id',
    UserController.update
);
router.delete(
    '/:id',
    UserController.delete
);

export = router;