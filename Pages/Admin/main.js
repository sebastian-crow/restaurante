const { createApp } = Vue;

createApp({
  data() {
    return {
      orders: "",
      type: "",
      description: "",
      product: [],
      imagenSeleccionada: "",
      price: "",
      name:"",
    };
  },
  methods: {
    addProducts() {
      if (this.price <= 0) {
        swal("Error", "El precio no puede ser menor o igual que 0", "error");
      } else {
        this.product.push({
          name:this.name,
          type: this.type,
          price: this.price,
          description: this.description,
          imagen: this.imagenSeleccionada,
        });

        localStorage.setItem("productos", JSON.stringify(this.product));
        this.type = "";
         this.price = "";
        this.description = "";
        this.imagenSeleccionada = "";
        this.name=""
      }
    },

    seleccionarImagenPredeterminada(evento) {
      const archivo = evento.target.files[0];
      const lector = new FileReader();
      lector.onload = () => {
        this.imagenSeleccionada = lector.result;
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
    const listProduct = JSON.parse(localStorage.getItem("productos"));
    if (listProduct !== null) {
      this.product = listProduct;
    }
  },
  beforeUpdate() {},
  update() {},
}).mount("#admin");
