

import { Schema, model, models } from "mongoose";

const templateSchema = new Schema({
    title:{
        type:'string',
        required:true,
    },
    templateDescription:{
        type:'string',
        required:true,
    },
    user:{
        type:'string',
        required:true,
        unique:true,
    }
},{
    timestamps:true
});

const Template = models.Template || model('Template', templateSchema);
export default Template;