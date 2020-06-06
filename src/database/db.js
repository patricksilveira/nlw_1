//import sqlite
const sqlite3 = require("sqlite3").verbose()

//iniciar objeto que irá fazer operações no bando de dados

const db = new sqlite3.Database("./src/database/dabase.db")

module.exports = db

// utilizar o objeto de bando de dados para as operações

// db.serialize(() => {
//             //Criar uma tabela
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT, 
//             city TEXT,
//             items TEXT
//         );

//     `)
        
//     // Inserir dados na tablea
//     const query = `
//         INSERT INTO places (
//             image,
//             name,
//             address,
//             address2,
//             state, 
//             city,
//             items
//         ) VALUES (?,?,?,?,?,?,?);
//         `

//     const values = [
//         "https://images.unsplash.com/photo-1567641091603-0a84d19c87c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80",
//         "Paperside",
//         "Rua Jajaja, Jd do Sul",
//         "Número 0001",
//         "São Paulo",
//         "Rio do Sul",
//         "Residuos Eletrônicos, Lâmpadas"
//     ]

//     function afterInsertData(err) {
//         if(err) {
//             return console.log(err)
//         }

//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }

//     db.run(query, values, afterInsertData) 
//             // Consultar dados na tabe;a

//     db.all(`SELECT * FROM places`, function(err, rows ) {
//         if(err) {
//             return console.log(err)
//         }
//         console.log('Aqui estão seus registros')
//         console.log(rows)
//     })
    
//             // Deletar dados na tabela 
// // db.run(`DELETE FROM places WHERE ID = ?`,[1])
//     })