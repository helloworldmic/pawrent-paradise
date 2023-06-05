// window.onload = async () => {
//     const socket = io.connect();
//     await loadShopData();
//     initShopForm();
//     await initLoginForm();

//     socket.on('new-shop', () => {
//         loadshopData()
//     })
// }

// async function initLoginForm() {
//     const form = document.getElementById('login-form');

//     form.addEventListener('submit', async function (e) {
//         e.preventDefault()
//         const formObject = {}
//         formObject.username = form.username.value
//         formObject.password = form.password.value
//         form.reset()

//         const resp = await fetch('/login', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formObject),
//         })
//         if (resp.status === 200) {
//             window.location = '/admin.html'
//         } else if (resp.status === 400) {
//             const errMessage = (await resp.json()).message
//             alert(errMessage)
//         }
//     })

// const form2 = document.getElementById('logout-form');

// form2.addEventListener('submit', async function (e) {
//     e.preventDefault()
//     const resp = await fetch('/logout');

//     console.log(resp);
//     window.location = resp.url;
// })

//     const resp = await fetch('/review.html');

//     if (!(await resp.json()).result) {
//         // hvn't login
//         form.classList.remove('hidden');
//         return;
//     } else {
//         form2.classList.remove('hidden');
//     }

// }

//GET
async function loadShopData() {
  console.log("showing!!!");
  // fetch -> HTTP Request (Method: GET + Path: /shops)
  const resp = await fetch("/shops");
  const shops = (await resp.json()).data;
  console.log(shops);

  let htmlStr = `<div class="shop">
    <div class="col-lg-12">
    <div class="card-group">`;
  for (const shop of shops) {
    // const image = shop.image
    //     ? `<img src="/images/${shop.image}" alt="" srcset="">`
    //     : ``
    htmlStr +=
      /*HTML*/
      `
        <div class="col-lg-3">
            <div class="card">
                <img class="card-img-top" src="./shop_image/bob_paradise.jpg" alt="Card image cap">
                <div class="card-body">
                    <div id="shop-${shop.id}">
                        Shop Name: ${shop.shop_name} <br>
                        Description: ${shop.description} <br>
                        Address: ${shop.address}
                    </div>
                    <div class="trash-button" onclick="deleteShop(${shop.id})">
                        <i class="fas fa-trash"></i>
                    </div>
                    <div class="edit-button" onclick="editShop(${shop.id})">
                    <i class="fas fa-edit"></i>
                    </div>
                </div>
            </div>
        </div>
        `;
  }
  htmlStr += `</div></div></div>`;
  document.querySelector(".shop-container").innerHTML = htmlStr;
}
loadShopData();

//DELETE
// async function deleteShop(mid) {
//     const resp = await fetch(`/shops/${mid}`, {
//         method: 'DELETE',
//     })
//     if (resp.status === 200) {
//         loadShopData()
//     }
// }

// //UPDATE
// async function editShop(mid) {
//     const shop = document.getElementById(`shop-${mid}`)
//     console.log(shop.textContent,mid)
//     const data = { content : shop.textContent };

//     const resp = await fetch(`/shop/${mid}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(data),
//     })
//     if (resp.status === 200) {
//         loadShopData()
//     }
// }
// }
