<template>
    <div class="pageStyle">
        <div class="contentStyle">
            <div class="profile-page">
                <span>مرحبًا، {{ userEmail }}</span>
                <button class="btn btn-dark" @click="logout">تسجيل الخروج</button>
            </div>
            <h2 class="title"> تعديل البيانات</h2>
            <form @submit.prevent="updateProfile">
                <div class="mb-3 row">
                    <label class="col-form-label col-sm-2 col-12" for="text">تعديل البريد الالكتروني</label>
                    <div class="col-sm-10 col-12">
                        <input v-model="newEmail" type="text" placeholder="أدخل البريد الإلكتروني الجديد" class="form-control" name="text" required/>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-form-label col-sm-2 col-12" for="Password">تعديل الرقم السري</label>
                    <div class="col-sm-10 col-12">
                        <input v-model="newPassword" type="password" placeholder="أدخل كلمه السر الجديده" class="form-control" name="Password" required/>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-form-label col-sm-2 col-12" for="current-password">كلمة المرور الحالية</label>
                    <div class="col-sm-10 col-12">
                        <input v-model="currentPassword" class="form-control" type="password" id="current-password" placeholder="أدخل كلمة المرور الحالية لتأكيد التحديث" required />
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">تحديث البيانات</button> 
            </form>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            <p v-if="successMessage" class="success">{{ successMessage }}</p>
        </div>
   </div>
</template>
<script>
import { getAuth, signOut, updateEmail,updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';


export default{
    data: function(){
        return{
            userEmail: "",
            newEmail:"",
            newPassword:"",
            currentPassword:"",
            errorMessage: "",
            successMessage: "",
        }
    },
    created() {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      this.userEmail = user.email;
    }
  },
  methods: {
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        this.$router.push('/'); // Redirect to login page after logout
      } catch (error) {
        console.error("Error logging out: ", error);
      }
    },
    async updateProfile() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        this.errorMessage = 'لا يمكن العثور على المستخدم الحالي.';
        console.error('No user found');
        return;
      }
      console.log('Current user email:', user.email);
      console.log('New email to update:', this.newEmail);
      // Step 1: Re-authenticate user
      try {
        const credential = EmailAuthProvider.credential(user.email, this.currentPassword);
        await reauthenticateWithCredential(user, credential);
        console.log('Re-authentication successful');
      } catch (error) {
        console.error('Re-authentication failed:', error.code);
        if (error.code === 'auth/wrong-password') {
            this.errorMessage = 'كلمة المرور الحالية غير صحيحة. حاول مرة أخرى.';
        } else if (error.code === 'auth/user-not-found') {
            this.errorMessage = 'المستخدم غير موجود.';
        } else {
            this.errorMessage = 'حدث خطأ أثناء إعادة التوثيق.';
        }
        return;
      }

     try {
        if (this.newEmail) {
          user.email = this.newEmail;
          console.log(user.email);
            await updateEmail(user, this.newEmail);
            console.log('Email updated successfully');
            this.successMessage = 'تم تحديث البريد الإلكتروني بنجاح!';
        }
        } catch (error) {
        console.error('Failed to update email:', error.code);
        this.errorMessage = this.getErrorMessage(error.code);
        return;
        }

    try {
        if (this.newPassword) {
            this.currentPassword = this.newPassword;
            await updatePassword(user, this.newPassword);
            console.log('Password updated successfully');
            this.successMessage = 'تم تحديث كلمة المرور بنجاح!';
        }
        } catch (error) {
        console.error('Failed to update password:', error.code);
        this.errorMessage = this.getErrorMessage(error.code);
        return;
        }

      this.clearFields(); // Clear inputs after a successful update
    },

    getErrorMessage(errorCode) {
      switch (errorCode) {
        case 'auth/weak-password':
          return 'كلمة المرور يجب أن تكون على الأقل 6 أحرف.';
        case 'auth/email-already-in-use':
          return 'البريد الإلكتروني مستخدم بالفعل من قبل حساب آخر.';
        case 'auth/invalid-email':
          return 'البريد الإلكتروني غير صالح.';
        case 'auth/requires-recent-login':
          return 'يجب عليك تسجيل الدخول مجددًا قبل تغيير البريد الإلكتروني أو كلمة المرور.';
        default:
          return 'حدث خطأ أثناء التحديث.';
      }
    },

    clearFields() {
      this.newEmail = '';
      this.newPassword = '';
      this.currentPassword = '';
    },

    
  },
};
</script>
<style>
.title{
    font-weight: bolder;
    color: #fff;
    margin-bottom: 30px;
    /* border-bottom: 4px solid #fff; */
    display: inline-block;
}
.profile-page{
    padding: 10px 0px 10px 0px;
    color: #fff;
    background-color: #ffffff52;
    margin-bottom: 25px;
    box-shadow: 4px 4px 1px 0px #90bdff;
}
.profile-page span{
    font-weight: 800;
    padding-inline-end: 25px;
    font-size: 20px;
}
.error{
  color: red;
  font-weight: bold;
  font-size: 20px;
  margin: 20px;
  padding: 10px;
  background-color: rgba(0, 0, 0, 0.125);
}
</style>