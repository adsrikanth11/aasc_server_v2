const jwt      = require('jsonwebtoken');
const bcrypt   = require('bcrypt');
const Model    = require('../../models/frontend/user.model');

// This endpoint handles student login and returns a JWT token if successful
exports.Student_Login = async (req, res) => {
   const { username, password } = req.body;

   // Validation: required fields
   if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
   }

   try {
      const user = await Model.Login(username);
      console.log('User fetched:', user);
      if (!user) {
         return res.status(404).json({ message: 'User not found' });
      }

      // Check if email is verified
      if (!user.is_email_verified) {
         return res.status(401).json({ message: 'Email not verified. Please check your inbox.' });
      }

      // Validate password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(401).json({ message: 'Incorrect password' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
         expiresIn: process.env.JWT_EXPIRES_IN,
      });

      // In production: use secure HttpOnly cookies
      res.status(200).json({
         message: 'Login successful',
         token,
         user: {
            username: user.username,
            email: user.email,
         },
      });
   } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
   }
};