const { get } = require('./actions-model');

function logger(req, res, next) {
    const time = Date.now().toLocaleString();
    const { url, method } = req;
    console.log(`[${method}] ${url} --(${time})--`);
    next();
}

function validateActionById(req, res, next) {
    get(req.params.id) 
        .then(action => {
            if(action) {
                req.action = action;
                next();
            } else {
                next({
                    status: 404,
                    message: 'action not found'
                })
            }
        })
        .catch(next)
}

function validateAction(req, res, next) {
    const { project_id, description, notes } = req.body;
    if (project_id && description && notes) {
        req.description = description.trim();
        req.notes = notes.trim();
        next()
    } else {
        next({
            status: 400,
            message: 'Project requires project_id, description, and notes',
        })
    }
}

module.exports = {
    logger,
    validateActionById,
    validateAction,
};
