const { request } = require("express")

window.onload = async() =>{
    logoutFunction()
}


async function logoutFunction() {
    const resp = await fetch('/check login')
    const result = await resp.json()
    if(result.status){
        
    }
}