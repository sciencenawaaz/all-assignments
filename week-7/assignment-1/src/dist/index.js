"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const mongoose_1 = __importDefault(require("mongoose"));
const port = 3000;
const auth_1 = __importDefault(require("./routes/auth"));
const todo_1 = __importDefault(require("./routes/todo"));
// import cors from "cors";
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/auth", auth_1.default);
app.use("/todo", todo_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
mongoose_1.default.connect('mongodb://127.0.0.1:27017/courses').then(() => { console.log("MongoDBconnected"); });
