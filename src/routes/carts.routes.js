import { Router } from "express";
import { CartManager } from "../dao/CartManager.js";

const cartService = new CartManager('../files/carts.json');

const router = Router();

const validateFields = (req, res, next) => {
    let cart = req.body;
    if (!cart.products) {
        return res.json({ status: 'error', message: 'Todos los campos son obligatorios' });
    } else {
        next();
        
    }
};

router.post("/", async(req,res)=>{
    try {
        let cartCreated = await cartService.save();
        res.json({ status: 'success', data: cartCreated });
    } catch (error) {
        res.json({ status: 'error', message: error.message });
        throw new Error(error.message);
    }
});

router.get("/", async(req, res) => {
    try {
        let limit = Number(req.query.limit);
        if (!limit) {
            let result = await cartService.getCarts();
            res.send(result);
        } else {
            let result = await cartService.getCarts();
            res.send(result.slice(0, limit));
        }
    } catch (error) {
        res.json({ status: 'error', message: error.message });
        throw new Error(error.message);
    }
});

router.get("/:cid", async(req, res)=>{
    try {
        let cid = req.params.cid;
        let result = await cartService.getCartById(cid);
        res.send(result);
    } catch (error) {
        res.json({ status: 'error', message: error.message });
        throw new Error(error.message);
    }
});

router.put('/:cid', validateFields ,async (req, res) => {
    try {
        let cid = req.params.cid;
        let cart = req.body;
        let result = await cartService.updateCart(cid, cart);
        result.id = cid;
        res.send(result);
    } catch (error) {
        res.json({ status: 'error', message: error.message });
        throw new Error(error.message);
    }
});

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        let cid = req.params.cid;
        let pid = req.params.pid;
        let cart = await cartService.getCartById(cid);
        let prods = cart.products;
        let isProdInCart = prods.find(p => p.id == pid)
        if (isProdInCart) {
            let index = prods.findIndex(p => p.id == pid);
            cart.products[ index ].quantity++;
            cartService.saveCarts();
            res.json({ status: 'success', data: cart });
        } else {
            let newProd = {
                id: pid,
                quantity: 1
            }
            cart.products.push(newProd);
            cartService.saveCarts()
            res.json({ status: 'success', data: cart });
        }
    } catch (error) {
        res.json({ status: 'error', message: error.message });
        throw new Error(error.message);
    }
});

export {router as cartsRouter}