"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogStyle2 = exports.blogStyle1 = exports.userStyle2 = exports.userStyle1 = void 0;
const zod_1 = __importDefault(require("zod"));
exports.userStyle1 = zod_1.default.object({
    name: zod_1.default.string(),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.userStyle2 = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(6)
});
exports.blogStyle1 = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string().max(255),
    subject: zod_1.default.string().min(6)
});
exports.blogStyle2 = zod_1.default.object({
    title: zod_1.default.string().optional(),
    description: zod_1.default.string().max(255).optional(),
    subject: zod_1.default.string().min(6).optional()
});
