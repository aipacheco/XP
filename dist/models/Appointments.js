"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointments = void 0;
const typeorm_1 = require("typeorm");
const Services_1 = require("./Services");
const Users_1 = require("./Users");
let Appointments = class Appointments extends typeorm_1.BaseEntity {
};
exports.Appointments = Appointments;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appointments.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "appointment_date", type: "date" }),
    __metadata("design:type", Date)
], Appointments.prototype, "appointment_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (user) => user.appointments),
    (0, typeorm_1.JoinColumn)({ name: "user_id" }),
    __metadata("design:type", Users_1.Users)
], Appointments.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Services_1.Services, (service) => service.appointments),
    (0, typeorm_1.JoinColumn)({ name: "service_id" }),
    __metadata("design:type", Services_1.Services)
], Appointments.prototype, "service", void 0);
exports.Appointments = Appointments = __decorate([
    (0, typeorm_1.Entity)("appointments")
], Appointments);
