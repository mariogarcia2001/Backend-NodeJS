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
exports.listContacts = exports.deleteContact = exports.updateContact = exports.retrieveContact = exports.createContact = void 0;
const contact_model_1 = require("../models/contact.model");
const createContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, mobile1 , mobile2 , email, organization, charge } = req.body;
    const response = yield new ContactController().create({ name, mobile1 , mobile2 , email, organization, charge });
    return res.status(response.status).json(response);
});
exports.createContact = createContact;
const retrieveContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new ContactController().retrieve(docId);
    return res.status(response.status).json(response);
});
exports.retrieveContact = retrieveContact;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, mobile1 , mobile2 , email, organization, charge } = req.body;
    const docId = req.params.id;
    const response = yield new ContactController().update(docId, { name, mobile1 , mobile2 , email, organization, charge });
    return res.status(response.status).json(response);
});
exports.updateContact = updateContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const docId = req.params.id;
    const response = yield new ContactController().delete(docId);
    return res.status(response.status).json(response);
});
exports.deleteContact = deleteContact;
const listContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield new ContactController().list();
    return res.status(200).json(response);
});
exports.listContacts = listContacts;
class ContactController {
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const contact = new contact_model_1.Contact(payload);
            return contact.save().then(data => {
                return {
                    message: "CREATED: Contact added to database",
                    status: 201,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "Error on create Contact",
                    status: 500,
                    content: err
                };
            });
        });
    }
    retrieve(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return contact_model_1.Contact.findOne({ _id: docId }).then(data => {
                if (data === null) {
                    return {
                        message: "NOT FOUND: Contact not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Contact retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    update(docId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return contact_model_1.Contact.updateOne({ _id: docId }, { $set: {
                    name: payload.name,
                    mobile1: payload.mobile1,
                    mobile2: payload.mobile2,
                    email: payload.email,
                    organization: payload.organization,
                    charge: payload.charge
                } }).then(data => {
                return {
                    message: "OK: Contact updated",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: Contact not updated",
                    status: 500,
                    content: err
                };
            });
        });
    }
    delete(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            return contact_model_1.Contact.deleteOne({ _id: docId }).then(data => {
                if (data.deletedCount == 0) {
                    return {
                        message: "NOT FOUND: Contact not found",
                        status: 404,
                        content: data
                    };
                }
                return {
                    message: "OK: Contact deleted",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return {
                    message: "INTERNAL SERVER ERROR: " + err.name,
                    status: 500,
                    content: err
                };
            });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return contact_model_1.Contact.find({}).then(data => {
                return {
                    message: "OK: All contacts retrieve",
                    status: 200,
                    content: data
                };
            }).catch(err => {
                return { message: "Error on retrieve Contacts", status: 500, content: err };
            });
        });
    }
}