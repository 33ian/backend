class ProductManager {
    constructor() {
        this.products = [];
        this.nextId = 1;
    }

    addProduct(title, description, price, thumbnail, code, stock) {

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Se requiere completar todos los campos");
            return;
        }

        if (this.products.some((product) => product.code === code)) {
            console.error(`Ya hay un producto con el código ${code}`);
            return;
        }

        const newProduct = {
            id: this.nextId,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };

        this.products.push(newProduct);
        this.nextId++;

        console.log("Producto añadido:", newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((product) => product.id === id);
        if (product) {
            return product;
        } else {
            throw new Error("No se pudo encontrar el producto");
        }
    }
}

const manager = new ProductManager();

manager.addProduct("Producto 1", "Descripción 1", 250, "img1", "001", 100);
manager.addProduct("Producto 2", "Descripción 2", 300, "img2", "002", 50);

console.log(manager.getProducts());
console.log(manager.getProductById(1));
console.log(manager.getProductById(3));