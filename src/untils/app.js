import cookie from 'cookie_js'

export function getToKen(){
    return cookie.get('login')
}

export function setToKen(value){
    return cookie.set('login',value)
}

export function remToKen(){
    return cookie.remove('login')
}