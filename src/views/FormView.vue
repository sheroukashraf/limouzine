<template>
    <div class="pageStyle">
        <form class="contentStyle" @submit.prevent="addData">    
                <FormData 
                type="text"
                text="الاسم"
                name="username"
                :value="username.value"
                @getInput ="input"
                />
                <FormData 
                type="title"
                text="العنوان"
                name="title"
                :value="title.value"
                @getInput ="input"
                />
                <FormData 
                type="number"
                text="رقم الهاتف"
                name="phone"
                :value="phone.value"
                @getInput ="input"
                />
                <FormData 
                type="number"
                text="رقم البطاقة القوميه"
                name="id"
                :value="id.value"
                @getInput ="input"
                />
                <FormData 
                class="trip"
                type="text"
                text="الرحله من"
                name="tripfrom"
                :value="tripfrom.value"
                @getInput ="input"
                />
                <FormData 
                type="text"
                class="trip for"
                text="الي"
                name="tripto"
                :value="tripto.value"
                @getInput ="input"
                />
                <FormData 
                type="date"
                text="ميعاد الرحله"
                name="triptime"
                :value="triptime.value"
                @getInput ="input"
                />
                <FormData 
                type="number"
                text="رقم العربيه"
                name="carnum"
                :value="carnum.value"
                @getInput ="input"
                />
                <FormData 
                type="number"
                text="المبلغ المدفوع"
                name="money"
                :value="money.value"
                @getInput ="input"
                />
            <button type="submit" class="btn btn-primary">إضافه</button>   
        </form>
        <div v-if="showPopup" class="modal showPopup" tabindex="-1">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" @click="closePopup" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <h2>تم إضافة البيانات بنجاح!</h2>
              </div>
            </div>
          </div>
        </div>
    </div>
</template>
<script>
import FormData from '@/components/FormData.vue';
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";  

export default{
  data: function(){
    return{
      username:{
        type: String,
        value: ""
      },
      title:{
        type: String,
        value:""
      },
      phone:{
        type: Number,
        value:""
      },
      id:{
        type: Number,
        value:""
      },
      tripfrom:{
        type: String,
        value:""
      },
      tripto:{
        type: String,
        value:""
      },
      triptime:{
        type: Boolean,
        value:""
      },
      carnum:{
        type: Number,
        value:""
      },
      money:{
        type: Boolean,
        value:""
      },
      showPopup:false,
    }
  },
    components: {
        FormData,
    },
    methods:{
      input({name,value}){
        this[name].value = value;
      },
      async addData() {
        const userData = {
          الاسم: this.username.value,         // Name
          العنوان: this.title.value,         // Address
          رقم_الهاتف: this.phone.value,      // Phone Number
          رقم_البطاقة: this.id.value,        // National ID
          الرحلة_من: this.tripfrom.value,    // Trip From
          الرحلة_إلى: this.tripto.value,     // Trip To
          موعد_الرحلة: this.triptime.value,  // Trip Time
          رقم_العربية: this.carnum.value,    // Car Number
          المبلغ_المدفوع: this.money.value,
        };
        try {
          await addDoc(collection(db, "users"), userData);
          console.log("Document successfully written!");
          console.log(db);
          this.showPopup=true;
           // Reset form fields
          this.username.value = "";
          this.title.value = "";
          this.phone.value = "";
          this.id.value = "";
          this.tripfrom.value = "";
          this.tripto.value = "";
          this.triptime.value = "";
          this.carnum.value = "";
          this.money.value = "";
         
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      },
      closePopup() {
      this.showPopup = false;
      },
    }
}
</script>
<style>
.pageStyle{
  background-image: url("../assets/back2.webp");
  min-height: 550px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  padding-top: 30px;
}
.contentStyle{
  background-color: #333333bd;
  width: 80%;
  justify-self: center;
  border-radius: 3px;
  padding: 30px 100px;
  box-shadow: 1px 1px 2px 0px #898989bf;
}
/* .trip{
  width: 52.7% !important;
  display: inline-flex !important;
} */
/* .for label{
  text-align-last: center !important;
} */
.modal{
  background-color: #3333334f;
  top: 50px;
}
.showPopup{
  display: block !important;
}
@media screen and (max-width: 480px) {
  .contentStyle{
    width: 100% !important;
    padding: 10px 20px !important; 
  }
}
</style>
