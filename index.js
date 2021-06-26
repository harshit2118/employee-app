var express=require('express');
const {Client}=require('pg');
var app=express();
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});
const port=process.env.PORT||2450;
let insertData=require('./db').insertIntoTable;
let deleteEmployee=require('./db').deleteEmployees;
let updateEmployee=require('./db').updateEmployee;
let getAllEmployees=require('./db').getAllEmployees;
let resetTable=require('./db').initialState;

//Establishing Connection
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
/**************REST API's**********************/
//GET
//FOR GETTING NO OF EMPLOYEES
app.get('/showEmp',async (req,res)=>{
    try{
        const arr=await getAllEmployees(client);
        console.log(arr);
        console.log("Hello employees");
        let gender=req.query.gender;
        let department=req.query.department;
        let designation=req.query.designation;
        let sortBy=req.query.sortBy;
        let salary=req.query.salary;
        let page=req.query.page;
        let outArr=arr;
        if(!page){
            page=1;
        }
        if(gender){
            outArr=outArr.filter(x=>x.gender===gender);
        }
        if(department){
            let arr=department.split(",");
            console.log(arr);
            outArr=outArr.filter(x=>arr.find(x2=>x2===x.department));
        }
        if(designation){
            let arr=designation.split(",");
            console.log(arr);
            outArr=outArr.filter(x=>arr.find(x2=>x2===x.designation));
        }
        if(salary){
            salary=="<15000"?outArr=outArr.filter(x=>x.salary<15000):
            salary=="15-25000"?outArr=outArr.filter(x=>x.salary>=15000&&x.salary<=25000):
            outArr=outArr.filter(x=>x.salary>25000);
        }
        if(sortBy){
            sortBy==="salary"?outArr.sort((x,y)=>parseInt(x[sortBy])-parseInt(y[sortBy]))
            :outArr.sort((x,y)=>x[sortBy].localeCompare(y[sortBy]));
        }
        let resArr=pagination(outArr,page);
        res.json({
            page:page,
            items:resArr,
            totalItems:resArr.length,
            totalNum:outArr.length
        });
    }
    catch(e){
        console.log(e);
        res.status(500).send("Error");
    }
});
//FOR GETTING ONE EMPLOYEE
app.get("/employee/:id",async (req,res)=>{
    try {
        const arr=await getAllEmployees(client);
        let id=req.params.id;
        let emp = arr.find(x=>x.id==id);
        if(emp){
            res.send(emp);
        }
        else{
            res.status(400).send("Employee Doesn't Exist!!!");
        }
    } catch (e) {
        console.log(e);
        res.status(500).send("Error");
    }
});
//FOR GETTING INITIAL STATE
app.get('/initialState',(req,res)=>{
    console.log("Hello");
    resetTable(client);
});
//POST 
//FOR ADDING EMPLOYEE
app.post('/addEmp',async(req,res)=>{
    try {
        const arr=await getAllEmployees(client);
        let data=req.body;
        let {id,name,gender,department,designation,salary}=data;
        let employee=`'${id}','${name}','${gender}','${department}','${designation}',${salary}`;
        let emp=arr.find((x)=>(x.id==data.id||x.name==data.name));
        if(!emp){
            insertData(client,employee);
            res.send(data);   
        }
        else{
            res.status(400).send("Employee already exist!!!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error"); 
    }
});
//PUT
//FOR UPDATING EMPLOYEE
app.put("/editEmployee/:id",async (req,res)=>{
    console.log("I am in PUT API");
    try {
        const arr=await getAllEmployees(client);
        let empId=req.params.id;
        const updatedArr=req.body;
        let {id,name,gender,department,designation,salary}=updatedArr;
        let setParam=`name='${name}',gender='${gender}',department='${department}',designation='${designation}',salary=${salary}`;
        let whereParam=`id='${empId}'`;
        let index = arr.findIndex((x)=>x.id===id);
        if(index>=0){
            updateEmployee(client,setParam,whereParam);
            res.send(updatedArr);
        }
        else{
            res.status(404).send("Customer not found!!!");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
});
//DELETE
//FOR DELETING EMPLOYEE
app.delete('/removeEmp/:id',async (req,res)=>{
    try {
        const arr=await getAllEmployees(client);
        let id=req.params.id;
        let emp=arr.find(x=>x.id===id);
        if(emp){
            deleteEmployee(client,id);
            res.send("Employee name "+emp.name+" having id "+emp.id+" is removed");
        }
        else{
            res.status(404).send("Employee not found!!!");
        }  
    } catch (error) {
        console.log(error);
        res.status(500).send("Error");
    }
});
let pagination=(obj,page)=>{
    const totalLength=obj.length;
    const perPage=5;
    let resArr=obj;
    resArr=resArr.slice(page*perPage-perPage,page*perPage);
    return resArr;
};
app.listen(port,()=>console.log("Server is running on port ",port));