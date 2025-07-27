const jwt            = require('jsonwebtoken');
const Model          = require('../../models/frontend/user.model');
const { Router } = require('express');

// This endpoint verifies the user's email using a JWT token
exports.VerifyEmail = async (req, res) => {
   const token = req.query.token;
   if (!token) {
      return res.status(400).json({ message: 'Token is required' });
   }
   try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Update the student's is_verified status in the database
      const result = await Model.Verif_Email(decoded.userId);

      if (result.affectedRows === 0) {
         return res.status(404).json({ message: 'User not found or already verified' });
      }
      
      res.send('<h2>Email verified successfully. You can now log in.</h2>');
   } catch (err) {
      console.error(err);
      // Detect expiry
      if (err.name === 'TokenExpiredError') {
         res.send(`
            <h2>Verification link expired.</h2>
            <p><a href="/resend-verification-page">Click here to resend verification email</a></p>
         `);
      } else {
         res.status(400).send('Invalid verification link');
      }
   }
}