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
const faker_1 = require("@faker-js/faker");
const Roles_1 = require("../Roles");
const Users_1 = require("../Users");
const Services_1 = require("../Services");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Appointments_1 = require("../Appointments");
// Función para generar usuarios falsos con Faker
const generateFakeUser = () => {
    const user = new Users_1.Users();
    user.first_name = faker_1.faker.person.firstName();
    user.last_name = faker_1.faker.person.lastName();
    user.email = faker_1.faker.internet.email();
    user.password = bcrypt_1.default.hashSync("123456789", 12);
    user.roleId = 1;
    return user;
};
const generateFakeAdmin = () => {
    const user = new Users_1.Users();
    user.first_name = faker_1.faker.person.firstName();
    user.last_name = faker_1.faker.person.lastName();
    user.email = "admin@admin.com";
    user.password = bcrypt_1.default.hashSync("123456789", 12);
    user.roleId = 2;
    return user;
};
const generateFakeSuperAdmin = () => {
    const user = new Users_1.Users();
    user.first_name = faker_1.faker.person.firstName();
    user.last_name = faker_1.faker.person.lastName();
    user.email = "superdmin@superadmin.com";
    user.password = bcrypt_1.default.hashSync("123456789", 12);
    user.roleId = 3;
    return user;
};
const generateFakeAppointments = () => {
    const serviceId = faker_1.faker.number.int({ min: 1, max: 6 });
    const userId = faker_1.faker.number.int({ min: 1, max: 10 });
    const appointment = new Appointments_1.Appointments();
    appointment.appointment_date = faker_1.faker.date.future();
    const service = new Services_1.Services;
    service.id = serviceId;
    const user = new Users_1.Users;
    user.id = userId;
    appointment.user = user;
    appointment.service = service;
    return appointment;
};
const services = [
    {
        serviceName: "Tatuaje Personalizado",
        description: "Diseños personalizados de tatuajes que se adaptan a tus ideas y estilo único.",
    },
    {
        serviceName: "Piercing Corporal",
        description: "Servicios profesionales de piercing en diversas áreas del cuerpo, realizados con el máximo cuidado y con equipamiento esterilizado.",
    },
    {
        serviceName: "Tatuaje de Realismo",
        description: "Especialización en tatuajes realistas, capturando la esencia y detalle de las imágenes y fotografías.",
    },
    {
        serviceName: "Cover-Up de Tatuajes",
        description: "Transformación y mejoramiento de tatuajes previos, cubriendo y renovando tatuajes antiguos o no deseados.",
    },
    {
        serviceName: "Microdermal",
        description: "Piercings microdermales que ofrecen una alternativa moderna y menos invasiva para adornar tu cuerpo.",
    },
    {
        serviceName: "Eliminación de Tatuajes",
        description: "Servicio de eliminación de tatuajes con tecnología láser, para aquellos que desean borrar su tinta.",
    },
];
const seedDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const role = new Roles_1.Roles();
        role.name = "user";
        role.id = 1;
        yield role.save();
        const roleAdmin = new Roles_1.Roles();
        roleAdmin.name = "admin";
        roleAdmin.id = 2;
        yield roleAdmin.save();
        const roleSuperAdmin = new Roles_1.Roles();
        roleSuperAdmin.name = "super_admin";
        roleSuperAdmin.id = 3;
        yield roleSuperAdmin.save();
        const fakeUsers = Array.from({ length: 10 }, generateFakeUser);
        yield Users_1.Users.save(fakeUsers);
        const fakeAdmin = generateFakeAdmin();
        yield Users_1.Users.save(fakeAdmin);
        const fakeSuperAdmin = generateFakeSuperAdmin();
        yield Users_1.Users.save(fakeSuperAdmin);
        //mapeo para meter los servicios en la tabla Services
        for (const serviceItem of services) {
            let service = new Services_1.Services();
            service.serviceName = serviceItem.serviceName;
            service.description = serviceItem.description;
            yield Services_1.Services.save(service);
        }
        const fakeAppointments = Array.from({ length: 50 }, generateFakeAppointments);
        yield Appointments_1.Appointments.save(fakeAppointments);
        console.log("TODO OK EN SEEDER");
    }
    catch (error) {
        console.log(error);
    }
    finally {
        yield db_1.AppDataSource.destroy();
    }
});
seedDatabase();
