// add middlewares here related to projects
const Project = require('./projects-model')

async function validateProjectId(req, res, next) {
    try {
        const id = await Project.get(req.params.id)
        if (!id) {
            res.status(404).json({ message: 'project not found' })
        } else {
            req.project = id
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error retrieving the project',
        });
    };
}

function validateProject(req, res, next) {
    const { name, description } = req.body
    if (!name || !description) {
        res.status(400).json({ message: 'missing required fields' })
    } else {
        next()
    }
}


function validateProjectUpdate(req, res, next) {
    const { name, description, completed } = req.body
    if (!name || !description || typeof completed != 'boolean') {
        res.status(400).json({ message: 'missing required fields' })
    } else {
        next()
    }
}


module.exports = {
    validateProjectId,
    validateProject,
    validateProjectUpdate
}