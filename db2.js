var express =require('express');
var employeeList=require('./employeeData').empData;
var app=express();
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});
var {Client}=require('pg');
const client=new Client({
    user:"cvprwocukbfbju",
    password:"9a6810348dea9eba35fe4bcf837d26d0898bdf8c15a102b51bb364c75e5d965c",
    database:"d3nm7ksem2sapu",
    port:5432,
    host:"ec2-35-169-188-58.compute-1.amazonaws.com",
    ssl:{rejectUnauthorized:false}
});
client.connect((res,err)=>{
    console.log("postgres Database Connected");
});
app.get("/users",(req,res,next)=>{
    console.log("Inside /user get api");
    const q1=`SELECT * FROM employees`;
    client.query(q1,(err,result)=>{
        if(err){
            res.status(400).send(err);
        }
        res.send(result.rows);
        client.end();
    });
});
app.post("/users",(req,res,next)=>{
    employeeList.forEach((x)=>{
        let q1=`INSERT INTO employees VALUES ('${x.id}','${x.name}','${x.gender}','${x.department}','${x.designation}',${x.salary})`;
        client.query(q1,(err,result)=>{
            if(err)throw err;
            else{
                console.log("Employee Added");
            }
        });
    });
    res.send("Employee added");

    //const q1=`DROP TABLE employees`;
    //client.query(q1,(err,result)=>{
    //    if(err){
    //        res.status(400).send(err);
    //    }
    //    res.send(`Table Drop Successfully`);
    //    client.end();
    //});
});
const port=process.env.PORT||2451;
app.listen(port,()=>console.log("Server is running on port ",port));