import { Router } from "express";  
import { ProductManager } from "../dao/ProductManager.js";

const productService = new ProductManager('products.json')

const validateFields = (req, res, next)=>{
    const productInfo = req.body;
    if(!productInfo.title || productInfo.title == "" || !productInfo.description || productInfo.description == "" || !productInfo.price || productInfo.price == 0 || !productInfo.thumbnail || productInfo.thumbnail == "" || !productInfo.code || productInfo.code == "" || !productInfo.stock || !productInfo.status || productInfo.status == false || !productInfo.category || productInfo.category == ""){
        return res.json({status: "error", message:"Todos los campos son obligatorios"})
    }else{
        next();
    }   
}

const router = Router();

router.get("/",async(req,res)=>{
    try{
        const limit = req.query.limit;
        const products = await productService.get();
        if(limit){

        }else{
            res.json({status:"success", data:products})
        }
    }catch(error){
        res.json({status:"error", message: error.message});
    }
});
router.get("/:pid",(req,res)=>{});
router.post("/", validateFields, async(req, res)=>{
    try{
        const productInfo = req.body;
        const productCreated = await productService.save(productInfo);
        res.json({statis:"success", data:productCreated, message:"Producto creado"})
    }catch(error){
        res.json({status:"error", message: error.message});
    }
});
router.put("/:pid", validateFields ,(req,res)=>{
    const productInfo = req.body;
});
router.delete("/:pid",(req,res)=>{

})

export {router as productsRouter}