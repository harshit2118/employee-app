//var myq1=require('myq1');
var employeeList=require('./employeeData').empData;
let initialState=(client)=>{
    client.query('DROP TABLE IF EXISTS employees',(err,result)=>{
        if(err)throw err;
        else{
            console.log("Table Dropped");
        }
    });
    client.query("CREATE TABLE employees(id INTEGER NOT NULL PRIMARY KEY,name VARCHAR(255),gender VARCHAR(255),department VARCHAR(255),designation VARCHAR(255),salary INTEGER)",(err,result)=>{
        if(err){
            throw err
        };
        console.log("Table Added!!!");
    });
    employeeList.forEach((x)=>{
        let q1=`INSERT INTO employees VALUES (${x.id},'${x.name}','${x.gender}','${x.department}','${x.designation}',${x.salary})`;
        client.query(q1,(err,result)=>{
            if(err)throw err;
            else{
                console.log("Employee Added");
            }
        });
    });
}
let insertIntoTable=(client,data)=>{
    let q1=`INSERT INTO employees VALUES(${data})`;
    console.log(q1);
    client.query(q1,(err,result)=>{
                if(err)throw err;
                else{
                    console.log("Database Updated");
                }
    });
}
let getAllEmployees=(client)=>{
    return new Promise((res,rej)=>{
        let q1=`SELECT * FROM employees ORDER BY id ASC`;
        client.query(q1,(err,result)=>{
        if(err){
            return rej(err);
        }
        let {rowCount,rows}=result;
        let cust=rows.map(x=>Object.assign({},x));
        return res(cust);
        });
    });
}
let updateEmployee=(client,SET,WHERE)=>{
    let q1=`UPDATE employees SET ${SET} WHERE ${WHERE}`;
    client.query(q1,(err,result)=>{
        if(err){
            console.log(err);
        }
        console.log("Employee Updated");
    });
}
let deleteEmployees=(client,ID)=>{
    let q1=`DELETE FROM employees WHERE id='${ID}'`
    client.query(q1,(err,result)=>{
        if(err)throw err;
        console.log("Customer deleted");
    });
}
exports.insertIntoTable=insertIntoTable;
exports.deleteEmployees=deleteEmployees;
exports.updateEmployee=updateEmployee;
exports.initialState=initialState;
exports.getAllEmployees=getAllEmployees;