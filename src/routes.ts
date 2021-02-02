import UserRoutes from "./routes/UserRoutes";
import {Request, Response, Router} from "express";
import AuthRoutes from "./routes/AuthRoutes";
import jwt from 'jsonwebtoken';

const routes = Router();


// Declaração de rotas publicas
routes.use('/auth' , AuthRoutes.router);

// Declaração de rotas privadas, somente acessadas com token;
routes.use((req: Request | any, res: Response, next) => {
    const token = req.headers.authorization ? req.headers.authorization.substr(7) : null;
    if (token) {
        jwt.verify(token, '67d4c16628e073d718f53359979f8e76', (err: any, decoded: any) => {
            if (err) {
                return res.status(403).json({
                    message: 'Falha na verificação do token!'
                });
            } else {
                next();
            }
        });
    } else {
        return res.status(403).json({
            message: 'Token não Informado!'
        });
    }
});

routes.use('/users' , UserRoutes.router);

export default routes;
