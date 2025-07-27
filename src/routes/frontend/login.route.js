const router      = require('express').Router();
const Controller  = require('../../controllers/frontend/login.controller');

// POST /login
router.post('/', Controller.Student_Login);

module.exports = router;