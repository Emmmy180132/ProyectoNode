import Database from "better-sqlite3";
const db = new Database('project.db')

const data=[
    // {nameEmployee:"Jane",username:"JD0",age:"27",gender:"Female"},
    // {nameEmployee:"Ceasar",username:"KS1",age:"23",gender:"Female"},
    // {nameEmployee:"Seth",username:"PD2",age:"21",gender:"Male"},
    // {nameEmployee:"Pompey",username:"DC3",age:"40",gender:"Male"},
    // {nameEmployee:"Nicole",username:"GL4",age:"24",gender:"Female"},
    // {nameEmployee:"Mikhail",username:"CW5",age:"45",gender:"Male"},

    // {nameAnim:"Doe", age:"6",gender:"Female", specie:"Rat"},
    // {nameAnim:"Bara", age:"7",gender:"Male", specie:"Capybara"},
    // {nameAnim:"Zazzie", age:"3",gender:"Unkown", specie:"Crocodile"},
    // {nameAnim:"Simba", age:"5",gender:"Male", specie:"Lion"},
    // {nameAnim:"Nala", age:"5",gender:"Female", specie:"Lion"},
    // {nameAnim:"Aven", age:"8",gender:"Male", specie:"Peacock"},
    // {nameAnim:"Turin", age:"7",gender:"Female", specie:"Peacock"}

    {AgeGroup: "Adults", Weekday: "Saturday", Hour: "9 00", Discount:"No" },
    {AgeGroup: "Children", Weekday: "Saturday", Hour: "9 00", Discount:"Yes" },
    {AgeGroup: "Children", Weekday: "Saturday", Hour: "9 10", Discount:"Yes" },
    {AgeGroup: "Elders", Weekday: "Saturday", Hour: "10 00", Discount:"No" },
    {AgeGroup: "Elders", Weekday: "Saturday", Hour: "10 00", Discount:"No" },
    {AgeGroup: "Children", Weekday: "Saturday", Hour: "10 00", Discount:"Yes" }
]
const insertData=db.prepare(
    // `insert into users(nameEmployee,username,age,gender) values(?,?,?,?)`
    // `insert into animals(nameAnim,age,gender,specie) values(?,?,?,?)`
    `insert into entrancecheck(AgeGroup,Weekday,Hour,Discount) values(?,?,?,?)`
)

data.forEach(entrancecheck=>{
    const r=insertData.run(
        // user.nameEmployee, user.username, user.age, user.gender
        //animals.nameAnim, animals.age, animals.gender, animals.specie
        entrancecheck.AgeGroup, entrancecheck.Weekday, entrancecheck.Hour, entrancecheck.Discount

    )
    console.log(r)
})
db.close()