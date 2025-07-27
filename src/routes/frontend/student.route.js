const router      = require('express').Router();
const upload      = require('../../middlewares/student_image_upload.middleware');
const Controller  = require('../../controllers/frontend/student.controller');

// POST /student/apply
router.post('/apply', 
   upload.fields([
      { name: 'profile_image', maxCount: 1 },
      { name: 'signature_image', maxCount: 1 },
   ]
), Controller.Student_App_Form);

// Post /student/create-order
router.post('/create-order', Controller.Create_Order);

// POST /student/verify-payment
router.post('/verify-payment', Controller.Verify_Payment);

module.exports = router;