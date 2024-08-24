const AppError = require("../utils/AppError");

// if i want add more one role, can work with array
// ex.: ["admin", "sale"]

function verifyUserAuthorization(roleToVerify) {
    return (request, response, next) => {
        const { role } = request.user;

        //if(!roleToVerify.includes("role"))
        if( role !== roleToVerify ) {
            throw new AppError("Unauthorized", 401)
        }

        return next()
    }
}

module.exports = verifyUserAuthorization