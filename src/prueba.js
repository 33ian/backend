import { ProductManager } from "./ProductManager.js";

const manager = new ProductManager('products.json');

console.log("Obtener los produtos: ",manager.getProducts());

let product = {
    title: 'Producto 1 prueba',
    description: 'Descripción 1 prueba',
    price: 350,
    thumbnail: 'img1',
    code: '001',
    stock: 100,
};
manager.addProduct(product);

product = {
    title: 'Producto  2 prueba',
    description: 'Descripción 2 prueba',
    price: 240,
    thumbnail: 'img2',
    code: '002',
    stock: 45,
};
manager.addProduct(product);
product = {
    "id": 3,
    "title": "Producto 3 prueba",
    "description": "Descripción 3 prueba",
    "price": 150,
    "thumbnail": "img3",
    "code": "003",
    "stock": 90
}
manager.addProduct(product);

console.log("Productos cargados: ",manager.getProducts());

const productId = 1;
const foundProduct = manager.getProductById(productId);
console.log("Producto por ID: ",foundProduct);

const updatedFields = { price: 250 };
manager.updateProduct(productId, updatedFields);

// manager.deleteProduct(productId);
// console.log("Obtener los produtos nuevamente: ",manager.getProducts());