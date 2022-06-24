import {Application} from 'express';
import { createContact, deleteContact, listContacts, retrieveContact, updateContact } from './controllers/contact.controller';

export const router = (app: Application) => {
    app.post("/contacts", createContact);    
    app.get("/contacts/:id", retrieveContact);
    app.put("/contacts/:id", updateContact);
    app.delete("/contacts/:id", deleteContact);    
    app.get("/contacts", listContacts);
}