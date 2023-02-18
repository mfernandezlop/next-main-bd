module.exports = {
    validateSignup: (req, res, next) => {
        req.checkBody('name', 'Name is required').notEmpty();
        req.checkBody('email', 'Email is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Password is required').notEmpty();
        req.checkBody('password', 'Password must be at least 6 characters').isLength({min: 6});
        req.checkBody('password', 'Password must contain at least 1 number').matches(/\d/);

        const errors = req.validationErrors();
        if (errors) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors
            });
        }
        next();
    }
}
const { check, validationResult } = require('express-validator');

exports.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                check('mail').isEmail(),
                check('pass').isLength({ min: 6 }),
                check('phone').isNumeric(),
                check('adress').isLength({ min: 10 }),
                check('roll_Id').isNumeric()
            ]
        }
        case 'updateUser': {
            return [
                check('mail').isEmail(),
                check('phone').isNumeric(),
                check('adress').isLength({ min: 10 }),
                check('roll_Id').isNumeric()
            ]
        }
    }
}

exports.checkValidationResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
}
