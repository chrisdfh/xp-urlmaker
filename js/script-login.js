document.addEventListener('DOMContentLoaded', function() {
    document.forms[0].reset()
    checkInputs()
    const ld = getCookie('ld')
    if (ld){
        const loginData = JSON.parse(ld)
        console.log('ya estaba logeado')
        console.log(loginData)
    }

})

async function login(form){
    const data = JSONfromForm(form)
    
    const loginUrl = `${xitypayApi2}/xpay_cuenta/login/${data.ciaopr}`
    
    const fetchOptions = {
        method: 'POST', // *GET, POST, PUT, DELETE
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data), // body data type must match 'Content-Type' header
        headers: {
            'Content-Type': 'application/json' // application/x-www-form-urlencoded
        }
    }
    const response = await fetch(loginUrl,fetchOptions)
    if (response.ok){
        const loginData = await response.json()

        const decodedLogin = jwtDecode(loginData.token)
        console.log(decodedLogin.usuario.codnip, data.codnip_usuario)
        if (md5(decodedLogin.usuario.codnip) == data.password.trim()){
            alert('Debe Cambiar su Contraseña')
            changePassword(decodedLogin,data.password)
            return
        }


        loginSelectionClient(decodedLogin)

        setCookie('xpr',JSON.stringify(loginData.token),1)
        localStorage.setItem('xpr',JSON.stringify(loginData.token))
        // window.location.href = "/pagos/formaenvio.html"
        // console.log(loginData)
    } else {
        alertBs('Usuario o contraseña incorrectos')
    }
}

function JSONfromForm(form){
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key)=>{
        obj[key] = value
    })
    obj['ciaopr']='1'
    obj['alias'] = `${obj['tipnip_usuario']}${obj['codnip_usuario']}`
    if (obj['password'].trim() !== "" && obj['password'].trim().length > 4) {
        obj['password']=md5(obj['password'].trim())
        return obj
    }

    obj['password'] = ''


    return obj
}

function checkInputs(){
    const loginBtn = document.querySelector("#btnLogin")
    let error=false
    const inputData = JSONfromForm(document.forms[0])


    for (const [key, value] of Object.entries(inputData)){
        if (value === "") error = true
    }

    if (!error) {
        loginBtn.removeAttribute("disabled")
        return
    }
    
    loginBtn.setAttribute("disabled", "true")
}


function changePassword(login,pwd){
    console.log(login)
    const form = document.createElement("form")
    form.setAttribute("method", "POST")
    form.setAttribute("action", "/pagos/cambiarcontrasena.html")
    form.innerHTML = `
    <input type="hidden" name="ciaopr" value="${login.usuario.ciaopr}">
    <input type="hidden" name="username" value="${login.usuario.alias}">
    <input type="hidden" name="password" value="${pwd}">
    `

    document.body.appendChild(form)
    form.submit()
}




