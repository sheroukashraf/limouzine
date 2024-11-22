
<template>
  <div class="mb-3 row">
    <label class="col-form-label col-sm-2 " for="text">{{ text }} </label>
    <div class="col-sm-10">
        <input 
          :type="type"
          :value="value"
          name="name"
          :text="text"
          class="form-control"
          @input="input"
          />
      </div>
  </div>
</template>

<script>
export default {
  name: 'FormData',
  props:{
    type:{
      type:String,
    },
    value: {
      type: String
    },
    name:{
      type: String
    },
    text:{
      type: String
    }
  },
  emits:["getInput"],
  methods:{
    input($event){
      this.$emit("getInput",{
        name: this.name.toLowerCase(),
        value: $event.target.value,
        text: this.text
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
form label{
  text-align-last: start;
  color: #fff;
  font-weight: 600;
}
.trip label{
  width: 32% !important;
}
.trip label:nth-last-of-type(2){
  text-align-last: end;
}
.trip .col-sm-10{
  width: 68% !important;
}
</style>
