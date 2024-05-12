"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInput = exports.createBlogInput = exports.signinValidation = exports.signupValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupValidation = zod_1.default.object({
    email: zod_1.default.string().min(5).email(),
    password: zod_1.default.string().min(5),
    name: zod_1.default.string().optional()
});
exports.signinValidation = zod_1.default.object({
    email: zod_1.default.string().min(5).email(),
    password: zod_1.default.string().min(5),
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string()
});
exports.updateBlogInput = zod_1.default.object({
    title: zod_1.default.string(),
    content: zod_1.default.string(),
    id: zod_1.default.number()
});
