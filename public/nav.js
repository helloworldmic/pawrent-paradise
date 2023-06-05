document.addEventListener("DOMContentLoaded", async function () {
  // call api ask server
  // 200 -> log in , 40 -> not log in

  let navStr = `
        <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
        <a class="navbar-brand" href="./index.html">Pawrent Paradise</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll"
            aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarScroll">
            <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 100px;">
            <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="./index.html">Home</a>
            </li>
            <li class="nav-item" id="log-in">
                <a class="nav-link" href="./userLogin.html">Log-in</a>
            </li>
            <li class="nav-item" id="sign-up">
                <a class="nav-link" href="">Sign-up</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="./review.html">Write Review</a>
            </li>
        
             <li class="nav-item" id="profile">
            </li>
            <li class="nav-item" id="log-out">
            <a class="nav-link" href="">Log-out</a>
            </li>
            </ul>
          </li>
            
            </ul>
            <form class="d-flex" id="search-form">
                <input class="form-control me-2" name="searchName" type="search" placeholder="Search the shop" aria-label="Search">
                <button class="btn btn-outline-success" id="searchButton" type="submit">Search</button>
            </form>
        </div>
        </div>
    </nav>
    `;
  document.querySelector("#nav-placeholder").innerHTML = navStr;
  const resp = await fetch("/get-username");
  resp.json().then((data) => {
    let isLoggedIn = data.result;
    let username = data.username;
    if (isLoggedIn) {
      const userBox = document.createElement("a");
      userBox.classList.add("nav-link");
      userBox.href = "userInfo.html";
      userBox.textContent = `${username}`;
      document.querySelector("#profile").appendChild(userBox);
      document.getElementById("log-in").style.display = "none";
      document.getElementById("sign-up").style.display = "none";
    } else {
      document.getElementById("log-out").style.display = "none";
    }
  });

  $("#log-out").click(async function () {
    console.log("You are logged out");
    const resp = await fetch("/logout");
    window.location = "./index.html";
  });

  const searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    window.location = `/search.html?searchName=${searchForm.searchName.value}`;
  });
});
