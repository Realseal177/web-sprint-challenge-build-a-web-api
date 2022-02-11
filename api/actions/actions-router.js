const router = require('express').Router();
const Action = require('./actions-model');
const {
    logger,
    validateActionById,
    validateAction,
} = require('./actions-middlware');

router.get('/', (req, res, next) => {
    Action.get()
      .then(actions => {
        console.log(actions);
        res.status(200).json(actions);
      })
      .catch(next)
  });

router.get('/:id', validateActionById, (req, res) => {
    res.json(req.action)
});

router.post('/', validateAction, (req, res, next) => {
    Action.insert(req.body)
        .then(actions => {
            res.status(201).json({
                ...actions,
                id: Number(req.params.id)
            });
        })
        .catch(next)
});

router.put('/:id', validateActionById, validateAction, (req, res, next) => {
    if(req.body.completed || req.body.completed === false) {
        Action.update(req.params.id, req.body)
            .then(actions => {
                res.status(200).json(actions)
            })
            .catch(next);
        } else {
            next({
                status: 400,
                message: 'Action requires name and description'
            })
        }
});

router.delete('/:id', validateActionById, (req, res, next) => {
    Action.remove(req.params.id)
        .then(() => {
            res.json(req.action)
        })
        .catch(next);
});

router.use(logger);

module.exports = router;
