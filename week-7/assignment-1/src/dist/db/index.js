"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Todo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: String,
    password: String,
});
const todoSchema = new mongoose_1.default.Schema({
    title: String,
    description: String,
    done: Boolean,
    userId: String,
});
// export default mongoose.model('Todo', todoSchema);
exports.Todo = mongoose_1.default.model('Todo', todoSchema);
exports.User = mongoose_1.default.model('User', userSchema);
// export default mongoose.model('User', userSchema);
