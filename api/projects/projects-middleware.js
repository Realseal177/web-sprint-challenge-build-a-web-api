const { get } = require('./projects-model');

function logger(req, res, next) {
    const time = Date.now().toLocaleString();
    const { url, method } = req;
    console.log(`[${method}] ${url} --(${time})--`);
    next();
}

module.exports = {
    logger,
};
