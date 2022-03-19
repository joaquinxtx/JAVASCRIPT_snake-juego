const lienzo = document.getElementById("lienzo")
const ctx=lienzo.getContext("2d")

let posX = 50 , posY=50;
let direccionX=1;
let direccionY=0;
let velocidadX = 1;
let velocidadY = 0.6;


function draw(){
  ctx.beginPath()
  bordesCanvas()
  personajeSnake()
  ctx.clearRect(0,0,lienzo.width,lienzo.height)
  ctx.stroke();
  direccionesSnake(posX,posY)
}

//tamaño de snake
function personajeSnake(){
  ctx.rect(posX,posY,10,5);
}
function direccionesSnake(){
  if(posX >= 5 && posX <= (300-16)){
    posX= posX +direccionX*velocidadX
  }
  
  if(posY >= 5 && posY <= (138)){
    posY = posY +direccionY*velocidadY
  }
  
  
}
//movimientos
function keyPressed(){
  switch(keyCode){
    case LEFT_ARROW:
      posX -= 1
      direccionX=-1;
      direccionY=0;
      break;
    case  RIGHT_ARROW:
      posX +=  1;
      direccionX=+1;
      direccionY=0;
      break;
    case  UP_ARROW :
      posY -= 1;
      direccionY=-1;
      direccionX=0;
      break; 
    case DOWN_ARROW:
      posY += 1
      direccionY=+1;
      direccionX=0;
      break;    
  }
}
//paredes del canvas
function bordesCanvas(){
  for(let iX = 0 ; iX<300 ; iX+=5){
    lineasBorde(iX,0)
  }
  for(let iX = 0 ; iX<300 ; iX+=5){
    lineasBorde(iX,145)
  }
  for(let iY = 0 ; iY<300 ; iY+=5){
    lineasBorde(0,iY)
  }
  for(let iY = 0 ; iY<300 ; iY+=5){
    lineasBorde(295,iY)
  }
}
function lineasBorde(x,y){
  ctx.rect(x,y,5,5)
}












const formularios = document.getElementById('formulario')
const botonUser = document.getElementById('botonId')


class Usuarios {
    constructor(nombre ,apellido,alias){
        this.nombre=nombre
        this.apellido=apellido
        this.alias=alias
    }
}
let usuariosGuardados =[]
console.log()

//operador Ternario
localStorage.getItem('Users') ? usuariosGuardados =JSON.parse(localStorage.getItem('Users')) : localStorage.setItem('Users', JSON.stringify(usuariosGuardados))

formularios.addEventListener('submit',(e) => {
    e.preventDefault()

    let nombre = document.getElementById('nombreId').value
    let apellido = document.getElementById('apellidoId').value
    let alias = document.getElementById('aliasId').value

    const usuarioNuevo= new Usuarios (nombre,apellido,alias)
    usuariosGuardados.push(usuarioNuevo)

    localStorage.setItem('Users', JSON.stringify(usuariosGuardados))
    formularios.reset()
    table.innerHTML =""
     usuariosGuardados.forEach((usuariosEnArray,indice,array)=>{
         console.log(array)
        table.innerHTML +=`<tbody>
                                <td id="usuario${indice}" class="th">${usuariosEnArray.nombre}</td>
                                <td id="usuario${indice}" class="th">${usuariosEnArray.apellido}</td>
                                <td id="usuario${indice}" class="th">${usuariosEnArray.alias}</td>
                            </tbody>`
     })
})


