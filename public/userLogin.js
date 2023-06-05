window.onload = function(){
    const searchParams = new URLSearchParams(window.location.search);
    const errMessage = searchParams.get('error');

    if(errMessage){
        const alertBox = document.createElement('div');
        alertBox.classList.add('alert','alert-danger');
        alertBox.textContent = "Invalid username or password";
        document.querySelector('#error-message').appendChild(alertBox);
    }
    // else{
    //     document.querySelector('#error-message').innerHTML = "Invalid username or password";
    // }
    initLoginForm()
}



async function initLoginForm() {
    const form = document.getElementById('login-form')
    form.addEventListener('submit', async function (e) {
        e.preventDefault()
        const formObject = {}
        formObject.username = form.username.value
        formObject.password = form.password.value
        form.reset()
        const resp = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formObject),
        })

        respStatus = resp.status;
        console.log(resp)
        if (respStatus === 200) {
            window.location = '/userInfo.html'
            console.log('success login')
        } else if (respStatus === 401) {
            // const errMessage = (await resp.json()).message
            // alert(errMessage)
            console.log('failed login')
        }        
    })
  }

