import { Router } from "express";  
import { ProductManager } from "../dao/ProductManager.js";
import { __dirname } from '../utils.js';

const productService = new ProductManager('products.json')
const router = Router();

const validateFields = (req, res, next)=>{
    const productInfo = req.body;
    if(!productInfo.title || productInfo.title == "" || !productInfo.description || productInfo.description == "" || !productInfo.price || productInfo.price <= 0 || !productInfo.thumbnail || productInfo.thumbnail == "" || !productInfo.code || productInfo.code == "" || !productInfo.stock || !productInfo.status || productInfo.status == false || !productInfo.category || productInfo.category == ""){
        return res.json({status: "error", message:"Todos los campos son obligatorios"})
    }else{
        next();
    }   
}



router.get("/",async(req,res)=>{
    try{
        const limit = req.query.limit;
        const products = await productService.loadProducts();
        let resultado = 0;
        if(limit){
            const limite = parseInt(req.query.limit);
            console.log("limite: ", limite);
            if (limite > 0) {
                resultado = products.slice(0,limite);
            } else {
                resultado = products;
            }
            res.send(resultado);
        }else{
            res.json({status:"success", data:products})
        }
    }catch(error){
        res.json({status:"error", message: error.message});
    }
});
router.get("/:pid",async(req,res)=>{
    try {
        let pid = req.params.pid;
        let result = await productService.getById(pid);
        res.json({ status: 'success', data: result });
    } catch (error) {
            res.json({ status: 'error', message: error.message });
        
    }
});
router.post("/", validateFields, async (req, res) => {
    try {
        const productInfo = req.body;
        const productCreated =  await productService.addProduct(productInfo);
        res.json({ status: "success", data: productCreated, message: "Producto creado con exito" });
    } catch (error) {
        res.json({ status: "error", message: error.message });
    }
});
router.put("/:pid", validateFields,  (req, res) => {
    try {
        let pid = req.params.pid;
        let product = req.body;
        let result =  productService.updateProduct(pid, product);
        result.id = pid;
        res.json({ status: 'success', data: result });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
});
router.delete("/:pid",(req,res)=>{
    try {
        let pid = req.params.pid;
        let result =  productService.deleteProduct(pid);
        res.json({ status: "success", data: deleteProduct, message: "Producto eliminado con exito" });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
    }
})

export {router as productsRouter}