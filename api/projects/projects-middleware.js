const { get } = require('./projects-model');

function logger(req, res, next) {
    const time = Date.now().toLocaleString();
    const { url, method } = req;
    console.log(`[${method}] ${url} --(${time})--`);
    next();
}

function getProjectById(req, res, next) {
    get(req.params.id) 
        .then(project => {
            if(project) {
                req.project = project;
                next();
            } else {
                next({
                    status: 404,
                    message: 'project not found'
                })
            }
        })
        .catch(next)
}

module.exports = {
    logger,
    getProjectById
};
