"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const mongoose_1 = require("mongoose");
//Schema
const contactSchema = new mongoose_1.Schema({
    name: { type: String },
    mobile1: { type: String },
    mobile2: { type: String },
    email: { type: String },
    organization: { type: String },
    charge: { type: String },
});
//Model
const Contact = (0, mongoose_1.model)("Contact", contactSchema);
exports.Contact = Contact;
