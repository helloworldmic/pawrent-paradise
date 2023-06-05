import express from 'express';
import dotenv from "dotenv";
dotenv.config();
import {client} from '../app';

const ratingRoutes = express.Router()

ratingRoutes.post('/ratings',async(req,res)=>{
    const rating = req.body.rating;
    const shopId= req.body.shop_id;
    console.log(shopId, "<--shopId");
    const userId = req.session['user']['id'];
    console.log(userId, "<--userId");
    if(rating < 1 || rating < 5){
        res.json({success:false})
        return
    }
    const queryResult =(await client.query(`insert into ratings (rating,user_id,shop_id) VALUES ($1,$2,$3)`,[rating,userId,shopId])).rows
    console.log(queryResult)
    res.json({success:true})
})