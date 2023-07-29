const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
// const _ = require('lodash');

const nameVal = {
    type: String,
    minLength: [2, 'must be atleast 2 letters'],
    maxLength: [26, 'too long name'],
    trim: true,
    required: [true, `${this.key} is required`],
    validate(value) {
        const regexPattern = /^[a-zA-Z]+$/;
        if (!regexPattern.test(value)) {
            throw new Error('Make sure you have enter correct user name!')
        }
    }

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
        if (isNaN(value) || value < 5999999999 || value > 9999999999) {
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
    validate(value) {
        if (!validator.isStrongPassword(value)) {
            throw new Error("Password doesnt meet minimum requirement!")
        }
    },
    required: [true, 'Password err'],

}

// schema
const employeeSchema = new mongoose.Schema({
    fname: nameVal,
    mname: {
        type: String,
        trim: true,
        minLength: [2, 'must be atleast 2 letters'],
        maxLength: [26, 'too long name'],
        validate(value) {
            const regexPattern = /^[a-zA-Z]+$/;
            if (!regexPattern.test(value)) {
                throw new Error('Make sure you have enter correct user name!')
            }
        }
    },
    lname: nameVal,
    email: emailVal,
    mobno: mobnumVal,
    subsciption: subsciptionVal,
    passwd: passwordVal,
    cpasswd: passwordVal
}, { strict: 'throw' });

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

// employeeSchema.pre('save', async function(next) {
//     console.log(_.isString('fname'));
//     if(this.isModified('fname') || this.isModified('mname') || this.isModified('lname')) {
//         if(!_.isString(this.fname.value) || !_.isString(this.mname.value) || !_.isString(this.lname.value)){
//             throw new Error('Make sure you have entered correct name.')
//         } else {
//             console.log('dont wrry')
//         }
//     }
//     next();
// }
// )

const employeeModel = mongoose.model('employees', employeeSchema);

module.exports = employeeModel  