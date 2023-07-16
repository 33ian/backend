const socketClient = io();

socketClient.emit("messageEvent","Hola desde el cliente")

socketClient.on("eventoIndividual",(dataServer)=>{
    console.log(`Datos recibidos del servidor: ${dataServer}`)
})

socketClient.on("eventoTodosMenosActual",(data)=>{
    console.log(`Datos para todos: ${data}`);
})

socketClient.on("eventoParaTodos", (data)=>{
    console.log(data);
})