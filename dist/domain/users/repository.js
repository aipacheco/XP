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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = exports.userProfile = exports.updateProfile = exports.getUsers = void 0;
const Users_1 = require("../../models/Users");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield Users_1.Users.find({
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
        },
    });
    return users;
});
exports.getUsers = getUsers;
const updateProfile = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.Users.findOneBy({ id: req.tokenData.userId });
    if (user) {
        const userUpdate = Users_1.Users.update({
            id: req.tokenData.userId,
        }, {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            /* email: req.body.email no quiero que se pueda cambiar por el usuario
            ya que es un dato único y puede coincidir con otro que tengamos*/
            password: bcrypt_1.default.hashSync(req.body.password, 12),
        });
        return userUpdate;
    }
});
exports.updateProfile = updateProfile;
const userProfile = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.Users.findOne({
        where: { id: req.tokenData.userId },
        select: ["id", "first_name", "last_name", "email"],
    });
    return user;
});
exports.userProfile = userProfile;
const getUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.Users.find({
        where: {
            email: email,
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
        },
    });
    return user;
});
exports.getUserByEmail = getUserByEmail;
