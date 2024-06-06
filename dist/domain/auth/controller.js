"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.login = exports.register = void 0;
const Repository = __importStar(require("./repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const helpers_1 = require("../../Helpers/helpers");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const password = req.body.password;
    const email = req.body.email;
    //validaciones
    const validName = (0, helpers_1.validator)(firstName, "First Name");
    if (validName) {
        return res.status(400).json({
            success: false,
            message: validName,
        });
    }
    const validLastName = (0, helpers_1.validator)(lastName, "Last Name");
    if (validLastName) {
        return res.status(400).json({
            success: false,
            message: validLastName,
        });
    }
    const validPassword = (0, helpers_1.isValidPassword)(password);
    if (validPassword) {
        return res.status(400).json({
            success: false,
            message: validPassword,
        });
    }
    const validEmail = (0, helpers_1.isValidEmail)(email);
    if (validEmail) {
        return res.status(400).json({
            success: false,
            message: validEmail,
        });
    }
    //encriptación de password
    const passEncript = bcrypt_1.default.hashSync(password, 12);
    const NewUser = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: passEncript,
        role_id: 1,
    };
    try {
        const result = yield Repository.register(NewUser);
        //si llega vacío es que se ha creado en repository, lo traemos para mandar el response
        if (!result) {
            return res.status(201).json({
                success: true,
                message: "User created",
            });
            //si se recibe un obj de tipo User, es que ya existía el registro
        }
        else {
            return res.status(400).json({
                success: false,
                message: "email duplicated in DB",
            });
        }
        //manejo de errores del servidor
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "An error occurred while creating the user",
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    // verifica si el correo electrónico y la contraseña se proporcionaron
    if (!email || !password) {
        return {
            success: false,
            message: "Email and password required",
        };
    }
    // se le pasa a repository para que busque el usuario por email
    const userLogged = yield Repository.findByEmail(email);
    // si repository no encuentra el usuario por email
    if (!userLogged) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }
    // si el usuario existe, verifica si la contraseña es válida
    const isValidPassword = bcrypt_1.default.compareSync(password, userLogged.password);
    //si la contraseña no es válida
    if (!isValidPassword) {
        return res.status(401).json({
            success: false,
            message: "Invalid password",
        });
    }
    //creacion del token
    const token = jsonwebtoken_1.default.sign({
        userId: userLogged.id,
        roleId: userLogged.role_id.id,
        roleName: userLogged.role_id.name,
    }, process.env.JWT_SECRET, {
        expiresIn: "2h",
    });
    // devolver datos del usuario y el token
    return res.status(200).json({
        success: true,
        message: "User logged",
        token: token,
    });
});
exports.login = login;
