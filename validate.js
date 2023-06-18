const hapi = require('@hapi/joi');

const validateNews = (news) => {
    const schema = hapi.object({
        title: hapi.string(),
        description: hapi.string()
    });

    return schema.validate(news);
}

module.exports.validateNews = validateNews;

const validateUser = (user) => {
    const schema = hapi.object({
        fullName: hapi.string(),
        course: hapi.string(),
        duration: hapi.number(),
        userName: hapi.string(),
        email: hapi.string(),
        password: hapi.string().min(3).max(100)
    });

    return schema.validate(user);
}

module.exports.validateUser = validateUser;

const validateSignIn = (data) => {
    const validateMe = hapiJoy.object({
        email: hapiJoy.string().email(),
        password: hapiJoy.string().min(8).max(100)
    })
    return validateMe.validate(data)
}

module.exports.validateSignIn = validateSignIn;