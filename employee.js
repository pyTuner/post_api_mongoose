const mongoose = require('mongoose');

const nameVal = {
    type: 'String',
    minLength: [6, 'must be atleast 6 letters'],
    
    required: true
}

const emailVal = {
    type:'String',
    
}

const employeeSchema = new mongoose.Schema({
    fname: nameVal,
    lname: String,
    email: {
        type:String,
        unique: true,

    },
    mobno: {
        type: Number,
        min:[10, "lesser digits not allowed"]
        
    }
})
// console.log(stringVal);
const employeeModel = mongoose.model('employees', employeeSchema);

module.exports = employeeModel