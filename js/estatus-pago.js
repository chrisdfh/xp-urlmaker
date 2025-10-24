const checkUpdateIntervals=[1500,1500,3000,3000]

const checkUrl = `${xitypayApi}/transaction/1/`

async function checkTransaction(id){
    const url = `${checkUrl}${id}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

function setDOM(id,value){
    document.getElementById(id).innerText = value
}
function setAllDOM(id,value){
    document.querySelectorAll(`#${id}`).forEach(el => el.innerText = value)
}

var tries=0
async function chekStatus(id) {
    tries++
    const transaction = await checkTransaction(id);

    if (!(transaction.status === 'ACCP' || transaction.status === 'RJCT')) {
        if (tries < checkUpdateIntervals.length) {
            console.log(`esperando ${checkUpdateIntervals[tries]} el intento numero ${tries}`)
            setTimeout(() => {
                chekStatus(id,false)
            },(checkUpdateIntervals[tries]))
            return
        }
        transaction.status='PEND'
        transaction.rejected_code='PEND'
    }
    document.getElementById(transaction.status).classList.remove('d-none')
    document.querySelectorAll(`.${transaction.status}`).forEach(el => el.classList.remove('d-none'))
    // setAllDOM('rejected_code',codigosRechazo[transaction.rejected_code])
    setAllDOM('rejected_code',transaction.status_msg)

    document.getElementById('checkStatus').classList.add('d-none')
    document.getElementById('result').classList.remove('d-none')
}

function refreshStatus(){
    document.getElementById('checkStatus').classList.remove('d-none')
    document.getElementById('result').classList.add('d-none')

    document.querySelectorAll(`.PEND`).forEach(el => el.classList.add('d-none'))
    document.querySelectorAll(`#PEND`).forEach(el => el.classList.add('d-none'))
    document.querySelector('#PEND #rejected_code').classList.add('d-none')
    // document.querySelector('#segundo_pendiente').innerText='Si todavía aparece pendiente, habla con un supervisor.'

    document.querySelectorAll('.refresh_link').forEach(el => el.remove())

    // document.getElementById('refresh_link').remove()
    tries=0
    startCheck()
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


const codigosRechazo = {
    'WAIT':	'Operación en espera de validación de código',
    'AG09':	'Pago no recibido',
    'AC00':	'Operación en espera de respuesta del receptor',
    'AB01':	'Tiempo de espera agotado',
    'AB07':	'Agente fuera de línea',
    'AC01':	'Número de cuenta incorrecto',
    'AC04':	'Cuenta cancelada',
    'AC06':	'Cuenta bloqueada',
    'AC09':	'Moneda no válida',
    'AG10':	'Agente suspendido o excluido',
    'AM02':	'Monto de la transacción no permitido',
    'AM03':	'Moneda no permitida',
    'AM04':	'Saldo insuficiente',
    'AM05':	'Operación duplicada',
    'BE01':	'Datos del cliente no corresponden a la cuenta',
    'BE20':	'Longitud del nombre inválida',
    'CH20':	'Número de decimales incorrecto',
    'DU01':	'Identificación de mensaje duplicado',
    'ED05':	'Liquidación fallida',
    'FF05':	'Código del producto incorrecto',
    'FF07':	'Código del subproducto incorrecto',
    'RC08':	'Código del banco no existe en el sistema de compensación / liquidación',
    'TKCM':	'Código único de operación de débito incorrecto',
    'TM01':	'Fuera del horario permitido',
    'VE01':	'Rechazo técnico',
    'DT03':	'Fecha de procesamiento no bancaria no válida',
    'TECH':	'Error técnico al procesar liquidación',
    'AG01':	'Transacción restringida',
    'MD09':	'Afiliación inactiva',
    'MD15':	'Monto incorrecto',
    'MD21':	'Cobro no permitido',
    'CUST':	'Cancelación solicitada por el deudor',
    'DS02':	'Operación cancelada',
    'MD01':	'No posee afiliación',
    'MD22':	'Afiliación suspendida',
    'PEND':	'Operación en estatus pendiente.'
}

