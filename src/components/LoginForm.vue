<template>
     <div class="pageStyle">
        <div class="contentStyle">
            <h2 class="title">تسجيل الدخول</h2>
            <form @submit.prevent="login">
                <div class="mb-3 row">
                    <label class="col-form-label col-sm-2 col-12" for="text">البريد الالكتروني</label>
                    <div class="col-sm-10 col-12">
                        <input v-model="email" type="text" class="form-control" name="text" required/>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label class="col-form-label col-sm-2 col-12" for="Password">الرقم السري</label>
                    <div class="col-sm-10 col-12">
                        <input v-model="Password" type="password" class="form-control" name="Password" required/>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary">تسجيل دخول</button> 
            </form>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </div>
    </div>
</template>
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default{
    data: function(){
        return{
            email:"",
            Password:"",
            errorMessage: ""
        }
    },
    methods: {
    validateInputs() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email || !emailRegex.test(this.email)) {
        this.errorMessage = "يرجى إدخال بريد إلكتروني صالح";
        return false;
      }

      if (!this.Password) {
        this.errorMessage = "يرجى إدخال كلمة المرور";
        return false;
      }

      return true; // Inputs are valid
    },
    async login() {
      if (!this.validateInputs()) return;

      const auth = getAuth();
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.Password);
        const user = userCredential.user;
        console.log('Successfully logged in:', user);
        this.$router.push("/data");
      } catch (error) {
        console.error("Login failed:", error.code);
        if (error.code === "auth/invalid-credential") {
          this.errorMessage = "بيانات المستخدم غير صالحة";
        } else if (error.code === "auth/user-not-found") {
          this.errorMessage = "المستخدم غير موجود";
        } else if (error.code === "auth/wrong-Password") {
          this.errorMessage = "كلمة المرور غير صحيحة";
        } else {
          this.errorMessage = "حدث خطأ أثناء تسجيل الدخول";
        }
      }
    },
  },
};
</script>