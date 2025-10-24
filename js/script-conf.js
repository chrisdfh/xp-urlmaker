function homePago(pid){
    window.location.href = "./monto?pid="+pid
}

const shareDialog = document.querySelector("dialog#share-dialog");    
shareDialog.addEventListener('click', function(event) {
    var rect = shareDialog.getBoundingClientRect();
    var isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height &&
    rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
    if (!isInDialog) {
        shareDialog.close();
    }
});

function shareComprobante(){
    shareDialog.showModal();
}

const portaEstrellas = document.querySelector(".porta-estrellas")
portaEstrellas.addEventListener("click", (e)=>{
    if (e.target.localName == "i"){
        setEstrellas(e.target.id)
        document.getElementById("comentario").setAttribute("open", "true")
        document.querySelector("button#btn-calificar").classList.remove("d-none")
    }
})

let valoracion = 0
function setEstrellas(elId){
    const estrellas = document.querySelectorAll("i.fa-star")
    valoracion = elId.split("-")[1]
    estrellas.forEach((el)=>{
        if (el.id.split("-")[1] <= valoracion){
            el.classList.remove("fa-regular")
            el.classList.add("fa-solid")
        } else {
            el.classList.remove("fa-solid")
            el.classList.add("fa-regular")
        }
    })
}

const btnCalificar = document.querySelector("button#btn-calificar")
btnCalificar.addEventListener("click", sendValoracion)

function sendValoracion(e){
    e.target.setAttribute("disabled", "true")
    document.getElementById("comentario").setAttribute("readonly", "true")
    alertBs('Tu valoración ha sido enviada, gracias por tu opinion')
}

