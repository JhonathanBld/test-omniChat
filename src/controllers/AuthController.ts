import {Request, Response} from "express";
import User from '../models/users';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {

    public async register(req: Request, res: Response) {
        const {email} = req.body;
        try {
            const hasUser = await User.findOne({email: email});
            if (hasUser) {
                return res.status(400).send({error: 'Usuário já existente'});
            }
            const user = await User.create(req.body);

            const token = jwt.sign({id: user.id}, '67d4c16628e073d718f53359979f8e76', {
                expiresIn: 86400
            });

            return res.send({user, token});
        } catch (error) {
            console.log('Erro ao realizar o cadastro' , JSON.stringify(error));
            return res.status(400).json(error);
        }
    }

    public async login(req: Request, res: Response) {
        try {
        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password');

        if (!user) return res.status(400).send('Usuário não encontrado');

        if (!await bcryptjs.compare(password, user.password)) return res.status(400).send('Usuário ou senha invalidos');

        const token = jwt.sign({id: user.id}, '67d4c16628e073d718f53359979f8e76', {
            expiresIn: 86400
        });

        user.password = undefined;

        res.send({user, token});

        } catch (error) {
            console.log(`Erro ao realizar o login` , JSON.stringify(error));
        }
    }
}

export default new AuthController();
