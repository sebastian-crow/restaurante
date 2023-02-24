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
          id:null,
          img: this.img,
          name: this.name,
          descriptionSm: this.descriptionSm,
          descriptionLg: this.descriptionLg,
          price: this.price,
          cant:1,
          
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
        swal("¡Producto agregado!", "El producto se ha guardado satisfactoriamente.", "success");
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
