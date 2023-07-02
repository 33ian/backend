import fs from "fs";

export class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.loadProducts();
    }

    async loadProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            if (data) {
                this.products = JSON.parse(data);
            }
            console.log("loadProducts: ", this.products);
            return this.products;
        } catch (err) {
            throw new Error("Hubo un error al cargar el producto", err);
        }
    }

    async saveProducts() {
        try {
            await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
        } catch (err) {
            throw new Error("Hubo un error al guardar el producto", err);
        }
    }

    generateId() {
        return this.products.length > 0
            ? Math.max(...this.products.map((product) => product.id)) + 1
            : 1;
    }

    addProduct(product) {
        if (!product.title || product.title == "" || !product.description || product.description == "" || !product.price || product.price == 0 || !product.thumbnail || product.thumbnail == "" || !product.code || product.code == "" || !product.stock) {
            throw new Error("Todos los campos son requeridos");
            
        }

        const existingProduct = this.products.find((p) => p.code === product.code);
        if (existingProduct) {
            throw new Error("Ya existe un producto con el mismo código");
        }

        const newProduct = {
            id: this.generateId(),
            title: product.title,
            description: product.description,
            price: product.price,
            thumbnail: product.thumbnail,
            code: product.code,
            stock: product.stock,
        };

        this.products.push(newProduct);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            throw new Error("No se pudo encontrar el producto");
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            throw new Error("No se pudo encontrar el producto");
            
        } else {
            console.log("Producto para update encontrado!");
        }

        const updatedProduct = { ...this.products[productIndex], ...updatedFields };
        this.products[productIndex] = updatedProduct;
        this.saveProducts();
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            throw new Error("No se pudo encontrar el producto");
            
        }

        this.products.splice(productIndex, 1);
        this.saveProducts();
    }
}