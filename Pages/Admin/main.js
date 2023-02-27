const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: [],
      products: [],
      user: "",
    };
  },
  methods: {
    addProducts() {
      if (this.price <= 0) {
        swal("Error", "El precio no puede ser menor o igual que 0", "error");
      } else {
        let newProduct = {
          id: null,
          img: this.img,
          name: this.name,
          descriptionSm: this.descriptionSm,
          descriptionLg: this.descriptionLg,
          price: this.price,
          cant: 1,
        };
        if (this.type === "HotDogs") {
          newProduct.id = this.products[0].content.length + 1; // asignamos ID HotDogs

          this.products[0].content.push(newProduct);
        } else {
          newProduct.id = this.products[1].content.length + 1; // asignamos ID hamburguesa

          this.products[1].content.push(newProduct);
        }
        localStorage.setItem("products", JSON.stringify(this.products));
        this.type = "";
        this.price = "";
        this.descriptionSm = "";
        this.img = "";
        this.name = "";
        this.descriptionLg = "";
        swal(
          "¡Producto agregado!",
          "El producto se ha guardado satisfactoriamente.",
          "success"
        );
      }
    },

    logout() {
      localStorage.removeItem("user");
      location.href = "index.html";
    },

    seleccionarImagenPredeterminada(evento) {
      const archivo = evento.target.files[0];
      const lector = new FileReader();
      lector.onload = () => {
        this.img = lector.result;
      };
      lector.readAsDataURL(archivo);
    },
  },
  beforeCreate() {},
  beforeMount() {
    /*
    funcion para cargar los datos almacenados en localStoragede de orders 
    */
    this.orders = JSON.parse(localStorage.getItem("orders"));
  },
  mounted() {
    console.log(this.orders);
    const listProduct = JSON.parse(localStorage.getItem("products"));
    if (listProduct !== null) {
      this.product = listProduct;
    }
  },

  created() {
    this.user = JSON.parse(localStorage.getItem("user"));
    JSON.parse(localStorage.getItem("products")) != null
      ? (this.products = JSON.parse(localStorage.getItem("products")))
      : localStorage.setItem("products", JSON.stringify(this.products));
    if (!this.user) location.href = "../../index.html";
  },
  beforeUpdate() {},
  update() {},
}).mount("#admin");
