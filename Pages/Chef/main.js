const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: [],
      user: "",
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
    changeStatus(id) {
      const orders = JSON.parse(JSON.stringify(this.orders));
      const orderStateUpdated = orders.map((order) => {
        if (order.id === id) {
          order.status = "Pedido listo";
          return order;
        }
        return order;
      });
      this.orders = orderStateUpdated;
      localStorage.setItem("orders", JSON.stringify(orderStateUpdated));
    },
  },
  beforeCreate() {},
  beforeMount() {
    /*
    funcion para cargar los datos almacenados en localStorage de orders 
    */
    const orders = JSON.parse(localStorage.getItem("orders"));
    this.orders = orders ? orders : [];
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  mounted() {
    if (!this.user) location.href = "../../index.html";
  },
  beforeUpdate() {},
  update() {},
}).mount("#chef");
