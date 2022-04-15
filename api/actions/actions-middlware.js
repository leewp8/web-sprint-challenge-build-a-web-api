const Action = require('./actions-model')

async function validateActionId(req, res, next) {
  try {
    const id = await Action.get(req.params.id)
    if (!id) {
      res.status(404).json({ message: 'action not found' })
    } else {
      req.project = id
      next()
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving the action',
    });
  };
}

function validateAction(req, res, next) {
  const { notes, description, project_id } = req.body
  if (!notes || !description || !project_id) {
    res.status(400).json({ message: 'missing required fields' })
  } else {
    next()
  }
}


module.exports = {
  validateActionId,
  validateAction
}