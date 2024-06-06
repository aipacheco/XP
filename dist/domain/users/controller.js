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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfile = exports.updateProfile = exports.getUsers = void 0;
const Repository = __importStar(require("./repository"));
const helpers_1 = require("../../Helpers/helpers");
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    if (email) {
        try {
            const search = yield Repository.getUserByEmail(email);
            const isEmpty = (0, helpers_1.isArrayEmpty)(search);
            if (!isEmpty) {
                return res.status(200).json({
                    success: true,
                    message: "User by email",
                    data: search,
                });
            }
            else {
                return res.status(404).json({
                    success: true,
                    message: "User not found",
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
    }
    else {
        try {
            const resultado = yield Repository.getUsers();
            return res.status(200).json({
                success: true,
                message: "Users in DB",
                data: resultado,
            });
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error interno del servidor",
            });
        }
    }
});
exports.getUsers = getUsers;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const password = req.body.password;
    //como son campos que pueden venir o no, vamos a comprobar si vienen
    if (firstName) {
        //pasa por la función de validaciones de helpers, para no repetir código
        const validName = (0, helpers_1.validator)(firstName, "First Name");
        // console.log(validName)
        if (validName) {
            return res.status(400).json({
                success: false,
                message: validName,
            });
        }
        //se sale la función cuando encuentra un error y no sigue ejecutando validaciones
    }
    if (lastName) {
        const validLastName = (0, helpers_1.validator)(lastName, "Last Name");
        if (validLastName) {
            return res.status(400).json({
                success: false,
                message: validLastName,
            });
        }
    }
    // //si viene password, ya que cambiarlo también es opcional
    if (password) {
        const validPassword = (0, helpers_1.isValidPassword)(password);
        if (validPassword) {
            return res.status(400).json({
                success: false,
                message: validPassword,
            });
        }
    }
    try {
        //le paso el req a repository para que tenga los datos y el token
        let resultado = yield Repository.updateProfile(req);
        if (resultado) {
            return res.status(201).json({
                success: true,
                message: "Profile updated",
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
        });
    }
});
exports.updateProfile = updateProfile;
const userProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let resultado = yield Repository.userProfile(req);
        return res.status(200).json({
            success: true,
            message: "Your profile",
            data: resultado,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error interno del servidor",
        });
    }
});
exports.userProfile = userProfile;
