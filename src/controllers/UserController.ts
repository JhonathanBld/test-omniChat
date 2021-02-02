import {Request, Response} from "express";
import User from '../models/users';

class UserController {

    public async index(req:Request , res:Response) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (error) {
            console.log('Erro ao buscar usuarios' , JSON.stringify(error));
            return res.status(500).json(error);
        }
    }

    public async store(req:Request, res: Response) {
        const {email} = req.body;
        try {
            if (User.findOne({email})) {
                return res.status(400).send({error : 'Usuário já existente'});
            }
            const user = await User.create(req.body);
            return res.send({user});
        } catch (error) {
            console.log('Erro ao salvar usuario' , JSON.stringify(error));
            return res.status(400).json(error);
        }
    }

    public async show(req:Request , res:Response) {
        try {
            const user = await User.findById(req.params.id);

            if (!user) return res.status(404).send('Usuario não encontrado');

            return res.json(user);

        } catch (error) {
            console.log(`Erro ao consultar usuario com o id ${req.params.id}` , JSON.stringify(error));
            return res.status(500).json(error);
        }
    }

    public async update(req:Request , res:Response) {
        try {
            const user = await User.findOneAndUpdate({_id: req.params.id}, req.body, {returnOriginal:false}) ;

            if (!user) return res.status(404).send('Usuario não encontrado');

            return res.json(user);
        } catch (error) {
            console.log(`Erro ao atualizar usuario com o id ${req.params.id}` , JSON.stringify(error));
            return res.status(500).json(error);
        }
    }

    public async delete(req:Request, res:Response) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);

            if (!user) return res.status(404).send('Usuario não encontrado');

            return res.json(user);
        } catch (error) {
            console.log(`Erro ao deletar usuario com o id ${req.params.id}` , JSON.stringify(error));
            return res.status(500).json(error);
        }
    }


}

export default new UserController();
