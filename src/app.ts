import express from "express";
import mongoose from "mongoose";
import bodyParser from 'body-parser';
import cors from 'cors';
import {createServer, Server} from "http";
import path from "path";
import routes from "./routes";

export default new class App {
    public express: express.Application;
    public server!: Server;

    constructor() {
        this.express = express();
        App.setupDb();
        this.middlewares();
        this.routes();
    }

    private middlewares() {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({
            extended: true
        }));
        this.express.use(express.static(path.join(__dirname, "dist")));
        this.server = createServer(this.express);
    }

    private routes() {
        this.express.use(routes);
    }

    private static setupDb(): void {
        const mongoDb = "mongodb://127.0.0.1/omni-chat";
        mongoose.connect(mongoDb, { useNewUrlParser: true , useUnifiedTopology: true});
        const db = mongoose.connection;
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true)
        db.on("error", console.error.bind(console, "MongoDB Connection error"));
    }
}
