// for banner
var slideIndex = 1;
showDivs(slideIndex);
function plusDivs(n) {
  showDivs((slideIndex += n));
}
function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("mySlides");
  if (n > x.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex - 1].style.display = "block";
}
//----------------------AJAX from post&get-----------------------------------
let shop_id; //global variable

window.onload = async () => {
  await loadReviewData();
  initReviewForm();
};

function initReviewForm() {
  const form = document.getElementById("review-form");
  const current_url = window.location.href;
  const url = new URL(current_url);
  let shop_id = url.searchParams.get("shop_id");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    // 盡量不用:const form = event.target;event.currentTarget
    const formData = new FormData();

    formData.append("reviewText", form.reviewText.value);
    console.log(form.reviewImage.files);
    // console.log(JSON.stringify(a));

    for (let i = 0; i < form.reviewImage.files.length; i++) {
      let file = form.reviewImage.files[i];
      formData.append("uploads", file);
    }
    //m2: doesn't work w/ forEach & map
    // form.reviewImage.files.forEach((file) => {
    //   formData.append("uploads", file);
    // });
    //m1: work
    // formData.append("uploads", form.reviewImage.files[0]); //form.reviewImage.files[0]
    // formData.append("uploads", form.reviewImage.files[1]);

    formData.append("shop_id", shop_id);
    form.reset();
    const resp = await fetch("/review", {
      method: "POST",
      //headers:{'Content-Type': 'application/json'},
      headers: { enctype: "multipart/form-data" },
      // body: JSON.stringify(formObj)
      body: formData,
    });
    if (resp.status === 200) {
      console.log("ok");
      loadReviewData(); // added post-james
    }
  });
}

async function loadReviewData() {
  console.log("enter loadreviewData");
  const current_url = window.location.href;
  const url = new URL(current_url);
  shop_id = url.searchParams.get("shop_id");
  console.log(shop_id);
  const resp = await fetch(`/shops/${shop_id}`);
  const data = await resp.json();
  console.log(data);
  const shop = data.shop;
  const reviews = data.reviews;
  console.log(shop);
  console.log(reviews);
  let htmlStr = ``;
  if (resp.status == 200) {
    for (const review of reviews) {
      let imageHtml = "";
      review.images.forEach((image, index) => {
        imageHtml += `
          <div class="carousel-item ${index == 0 ? "active" : ""}">
              <img src="/uploads/${image.url}" class="d-block w-100" alt="...">
              <div class="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>Some representative placeholder content for the first slide.</p>
              </div>
          </div>
        `;
      });
      const image = review.image
        ? `<img src="/uploads/${review.image} alt="" srcset="">`
        : ``;
      htmlStr += /*HTML*/ `
        <div id='review-${review.id}' class="review" contenteditable='true'>
        <div class="panel-body">
                    <!-- past review & comment (former) Newsfeed Content -->
                    <!--======================================================================-->
                    <div class="media-block">
                        <a class="media-left" href="#"><img class="img-circle img-sm" alt="Profile Picture"
                                src="https://bootdey.com/img/Content/avatar/avatar1.png"></a>
                        <div class="media-body">
                            <div class="mar-btm">
                                <a href="#" class="btn-link text-semibold media-heading box-inline">${review.user_id}</a>
                                <p class="text-muted text-sm"><i class="fa fa-mobile fa-lg"></i> - From Mobile - 11 min
                                    ago</p>
                            </div>
                            <p>${review.review_text}</p>
                            <!--------------------- carousel------------------------------------------------- -->
                            <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-indicators">
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0"
                                        class="active" aria-current="true" aria-label="Slide 1"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
                                        aria-label="Slide 2"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
                                        aria-label="Slide 3"></button>
                                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3"
                                        aria-label="Slide 4"></button>
                                </div>
                                <div class="carousel-inner">
                                  ${imageHtml}
                                </div>
                                <button class="carousel-control-prev" type="button"
                                  data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                  <span class="visually-hidden">Previous</span>
                              </button>
                              <button class="carousel-control-next" type="button"
                                  data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                  <span class="visually-hidden">Next</span>
                              </button>
                            </div>  
                            <!----------------- carousel ended---------------------------------------- -->
                            <div class="pad-ver">
                                <div class="btn-group">
                                    <a class="btn btn-sm btn-default btn-hover-success" href="#"><i
                                            class="fa fa-thumbs-up"></i></a>
                                    <a class="btn btn-sm btn-default btn-hover-danger" href="#"><i
                                            class="fa fa-thumbs-down"></i></a>
                                </div>
                                <a class="btn btn-sm btn-default btn-hover-primary" href="#">Comment</a>
                            </div>
                            <hr>
                            <!-- 2 Comments ------------:aka reply the above review (can add back later)-->
                        </div>
                    </div>    
                    <!--===================================================-->
                    <!-- End Newsfeed Content -->
                </div>
        </div>
  `;
    }
  }
  // const shop = (await resp.json()).data;
  // console.log(shop);

  // let htmlStr = ``;
  // for (const review of reviews) {
  //   const image = review.image
  //     ? `<img src="/uploads/${review.image} alt="" srcset="">`
  //     : ``;
  //   htmlStr += /*HTML*/ `
  // <div id='review-${review.id}' class="review" contenteditable='true'>
  // ${review.content}
  // ${image}
  // // <div class ="trash-button" onclick="deleteReview(${review.id})">
  // // <i class="fas fa-trash"></i>
  // // </div>
  // // <div class="edit-button" onclick="editReview(${review.id})">
  // // <i clas="fas fa-edit"></i>
  // // </div>
  // </div>
  // `;
  // }
  document.getElementById("review-container").innerHTML = htmlStr;
}

// loadReviewData();

// Reemo
// const arr = [1, 2, 3, 4, 5];
// const cBox = document.getElementById("cBox");

// for (let v of arr) {
//   cBox.innerHTML += `
//     <div>
//     <h1>${v}</h1>
//     <h1>${v}</h1>
//     <hr>
//     </div>
//     `;
// }
