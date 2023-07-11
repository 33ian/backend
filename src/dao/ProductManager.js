import fs from "fs";
import { __dirname } from "../utils.js";
import path from "path";
import { v4 as uuidv4 } from 'uuid'

export class ProductManager {
    constructor(fileName) {
        this.path = path.join(__dirname, `./files/${fileName}`)
        this.products = []
        this.loadProducts();
    };

    fileExists() {
        return fs.existsSync(this.path);
    }

    async loadProducts() {
        try {
            const data = await fs.promises.readFile(this.path, 'utf8');
            if (data) {
                this.products = JSON.parse(data);
            }
            console.log("loadProducts: ", this.products);
            return this.products;
        } catch (error) {
            throw new Error("Hubo un error al cargar los productos", error);
        }
    }

generateId() {
    let newId = uuidv4();
    return newId
}

async saveProducts() {
    try {
        await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
    } catch (error) {
        console.error('Hubo un error al guardar los productos:', error);
    }
}

addProduct(product) {
    if(!product.title || product.title == "" || !product.description || product.description == "" || !product.price || product.price <= 0 || !product.thumbnail || product.thumbnail == "" || !product.code || product.code == "" || !product.stock || !product.status || product.status == false || !product.category || product.category == "") {
        console.error('Todos los campos son obligatorios');
        return;
    }

    const existingProduct = this.products.find((p) => p.code === product.code);
    if (existingProduct) {
        console.error('Ya existe este producto');
        return;
    }

    const newProduct = {
        id: this.generateId(),
        title: product.title,
        description: product.description,
        price: product.price,
        thumbnail: product.thumbnail,
        code: product.code,
        stock: product.stock,
        status: product.status,
        category: product.category
    };

    this.products.push(newProduct);
    this.saveProducts();
    return newProduct;
}

getProducts() {
    return this.products;
}

    async getById(id) {
        const product = this.products.find((p) => p.id === id);
        if (!product) {
            console.error('No se ha encontrado el producto');
            return;
        }
        return product;
    };

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            console.error('No se ha encontrado el producto');
            return;
        } else {
            console.log("Producto a actualizar encontrado correctamente");
        }

        const updatedProduct = { ...this.products[productIndex], ...updatedFields };
        this.products[productIndex] = updatedProduct;
        this.saveProducts();
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            console.error('No se ha encontrado el producto');
            return;
        }

        this.products.splice(productIndex, 1);
        this.saveProducts();
    }
}