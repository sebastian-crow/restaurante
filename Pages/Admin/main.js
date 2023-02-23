const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: [],
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
    }

  },
  beforeCreate() {},
  mounted() {
    this.syncLocalStorage()
  },
  beforeUpdate() {},
  update() {},
}).mount("#admin");
