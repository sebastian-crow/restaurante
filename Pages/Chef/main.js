const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: "",
    };
  },
  methods: {
    /*
     Cambia el estado de Pendiente a Pedido listo,
     al hacer esto el color del boton cambia de rojo a azul
     */
    statusToPreparedOrder(id) {
      let button = document.getElementById(id);
      button.className = "btn btn-primary";
      const orders = this.orders.map((order) =>
        order.id === id ? (order.status = "Pedido listo") : "Pendiente"
      );
      localStorage.setItem("orders", JSON.stringify(orders));
      this.orders = orders;
    },
  },
  beforeCreate() {
    /*
    funcion para cargar los datos almacenados en localStoragede de orders 
    */
    this.orders = JSON.parse(localStorage.getItem("orders"));
  },
  mounted() {},
  beforeUpdate() {},
  update() {},
}).mount("#chef");
