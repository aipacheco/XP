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
exports.getSingleAppointment = exports.updateAppointment = exports.createAppointment = exports.getMyAppointments = void 0;
const Appointments_1 = require("../../models/Appointments");
const Users_1 = require("../../models/Users");
const Services_1 = require("../../models/Services");
const getMyAppointments = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.Users.findOneBy({ id: req.tokenData.userId });
    if (user) {
        const citas = yield Appointments_1.Appointments.find({
            relations: {
                user: true,
                service: true,
            },
            select: {
                id: true,
                appointment_date: true,
                service: {
                    id: true,
                    serviceName: true,
                },
            },
        });
        return citas;
    }
});
exports.getMyAppointments = getMyAppointments;
const createAppointment = (req) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield Users_1.Users.findOneBy({ id: req.tokenData.userId });
        const service = yield Services_1.Services.findOne({
            where: { id: req.body.service_id },
        });
        if (user && service) {
            //para crear un registro en bbdd de una tabla intermedia no se puede hacer create(X).save() del tirón, hay que hacerlo en 2 pasos
            //PASO 1 Se crea el objeto pasándole los objetos completos de User y Service
            const newAppointment = Appointments_1.Appointments.create({
                appointment_date: new Date(req.body.appointment_date),
                user: user,
                service: service,
            });
            //PASO 2 Se realiza el save sobre el objeto newAppointment que se ha creado en el Paso 1
            const crearCita = yield newAppointment.save();
            return crearCita;
        }
    }
    catch (error) {
        console.log(error);
        return error;
    }
});
exports.createAppointment = createAppointment;
const updateAppointment = (req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const user = yield Users_1.Users.findOneBy({ id: req.tokenData.userId });
    if (user) {
        const cita = yield Appointments_1.Appointments.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ["service"],
        });
        if (cita) {
            const nuevaCita = Appointments_1.Appointments.update({ id: parseInt(req.params.id) }, { appointment_date: req.body.appointment_date });
            return nuevaCita;
        }
    }
});
exports.updateAppointment = updateAppointment;
const getSingleAppointment = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield Users_1.Users.findOneBy({ id: req.tokenData.userId });
    if (user) {
        const cita = yield Appointments_1.Appointments.findOne({
            where: { id: parseInt(req.params.id) },
            relations: ["service"],
        });
        return cita;
    }
});
exports.getSingleAppointment = getSingleAppointment;
