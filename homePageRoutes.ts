import express from 'express'
import dotenv from "dotenv";
import {client} from './app';

dotenv.config();

export const homePageRoutes = express.Router()

homePageRoutes.get('/shopsPictures',async(req,res)=>{
    const shopList = await client.query(`SELECT * from shops 
    LEFT JOIN images 
    ON shops.id = images.shop_id
    WHERE images.id in (
        SELECT MIN(id) from images group by shop_id
    );`)
    const shopData = shopList.rows
    res.json(shopData)
})
