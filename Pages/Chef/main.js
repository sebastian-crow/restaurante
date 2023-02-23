const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: [],
      // orders: [
      //   { id: 1, cart: [{ img: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_27/1586836/hotdogs-te-square-200702.jpg', name: 'perro', cantidad: 10, VU: 1, VT: 10 }], status: 'Pedido listo', TotalPedido: 1000 },
      //   {
      //     id: 2, cart: [{ img: 'https://bakeitwithlove.com/wp-content/uploads/2022/01/what-to-serve-with-burgers-sq.jpg', name: 'hamburguesa doble carne con papas', cantidad: 20, VU: 2, VT: 20 },
      //     { img: 'https://bakeitwithlove.com/wp-content/uploads/2022/01/what-to-serve-with-burgers-sq.jpg', name: 'hamburguesa', cantidad: 20, VU: 1, VT: 20 }], status: 'Pendiente', TotalPedido: 2000
      //   },
      //   {
      //     id: 3, cart: [{ img: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_27/1586836/hotdogs-te-square-200702.jpg', name: 'perro', cantidad: 50, VU: 5, VT: 60 },
      //     { img: 'https://bakeitwithlove.com/wp-content/uploads/2022/01/what-to-serve-with-burgers-sq.jpg', name: 'hamburguesa', cantidad: 50, VU: 6, VT: 80 },
      //     { img: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_27/1586836/hotdogs-te-square-200702.jpg', name: 'perro', cantidad: 50, VU: 7, VT: 90 }], status: 'Cancelado', TotalPedido: 3000
      //   },
      //   {
      //     id: 4, cart: [{ img: 'https://bakeitwithlove.com/wp-content/uploads/2022/01/what-to-serve-with-burgers-sq.jpg', name: 'hamburguesa doble carne con papas', cantidad: 20, VU: 2, VT: 20 },
      //     { img: 'https://bakeitwithlove.com/wp-content/uploads/2022/01/what-to-serve-with-burgers-sq.jpg', name: 'hamburguesa', cantidad: 20, VU: 1, VT: 20 }], status: 'Pendiente', TotalPedido: 2000
      //   },
      //   {
      //     id: 5, cart: [{ img: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_27/1586836/hotdogs-te-square-200702.jpg', name: 'perro', cantidad: 50, VU: 5, VT: 60 },
      //     { img: 'https://bakeitwithlove.com/wp-content/uploads/2022/01/what-to-serve-with-burgers-sq.jpg', name: 'hamburguesa 2', cantidad: 50, VU: 6, VT: 80 },
      //     { img: 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2020_27/1586836/hotdogs-te-square-200702.jpg', name: 'perro 2', cantidad: 50, VU: 7, VT: 90 }], status: 'Despachar', TotalPedido: 3000
      //   },
      // ],

    };
  },
  methods: {

    /*
    funcion para cargar los datos almacenados en localStoragede de orders 
    */
    syncLocalStorage() {
      if (
        localStorage.getItem('orders') === null ||
        localStorage.getItem('orders') === undefined
      ) {
        localStorage.setItem('orders', JSON.stringify(this.orders))
      } else {
        localStorage.setItem('orders', localStorage.getItem('orders'))
        const toUpdateOrders = JSON.parse(
          localStorage.getItem('orders')
        )
        this.orders = toUpdateOrders;

      }
    },

    /*
     Cambia el estado de Pendiente a Pedido listo,
     al hacer esto el color del boton cambia de rojo a azul
     */
    statusToPreparedOrder(id) {
      let button = document.getElementById(id)
      button.className = 'btn btn-primary';
      this.orders.forEach(order => {
        if (order.id == id) { order.status = 'Pedido listo' }
      });
      localStorage.setItem('orders', JSON.stringify(this.orders));
      this.orders = JSON.parse(localStorage.getItem('orders'));
    },




  },
  beforeCreate() { },
  mounted() {
    this.syncLocalStorage()
  },
  beforeUpdate() { },
  update() { },
}).mount("#chef");
