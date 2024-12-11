import Database from "better-sqlite3";
const db = new Database('project.db')

const query=
// `CREATE TABLE users(
//     idEmployee INTEGER PRIMARY KEY,
//     nameEmployee STRING NOT NULL,
//     username STRING NOT NULL UNIQUE,
//     age INTEGER NOT NULL,
//     gender STRING NOT NULL
// )    
// `
// `CREATE TABLE animals(
//     idChip INTEGER PRIMARY KEY,
//     nameAnim STRING NOT NULL,
//     age INTEGER NOT NULL,
//     gender STRING NOT NULL,
//     specie STRING NOT NULL 
// )    
// `
// //in speciewhat kind of animal is, like a tiger, a hippopotamus, a donkey, a horse, a lion, etc 
// //age is in years
`CREATE TABLE entrancecheck(
    TicketNumber INTEGER PRIMARY KEY,
    AgeGroup STRING NOT NULL,
    Weekday STRING NOT NULL,
    Hour STRING NOT NULL,
    Discount STRING NOT NULL 
)    
`
//AgeGroup Varies: 1.-Children ; 2.-Adults ; 3.- Elders
//Hour in 24 hours format
//Discount has to appliances: first one only applies to the first group, children, second one there's a discount only on thursdays

db.exec(query)
db.close()