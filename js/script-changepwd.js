
function JSONfromForm(form){
    const data = new FormData(form)
    const obj = {}
    data.forEach((value, key)=>{
        obj[key] = value
    })
    return obj
}

async function changePwd(form){
    const changePwdBtn = document.querySelector('#btnLogin')
    const data = JSONfromForm(form)
    console.log(data)
    if (data.new_password.trim()===data.codnip_usuario.trim()){
        alertBs('La nueva contraseña no puede ser su documento de identidad')
        return
    }
    if (md5(data.new_password.trim())===data.password.trim()){
        alertBs('La nueva contraseña no puede igual a la anterior')
        return
    }
    if(data.new_password !== data.renew_password){
        alertBs('Las contraseñas no coinciden')
        return
    }


    changePwdBtn.setAttribute('disabled',true)
    changePwdBtn.querySelector('#regSpinner').classList.remove('d-none')

    const payload = {
        ciaopr:'1',
        username:`${data.tipnip_usuario}${data.codnip_usuario}`,
        password:data.password.trim(),
        new_password:md5(data.new_password.trim()),
        renew_password:md5(data.renew_password.trim())
    }

    const url = `${xitypayApiLogin}/api-login/passwd/${payload.ciaopr}`

    const fetchOptions = {
        method: 'PUT', // *GET, POST, PUT, DELETE
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(payload), // body data type must match 'Content-Type' header
        headers: {
            'Content-Type': 'application/json' // application/x-www-form-urlencoded
        }
    }
    const response = await fetch(url,fetchOptions)
    const respJson = await response.json()

    changePwdBtn.removeAttribute
    changePwdBtn.querySelector('#regSpinner').classList.add('d-none')

    if (respJson.mensaje == 'Password cambiado exitosamente'){
        alert(respJson.mensaje)
        window.location.href = '/login'
    } else {
        alert('Error al cambiar la contraseña, intente nuevamente')
    }



    
}    
const showPwBtn = document.querySelector('#show-pw')
showPwBtn.addEventListener('click',toggleShowPw)
const showPwBtn2 = document.querySelector('#show-pw2')
showPwBtn2.addEventListener('click',toggleShowPw)

function toggleShowPw(e){
    const btnIcon = showPwBtn.querySelector('i')
    const btnIcon2 = showPwBtn2.querySelector('i')
    if (document.querySelector('#new_password').type == 'password'){
        btnIcon.classList.remove('fa-eye')
        btnIcon.classList.add('fa-eye-slash')
        btnIcon2.classList.remove('fa-eye')
        btnIcon2.classList.add('fa-eye-slash')
        document.querySelector('#new_password').type = 'text'
        document.querySelector('#renew_password').type = 'text'
    }else{
        btnIcon.classList.remove('fa-eye-slash')
        btnIcon.classList.add('fa-eye')
        btnIcon2.classList.remove('fa-eye-slash')
        btnIcon2.classList.add('fa-eye')
        document.querySelector('#new_password').type = 'password'
        document.querySelector('#renew_password').type = 'password'
    }
}