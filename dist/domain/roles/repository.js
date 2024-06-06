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
exports.createRole = void 0;
//se importa la tabla para hacer la inserción en DB
const Roles_1 = require("../../models/Roles");
const createRole = (name) => __awaiter(void 0, void 0, void 0, function* () {
    //se chequea que no exista un registro igual
    const findRole = yield Roles_1.Roles.findOneBy({
        name: name,
    });
    //si no existe, lo crea y no retorna nada o undefined para mandar el response en controller
    if (!findRole) {
        const newRole = yield Roles_1.Roles.create({
            name: name,
        }).save();
        return undefined;
    }
    else {
        //si existe lo retornamos para tratarlo en el controller
        return findRole;
    }
});
exports.createRole = createRole;
