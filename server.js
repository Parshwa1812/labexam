const express = require('express')
const cors = require('cors')
const mysql=require('mysql2');

const app = express()
app.use(cors('*'))
app.use(express.json());


const connection=mysql.createConnection({
    host:"localhost",
  user:"root",
  password:"manager",
  database:"dummy_database1"
})

app.get("/books/:author",(request,response)=>
{
    connection.query(`select * from Book_Tb where author='${request.params.author}'`,(error,result)=>
    {
        if(error==null)
        {
            var data=JSON.stringify(result);
            response.send("Table Data - >"+data);

        }
        else
        {
            response.send("Somthing wents Wrong");
        }
    })
})

app.post("/books",(request,response)=>
{
    connection.query(`insert into Book_Tb values(${request.body.id},'${request.body.b_name}','${request.body.author}','${request.body.book_type}',${request.body.price},'${request.body.publishedDate}','${request.body.language}')`,(error,result)=>
    {
        if(error==null)
        {
            response.send("Table Data inserted");
        }
        else
        {
            response.send("Somthing wents Wrong");
        }
    })
})

app.put("/books/:id",(request,response)=>
{
    connection.query(`update Book_Tb set price=${request.body.price},language='${request.body.language}' where id=${request.params.id}`,(error,result)=>
    {
        if(error==null)
        {
            response.send("Table Data Updated");
        }
        else
        {
            response.send("Somthing wents Wrong");
        }    
    })
})

app.listen(4000, '0.0.0.0', () => {
    console.log('server started on port 4000')
  })