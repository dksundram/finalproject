// backend/src/controllers/userController.js

const bcrypt = require('bcrypt');
const User = require('../models/User');
const emailService = require('../utils/emailService');

const userController = {
  createUser: async (req, res) => {
    const { email, password, role } = req.body;

    try {
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the new user
      const newUser = await User.create({ email, password: hashedPassword, role });

      // Send email with login details
      await emailService.sendEmail(email, 'Account Created', `Your account has been created. Please login using this email address and your password.`);

      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  changePassword: async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
      // Find the user
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Check if the current password is correct
      const validPassword = await bcrypt.compare(currentPassword, user.password);

      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid current password' });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update the user's password
      await User.update({ password: hashedPassword }, { where: { email } });

      res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = userController;
