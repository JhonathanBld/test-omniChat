import { Router } from "express";
import UserController from "../controllers/UserController";

class UserRoutes {
    public router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    private routes() {
        this.router.get('/', UserController.index);
        this.router.get('/:id', UserController.show);
        this.router.put('/:id', UserController.update);
        this.router.delete('/:id', UserController.delete);
    }
}

export default new UserRoutes()
