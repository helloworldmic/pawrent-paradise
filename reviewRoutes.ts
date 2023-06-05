//former name:on-lecture-下multer.ts
import express from 'express'
import dotenv from "dotenv";
dotenv.config();
import path from 'path'
import { client } from './app'; // former: import { Client } from "pg";
// import { readJsonConfigFile } from 'typescript'
// import jsonfile from 'jsonfile'
import multer from 'multer'

const tables = Object.freeze({
  reviews: "reviews",
  review_images: "review_images",
});

type ReviewImage = {
  id: number,
  url: string,
  review_id: number,
  filename?: string | string[] | undefined; // or filename?:string
}
type Review = {
  id: number;
  shop_id: number;
  user_id: number;
  review_text: string
  // ReviewImage: {}
}
// post-james':  no need (but why😖)
// const app = express()
// app.use(express.urlencoded({ extended: true }))
// app.use(express.json())
export const reviewRoutes = express.Router()
//----------------------------------------------------------------------------------

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('./public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.${file.mimetype.split('/')[1]}`);
  }
})
const upload = multer({ storage })

//----------------------------------------------------------------------------------
// const client = new Client({
//   database: process.env.DB_NAME,
//   user: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
// });
// client.connect();

//GET  work the same way as shopRoute('/shops/:shop_id), but need to keep
reviewRoutes.get('/review/:shop_id', getReviews); // post-james, changed from app.get

async function getReviews(req: express.Request, res: express.Response) {

  const queryResult = await client.query(`SELECT * FROM ${tables.reviews} WHERE shop_id = $1 ORDER BY id DESC`, [req.params.shop_id]);
  // 🌟🌟alvin added: WHERE shop_id = $1 (before  ORDER BY id DESC`),[req.params.shop_id]);
  const reviews = queryResult.rows;

  for (let index = 0; index < reviews.length; index++) {
    const review = reviews[index];
    const queryReviewImage = await client.query(`SELECT * FROM ${tables.review_images} WHERE review_id = $1 ORDER BY id DESC`, [review.id]);
    const reviewImages = queryReviewImage.rows
    reviews[index]['images'] = reviewImages
    // reviews[index]['images'] = JSON.stringify(reviewImages)
  }


  //shouldn't use forEach as it can't update reviews before forEach and only update the one after 
  // reviews.forEach(async review => {
  //   const queryReviewImage = await client.query(`SELECT * FROM ${tables.review_images} WHERE review_id = $1 ORDER BY id DESC`, [review.id]);
  //   review['images'] = []
  //   if (queryReviewImage.rowCount > 0) {
  //     const reviewImages = queryReviewImage.rows
  //     // review['images'] = JSON.stringify(reviewImages)
  //     review['images'] = reviewImages
  //     // console.log(review)
  //   }
  // });

  console.log(reviews)

  res.json({ data: reviews });
}




//post
reviewRoutes.post("/review", upload.array("uploads", 6), async function (req, res) {
  console.log(req.files, "<--req.files")
  console.log(req.body, "<--req.body")

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {

      let imagesPerReview = []
      let filename = req.files[i].filename
      imagesPerReview.push(filename)
    }
    const reviewText = req.body.reviewText; //ok
    const shop_id = req.body.shop_id
    const userId = req.session['user']['id']   //by janet
    console.log("reviewText--->", reviewText);
    console.log("shopId---> ", shop_id,);//by janet
    console.log("userId--->", userId) //by janet
    const imagesPerReview = Array.from(req.files as { filename: string }[]).map(file => file.filename)
    console.log(imagesPerReview)
    console.log(`shop_id : ${shop_id}`)

    if (!shop_id || !userId) {
      return res.status(400).json({ message: "missing shopId or userId" });
    } else {

      try { //added userIDid by janet
        const insertReviewText = await client.query<Review>(/*sql*/ `INSERT INTO ${tables.reviews} (shop_id,user_id,review_text)VALUES($1,$2,$3) RETURNING * `, [shop_id, userId, reviewText])
        const insertReviewId = insertReviewText.rows[0].id
        console.log(insertReviewId)
        imagesPerReview.forEach(async image => {
          const reviewImage = await client.query<ReviewImage>(/*sql*/ `INSERT INTO ${tables.review_images} (url,review_id) VALUES($1,$2) RETURNING * `, [image, insertReviewId])
          console.log(reviewImage)
        });
        res.json({ message: "success" });
      } catch (err) {
        return res.status(400).json({ message: "internal error" })
      }
    }
    return res.status(400).json({ message: "internal error" })
  }

  return;
})







  // if (req.files) {
  //   for (let i = 0; i < req.files.length; i++) {

  //     let imagesPerReview = []
  //     let filename = req.files[i].filename
  //     imagesPerReview.push(filename)
  //   }
  // }
  // else {
  //   res.json({ message: 'error in post route /review' });

  // }
// })



//----------------------MUST NOT HAVE IN HERE NOW!!!!-------------------------------------
// app.use(express.static(path.join(__dirname, 'public')))

// const PORT = 8080
// app.listen(PORT, () => {
//   console.log(`listening to ${PORT}`)
// })






// app.post('/review', upload.single('profile'), async (req, res) => {
//   console.log(req.body) // form tag
//   console.log(req.file) // file info, not from req.body
//   const reviews: Review[] = await jsonfile.readFile(path.join(__dirname, 'datasets', 'reviews.json'))
//   reviews.push({ id: reviews.length + 1, name: req.body.studentName, filename: req.file?.filename })
//   await jsonfile.writeFile(path.join(__dirname, 'reviews.json'), reviews)
//   res.redirect('/home.html')
// })  // former route: students (fr wsp07)


