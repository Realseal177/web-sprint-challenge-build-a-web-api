const router = require('express').Router();
const Project = require('./projects-model');
const { 
    logger, 
    validateProjectById,
    validateProject,
} = require('./projects-middleware');

router.get('/', (req, res, next) => {
  Project.get()
    .then(projects => {
      console.log(projects);
      res.status(200).json(projects);
    })
    .catch(next)
});

router.get('/:id', validateProjectById, (req, res) => {
    res.json(req.project)
});

router.post('/', validateProject, (req, res, next) => {
    Project.insert(req.body)
        .then(projects => {
            res.status(201).json({
                ...projects,
                id: Number(req.params.id)
            });
        })
        .catch(next)
});

router.put('/:id', validateProjectById, validateProject, (req, res, next) => {
    if(req.body.completed || req.body.completed === false) {
        Project.update(req.params.id, req.body)
            .then(projects => {
                res.status(200).json(projects)
            })
            .catch(next);
        } else {
            next({
                status: 400,
                message: 'Project requires name and description'
            })
        }
});

router.delete('/:id', validateProjectById, (req, res, next) => {
    Project.remove(req.params.id)
        .then(() => {
            res.json(req.project)
        })
        .catch(next);
});

router.get('/:id/actions', validateProjectById, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then(actions => {
            res.json(actions);
        })
        .catch(next);
});

router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    customMessage: 'something tragic inside posts router happened',
    message: err.message,
    stack: err.stack
  });
});

router.use(logger);

module.exports = router;
