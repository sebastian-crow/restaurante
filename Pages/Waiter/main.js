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
    }, setTimeOrder(id) {
      setTimeout(function(){
          statusToPreparedOrder(id);
      }, 900000); // 15 minutos
  },
  //Agregamos la funcion para cambiar el estado del pedido a entregado
  changeStatusOrder(id,name){
    let orders = this.orders.map((order) =>
      order.id === id ? (order.status = "Entregado por "+name) : order.status
    );
    //Agregamos la hora capturada
    let currentDate = new Date();
    let time = currentDate.getHours() + ':' + currentDate.getMinutes();
    orders.time = time;
    localStorage.setItem("orders", JSON.stringify(orders));
    this.orders = orders;
  }
  
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
}).mount("#mesero");