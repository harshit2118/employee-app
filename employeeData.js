let empData=[
    {id:1451,name:"Jack",department:"Finance",designation:"Manager",salary:52500,gender:"Male"},
    {id:1029,name:"Steve",department:"Technology",designation:"Manager",salary:71000,gender:"Male"},
    {id:1891,name:"Anna",department:"HR",designation:"Manager",salary:55100,gender:"Female"},
    {id:1322,name:"Kathy",department:"Operations",designation:"Manager",salary:49200,gender:"Female"},
    {id:1367,name:"Bob",department:"Marketing",designation:"Manager",salary:39000,gender:"Male"},
    {id:1561,name:"George",department:"Finance",designation:"Trainee",salary:22500,gender:"Male"},
    {id:1777,name:"Harry",department:"Technology",designation:"Trainee",salary:31000,gender:"Male"},
    {id:1606,name:"Julia",department:"HR",designation:"Manager",salary:25100,gender:"Female"},
    {id:1509,name:"Kristina",department:"Operations",designation:"Trainee",salary:19200,gender:"Female"},
    {id:1533,name:"William",department:"Marketing",designation:"Trainee",salary:16200,gender:"Male"},
    {id:1161,name:"Stephen",department:"Finance",designation:"VP",salary:82500,gender:"Male"},
    {id:1377,name:"Winston",department:"Technology",designation:"VP",salary:91000,gender:"Male"},
    {id:1206,name:"Victoria",department:"HR",designation:"Manager",salary:65100,gender:"Female"},
    {id:1809,name:"Pamela",department:"Operations",designation:"VP",salary:78600,gender:"Female"},
    {id:1033,name:"Tim",department:"Marketing",designation:"VP",salary:66800,gender:"Male"},
    {id:1787,name:"Peter",department:"Technology",designation:"Manager",salary:47400,gender:"Male"},
    {id:1276,name:"Barbara",department:"Technology",designation:"Trainee",salary:21800,gender:"Female"},
    {id:1859,name:"Donna",department:"Operations",designation:"Trainee",salary:21900,gender:"Female"},
    {id:1874,name:"Igor",department:"Operations",designation:"Manager",salary:48300,gender:"Male"},
];
//let empData=[
//    {id:"AA01",name:"Rakesh",department:"Operations",designation:"Trainee",salary:11000,gender:"Male"},
//    {id:"AA02",name:"Sam",department:"Technology",designation:"Trainee",salary:15000,gender:"Male"},
//    {id:"AA03",name:"Preet",department:"Technology",designation:"Trainee",salary:15000,gender:"Female"},
//    {id:"AA04",name:"Kanchan",department:"Operations",designation:"Trainee",salary:12000,gender:"Female"},
//    {id:"AA05",name:"Robin",department:"HR",designation:"Junior Manager",salary:20000,gender:"Male"},
//    {id:"AA06",name:"Anirudh",department:"Finance",designation:"Junior Manager",salary:22000,gender:"Male"},
//    {id:"AA07",name:"Karan",department:"Finance",designation:"Junior Manager",salary:22000,gender:"Male"},
//    {id:"AA08",name:"Ram",department:"Technology",designation:"General Manager",salary:30000,gender:"Male"},
//    {id:"AA09",name:"Monika",department:"HR",designation:"General Manager",salary:30000,gender:"Female"},
//    {id:"AA10",name:"Kalyan",department:"Technology",designation:"Vice President",salary:50000,gender:"Male"},
//]
let insertData=(data)=>empData.unshift(data);
let removeEmp=(id)=>{
    let index=empData.findIndex(x=>x.id==id);
    empData.splice(index,1);
    return empData;
}
let updateArr=(index,data)=>empData[index]=data;
module.exports.empData=empData;
module.exports.insertData=insertData;
module.exports.removeEmp=removeEmp;
module.exports.updateArr=updateArr;