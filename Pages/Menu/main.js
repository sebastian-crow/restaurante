const { createApp } = Vue;

createApp({
  data() {
    return {
      cart: [],
      isLogged: false,
      productDetails: null,
      index: null,
      id: null,
      user: "",
      summary: "",
    };
  },
  methods: {
    //agregar producto al carrito
    addProduct(item, id) {
      //pregunttar si ya existe
      const result = this.cart.filter((product) => product.name === item.name);
      //si este ya existe su cantidad aumenta en lo que se le ingrese en el input y su valor total aumenta en base a la cantida
      if (result.length > 0) {
        this.cart.map((product) => {
          if (item.name === product.name) {
            product.cant += this.products[id].content[item.id - 1].cant;
            product.VT = product.cant * product.VU;
          }
        });
      } else {
        //si no existe, se agrega con la cantidad que se le ingrese en el input y valor total = valor unitario * cantidadInput
        this.cart.push({
          id: item.id,
          img: item.img,
          name: item.name,
          cant: this.products[id].content[item.id - 1].cant,
          descriptionSm: this.products[id].content[item.id].descriptionSm,
          VU: item.price,
          VT: item.price * this.products[id].content[item.id - 1].cant,
        });
        console.log(id, item.id - 1);
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    logout() {
      localStorage.removeItem("user");
      location.href = "index.html";
    },
    cantIncrement(id) {
      this.cart.filter((c) => {
        if (c.id === id) {
          c.cant++;
          c.VU += c.VT;
          return c.id;
        }
      });
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    cantDecrement(id) {
      this.cart.map((c) => {
        if (c.id === id) {
          if (c.cant === 1) {
            c.cant = 1;
            c.VU = c.VT;
            return c;
          } else {
            c.cant--;
            c.VU = c.VU - c.VT;
            return c;
          }
        }
      });
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    deleteCartProduct(id) {
      const newCart = JSON.parse(JSON.stringify(this.cart));
      const cart = newCart.filter((c) => c.id !== id);
      this.cart = cart;
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    summaryCart() {
      const ammount = this.cart?.map((c) => c.VU);
      const summary = ammount?.reduce((partialSum, a) => partialSum + a, 0);
      return summary;
    },
    checkout() {
      localStorage.setItem(
        "checkout",
        JSON.stringify({
          id: Math.floor(Math.random() * Date.now()),
          cart: this.cart,
          total: this.summary + Math.floor((this.summary / 100) * 19),
          status: "Pendiente",
          paymant: false,
        })
      );
      location.href = "../Checkout/index.html";
    },
  },
  computed: {
    getCartItems() {
      let totalProducts = 0;
      this.cart.forEach((e) => {
        totalProducts += e.cant;
      });
      let result = totalProducts < 10 ? totalProducts : "9+";
      return result;
    },
  },
  beforeCreate() {
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.products = JSON.parse(localStorage.getItem("products"));
  },
  mounted() {
    localStorage.setItem("products", JSON.stringify(this.products));
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  beforeUpdate() {
    this.summary = this.summaryCart();
  },
  update() {},
}).mount("#menu");
