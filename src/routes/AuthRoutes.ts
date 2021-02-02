import { Router } from "express";
import AuthController from "../controllers/AuthController";

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.post('/register', AuthController.register);
        this.router.post('/login', AuthController.login);
    }
}

export default new UserRoutes()
