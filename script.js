const canvas =document.getElementById('canvas');
const ctx=canvas.getContext("2d")  

class SnakePartes{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
}


let velocidad = 9

let rencuentroCanvas= 15
let cuerpo = canvas.width/rencuentroCanvas -7
let cuerpoEnemigo=canvas.width/rencuentroCanvas -2
let cabezaX=7
let cabezaY=7
const snakeCuerpo =[];
let cola =0
let comidaX=5
let comidaY=5
let enemigoX=12
let enemigoY=15
let velocidadX =0
let velocidadY=0
let bordeX=0
let bordeY=0
let direccionX=1
let direccionY=0
let score=0

const sonido =new Audio("/sanido-pop.mp3")
const agregarSonido =new Audio("/agregar-sonido.mp3")
const finish =new Audio("/finish.mp3")
//motor del juego
function drawJuego(){
  direccionesSnake()
  let resultado= paredesChoques();
  if(resultado){
    return;
  }
  clearCanvas()
  dibujarSnake()
  dibujarComida()
  dibujarEnemigo()
  ataqueEnemigo()
  dibujarParedes()
  dibujarScore() 
  comer()
  setTimeout(drawJuego,1000/velocidad)
}

function clearCanvas(){
  ctx.fillStyle='black'
  ctx.fillRect(0,0,canvas.width,canvas.height)
}

function dibujarSnake(){
  ctx.fillStyle='gray'
  ctx.fillRect(cabezaX*rencuentroCanvas,cabezaY*rencuentroCanvas,cuerpo,cuerpo)

  ctx.fillStyle='green'
  //logica del snake cuando comes
  for(let i=0;i<snakeCuerpo.length;i++){
    let partes=snakeCuerpo[i]
    ctx.fillRect(partes.x*rencuentroCanvas,partes.y*rencuentroCanvas,cuerpo,cuerpo)
  }
  snakeCuerpo.push(new SnakePartes(cabezaX,cabezaY))
  if(snakeCuerpo.length>cola){
    snakeCuerpo.shift();
  }
}
function dibujarComida(){
  ctx.fillStyle = 'violet'
  ctx.fillRect (comidaX*rencuentroCanvas,comidaY*rencuentroCanvas,cuerpo,cuerpo)
}
function dibujarScore(){
  scoreSnake.innerHTML=`<p>${score}</p>`
}

//funcion de como reaparece la comida
function comer(){
  if(comidaX===cabezaX && comidaY === cabezaY){
      comidaX = Math.floor(Math.random()*rencuentroCanvas)
      comidaY = Math.floor(Math.random()*rencuentroCanvas)
      cola++;
      score++ ;
      sonido.play();
  }
}
function dibujarEnemigo(){ 
  ctx.fillStyle='red'
  ctx.fillRect (enemigoX*rencuentroCanvas,enemigoY*rencuentroCanvas,cuerpoEnemigo,cuerpoEnemigo)
  
}

function ataqueEnemigo(){
  if(comidaX===cabezaX && comidaY === cabezaY){   
      enemigoX = Math.floor(Math.random()*rencuentroCanvas)
      enemigoY = Math.floor(Math.random()*rencuentroCanvas)   
  }
}

function direccionesSnake(){
  cabezaX +=direccionX
  cabezaY +=direccionY
}

function borde(bordeX,bordeY){
  ctx.fillStyle='orange'
  ctx.fillRect(bordeX,bordeY,2,2)
}

function dibujarParedes(){
  for(let iX=0;iX<canvas.width; iX+=0.5){
    borde(iX,0)

  }
  for(let iX=0;iX<canvas.width ;iX+=0.5)
    borde(iX,298)
  for(let iY=0;iY<canvas.height; iY+=0.5){
    borde(0,iY)
  
  }
  for(let iY=0;iY<canvas.height ;iY+=0.5)
     borde(298,iY)
}

//paredes
function paredesChoques(){
  let gameOver=false

  if(direccionY===0 && direccionX===0){
    return false;
  }
  if(cabezaX <0 ){
    gameOver=true
    swal("Game Over💀", "Chocaste🧱...Guarda tus datos abajo😉👾");
    finish.play()
  }else if(cabezaX >= 20 ){
    gameOver=true
    swal("Game Over💀", "Chocaste🧱...Guarda tus datos abajo😉👾");
    finish.play()
  }else if (cabezaY <0){
    gameOver=true
    swal("Game Over💀", "Chocaste🧱...Guarda tus datos abajo😉👾"); 
    finish.play()  
  }else if (cabezaY >=20){
    gameOver=true
    swal("Game Over💀", "Chocaste🧱...Guarda tus datos abajo😉👾");
    finish.play()
  }else if (cabezaX===enemigoX && cabezaY === enemigoY){
    gameOver=true
    swal("Game Over💀", "chocaste🔥...Guarda tus datos abajo😉👾" );
    finish.play()
  }
  for(let i =0;i<snakeCuerpo.length;i++){
    let partes=snakeCuerpo[i]
    if(partes.x===cabezaX && partes.y===cabezaY){
      gameOver=true;
      swal("Game Over💀", "Te comiste sol@😬...Guarda tus datos abajo😉👾" );
      finish.play()
      break;
    }
    
  }
  return gameOver
    
    
}

//mover la snake con los botone (mas que nada para que lo prueben en sus celulares)
const arriba=document.getElementById("arriba")
const derecha=document.getElementById("derecha")
const restart=document.getElementById("restart")
const abajo=document.getElementById("abajo")
const izquierda=document.getElementById("izquierda")

arriba.addEventListener("click",()=>{
  if(direccionY==1){
    return
}  
  direccionY = -1
  direccionX=0
})
abajo.addEventListener("click",()=>{
  if(direccionY==-1){
    return
}

direccionY = 1
direccionX=0
})
restart.addEventListener("click",()=>{
  drawJuego()
})
izquierda.addEventListener("click",()=>{
  if(direccionX ==1){
    return
}

direccionX =- 1
direccionY=0
})
derecha.addEventListener("click",()=>{
  if(direccionX==-1){
    return
}

direccionX = 1
direccionY=0
})

//mover snake con las teclas
document.body.addEventListener('keyup',keyDown)

function keyDown(event){
  //arriba
  if(event.keyCode==87){
      if(direccionY==1){
          return
      }
      
      direccionY = -1
      direccionX=0
  }
  //abajo
  if(event.keyCode==83){
      if(direccionY==-1){
          return
      }
     
      direccionY = 1
      direccionX=0
  }
  //derecha
  if(event.keyCode==68){
      if(direccionX==-1){
          return
      }
     
      direccionX = 1
      direccionY=0
  }
  //izquierda
  if(event.keyCode==65){
      if(direccionX ==1){
          return
      }
      
      direccionX = -1
      direccionY=0
  }
  if(event.keyCode==13){
    drawJuego()
  }
}


//parte de score y nombres de los jugadores 
const scoreSnake= document.getElementById("scoreSnake")
const formularios = document.getElementById('formulario')
const botonUser = document.getElementById('botonId')

class Usuarios {
    constructor(nombre ,apellido,alias,scoreJuego){
        this.nombre=nombre
        this.apellido=apellido
        this.alias=alias
        this.scoreJuego=scoreJuego
    }
}
let usuariosGuardados =[]


//operador Ternario
localStorage.getItem('Users') ? usuariosGuardados =JSON.parse(localStorage.getItem('Users')) : localStorage.setItem('Users', JSON.stringify(usuariosGuardados))

formularios.addEventListener('submit',(e) => {
    e.preventDefault()
    agregarSonido.play()

    let nombre = document.getElementById('nombreId').value
    let apellido = document.getElementById('apellidoId').value
    let alias = document.getElementById('aliasId').value
    let scoreJuego = score

    const usuarioNuevo= new Usuarios (nombre,apellido,alias,scoreJuego)
    usuariosGuardados.push(usuarioNuevo)

    localStorage.setItem('Users', JSON.stringify(usuariosGuardados))
    formularios.reset()
    table.innerHTML =""
     usuariosGuardados.forEach((usuariosEnArray,indice)=>{
        
        table.innerHTML +=`<tbody>
                                <td id="usuario${indice}" class="th">${usuariosEnArray.nombre}</td>
                                <td id="usuario${indice}" class="th">${usuariosEnArray.apellido}</td>
                                <td id="usuario${indice}" class="th">${usuariosEnArray.alias}</td>
                                <td id="usuario${indice}" class="th">${usuariosEnArray.scoreJuego}</td>
                            </tbody>`
     })
})

//fetch y asincronia

async function mostrarUsusario (){
  let promesa = await fetch('/json/usuarios.json',{
    'mode': 'cors',
    'headers': {
        'Access-Control-Allow-Origin': '*',
    }
  })
  let datosJSON=await promesa.json()
  return datosJSON
}
let datos = mostrarUsusario()
datos.then(data=>{
  table2.innerHTML=''
  data.forEach((usuariosDatos,indiceJ)=>{  
    table2.innerHTML +=`<tbody>
                            <td id="usuario${indiceJ}" class="th">${usuariosDatos.nombreJ}</td>
                            <td id="usuario${indiceJ}" class="th">${usuariosDatos.apellidoJ}</td>
                            <td id="usuario${indiceJ}" class="th">${usuariosDatos.aliasJ}</td>
                            <td id="usuario${indiceJ}" class="th">${usuariosDatos.scoreJ}</td>
                        </tbody>`                           
  })
})



