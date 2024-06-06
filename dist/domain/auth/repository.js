"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findByEmail = exports.register = void 0;
const Users_1 = require("../../models/Users");
const register = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const email = user.email;
    const findEmail = yield Users_1.Users.findOneBy({ email: email });
    //si no existe, lo crea y no retorna nada para mandar el response en controller
    if (!findEmail) {
        const newUser = yield Users_1.Users.create(user).save();
    }
    else {
        return findEmail;
    }
});
exports.register = register;
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.Users.findOne({
        where: {
            email: email,
        },
        relations: { role_id: true },
        select: {
            id: true,
            password: true,
            email: true,
            role_id: {
                id: true,
                name: true,
            },
        },
    });
    return user;
});
exports.findByEmail = findByEmail;
