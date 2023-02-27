const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: [],
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
        cart: this.checkout.cart,
        total: this.checkout.total - this.cupon,
      };
      if (
        (this.input.creditCard.number !== "" &&
          this.input.ownerNumber !== "" &&
          this.input.dueDate !== "" &&
          this.input.cvvCode !== "") ||
        this.input.paypal !== ""
      ) {
        localStorage.setItem(
          "orders",
          JSON.stringify([...this.orders, newOrder])
        );
        localStorage.removeItem("checkout");
        localStorage.removeItem("cart");
        Swal.fire({
          title: `Orden creada correctamente, tu pedido sera despachado en breve`,
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
        /* window.open("https://www.paypal.com", "_blank"); */
        setTimeout(() => (location.href = "../../index.html"), 2000);
      }
    },
  },

  computed: {},
  beforeCreate() {},
  mounted() {
    this.checkout = JSON.parse(localStorage.getItem("checkout"));
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  beforeUpdate() {
    const orders = JSON.parse(localStorage.getItem("orders"));
    this.orders = orders ? orders : [];
  },
  update() {},
}).mount("#checkout");
