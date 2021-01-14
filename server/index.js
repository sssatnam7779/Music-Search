const express =require("express")
const bp=require("body-parser")
const cors=require("cors")
const con = require("./db/db.js")


const app=express()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.post("/tracks",(req,res) => {
    console.log(req.json);    
    const {playlist_id,title,uri,master_id} = req.body;
    con.connect((err,client,release) => {
        if(err) throw err;
        client.query(`INSERT INTO track(playlist_id,title,uri,master_id) VALUES(
            '${playlist_id}','${title}','${uri}','${master_id}')`,
            (err,result) =>{
            release();
            if(err) throw err;
            res.send({"msg":"Record Saved"});
        })
    });    
});

app.get("/tracks",(req,res)=>{
    con.connect((err,client,release) => {
        if(err) throw err;
        client.query("select t.id,t.title as title,p.title as genere,uri,master_id,creation_date from track t inner join playlist p on t.playlist_id=p.id",(err,result) =>{
            release();
            if(err) throw err;
            res.send(result.rows);
        })
    });            
});

app.delete("/tracks/:id",(req,res)=>{
    con.connect((err,client,release) => {
        if(err) throw err;
        client.query(`DELETE FROM track WHERE id=${req.params.id}`,(err,result) =>{
            release();
            if(err) throw err;
            res.send({"msg":"Record deleted successfully"});
        })
    });    
});

app.get("/tracks/:id",(req,res)=>{
    con.connect();
    con.query(`SELECT * FROM track WHERE id=${req.params.id}`,(err,result)=>{
        if(err) {
            throw err;
        }
        else if(result.length==0){
            res.send({
                "msg":"Record not found"
            });
        }
        else{
            res.send(result.rows);        
        }        
    });
});


app.listen(3001,()=>console.log("server running.."));

