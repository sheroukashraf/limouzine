const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({ origin: true }); // Allow CORS for local development

admin.initializeApp();

exports.updateUser = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(400).send('Only POST requests are allowed');
    }

    const { uid, newEmail, newPassword } = req.body;

    if (!uid) {
      return res.status(400).send({ message: 'User ID (uid) is required' });
    }

    try {
      const updates = {};
      
      // Update email if provided
      if (newEmail) {
        updates.email = newEmail;
      }
      
      // Update password if provided
      if (newPassword) {
        updates.password = newPassword;
      }

      await admin.auth().updateUser(uid, updates);
      
      res.status(200).send({ message: 'User data updated successfully' });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send({ message: 'Failed to update user', error: error.message });
    }
  });
});



// async reauthenticateUser(email, password) {
//     try {
//       const auth = getAuth();
//       const user = auth.currentUser;
//       const credential = EmailAuthProvider.credential(email, password);
//       await reauthenticateWithCredential(user, credential);
//       console.log('✅ Re-authentication successful');
//     } catch (error) {
//       console.error('❌ Re-authentication failed:', error);
//       throw new Error('Re-authentication failed. Please check your current password.');
//     }
//   },

//   async updateProfile() {
//   try { 
//     const response = await fetch('https://limousine-19acb.cloudfunctions.net/updateUser', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         uid: this.auth.currentUser.uid,
//         newEmail: this.newEmail,
//         newPassword: this.newPassword,
//       }),
//     });

//     const result = await response.json();
//     if (response.ok) {
//       this.successMessage = 'تم تحديث البيانات بنجاح!';
//       this.clearFields();
//     } else {
//       this.errorMessage = result.message || 'فشل في تحديث البيانات';
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     this.errorMessage = 'فشل في تحديث البيانات. حاول مرة أخرى.';
//   }
// },
