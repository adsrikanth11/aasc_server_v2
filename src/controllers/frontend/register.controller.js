const bcrypt         = require('bcrypt');
const Model          = require('../../models/frontend/user.model');
const generateToken  = require('../../utils/generateToken.util');
const transporter    = require('../../config/mailer.config');

// This endpoint handles student registration and sends a verification email
exports.Register_User = async (req, res) => {
   const { username, password, email, mobile } = req.body;

   try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const data = { username, password:hashedPassword, email, mobile };
      const result = await Model.Resgister_User(data);

      const token = generateToken(result.insertId);
      const verificationLink = `http://localhost:${process.env.PORT}/verify-email?token=${token}`;

      try {
         await transporter.sendMail({
            from: '"Adoni Arts & Science College" <aasccollege@example.com>',
            to: email,
            subject: 'Verify your email',
            html: `
               <h4>Hello ${username},</h4>
               <p>Please verify your email by clicking the link below:</p>
               <a href="${verificationLink}">${verificationLink}</a>
            `,
         });
      } catch (emailError) {
         console.error('Email sending failed:', emailError.message);
         // Optional: Delete the user record or mark as unverified
      }

      return res.status(200).json({ message: 'Registration successful. Please check your email to verify.' });

   } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
         if (error.sqlMessage.includes('username')) {
            return res.status(409).json({ message: "Username already registered." });
         } else if (error.sqlMessage.includes('email')) {
            return res.status(409).json({ message: "Email already registered." });
         } else if (error.sqlMessage.includes('mobile')) {
            return res.status(409).json({ message: "Mobile number already registered." });
         }
         return res.status(409).json({ message: "Duplicate entry." });
      }

      return res.status(500).json({ message: "Server error. Please try again later." });
   }
};