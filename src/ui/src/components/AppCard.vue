<template>
  <div class="card">
    <img :src="logoSource" alt="Logo" class="logo" />
    <h2 class="name">{{ name }}</h2>
    <button @click="handleButtonClick" class="button" :disabled='buttonName ==="COMMING SOON"'>{{ buttonName }}</button>
  </div>
</template>

<script>
export default {
  props: {
    logoSource: String,
    name: String,
    buttonName: String,
    isdisabled:Boolean,
    customMethod: Function
  },
  methods: {
    handleButtonClick() {
    //   this.$emit("button-click");
    if (typeof this.customMethod === 'function') {
        this.customMethod(); 
      }
    },
  },
};
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding-top: 50px;
  padding-bottom: 50px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.logo {
  width: 75px;
  height: 75px;
  object-fit: contain;
  margin-bottom: 10px;
}

.name {
  font-size: 18px;
  margin-bottom: 10px;
  font-family: Inter;
}


.button:enabled{
    font-family: Inter;
    background-color: #007bff;   
    color: #fff;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.button:disabled{
    font-family: Inter;
    /* background-color: #ccc; */
    font-size: 16px;
    padding: 8px 16px;
    color: #007bff;
    background-color: #fff;
    font-weight: bold;
    border: none;
    /* cursor: not-allowed; */
}
</style>