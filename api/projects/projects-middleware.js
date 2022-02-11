const { get } = require('./projects-model');

function logger(req, res, next) {
    const time = Date.now().toLocaleString();
    const { url, method } = req;
    console.log(`[${method}] ${url} --(${time})--`);
    next();
}

function validateProjectById(req, res, next) {
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

function validateProject(req, res, next) {
    const { name, description } = req.body;
    if (name && description) {
        req.name = name.trim();
        req.description = description.trim();
        next()
    } else {
        next({
            status: 400,
            message: 'Project requires name and description',
        })
    }
}

module.exports = {
    logger,
    validateProjectById,
    validateProject,
};
