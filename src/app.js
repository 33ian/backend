import express from "express";
import { ProductManager } from "./dao/ProductManager.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";

const port = 8080;
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(port,()=>console.log(`El servidor esta escuchando en el puerto ${port}`));


app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

// const productService = new ProductManager(`./products.json`);
// let resultado = 0;

// app.get("/products",(req,res)=>{
//     try {
//         const result = productService.getProducts();
//         console.log("result: ", result);
//         const limite = parseInt(req.query.limit);
//         console.log("limite: ", limite);
//         if (limite>0) {
//             resultado = result.filter(producto=>producto.id <= limite);
//         } else {
//             resultado = result;
//         }
//         res.send(resultado);
//     } catch (error) {
//         res.send(error.message);
//     }
// });

// app.get("/products/:pid",(req,res)=>{
//     try {
//     const pid = parseInt(req.params.pid);
//     const result = productService.getProductById(pid);
//     if (!result) {
//         console.log("El producto no existe!");
//     } else {
//         res.send(result);
//     }
    
//     } catch (error) {
//         res.send(error.message);
//     }
// });
