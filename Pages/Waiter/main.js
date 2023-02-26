const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: "",
      domiciliary: [
        { id: 1, name: "Juan Perez", status: true, time: "00:00:00" },
        { id: 2, name: "Pedro Sanchez", status: true, time: "00:00:00" },
        { id: 3, name: "Luis Gonzalez", status: true, time: "00:00:00" },
        { id: 4, name: "Andres de La Cruz", status: true, time: "00:00:00" },
      ],
      idOrder: "",
      idDomiciliary: "",
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
      //     { img: 'https://bakeitwithlove.com/wp-content/uploads/2022/01/what-to-serve-with-burgers-sq.jpg', name: 'hamburguesa', cantidad: 20, VU: 1, VT: 20 }], status: 'Pedido listo', TotalPedido: 2000
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
     Cambia el estado de Pendiente a Pedido listo,
     al hacer esto el color del boton cambia de rojo a azul
     */
    // statusToPreparedOrder(id) {
    //   let button = document.getElementById(id);
    //   button.className = "btn btn-primary";
    //   const orders = this.orders.map((order) =>
    //     order.id === id ? (order.status = "Pedido listo") : "Pendiente"
    //   );
    //   localStorage.setItem("orders", JSON.stringify(orders));
    //   this.orders = orders;
    // },
    // setTimeOrder(id) {
    //   setTimeout(function () {
    //     statusToPreparedOrder(id);
    //   }, 900000); // 15 minutos
    // },
    // //Agregamos la funcion para cambiar el estado del pedido a entregado
    // changeStatusOrder(id) {
    //   let orders = this.orders.map((order) =>
    //     order.id === id ? (order.status = "Entregado por " + name) : order.status
    //   );
    //   //Agregamos la hora capturada
    //   let currentDate = new Date();
    //   let time = currentDate.getHours() + ':' + currentDate.getMinutes();
    //   orders.time = time;
    //   localStorage.setItem("orders", JSON.stringify(orders));
    //   this.orders = orders;
    // },

    /*
    Carga los datos del domiciliario al localStorage
    */
    loadDomiciliary() {
      if (
        localStorage.getItem("domiciliary") == null ||
        localStorage.getItem("domiciliary") == undefined
      ) {
        localStorage.setItem("domiciliary", JSON.stringify(this.domiciliary));
        this.domiciliary = JSON.parse(localStorage.getItem("domiciliary"));
      } else {
        localStorage.setItem(
          "domiciliary",
          localStorage.getItem("domiciliary")
        );
        this.domiciliary = JSON.parse(localStorage.getItem("domiciliary"));
      }
    },

    /*
    las funciones isOrder() y isDomiciliary toman el id del pedido(orders) 
    y el id del domiciliario(domiciliary) 
    */
    isOrder(id) {
      this.idOrder = id;
      this.timeDomiciliary();
      console.log(this.idOrder);
    },
    isDomiciliary(id) {
      this.idDomiciliary = id;
      console.log(this.idDomiciliary);
    },

    /*
    esta funcion verifica la hora asignada a cada domiciliario y compara
    con la hora actual, si ha pasado mas de 30 segundos el estado del domiciliario 
    cambia a true, estos cambios se guardan en localStorage
     */
    timeDomiciliary() {
      // crea un nuevo objeto Date
      let date = new Date();
      // la hora local
      let now = date.toLocaleTimeString();
      console.log(now);
      let timeNow = now.split(":");

      console.log(timeNow);

      this.domiciliary?.forEach((dm) => {
        let dmTime = dm.time.split(":");
        if (dmTime[1] < timeNow[1] || Math.abs(dmTime[2] - timeNow[2]) > 30) {
          dm.status = true;
          dm.time = "00:00:00";
        }
      });

      localStorage.setItem("domiciliary", JSON.stringify(this.domiciliary));
      this.domiciliary = JSON.parse(localStorage.getItem("domiciliary"));
      console.log("domiciliary", this.domiciliary);
    },

    /*
    Esta funcion cambia el estado 'Pedido listo' a 'Despachar' y fija la hora del 
    pedido al domiliciliario elegido ademas cambia su estado a false
     */
    sendOrder() {
      if (this.idDomiciliary != "") {
        if (this.idOrder != "") {
          let button = document.getElementById(this.idOrder);
          button.className = "btn btn-primary";
          this.orders.forEach((order) => {
            if (order.id == this.idOrder) {
              order.status = "Despachar";
            }
          });

          localStorage.setItem("orders", JSON.stringify(this.orders));
          this.orders = JSON.parse(localStorage.getItem("orders"));

          // crea un nuevo objeto Date
          let date = new Date();
          // la hora local
          let now = date.toLocaleTimeString();
          console.log(now);

          this.domiciliary.forEach((dm) => {
            if (dm.id == this.idDomiciliary) {
              dm.status = false;
              dm.time = now;
            }
          });

          localStorage.setItem("domiciliary", JSON.stringify(this.domiciliary));
          this.domiciliary = JSON.parse(localStorage.getItem("domiciliary"));

          this.idDomiciliary = "";
          this.idOrder = "";
          Swal.fire({
            title: `Pedido despachado`,
            width: 600,
            padding: "3em",
            color: "white",
            background: "#272B33",
            backdrop: `
            rgba(0,176,200,0.4)
            left top
            no-repeat
          `,
          });
        } else {
          Swal.fire({
            title: `Este pedido ya se le asigno un domiciliario`,
            width: 600,
            padding: "3em",
            color: "white",
            background: "#272B33",
            backdrop: `
              rgba(0,176,200,0.4)
              left top
              no-repeat
            `,
          });
        }
      } else {
        Swal.fire({
          title: `Debe elegir un domiciliario`,
          width: 600,
          padding: "3em",
          color: "white",
          background: "#272B33",
          backdrop: `
            rgba(0,176,200,0.4)
            left top
            no-repeat
          `,
        });
      }
    },
  },
  beforeCreate() {
    /*
    funcion para cargar los datos almacenados en localStoragede de orders y domiciliary
    */
    this.orders = JSON.parse(localStorage.getItem("orders"));
    this.domiciliary = JSON.parse(localStorage.getItem("domiciliary"));
  },
  mounted() {
    this.loadDomiciliary();
    this.timeDomiciliary();
  },
  beforeUpdate() {},
  update() {},
}).mount("#mesero");
