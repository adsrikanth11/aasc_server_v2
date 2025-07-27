const Razorpay       = require('razorpay');
const crypto         = require('crypto');
const Model          = require('../../models/frontend/student_reg_form.model');
const generate_app_id = require('../../utils/generate_app_id.util');
const transporter    = require('../../config/mailer.config');

const RAZORPAY_API_KEY = process.env.Razorpay_API_KEY;
const RAZORPAY_KEY_SECRET = process.env.Razorpay_SECRET_KEY;

const instance = new Razorpay({
  key_id: RAZORPAY_API_KEY,
  key_secret: RAZORPAY_KEY_SECRET,
});

// This endpoint handles student application form submission
exports.Student_App_Form = async (req, res) => {
   const application_id = generate_app_id();

   try {
      //  Ensure both files are uploaded
      if (!req.files?.profile_image || !req.files.profile_image[0]) {
         return res.status(400).json({ message: 'Profile image is required' });
      }
      if (!req.files?.signature_image || !req.files.signature_image[0]) {
         return res.status(400).json({ message: 'Signature image is required' });
      }

      //  Format fields
      const dobFormatted = new Date(req.body.dob).toISOString().slice(0, 10);
      const activitiesString = Array.isArray(req.body.extra_curicular_activities)
         ? req.body.extra_curicular_activities.join(',')
         : req.body.extra_curicular_activities || '';

      const englishGPA = Math.min(Number(req.body.english_gpa), 10);
      const place = "Adoni";

      //  Assign image filenames
      const profileImage = req.files.profile_image[0].filename;
      const signatureImage = req.files.signature_image[0].filename;

      //  Construct payload
      const payload = {
         ...req.body,
         application_id,
         dob: dobFormatted,
         extra_curicular_activities: activitiesString,
         english_gpa: englishGPA,
         place,
         profile_image: profileImage,
         signature_image: signatureImage
      };

      //  Save application to DB
      const result = await Model.Application_Form(payload);
      if (!result) {
         return res.status(500).json({ message: 'Failed to save application' });
      }

      //  Send confirmation email
      const fullName = req.body.full_name || 'Student';
      const userEmail = req.body.email_id;
      if (userEmail) {
         const full_subject = `Application Submitted Successfully - ID: ${application_id}`;
         const emailMessage = `
            <p>Dear ${fullName},</p>
            <p>Thank you for submitting your application.</p>
            <p><strong>Application ID:</strong> ${application_id}</p>
            <p>We have received your application details and will begin processing them shortly.
          You will be notified via your registered email address. Also keep checking our website for further updates/status.</p>
            <br>
            <p>Thanks & Regards,<br/>Admissions Team</p>
         `;

         try {
            await transporter.sendMail({
               from: '"Adoni Arts & Science College" <aasccollege@example.com>',
               to: userEmail,
               subject: full_subject,
               html: emailMessage
            });
         } catch (emailError) {
            console.error('Email failed:', emailError.message);
            // Optionally log this but don’t fail application
         }
      }

      return res.status(201).json({
         message: 'Application Submitted Successfully',
         application_id
      });

   } catch (error) {
      console.error('Server error:', error.stack || error.message);
      return res.status(500).json({ message: 'Internal Server Error: ' + error.message });
   }
};

// This endpoint handles student application to create order
exports.Create_Order = async (req, res) => {
   const { currency } = req.body;
   const fee = process.env.fee_amount;

   console.log('Received request to create order:', req.body);
   
   try {
      const options = {
         amount: fee*100, // INR => paise
         currency: currency || "INR",
         receipt: "order_rcptid_" + Date.now(),
      };
      // Generate Order
      const order = await instance.orders.create(options);
      
      res.json(order);

   } catch (error) {
      res.status(500).json({ error: error.message });
   }
};

// This endpoint handles student application to verify payment
exports.Verify_Payment = async (req, res) => {
   const { student_id, order_id, payment_id, razorpay_signature, amount, email, course } = req.body;

   const hmac = crypto.createHmac('sha256', RAZORPAY_KEY_SECRET)
   hmac.update(order_id + '|' + payment_id);
   const digest = hmac.digest('hex');

   if (digest === razorpay_signature) {
      // Save to DB if needed
      const result = await Model.Save_Payment(req.body);
      console.log(result);
      // Send payment verification email to student
      try {
         await transporter.sendMail({
            from: '"Adoni Arts & Science College" <no-reply@aasc.edu.in>',
            to: email,
            subject: '🎉 Payment Successful - Admission Confirmed',
            html: `<h2>Payment Successful</h2>
                  <p>Dear Student,<br/>Your admission application fee has been received.<br/>
                  Course: ${course}<br/>Payment ID: ${payment_id}</p>`
         });
      } catch (emailError) {
         console.error('Email sending failed:', emailError.message);
         // Optional: Delete the user record or mark as unverified
      }
      
      return res.status(200).json({ success: true, message: 'Payment verified' });
   } else {
      return res.status(400).json({ success: false, message: 'Invalid signature' });
   }
};