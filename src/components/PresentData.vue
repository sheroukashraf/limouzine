<template>
  <div class="data pageStyle">
    <div class="contentStyle">
      <form class="d-flex search" role="search">
        <select v-model="selectedColumn" class="form-select">
          <option v-for="column in orderedColumns" :key="column.key">{{ column.key }}</option>
        </select>
        <input v-model="searchQuery" class="form-control ms-2" type="search" :placeholder="`ابحث في ${orderedColumns.find(col => col.value === selectedColumn).key}...`" aria-label="Search">
        <button @click.prevent="submit" class="btn btn-primary" >بحث</button>
      </form>
      <table class="table table-bordered table-hover border border-dark-subtle">
        <thead class="table-dark">
          <tr>
            <th scope="col">#</th>
            <th v-for="column in orderedColumns" :key="column.key">{{ column.key }}</th>
            <th>حذف</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="100%" class="text-center">لا توجد بيانات مطابقة</td>
          </tr>
          <tr v-else v-for="(user, index) in filteredUsers" :key="user.id">
            <th>{{ index + 1 }}</th>
            <td v-for="column in orderedColumns" :key="column.value">{{ user[column.value] || '—' }}</td>
            <th class="text-bg-danger p-2 delete" @click="openPop(user.id)" title="حذف الصف">X</th>   
          </tr>
        </tbody>
      </table>
      <div v-if="showPopup" class="modal showPopup" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
                <button type="button" @click="closePopup" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
            <div class="modal-body">
              <h2>تأكيد حذف بيانات الصف ؟</h2>
              <button class="btn btn-danger" @click="deleteRow()">حذف</button>
            </div>
          </div>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";

export default {
  data() {
    return {
      users: [],
      filteredUsers: [],
      orderedColumns: [
        { key: "الاسم", value: "الاسم" },
        { key: "العنوان", value: "العنوان" },
        { key: "رقم_الهاتف", value: "رقم_الهاتف" },
        { key: "رقم_البطاقة", value: "رقم_البطاقة" },
        { key: "الرحلة_من", value: "الرحلة_من" },
        { key: "الرحلة_إلى", value: "الرحلة_إلى" },
        { key: "موعد_الرحلة", value: "موعد_الرحلة" },
        { key: "رقم_العربية", value: "رقم_العربية" },
        { key: "المبلغ_المدفوع", value: "المبلغ_المدفوع" },
      ], // Columns in desired order
      searchQuery:"",
      selectedColumn:"الاسم",
      userId:"",
      selectedUser:null,
      showPopup: false,
    };
  },
  methods: {
    async fetchUsers() {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        this.users = querySnapshot.docs.map(doc => ({
          id: doc.id, // Firestore document ID
          ...doc.data(), // Spread operator to include document fields
        }));
        this.filteredUsers = this.users;
      } catch (e) {
        console.error("Error fetching documents: ", e.message);
      }
    },
    submit() {
    if (!this.searchQuery) {
        this.filteredUsers = this.users; // Show all if search query is empty
        return;
        
      }
      const query = this.searchQuery.toLowerCase();
      this.filteredUsers = this.users.filter(user => {
          const value = user[this.selectedColumn];
          return value && value.toString().toLowerCase().includes(query);
      });
    },
    openPop(userId){
      this.selectedUser = userId;
      this.showPopup=true;
      console.log(this.selectedUser);
    },
    async deleteRow() {
      if(!this.selectedUser) return;
      // Remove from Firebase
      try {
        await deleteDoc(doc(db, "users", this.selectedUser));
      } catch (e) {
        console.error("Error deleting user: ", e.message);
      }
      this.users = this.users.filter((user) => user.id !== this.selectedUser);
      this.filteredUsers = this.filteredUsers.filter((user) => user.id !== this.selectedUser);
      this.showPopup=false;
    },
    closePopup(){
      this.showPopup=false;
    }
  },
  watch: {
    searchQuery(newQuery) {
      if (!newQuery) {
        // If the search query is empty, show all users
        this.filteredUsers = this.users;
      } else {
        this.submit(); // Otherwise, call the submit method to filter data
      }
    },
  },
  mounted() {
    this.fetchUsers(); // Fetch users when the component is mounted
  },
};
</script>

<style scoped>
.contentStyle{
  width: 95%;
  padding: 50px 50px;
}
.search{
  padding: 0px 30px 30px 30px;
  width: 70%;
  justify-self: center;
}
.form-select{
  width: 30%;
  background-color: #212529;
  color: #fff;
  font-weight: 700;
  border-radius: 0px 5px 5px 0px;
}
.search input{
  border-radius: 5px 0px 0px 5px;
}
.search .btn{
  padding: 0px 30px;
}
.table{
  box-shadow: 1px 1px 3px 0px #01014e;
}
.delete{
  cursor: pointer;
}
.showPopup{
  display: block !important;
}
@media screen and (max-width: 480px) {
  .table {
    overflow-y: scroll;
    display: block;
  }
}
</style>
