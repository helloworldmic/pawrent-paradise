import express from 'express';
// import { client, io, shop, tables, upload} from './app';
import { client, tables, Shop } from './app';
export const shopRoutes = express.Router();

// focus one shop to create review
// shopRoutes.post('/:shop_id/review')

//GET
shopRoutes.get('/:id', getShop);
shopRoutes.get('/', getShops); 

async function getShop(req: express.Request, res: express.Response) {
    // Get Shop
    const shop_id = req.params.id
    const sql = `SELECT * FROM shops where id = ${shop_id};`;
    const result = await client.query(sql)

    // Get

    const review_sql = `SELECT * FROM reviews where shop_id = ${shop_id} ORDER BY id DESC`;
    const review_result = await client.query(review_sql);
    const reviews = review_result.rows;

    for (let index = 0; index < reviews.length; index++) {
        const review = reviews[index];
        const queryReviewImage = await client.query(`SELECT * FROM ${tables.review_images} WHERE review_id = $1 ORDER BY id DESC`, [review.id]);
        const reviewImages = queryReviewImage.rows
        reviews[index]['images'] = reviewImages
        // reviews[index]['images'] = JSON.stringify(reviewImages)
    }
    res.json({ shop: result.rows[0], reviews: reviews })
}

async function getShops(req: express.Request, res: express.Response) {
    const queryResult = await client.query<Shop>(`SELECT * FROM ${tables.SHOP} ORDER BY id DESC`);
    const shops = queryResult.rows;
    res.json({ data: shops });
}

//POST
// shopRoutes.post('/index.html', upload.single("image"), postShops);

// export async function postShops(req: express.Request, res: express.Response) {
//     const content = req.body.content;
//     const filename = req.file?.filename;

//     console.log({content,filename})

//     await client.query(/*sql*/ `INSERT INTO ${tables.SHOP} (content, image) VALUES ($1, $2)`, [content, filename]);
//     io.emit("new-shop");
//     res.json({ message: "success" });
// }

//DELETE
// shopRoutes.delete('/shops/:mid', deleteShops);

// export async function deleteShops(req: express.Request, res: express.Response) {
//     const shopID = parseInt(req.params.mid);

//     console.log(shopID);

//     if (isNaN(shopID)) {
//       res.status(400).json({ message: "Invalid shop ID" });
//       return;
//     }
//     await client.query(/*sql*/ `DELETE FROM ${tables.SHOP} WHERE id = $1`, [shopID]);
//     res.json({ message: "success" });
// }

//UPDATE
// shopRoutes.put('/shops/:mid', updateShops);

// export async function updateShops(req: express.Request, res: express.Response) {
//     const id = parseInt(req.params.mid);


//     console.log(id);

//     if (isNaN(id)) {
//         res.status(400).json({ message: "id is not an integer" });
//         return;
//     }
//     await client.query(
//         `UPDATE shops set content = $1, updated_at = NOW() where id = $2`,
//         [req.body.content, id]
//     );
//     // io.to(`user-${req.session["user"].username}`).emit("shop-updated", {
//     //     message: "shop-updated!!",
//     // });
//     //res.json({ success: true });
//     res.json({ message: "success" });
// }
