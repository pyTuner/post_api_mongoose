const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

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
    type: String,
    required: [true, `${this.key} is required`],
    unique: true,
    validate(value) {
        if (isNaN(value) && value < 5999999999 && value >= 9999999999) {
            throw new Error("Invalied Mobile number, Insure your number is correct!")
        }
    }
}

const subsciptionVal = {
    type: Boolean,
    required: [true, `${this.key} is required`]
}

const passwordVal = {
    type: String,
    required: [true, 'Password err'],

}

// schema
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
    passwd: passwordVal,
    cpasswd: passwordVal
})

// middleware for password hashing
employeeSchema.pre('save', async function (next) {
    if (this.isModified('passwd')) {
        // console.log('______________________________RUN___________________________')
        this.passwd = await bcrypt.hash(this.passwd, 12);
        this.cpasswd = await bcrypt.hash(this.cpasswd, 12);
        // console.log('ecrypted');
    }
    next();
})


const employeeModel = mongoose.model('employees', employeeSchema);

module.exports = employeeModel