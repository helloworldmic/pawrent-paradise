import express from 'express';
import {client} from './app';


export const searchRoutes = express.Router()

searchRoutes.get('/searchShop',async(req,res)=>{
    console.log(req.query)
    const queryResult = (await client.query(`SELECT * from shops 
        LEFT JOIN images 
        ON shops.id = images.shop_id
        WHERE images.id in (SELECT MIN(id) from images group by shop_id)
        and lower(shop_name) like lower ($1)`,[`%${req.query.searchName}%`]))
            .rows
    console.log(queryResult);
    
    res.json(queryResult)
})


