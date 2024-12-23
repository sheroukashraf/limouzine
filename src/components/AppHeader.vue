<template>
  <ul class="row">
    <li class="col-sm-10 list">
      <router-link to="/form">
        <slot tag="li"> تسجيل البيانات </slot>
      </router-link>
      <router-link to="/data">
        <slot tag="li"> بيانات العملاء </slot>
      </router-link>
      <router-link to="/profile">
        <slot tag="li"> الملف الشخصي</slot>
      </router-link>
    </li>
    <div class="col-sm-2 navbar-brand p-0" href="#">
      <p>LIMOUZINE</p>
    </div>
  </ul>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul{
     background-color: #212529;
    margin: 0;
    padding: 15px;
    list-style: none;
}
ul a{
    text-decoration: none;
    padding: 15px;
    color: #fff;
    font-size: 20px;
}
ul a.router-link-active{
  color: #90bdff;
    background-color: #000;
    padding: 15px;
    box-shadow: 1px 0px 3px -1px #3333334a;
    font-weight: 600;
    border-bottom: 5px solid #90bdff;
}
.list{
  text-align: -webkit-right;
}
.navbar-brand p{
  margin: 0;
  color: #fff;
  font-size: 20px;
  font-weight: 900;
}
@media screen and (max-width: 480px) {
  .navbar-brand{
    margin-top: 30px;
  }
}
</style>
