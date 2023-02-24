const { createApp } = Vue
createApp({
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
      JSON.parse(localStorage.getItem("products")) != null ? this.products = JSON.parse(localStorage.getItem("products")) : localStorage.setItem("products", JSON.stringify(this.products));
    }
  }).mount('#app')
