const router = require('express').Router();
const Projects = require('./projects-model');
const { 
    logger, 
    getProjectById
} = require('./projects-middleware');

router.get('/', (req, res, next) => {
  Projects.get()
    .then(projects => {
      console.log(projects);
      res.status(200).json(projects);
    })
    .catch(next)
});

router.get('/:id', getProjectById, (req, res) => {
    res.json(req.project)
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
