var express=require('express');
var app=express();
app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});
const port=process.env.PORT||2450;
let arr=require('./employeeData').empData;
let insertData=require('./employeeData').insertData;
let removeEmp=require('./employeeData').removeEmp;
let updateEmp=require('./employeeData').updateArr;
app.get('/showEmp',(req,res)=>{
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
    })
    res.send(outArr);
});
app.get("/employee/:id",(req,res)=>{
    let id=req.params.id;
    let emp = arr.find(x=>x.id==id);
    if(emp){
        res.send(emp);
    }
    else{
        res.status(400).send("Employee Doesn't Exist!!!");
    }
})
app.post('/addEmp',(req,res)=>{
    let data=req.body;
    let emp=arr.find((x)=>(x.id==data.id||x.name==data.name));
    if(!emp){
        insertData(data);
        res.send(data);   
    }
    else{
        res.status(400).send("Employee already exist!!!");
    }
});
app.put("/editEmployee/:id",(req,res)=>{
    let id=req.params.id;
    const updatedArr=req.body;
    let index = arr.findIndex((x)=>x.id===id);
    if(index>=0){
        updateEmp(index,updatedArr);
        res.send(updatedArr);
    }
    else{
        res.status(404).send("Customer not found!!!");
    }

});
app.delete('/removeEmp/:id',(req,res)=>{
    let id=req.params.id;
    let emp=arr.find(x=>x.id===id);
    if(emp){
        removeEmp(id);
        res.send("Employee name "+emp.name+" having id "+emp.id+" is removed");
    }
    else{
        res.status(404).send("Employee not found!!!");
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