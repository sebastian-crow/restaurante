const { createApp } = Vue;

createApp({
  data() {
    return { 
      cart: [], 
      orders: [],
      showCart: false,
      showPay:false,
      totalPedido: 0,
      optionPay: undefined,
      products:[
        { 'name': 'HotDogs',
          'content' : [
          {'id': 1, 'img': '', 'name': 'HotDog Sencillo', 'descriptionSm': 'Hot Dog sencill0 :v', 'descriptionLg': 'hot dog sencillo muy rica' , 'price': 10000, 'cant':0 },
          {'id': 2, 'img': '', 'name': 'HotDog Mediano', 'descriptionSm': 'Hot Dog sencill0 :v', 'descriptionLg': 'hot dog sencillo muy rica' , 'price': 20000, 'cant':0 },
          {'id': 3, 'img': '', 'name': 'HotDog Jumbo', 'descriptionSm': 'Hot Dog sencill0 :v', 'descriptionLg': 'hot dog sencillo muy rica' , 'price': 30000, 'cant':0 },
          {'id': 4, 'img': '', 'name': 'HotDog DobleCarne', 'descriptionSm': 'Hot Dog sencill0 :v', 'descriptionLg': 'hot dog sencillo muy rica' , 'price': 40000, 'cant':0 },
          ]
        },
        {'name': 'hamburger',
          'content': [
          {'id': 1, 'img': '', 'name': 'hamburger Sencilla', 'descriptionSm': 'hamburguesa sencilla :v', 'descriptionLg': 'hamburguesa sencilla muy rica' , 'price': 10000, 'cant':0 },
          {'id': 2, 'img': '', 'name': 'hamburger Mediana', 'descriptionSm': 'hamburguesa sencilla :v', 'descriptionLg': 'hamburguesa sencilla muy rica' , 'price': 20000, 'cant':0 },
          {'id': 3, 'img': '', 'name': 'hamburger Jumbo', 'descriptionSm': 'hamburguesa sencilla :v', 'descriptionLg':'hamburguesa sencilla muy rica' , 'price': 30000, 'cant':0 },
          {'id': 4, 'img': '', 'name': 'hamburger DobleCarne', 'descriptionSm': 'hamburguesa sencilla :v', 'descriptionLg': 'hamburguesa sencilla muy rica' , 'price': 40000, 'cant':0 },
          ]
        }
      ] , 
    };
  },
  methods: {
    //abrir el modal del cart
    openCart(){
      this.showCart = true;
    },
    //cerrar el modal del cart
    closeCart(){
      this.showCart = false;
    },
    //cancelar orden 
    cancelOrder(){
      this.orders.push({'id': this.orders.length, 'cart': this.cart, 'stattus': 'Cancelado', 'TotalPedido':0})
      localStorage.setItem('orders', JSON.stringify(this.orders)) 
      this.resetData()  
    },
    //confirmar orden => abre pago
    confirmOrder(){  
      this.showPay = true
      console.log(this.showPay)
    },
    //confirmar el pago
    comfirmPay(){
      if(this.optionPay !== undefined){
        this.orders.push({'id': this.orders.length, 'cart': this.cart, 'stattus': 'Pendiente', 'TotalPedido':this.TotalPedido})
        localStorage.setItem('orders', JSON.stringify(this.orders)) 
        this.resetData() 
      }
    },
    //agregar producto al carrito
    addProduct(item, id){
      //pregunttar si ya existe
      const result = this.cart.filter(product => product.name===item.name) 
      //si este ya existe su cantidad aumenta en 1 y su valor total aumenta 
      if(result.length>0){ 
        this.cart.map((product, index) => {
          if(item.name === product.name){
            product.cant+=1  
            console.log(id, item.id-1)
            this.products[id].content[item.id-1].cant++
            product.VT = product.cant * product.VU
          }
        })
        //console.log('repetido ', this.cart)
      }else{
        //si no existe, se agrega con cant 1 y valor total = valor unitario  
        this.cart.push({'id':item.id, 'img': item.img, 'name':item.name, 'cant':1, 'VU': item.price, 'VT': item.price}) 
        this.products[id].content[item.id-1].cant++
        console.log(id, item.id-1)
        //console.log('No repetido ', this.cart)
      }
      
      //calculamos el total del pedido  
    },

    //eliminar un producto del carrito de compras
    substractProduct(item,id){
      this.cart.map((product, index) => {
        if(item.name === product.name){
          if(product.cant>0){
            product.cant-=1  
            console.log(id, item.id-1)
            this.products[id].content[item.id-1].cant--
            product.VT = product.cant * product.VU
            if(product.cant===0){
              this.cart.splice(index, 1)
            }
          } 
        }
      })  
    },

    //reset data
    resetData(){
      this.cart = [] 
      this.products.map(item  => {
        item.content.map(product => {
          product.cant=0
        })
      })
      this.closeCart()
      
    }
    
  },
  computed:{
    //calculamos el valor total del pedido realizado
    getTotalPedido(){
      this.totalPedido = 0
      this.cart.forEach( item => this.totalPedido += item.VT )
      return this.totalPedido
    }
  },
  beforeCreate() {},
  mounted() {
    //Traer la data del carrito en el local Storage
    cartLs = JSON.parse(localStorage.getItem('cart'))

    
    //Traer la data de las ordenes en el local Storage
    ordersLs = JSON.parse(localStorage.getItem('orders'))

    //si hay data en el carrito pasa la variable Cart[]
    if(cartLs != null){
      this.cart = cartLs
    }

    //si hay data en las ordenes pasa la variable Cart[]
    if(ordersLs != null){
      this.orders = ordersLs
    }
 
     
  },
  beforeUpdate() {},
  update() {},
}).mount("#root");
