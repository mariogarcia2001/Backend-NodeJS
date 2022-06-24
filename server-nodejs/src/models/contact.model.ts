import {Schema,model} from 'mongoose';

//Interface
export interface IContact {
    name: string;
    mobile1: string;
    mobile2: null | string;
    email: null | string;
    organization: null | string;
    charge: null | string;
}

//Schema
const contactSchema = new Schema <IContact>({
    name: {type:String},
    mobile1: {type:String},
    mobile2: {type:String},
    email: {type:String},
    organization: {type:String},
    charge: {type:String},
});

//Model
const Contact = model<IContact>("Contact", contactSchema);
export {Contact};
