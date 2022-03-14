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

if(localStorage.getItem('Users')){
    usuariosGuardados =JSON.parse(localStorage.getItem('Users'))
}else{
    localStorage.setItem('Users', JSON.stringify(usuariosGuardados))
}

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


