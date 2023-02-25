const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: "",
    };
  },
  methods: {},
  beforeCreate() {
    /*
    funcion para cargar los datos almacenados en localStoragede de orders 
    */
    this.orders = JSON.parse(localStorage.getItem("orders"));
  },
  mounted() {},
  beforeUpdate() {},
  update() {},
}).mount("#admin");
