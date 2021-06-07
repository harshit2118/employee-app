let empData=[
    {id:"AA01",name:"Rakesh",department:"Operations",designation:"Trainee",salary:11000,gender:"Male"},
    {id:"AA02",name:"Sam",department:"Technology",designation:"Trainee",salary:15000,gender:"Male"},
    {id:"AA03",name:"Preet",department:"Technology",designation:"Trainee",salary:15000,gender:"Female"},
    {id:"AA04",name:"Kanchan",department:"Operations",designation:"Trainee",salary:12000,gender:"Female"},
    {id:"AA05",name:"Robin",department:"HR",designation:"Junior Manager",salary:20000,gender:"Male"},
    {id:"AA06",name:"Anirudh",department:"Finance",designation:"Junior Manager",salary:22000,gender:"Male"},
    {id:"AA07",name:"Karan",department:"Finance",designation:"Junior Manager",salary:22000,gender:"Male"},
    {id:"AA08",name:"Ram",department:"Technology",designation:"General Manager",salary:30000,gender:"Male"},
    {id:"AA09",name:"Monika",department:"HR",designation:"General Manager",salary:30000,gender:"Female"},
    {id:"AA10",name:"Kalyan",department:"Technology",designation:"Vice President",salary:50000,gender:"Male"},
]
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