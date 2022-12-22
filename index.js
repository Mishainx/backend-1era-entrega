
const fs = require('fs');

//Se crea una clase ProductManager para gestionar un conjunto de productos
class ProductManager {
  products;
  static id = 1;
  constructor(filePath) {
    this.products=[];
    this.filePath = filePath;
}

  #readContent(){
  let content = fs.readFileSync(this.filePath,'utf-8')
  try{
    let contentParse = JSON.parse(content)
    return(contentParse)
  }
  catch{
    console.log("read content error")
  }
}

  #writeData(data){
  let writeData = fs.writeFileSync(this.filePath,JSON.stringify(data))
  try{
    return writeData
  }
  catch{
    console.log("writeData Error")
  }
}

 addProduct(item){
    let array = this.#readContent()
    let codeFind =  array.products.find((product)=>product.code == item.code)    
    if(codeFind != undefined){
      console.log("El código del producto ya se encuentra en el listado")
    }
    else if(!!!item.title || !!!item.description || !!!item.price || !!!item.thumbnail|| !!!item.code || !!!item.stock ){
      console.log("Para agregar un producto debe completar todos los campos( title, description,price,thumbnail,code y stock)")    
    }
    else{
      item={
        title: item.title,
        description: item.description,
        price: item.price,
        thumbnail: item.thumbnail,
        code:item.code,
        stock:item.stock,
        id:ProductManager.id++
      }

      try{
        array.products.push(item)
        this.#writeData(array)
      }
      catch{
        console.log("addProduct Error")
      }

    }


}

//Método getProducts el cual lee el archivo de productos y devuelve todos los productos en formato arreglo.
  getProducts(){
  try{
    console.log(this.#readContent())
    return this.#readContent()
  }
  catch{
    console.log("getProducts Error")
  }
}

//Método getProductById el cual lee el archivo de productos y devuelve el producto con el Id indicado por parámetro
getProductById(id){
  let array = this.#readContent()
  let productFind = array.products.find((product)=>product.id == id)
  if(productFind == undefined){
    console.log("El producto no se encuentra en el listado")
  }
  else{
    console.log(productFind)
    return (productFind)
  }
}

//Método updateProduct el cual actualiza los campos de un producto.
updateProduct(id,obj){
  let array = this.#readContent()
  let arrayProducts = array.products.map((product)=>product.id === id? {...product,...obj}:product)
  array.products = arrayProducts
  if(!array.products.find((obj)=>obj.id===id)) throw new Error("No se encuentra el producto con la Id indicada")
  else{
    this.#writeData(array)
  }
}


//Método deleteProduct el cual borra un producto del array products.
deleteProduct(id){
  let array = this.#readContent()
  console.log(array)
  let arrayFind = array.products.find(product=>product.id===id)
  if (arrayFind==undefined){
    console.log("El producto no se encuentra en el listado")
  }
  else{
    let deleteProduct = array.products.filter((product)=>product.id != id)
    array.products = [...deleteProduct]
    this.#writeData(array)
  }
}}

// Se crea la subclase Product que extiende Product Manager.
class Product extends ProductManager{
  constructor(title,description,price,thumbnail,code,stock){
    super()
    this.title=title,
    this.description=description,
    this.price=price,
    this.thumbnail=thumbnail,
    this.code=code,
    this.stock=stock
  }
}

// A través de la función createPath se crea el archivo classManager.json para lograr persistencia de datos.
function createPath(){
  if(!fs.existsSync('./classManager.json')){
    fs.writeFileSync('./classManager.json','')    
}
route = './classManager.json';
}
createPath()


//Testing  
//Se intancia la clase y se asigna la ruta a trabajar

let classManager = new ProductManager(route)
fs.writeFileSync(route,JSON.stringify(classManager))

//Se llama el método getProduct recién creada la instancia devolviendo un arreglo vacío
classManager.getProducts()

//Se llama el método addProduct para agregar un primer producto .
prod1 = new Product("Producto prueba", "Esto es un producto prueba", 200, "Sin imagen","abc1234", 20)
classManager.addProduct(prod1)

//Se llama al método getProducts para comprobar el producto recién agregado
classManager.getProducts()

//Se llama el método getProductByID y se testea los casos en los cuales exista o no la Id
classManager.getProductById(1)
classManager.getProductById(2)

//Método updateProduct permite modificar campos del producto(modificación de stock)
classManager.updateProduct(1,{stock:700})

//Se llama al método deleteProduct para eliminar un producto. En caso de no existir el método arroja error
classManager.deleteProduct(1)

asd