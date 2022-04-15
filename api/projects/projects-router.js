const express = require('express');
const { validateProjectId, validateProject, validateProjectUpdate  } = require('./projects-middleware');

const Project = require('./projects-model');

const router = express.Router();


router.get('/', (req, res) => {
  Project.get()
    .then(projects => {
      res.json(projects)
    })
})

router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project)
})

router.post('/', validateProject, (req, res, next) => {
  Project.insert({ name: req.body.name, description: req.body.description, completed: true })
    .then(newProject => {
      res.status(201).json(newProject)
    })
    .catch(next)
})

router.put('/:id', validateProjectId, validateProjectUpdate, async (req, res, next) => {
  Project.update(req.params.id, { name: req.body.name, description: req.body.description, completed: req.body.completed })
    .then(() => {
      return Project.get(req.params.id)
    })
    .then(project => {
      res.json(project)
    })
    .catch(next) 
});

router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    await Project.remove(req.params.id)
    res.json(req.project)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const result = await Project.getProjectActions(req.params.id)
    res.json(result)
  } catch (err) {
    next(err)
  }
})





router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Error retrieving the projects',
    stack: err.stack,
  });
});

module.exports = router;