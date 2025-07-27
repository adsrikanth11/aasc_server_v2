const router      = require('express').Router();
const Controller  = require('../../controllers/frontend/register.controller');

// POST /register
router.post('/', Controller.Register_User);

module.exports = router;