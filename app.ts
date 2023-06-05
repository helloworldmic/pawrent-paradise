import express from 'express'
import expressSession from 'express-session'
import pg from 'pg';
import path from "path";
import { isLoggedIn } from './guards';
import { userRoutes } from './userRoutes'
import { homePageRoutes } from './homePageRoutes'
import { shopRoutes } from './shopRoutes'
import dotenv from 'dotenv';
dotenv.config();
import grant from 'grant';
import { reviewRoutes } from './reviewRoutes'  // added post-james-->can use later
import { searchRoutes } from './searchShopRoutes'
//import { Server as SocketIO } from "socket.io";
//import http from "http";

export const tables = Object.freeze({
  USER: "users",
  SHOP: "shops",
  reviews: "reviews",
  review_images: "review_images",

});

export interface Shop {
  id: number;
  content: string;
  image?: string;
}

//   interface User {
//     id: number;
//     username: string;
//     password: string;
//   }

const app = express();
// const server = new http.Server(app);
// export const io = new SocketIO(server);

// io.on("connection", (socket) => {
//   // ...
//   console.log(`[INFO] socket: ${socket.id} is connected`);
// });


const grantExpress = grant.express({
  "defaults": {
    "origin": "http://localhost:8080",
    "transport": "session",
    "state": true,
  },
  "google": {
    "key": process.env.GOOGLE_CLIENT_ID || "",
    "secret": process.env.GOOGLE_CLIENT_SECRET || "",
    "scope": ["profile", "email"],
    "callback": "/login/google"
  }
});

const PORT = 8080;
app.use(expressSession({
  secret: 'how to write the content is up to you',
  resave: true,
  saveUninitialized: true
}));

app.use(grantExpress as express.RequestHandler);

export const client = new pg.Client({
  database: process.env.DB_NAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
});

client.connect();


app.get('/test', (req, res) => {
  res.json({ message: "123" })
})

app.get("/get-username", async (req, res) => {
  if (req.session['user']) {
    res.json({ result: true, username: req.session['user'].username });
    return;
  }
  res.json({ result: false });
});



app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  console.log(`req.path ${req.path}`)
  next();
})
//for testing , reviewRoute must before loggin 
app.use(reviewRoutes) // added post-james OR app.use('/review', reviewRoutes) 
app.use(searchRoutes)
app.use('/shops', shopRoutes)
app.use(homePageRoutes)
app.use(express.static(path.join(__dirname, "public")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/', userRoutes);
app.use(isLoggedIn, express.static(path.join(__dirname, "protected")));

app.listen(PORT, () => {
  console.log(`listening to PORT ${PORT}`)
})