"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const contact_controller_1 = require("./controllers/contact.controller");
const router = (app) => {
    app.post("/contacts", contact_controller_1.createContact);
    app.get("/contacts/:id", contact_controller_1.retrieveContact);
    app.put("/contacts/:id", contact_controller_1.updateContact);
    app.delete("/contacts/:id", contact_controller_1.deleteContact);
    app.get("/contacts", contact_controller_1.listContacts);
};
exports.router = router;
