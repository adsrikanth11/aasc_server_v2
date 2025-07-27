const router      = require('express').Router();
const Controller  = require('../../controllers/frontend/verify_email.controller');

// Get Verify email
router.get('/', Controller.VerifyEmail);

module.exports = router;