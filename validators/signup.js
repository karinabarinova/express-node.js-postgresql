const validator = require('validator');
const models = require('../models')

const validateCreateUser = (errors, req) => {
    if (!validator.isEmail(req.body.email)) {
        errors["email"] = "Please use a valid email"
    }

    if (!validator.isAscii(req.body.password)) {
        errors["password"] = "Invalid characters in password, please try another one"
    }

    if (!validator.isLength(req.body.email, { min: 8, max: 25 })) {
        errors["password"] = "Please ensure that your password is a minimum of 8 characters"
    }
}

exports.validateUser = (errors, req) => {
    return new Promise(function(resolve, reject) {
        validateCreateUser(errors, req)
        return models.User.findOne( {
            where: {
                email: req.body.email
            }
        }).then(user => {
            if (user !== null)
                errors["email"] = "Email is already in use. Please login or reset your password"
            resolve(errors)
        })
    })
}