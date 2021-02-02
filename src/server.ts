import app from './app'

app.server.listen(3005 , () => {
    console.log('Aplicação rodando na porta 3000');
});

export default app.server;
