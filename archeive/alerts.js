const mongoose = require('mongoose');
// const validator = require('validator');


// validation for the field
valCompanyId = {
    type: Number,
    required: [true, `${this.key} is required`],
    validate(value) {
        const regexPattern = /^[0-9]+$/;
        if (value < 1 | !regexPattern) {
            throw new Error('Complany ID cannot be negative or zero!')
        }
    }
}

valAsset_ID = {
    type: String,
    trim: true,
    required: [true, `${this.key} is required`],
    minLength: [2, 'must be atleast 2 letters'],
    maxLength: [12, 'Should not more than 12 letters'],
    // validate(value) {
    //     const regexPattern = /^[a-zA-Z0-9]+$/;
    //     if (!regexPattern.test(value)) {
    //         throw new Error('Make sure you have enter correct user name!')
    //     }
    // }

}

valDescription = {
    type: String,
    trim: true,
    required: [true, `${this.key} is required`],
    minLength: [2, 'must be atleast 2 letters'],
    maxLength: [120, 'Should not more than 12 letters'],
}

valParameterName = {
    type: String,
    trim: true,
    required: [true, `${this.key} is required`],
    minLength: [2, 'must be atleast 2 letters'],
    maxLength: [120, 'Should not more than 12 letters'],
    validate(value) {
        const regexPattern = /^[a-zA-Z0-9()\s]+$/;
        if (!regexPattern.test(value)) {
            throw new Error('Parameter name should not allowed special charactors except "(,)"')
        }
    }
}

valValue = {
    type: Number,
    required: [true, `${this.key} is required`],
    validate(value) {
        const regexPattern = /^-?\d+(\.\d+)?$/;
        if (!regexPattern.test(value)) {
            throw new Error('invalied value')
        }
    }
}

valThreshold = {
    type: Number,
}

valTime = {
    type: Number,
    required: [true, `${this.key} is required`],
    validate(value) {
        const regexPattern = /^[0-9]+$/;
        if (!regexPattern.test(value)) {
            throw new Error('Invalied time, try timestamp to avoid errors')
        }
    }
}

valCategory = {
    type: Number,
    required: [true, `${this.key} is required`],
    validate(value) {
        const regexPattern = /^[1-3]+$/;
        if (!regexPattern.test(value)) {
            throw new Error('Invalied category, must be between 1 & 3')
        }
    }
}

valIsRead = {
    type: Boolean,
    value: false,
    required: [true, `${this.key} is required`],
    validator(value) {
        const regexPattern = /^(true|false)$/i;
        if (!regexPattern.test(value)) {
            throw new Error('Only boolean values supported')
        }
    }
}

valIsArchive = {
    type: Boolean,
    value: false,
    required: [true, `${this.key} is required`],
    validator(value) {
        const regexPattern = /^(true|false)$/i;
        if (!regexPattern.test(value)) {
            throw new Error('Only boolean values supported')
        }
    }
}


// schema 
const alertsSchema = new mongoose.Schema({
    CompanyId: valCompanyId,
    Asset_Id: valAsset_ID,
    Description: valDescription,
    Parameter_Name: valParameterName,
    Value: valValue,
    Threshold: valThreshold,
    Time: valTime,
    Category:valCategory,
    isRead:valIsRead,
    isArchive:valIsArchive

})


// model
const alertsModel = new mongoose.model('alerts', alertsSchema);

module.exports = alertsSchema;
module.exports = alertsModel;