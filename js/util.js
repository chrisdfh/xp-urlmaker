function normalizeInputValueWithError(s){
    const element = document.getElementById(s.id)
    element.value = element.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[~<>?\-_'".$%&*!@+=`:;^#\[\]\{\}]+/g, '')
    const match = element.value.match(/^[a-zA-Z0-9 ]+$/);
    if (!match) {
        element.parentElement.nextElementSibling.classList.remove('d-none')
    } else {
        element.parentElement.nextElementSibling.classList.add('d-none')
    }
}

let logIdx = 0
function loguea(msg){
    const fnOrigen = loguea.caller.name
    console.log( `Origen: ${fnOrigen} ->, ${msg} - (${++logIdx})`)
}

// USANDO YIELD
function* yNum(n){
    while(true){
        yield n
        n++
    }
}

let logIdxYield = yNum(1)
function logYield(msg){
    const fnOrigen = loguea.caller.name
    console.log( `Origen: ${fnOrigen} ->, ${msg} - (${logIdxYield.next.value()})`)
}

function formatEsVeDate(dateString){
    const date = new Date(dateString)
    const formatDate = new Intl.DateTimeFormat("es-VE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",

        hour:"2-digit",
        minute:"2-digit",

        // dayPeriod:'short'
    }).format(date);

    return formatDate
}

function alertBs(msg,title,timeout){
    timeout = timeout || null
    title = title || 'Aviso'
    const toastElement = document.getElementById('msgToast')
    toastElement.querySelector('#toast-body-msg').innerHTML = ''
    toastElement.querySelector('#msgToastTitle').innerText = ''
    const toast = new bootstrap.Toast(toastElement)
    toastElement.querySelector('#toast-body-msg').innerHTML = msg
    toast.show()
    window.scrollTo(0,0)
    if (timeout){
        setTimeout(() => {
            toast.hide()
        }, timeout);
    }
    if (title){
        toastElement.querySelector('#msgToastTitle').innerText = title
    }
}