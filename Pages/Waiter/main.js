const { createApp } = Vue;

createApp({
  data() {
    return {
      user: "",
      orders: "",
      domiciliary: [
        { id: 1, name: "Juan Perez", status: true, time: "00:00:00" },
        { id: 2, name: "Pedro Sanchez", status: true, time: "00:00:00" },
        { id: 3, name: "Luis Gonzalez", status: true, time: "00:00:00" },
        { id: 4, name: "Andres de La Cruz", status: true, time: "00:00:00" },
      ],
      idOrder: "",
      idDomiciliary: "",
    };
  },
  methods: {
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
  beforeCreate() {},
  beforeMount() {
    /*
    funcion para cargar los datos almacenados en localStoragede de orders y domiciliary
    */
    this.orders = JSON.parse(localStorage.getItem("orders"));
    this.domiciliary = JSON.parse(localStorage.getItem("domiciliary"));
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  mounted() {
    this.loadDomiciliary();
    this.timeDomiciliary();
  },
  beforeUpdate() {},
  update() {},
}).mount("#mesero");
