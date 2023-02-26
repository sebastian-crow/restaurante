const { createApp } = Vue;

createApp({
  data() {
    return {
      isLogged: false,
      index: null,
      id: null,
      user: "",
      checkout: "",
      cupon: 10000,
      input: {
        creditCard: {
          number: "",
          onwerName: "",
          dueDate: "",
          cvvCode: "",
        },
        paypal: "",
        nequi: "+57 310 4597831",
      },
    };
  },
  methods: {
    order() {
      const newOrder = {
        id: this.checkout.id,
        payment: true,
        status: "Pendiente",
        total: this.checkout.total - this.cupon,
      };
      if (
        this.input.creditCard.number !== "" &&
        this.input.ownerNumber !== "" &&
        this.input.dueDate !== "" &&
        this.input.cvvCode !== ""
      ) {
        alert("Esperando validación del pago por parte del banco");
      }
      if (this.input.paypal !== "") {
        alert("Seras redirigido a la pasarela de pagos de paypal");
        window.open("https://www.paypal.com", "_blank");
      } else {
        alert("Seras redirigido a la pasarela de pagos de nequi");
        window.open("https://www.nequi.com", "_blank");
      }
      if (this.orders?.length >= 0) {
        localStorage.setItem(
          "orders",
          JSON.stringify([...this.orders, newOrder])
        );
      }
      localStorage.setItem("orders", JSON.stringify(newOrder));
    },
  },

  computed: {},
  beforeCreate() {
    this.orders = JSON.parse(localStorage.getItem("orders"));
  },
  mounted() {
    
    this.checkout = JSON.parse(localStorage.getItem("checkout"));
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  beforeUpdate() {},
  update() {},
}).mount("#checkout");
