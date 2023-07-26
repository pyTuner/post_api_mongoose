const mongoose = require('mongoose');
const validator = require('validator');

const nameVal = {
    type: String,
    minLength: [2, 'must be atleast 2 letters'],
    maxLength: [26, 'too long name'],
    trim: true,
    required: [true, `${this.key} is required`]
}

const emailVal = {
    type: String,
    required: [true, `${this.key} is required`],
    unique: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error("Invalied email!")
        }
    }

}

const mobnumVal = {
    type: Number,
    required: [true, `${this.key} is required`],
    unique: true,
    validate(value) {
        if (typeof(value)!= Number && value < 5999999999 || value >= 9999999999) {
            throw new Error("Incorrect Mobile number, Insure your number is correct!")
        }
    }
}

const subsciptionVal = {
    type: Boolean,
    required: [true, `${this.key} is required`]
}

const password = {
    validate(value) {
        if (value.isStringPassword) {
            throw new Error("Please use strong password")
        }
    }
}


const employeeSchema = new mongoose.Schema({
    fname: nameVal,
    mname: {
        type: String,
        trim: true
    },
    lname: nameVal,
    email: emailVal,
    mobno: mobnumVal,
    subsciption: subsciptionVal,
})
// console.log(stringVal);
const employeeModel = mongoose.model('employees', employeeSchema);

module.exports = employeeModel