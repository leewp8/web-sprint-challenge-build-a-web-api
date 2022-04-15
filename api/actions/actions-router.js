// Write your "actions" router here!
const express = require('express');
const Action = require('./actions-model');
const { validateActionId, validateAction } = require('./actions-middlware')

const router = express.Router();


router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.json(actions)
        })
})

router.get('/:id', validateActionId, (req, res) => {
    res.json(req.project)
})

router.post('/', validateAction, (req, res, next) => {
    Action.insert({ notes: req.body.notes, description: req.body.description, project_id: req.body.project_id })
      .then(newAction => {
        res.status(201).json(newAction)
      })
      .catch(next)
  })


  router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Action.update(req.params.id, { notes: req.body.notes, description: req.body.description, project_id: req.body.project_id, completed: req.body.completed })
      .then(() => {
        return Action.get(req.params.id)
      })
      .then(action => {
        res.json(action)
      })
      .catch(next)
  });

  router.delete('/:id', validateActionId, async (req, res, next) => {
    try {
      await Action.remove(req.params.id)
      res.json(req.project)
    } catch (err) {
      next(err)
    }
  })




module.exports = router;