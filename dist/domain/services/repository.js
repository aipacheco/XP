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
exports.updateService = exports.createService = exports.getServices = void 0;
const Services_1 = require("../../models/Services");
const getServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield Services_1.Services.find({
        select: {
            id: true,
            serviceName: true,
            description: true,
        },
    });
    return services;
});
exports.getServices = getServices;
const createService = (newService) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceName = newService.serviceName;
    const findService = yield Services_1.Services.findOneBy({ serviceName: serviceName });
    // si no existe, lo crea y no retorna nada para mandar el response en controller
    if (!findService) {
        const createdService = yield Services_1.Services.create(newService).save();
    }
    else {
        return findService;
    }
});
exports.createService = createService;
const updateService = () => {
};
exports.updateService = updateService;
