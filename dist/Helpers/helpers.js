"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayEmpty = exports.isValidEmail = exports.isValidPassword = exports.isValidLongText = exports.validator = void 0;
//la función recibe dos params, el valor que le pasemos y el campo para usarlo en el mensaje
const validator = (value, field) => {
    if (typeof value !== "string") {
        return `${field} must be a valid character (a to z).`;
    }
    //si es menor de 3 letras
    if (value.length < 3) {
        return `${field} must be at least 3 characters long.`;
    }
    //si es mayor de 50 letras
    if (value.length > 50) {
        return `${field} must be less than 50 characters.`;
    }
};
exports.validator = validator;
const isValidLongText = (value, field) => {
    if (typeof value !== "string") {
        return `${field} must be a valid character (a to z).`;
    }
    if (value.length < 10) {
        return `${field} must be at least 10 characters long.`;
    }
    //si es mayor de 50 letras
    if (value.length > 300) {
        return `${field} must be less than 300 characters.`;
    }
};
exports.isValidLongText = isValidLongText;
//esta función solo recibe un param porque el mensaje es siempre del password
const isValidPassword = (password) => {
    if (password.length < 8 || password.length > 15) {
        return "Password must be min 8 or max 15 chars.";
    }
};
exports.isValidPassword = isValidPassword;
const isValidEmail = (email) => {
    if (email.length < 0) {
        return "You have to provide an email.";
    }
    //regex de email
    const validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if (!validEmail.test(email)) {
        return "format email invalid";
    }
};
exports.isValidEmail = isValidEmail;
//función para comprobar si un array llega lleno o vacío
const isArrayEmpty = (array) => {
    return Array.isArray(array) && array.length === 0;
};
exports.isArrayEmpty = isArrayEmpty;
// export const isBodyEmpty = (req: Request) => {
//   const bodyWithThings = req.body && Object.keys(req.body).length !== 0
//   if (!bodyWithThings) {
//     return "No data provided"
//   }
// }
