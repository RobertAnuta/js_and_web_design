const validator = require("email-validator");

module.exports = (req, res, next) => {
    if (validator.validate(req.body.email)) {
        next();
    } else {
        return res.status(400).json({
            error: `Email address is not valid ${validator.validate(
                "req.body.email",
                { list: true }
            )}`,
        });
    }
};
