import express from "express";
import { ProductManager } from "./dao/ProductManager.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { engine } from "express-handlebars"
import path from "path"
import { __dirname } from "./utils.js";
import { viewsRouter } from "./routes/views.routes.js";
import { Server } from "socket.io";

const port = 8080;
const app = express();

const htttpServer = app.listen(port,()=>console.log(`El servidor esta escuchando en el puerto ${port}`));

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"./views"));

const socketServer = new Server(htttpServer);

socketServer.on("connection", (socketConnected)=>{
    console.log(`Nuevo cliente conectado ${socketConnected.id}`)

    socketConnected.on("messageEvent",(data)=>{
        console.log(`Datos obtenidos del cliente: ${data}`)
    })

    setTimeout(()=>{
        socketConnected.emit("eventoIndividual", `Bienvenido ${socketConnected.id}`)

        socketConnected.broadcast.emit("eventoTodosMenosActual","Mensaje para todos los clientes menos el actual");

        socketServer.emit("eventoParaTodos", "Nueva promoción");
    },2000)

    
})

app.use(express.static(path.join(__dirname,"./public")));
app.use(express.json());
app.use(express.urlencoded({extended:true}));



app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use (viewsRouter);