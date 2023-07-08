import fs from "fs";
import { __dirname } from "../utils.js";
import path from "path";
import {v4 as uuidv4} from 'uuid'

export class CartManager {
    constructor(fileName) {
        this.path = path.join(__dirname, `./files/${fileName}`)
    }

    fileExists(){
        return fs.existsSync(this.path);
    }

    async getAll(){
        try{
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path, "utf-8");
                const carts = JSON.parse(content);
                return carts;
            }else{
                throw new Error("No es posbile obtener los carritos",)
            }
        }catch(error){
            throw error;
        }
    }

    async save(){
        try{
            if(this.fileExists()){
                const content = await fs.promises.readFile(this.path, "utf-8");
                const carts = JSON.parse(content);
                // let newId =  1;
                //     if(products.length >0){
                //         newId = products[products.length-1].id+1;
                //     }
                let newId = uuidv4();
                const newCart = {
                    id:newId,
                    products:[]
                };
                carts.push(newCart);
                await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
                return newCart;
            }else{
                throw new Error("No es posbile esta operación",)
            }
        }catch(error){
            throw error;
        }
    }

    async update(){

    }
}

