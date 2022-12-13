//Se crea una clase ProductManager para gestionar un conjunto de productos

class ProductManager {
  products;
  static id = 1;
  constructor(title,description,price,thumbnail,code,stock,id) {
    this.products=[];
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock =stock;
    this.id = id;
  }

//Método addProduct el cual agregará un producto al arreglo de productos inicial.  
  addProduct(item){
    let findResult = classManager.products.find((product)=>product.code == (item.code))
//Validación de id (que no se repita) y campos del producto.
    if(findResult == undefined){
      if(item.title == null || item.title == "" ){
        console.log("titulo incompleto")
      }
      else if(item.description == null || item.description == "" ){
        console.log("descripción incompleta")
      }
      else if(item.price == null || item.price == "" ){
        console.log("Precio incorrecto")
      }
      else if(item.thumbnail == null || item.thumbnail == "" ){
        console.log("Miniatura incorrecta")
      }
      else if(item.stock == null || item.stock == "" ){
        console.log("Stock incompleto")
      }
      else{
        item = {...item, id: ProductManager.id++}
      classManager.products.push(item)
    }
    }
    else{
      console.log("El producto ya se encuentra en el listado")
    }
  }

//Método getProducts el cual devuelve el arreglo con los productos creados hasta el momento.  
  getProducts() {
    return this.products;
  }

//Método getProductsById el cual buscá si el producto se encuentra en el array por su Id

  getProductById(id) {
  let findIdResult = this.products.find((product)=>product.id == id)
  if(findIdResult != undefined){
    return findIdResult
  }
  else{
    return "Id not found"
  }
}}

//Testing
//Se crea la instancia classManager, la cual contiene un array vacío en primera instancia.
let classManager = new ProductManager();
console.log(classManager.getProducts())

//Se crea un primer producto de prueba y se utiliza el método addProduct para subirlo al array
const prod1 = new ProductManager ("Producto prueba", "Este es un producto prueba", 200, "Sin Imagen","abc123",25)
classManager.addProduct(prod1)
console.log(classManager.getProducts())

//Se crea un segundo producto con las mismas propiedades, siendo esto detectado y devolviéndose la alerta pertinente. 
const prod2 = new ProductManager ("Producto prueba", "Este es un producto prueba", 200, "Sin Imagen","abc123",25)
classManager.addProduct(prod2)


// Testing de getProductById para el caso de que el producto se encuentre en el array o no.
console.log(classManager.getProductById(1))
console.log(classManager.getProductById(2))