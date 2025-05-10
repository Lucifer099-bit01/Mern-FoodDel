import express from 'express';
import { Register , Login} from '../Controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.post('/register', Register);
UserRouter.post("/login", Login);

export default UserRouter;