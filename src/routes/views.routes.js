import { Router } from "express";
import { __dirname } from "../utils.js";
import path from 'path';
import { ProductManager } from "../dao/ProductManager.js";
// import { productService } from "./products.routes.js";

const router = Router();
// Cargar productos

const productsFilePath = path.join (__dirname, 'files' , 'products.json');
const productService = new ProductManager(productsFilePath);
const productList = productService.getProducts();

// const productList = productService.getProducts();

// Declarar rutas 

router.get("/",(req,res)=>{
    res.render("home", {productList});
})

router.get("/realtime", (req,res)=>{
    res.render("realtime", {productList});
})

export {router as viewsRouter};