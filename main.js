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
      products:[] , 
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
      //si en el carrito hay mas de un producto se puede confirmar comprar
      if(this.cart.length>0){
        //sweet alers
        Swal.fire({
          title: '¿Cancelar Orden?',
          text: "¿Está seguro de cancelar la orden?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
          if (result.isConfirmed) {
            //logica
            this.orders.push({'id': this.orders.length, 'cart': this.cart, 'stattus': 'Cancelado', 'TotalPedido':0})
            localStorage.setItem('orders', JSON.stringify(this.orders)) 
            this.resetData()  
            
            Swal.fire(
              'Confirmado',
              '¡Orden cancelada!',
              'success'
            )
          }
        })
      }else{
        Swal.fire(
          'Carrito Vacío',
          'Debes elegir al menos un producto',
          'error'
        )
      }
    },
    //confirmar orden => abre pago
    confirmOrder(){  
    //si en el carrito hay mas de un producto se puede confirmar comprar
    if(this.cart.length>0){
       //sweet alers
      Swal.fire({
        title: 'Confirmar Orden',
        text: "¿Está seguro de su orden?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, estoy seguro'
      }).then((result) => {
        if (result.isConfirmed) {
          //logica
          this.showPay = true
          console.log(this.showPay)
          
           
        }
      })
     }else{
      Swal.fire(
        'Carrito Vacío',
        'Debes elegir al menos un producto',
        'error'
      )
     }
    },
    //confirmar el pago
    comfirmPay(){
      //se debe elegir una opcion de pago
      if(this.optionPay !== undefined){
        //sweet alers
        Swal.fire({
          title: 'Confirmar Pago',
          text: "¿Está seguro de realizar el pago?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, estoy seguro'
        }).then((result) => {
          if (result.isConfirmed) {
            //logica 
            this.orders.push({'id': this.orders.length, 'cart': this.cart, 'stattus': 'Pendiente', 'TotalPedido':this.TotalPedido})
            localStorage.setItem('orders', JSON.stringify(this.orders)) 
            this.resetData() 
            
            Swal.fire(
              'Confirmado',
              'Pago realizada!',
              'success'
            )
          }
        })
      }else{
        Swal.fire(
          'Selecciona un metodo de pago',
          'Debe seleccionar el metodo de pago deseado',
          'warning'
        )
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
       
      localStorage.setItem('cart', JSON.stringify(this.cart)) 
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
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },

    //reset data
    resetData(){
      this.cart = [] 
      this.products.map(item  => {
        item.content.map(product => {
          product.cant=0
        })
      })
      this.showPay =false
      localStorage.setItem('cart', JSON.stringify(this.cart))
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
    //Traer la data del carrito, los pedidos y los productos del local Storage
    cartLs = JSON.parse(localStorage.getItem('cart'))  
    ordersLs = JSON.parse(localStorage.getItem('orders'))
    productsLs = JSON.parse(localStorage.getItem('products'))

    //si hay data en el carrito pasa la variable Cart[]
    if(cartLs != null){
      this.cart = cartLs
    }

    //si hay data en las ordenes pasa la variable Cart[]
    if(ordersLs != null){
      this.orders = ordersLs
    }

    //si hay data en las ordenes pasa la variable Cart[]
    if(productsLs != null){
      this.products = productsLs
    }else{
      products=[
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
      ] 
    }
 
     
  },
  beforeUpdate() {},
  update() {
    localStorage.setItem('cart', JSON.stringify(this.cart))
    localStorage.setItem('orders', JSON.stringify(this.orders)) 

  },
}).mount("#root");
