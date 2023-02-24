const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: "",
      products:[],
    };
  },
  methods: {
    addProducts() {
      if (this.price <= 0) {
        swal("Error", "El precio no puede ser menor o igual que 0", "error");
      } else {
        let newProduct = {
          name: this.name,
          type: this.type,
          price: this.price,
          descriptionSm: this.descriptionSm,
          img: this.img,
          descriptionLg: this.descriptionLg,
          cant:1,
          id: this.id=Math.floor(Math.random() * 10),
        };
        if (this.type === "HotDogs") {
          this.products[0].content.push(newProduct);
        } else {
          this.products[1].content.push(newProduct);
        }
        localStorage.setItem("products", JSON.stringify(this.products));
        this.type = "";
        this.price = "";
        this.descriptionSm = "";
        this.img = "";
        this.name = "";
        this.descriptionLg = "";
        
      }
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
  beforeCreate() {
    /*
    funcion para cargar los datos almacenados en localStoragede de orders 
    */
    this.orders = JSON.parse(localStorage.getItem("orders"));
  },
  mounted() {
    const listProduct = JSON.parse(localStorage.getItem("products"));
    if (listProduct !== null) {
      this.product = listProduct;
    }
  },

  created(){
    JSON.parse(localStorage.getItem("products")) != null ? this.products = JSON.parse(localStorage.getItem("products")) : localStorage.setItem("products", JSON.stringify(this.products));
  },
  beforeUpdate() {},
  update() {},
}).mount("#admin");
