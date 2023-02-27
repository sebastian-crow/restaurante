const { createApp } = Vue
createApp({
<<<<<<< HEAD
    data() {
      return {
      products: [
        { name: 'HotDogs',
          content : [
          {id: 1, img: './img/perro1.jpg', name: 'HotDog Sencillo', descriptionSm: 'Hot Dog sencill0 :v', descriptionLg: 'hot dog sencillo muy rica' , price: 10000, cant:1 },
          {id: 2, img: './img/perro2.jpg', name: 'HotDog Mediano', descriptionSm: 'Hot Dog sencill0 :v', descriptionLg: 'hot dog sencillo muy rica' , price: 20000, cant:1 },
          {id: 3, img: './img/perro3.webp', name: 'HotDog Jumbo', descriptionSm: 'Hot Dog sencill0 :v', descriptionLg: 'hot dog sencillo muy rica' , price: 30000, cant:1 },
          {id: 4, img: './img/perro4.jpeg', name: 'HotDog DobleCarne', descriptionSm: 'Hot Dog sencill0 :v', descriptionLg: 'hot dog sencillo muy rica' , price: 40000, cant:1 },
          ]
        },
        {name: 'hamburger',
          content: [
          {id: 1, img: './img/anvorguesa.jpg', name: 'Hamburger Sencilla', descriptionSm: 'Hamburguesa sencilla con carne, queso cheddar y tocineta', descriptionLg: 'hamburguesa sencilla muy rica' , price: 10000, cant:1 },
          {id: 2, img: './img/anvorguesa1.jpg', name: 'Hamburger Mediana', descriptionSm: 'Hamburguesa sencilla con carne, queso cheddar y tocineta', descriptionLg: 'hamburguesa sencilla muy rica' , price: 20000, cant:1 },
          {id: 3, img: './img/anvorguesa2.jpeg', name: 'Hamburger Jumbo', descriptionSm: 'Hamburguesa sencilla con carne, queso cheddar y tocineta', descriptionLg:'hamburguesa sencilla muy rica' , price: 30000, cant:1 },
          {id: 4, img: './img/anvorguesa3.avif', name: 'Hamburger DobleCarne', descriptionSm: 'Hamburguesa sencilla con carne, queso cheddar y tocineta', descriptionLg: 'hamburguesa sencilla muy rica' , price: 40000, cant:1 },
          ]
        }
      ] ,
      cart: [],
      isLogged: false,
      productDetails: null,
      index : null,
      id: null,
      }
    },
    methods: {
      //agregar producto al carrito
    addProduct(item, id){
      //pregunttar si ya existe
      const result = this.cart.filter(product => product.name===item.name) 
      //si este ya existe su cantidad aumenta en lo que se le ingrese en el input y su valor total aumenta en base a la cantida
      if(result.length > 0){ 
        this.cart.map((product) => {
          if(item.name === product.name){
            product.cant+=this.products[id].content[item.id-1].cant 
            product.VT = product.cant * product.VU
          }
        })
      }else{
        //si no existe, se agrega con la cantidad que se le ingrese en el input y valor total = valor unitario * cantidadInput 
        this.cart.push({'id':item.id, 'img': item.img, 'name':item.name, 'cant':this.products[id].content[item.id-1].cant, 'VU': item.price, 'VT': item.price * this.products[id].content[item.id-1].cant}) 
        console.log(id, item.id-1)
      }
       
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },  
      logout() {
        localStorage.removeItem("username");
        window.location = "../index.html";
      },
    },
    computed: {
      getCartItems(){
        let totalProducts = 0;
        this.cart.forEach(e => {
          totalProducts += e.cant
        });
        let result = totalProducts < 10 ? totalProducts : "9+"
        return result
      }
    },
    created(){
      JSON.parse(localStorage.getItem("cart")) ? this.cart = JSON.parse(localStorage.getItem("cart")) : this.cart = [];
      JSON.parse(localStorage.getItem("products")) != null ? this.arrayPets = JSON.parse(localStorage.getItem("products")) : localStorage.setItem("products", JSON.stringify(this.products));
    }
  }).mount('#app')
=======
  data() {
    return {
      products: [
        {
          name: "HotDogs",
          content: [
            {
              id: 1,
              img: "https://playswellwithbutter.com/wp-content/uploads/2022/05/Grilled-Hot-Dogs-How-to-Grill-Hot-Dogs-38.jpg",
              name: "HotDog Sencillo",
              descriptionSm: "Hot Dog sencill0 con ketchup",
              descriptionLg: "Very delicious",
              price: 10000,
              cant: 1,
            },
            {
              id: 2,
              img: "https://www.vvsupremo.com/wp-content/uploads/2016/02/900X570_Mexican-Style-Hot-Dogs.jpg",
              name: "HotDog Mediano",
              descriptionSm: "Hot Dog Mediano con salsa de tamarindo",
              descriptionLg: "hot dog sencillo muy rica",
              price: 20000,
              cant: 1,
            },
            {
              id: 3,
              img: "https://i.blogs.es/c28af1/hot_dog-min/1366_2000.jpg",
              name: "HotDog Jumbo",
              descriptionSm: "Hot Dog sencill0",
              descriptionLg: "hot dog sencillo muy rico",
              price: 30000,
              cant: 1,
            },
            {
              id: 4,
              img: "https://www.mommyhatescooking.com/wp-content/uploads/2015/05/bbq-beef-hot-dog-2.jpg",
              name: "HotDog DobleCarne",
              descriptionSm:
                "Hot Dog con carne, salsa amarilla y algo que parece cebolla",
              descriptionLg: "Hot dog con carne, delicious",
              price: 40000,
              cant: 1,
            },
          ],
        },
        {
          name: "hamburger",
          content: [
            {
              id: 1,
              img: "Utils/images/f7.png",
              name: "Hamburger Sencilla",
              descriptionSm:
                "Hamburguesa sencilla con carne, queso cheddar y tocineta",
              descriptionLg: "hamburguesa sencilla muy rica",
              price: 10000,
              cant: 1,
            },
            {
              id: 2,
              img: " Utils/images/f8.png",
              name: "Hamburger Mediana",
              descriptionSm:
                "Hamburguesa sencilla con carne, queso cheddar y tocineta",
              descriptionLg: "hamburguesa sencilla muy rica",
              price: 20000,
              cant: 1,
            },
            {
              id: 3,
              img: "Utils/images/f7.png ",
              name: "Hamburger Jumbo",
              descriptionSm:
                "Hamburguesa sencilla con carne, queso cheddar y tocineta",
              descriptionLg: "hamburguesa sencilla muy rica",
              price: 30000,
              cant: 1,
            },
            {
              id: 4,
              img: "Utils/images/f2.png",
              name: "Hamburger DobleCarne",
              descriptionSm:
                "Hamburguesa sencilla con carne, queso cheddar y tocineta",
              descriptionLg: "hamburguesa sencilla muy rica",
              price: 40000,
              cant: 1,
            },
          ],
        },
      ],
      cart: [],
      isLogged: false,
      productDetails: null,
      index: null,
      id: null,
      user: "",
      order: "",
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
      const ammount = this.cart.map((c) => c.VU);
      const summary = ammount.reduce((partialSum, a) => partialSum + a, 0);
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
      location.href = "Pages/Checkout/index.html";
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
    const products = JSON.parse(localStorage.getItem("products"));
    this.products = products ? products : this.products;
    /*  this.summary = this.summaryCart(); */
  },
  mounted() {
    localStorage.setItem("products", JSON.stringify(this.products));
    this.user = JSON.parse(localStorage.getItem("user"));
  },
  beforeUpdate() {
    this.cart = JSON.parse(localStorage.getItem("cart"));
    this.summary = this.summaryCart();
  },
  update() {},
}).mount("#root");
>>>>>>> f38ab2079971e5ae0900dd79f1f088baf910fce9
