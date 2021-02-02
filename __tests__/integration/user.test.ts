import request from "supertest";
import server from "../../src/server";


describe('Get users', () => {
    //Tenta cosulta o usuario sem token;
    it('Espera status 403, pois não tem token informado', async () => {
        const response = await request(server).get('/users');
        expect(response.status).toBe(403);
    });

    it('Espera status 200, cadastra o usuario', async () => {
        //Gera um usuario aleaotorio;
        const randomUser = {
            name : Math.random().toString(36).substring(7),
            email : Math.random().toString(36).substring(10) + '@mail.com',
            password : Math.random().toString(36).substring(10),
        };
        const response = await request(server).post('/auth/register').send(randomUser);
        expect(response.status).toBe(200);
    });
});