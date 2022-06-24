import { Request, Response } from 'express';
import { IContact, Contact } from '../models/contact.model';
import { IResponse } from '../models/response.model';

export const createContact = async (req: Request, res: Response)=> {           
    const { name, mobile1 , mobile2 , email, organization, charge } : IContact = req.body;
    const response = await new ContactController().create({ name, mobile1 , mobile2 , email, organization, charge });         
    return res.status(response.status).json(response); 
}

export const retrieveContact = async (req: Request, res: Response) => {
   const docId : String = req.params.id; 
   const response = await new ContactController().retrieve(docId);         
   return res.status(response.status).json(response);   
}

export const updateContact = async (req: Request, res: Response)=> {           
    const { name, mobile1 , mobile2 , email, organization, charge } : IContact = req.body;
    const docId : String = req.params.id; 
    const response = await new ContactController().update(docId, { name, mobile1 , mobile2 , email, organization, charge });         
    return res.status(response.status).json(response);   
}

export const deleteContact = async (req: Request, res: Response) => {
    const docId : String = req.params.id; 
    const response = await new ContactController().delete(docId);         
    return res.status(response.status).json(response);   
 }

export const listContacts = async (req: Request, res: Response) => {
    const response = await new ContactController().list();         
    return res.status(200).json(response);    
}


class ContactController {

    public async create(payload : IContact) : Promise<IResponse> {
        const contact = new Contact(payload);
        return contact.save().then(data => {
            return {
                message: "CREATED: Contact added to database",
                status: 201,
                content : data
            }
        }).catch(err => {
            return {
                message: "Error on create Contact",
                status: 500,
                content : err
            }
        });        
    }

    public async retrieve(docId: String) : Promise<IResponse> {        
        return Contact.findOne({_id: docId}).then(data => {
            if(data === null) {
                return {
                    message: "NOT FOUND: Contact not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Contact retrieve",
                status: 200,
                content : data
            };
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name ,
                status: 500,
                content : err
            };
        });        
    }

    public async update(docId: String, payload : IContact) : Promise<IResponse>{
        return Contact.updateOne({_id: docId} , { $set: { 
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
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: Contact not updated",
                status: 500,
                content : err
            }
        });
    }
    

    public async delete(docId: String) : Promise<IResponse> {
        return Contact.deleteOne({_id: docId}).then(data => {
            if (data.deletedCount == 0) {
                return {
                    message: "NOT FOUND: Contact not found",
                    status: 404,
                    content : data
                };
            }
            return {
                message: "OK: Contact deleted",
                status: 200,
                content : data
            }
        }).catch(err => {
            return {
                message: "INTERNAL SERVER ERROR: " + err.name,
                status: 500,
                content : err
            }
        });
    }

    public async list() : Promise<IResponse> {
        return Contact.find({}).then(data => {
                return {
                    message: "OK: All contacts retrieve",
                    status: 200,
                    content : data
                };
            }).catch(err => {
                return { message: "Error on retrieve Contacts", status: 500, content : err }
        });       
    }

}


