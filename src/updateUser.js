const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(require('./serviceAccountKey.json'))
});

app.post('/update-user', async (req, res) => {
  const { uid, newEmail, newPassword } = req.body;

  if (!uid) {
    return res.status(400).json({ message: 'User ID (UID) is required' });
  }

  try {
    // Update user's email and password
    const updatedUser = await admin.auth().updateUser(uid, {
      email: newEmail ? newEmail : undefined,
      password: newPassword ? newPassword : undefined,
    });
    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Failed to update user', error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});