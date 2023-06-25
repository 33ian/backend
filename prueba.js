const ProductManager = require('./ProductManager.js');

const manager = new ProductManager('products.json');

console.log("Obtener los produtos: ",manager.getProducts());

const product = {
    title: 'Producto 1 prueba',
    description: 'Descripción 1 prueba',
    price: 350,
    thumbnail: 'img1',
    code: '001',
    stock: 100,
};
manager.addProduct(product);

console.log("Productos cargados: ",manager.getProducts());

const productId = 1;
const foundProduct = manager.getProductById(productId);
console.log("Producto por ID: ",foundProduct);

const updatedFields = { price: 250 };
manager.updateProduct(productId, updatedFields);

manager.deleteProduct(productId);
console.log("Obtener los produtos nuevamente: ",manager.getProducts());