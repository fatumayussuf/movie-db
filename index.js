import express from 'express';
import {MongoClient, ObjectId} from "mongodb"
 import 'dotenv/config'
 import { fileURLToPath } from "url";

let app = express();
let port = 2000 ;

//Set templating engine
app.set("views","./views");
app.set("view engine","pug");

//Set static assets
app.use(express.static("public"));

//Body parser
app.use(express.urlencoded({extended:true}));


let uri=`mongodb+srv://fatumayussuf:${process.env.MONGODB_PASSWORD}@cluster0.r1xw2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
let client = new MongoClient(uri)

let db= client.db ("movies");
    let collection =db.collection("movies");

// home route
// app.get('/' ,async (req , res)=>{
    

//     let movies= await collection.find().toArray();

//     res.send(movies);
// });
// individual movie 
app.get ("/movies/:id", async (req, res)=>{
    let id =req.params.id;
    let movie =await collection.findOne({_id: new ObjectId(id) });

    res.json(movie);
});

// route for filtering movies by genre

app.get('/movies' ,async (req, res)=>{
    // get the query params if any e.g   ?genre=action
    let query= req.query;

    let genre=query.genre;

    if(genre){

    console.log({query});
   

    let movies= await collection.find({genre: genre}).toArray();

    res.json (movies);
}
    else{
    
     let movies= await collection.find().toArray();
               res.send(movies);

    }
})

app.listen(port, ()=> console.log(`server started at port ${port}`));
// title , genre , rating, poster , year, length, actors, director