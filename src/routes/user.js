import express from 'express';
import * as UserController from '../controllers/users';

const UserRoutes = express.Router();

UserRoutes.get('/',  UserController.Init);
UserRoutes.get('/validate_token/:token', UserController.ValidateResetToken);
UserRoutes.get('/complete_profile/:id', UserController.ValidateReturningUser);

UserRoutes.post('/login', UserController.Login);
UserRoutes.post('/register', UserController.Register);
UserRoutes.post('/reset', UserController.PasswordReset);
UserRoutes.post('/recovery', UserController.PasswordRecovery);

export default UserRoutes;
