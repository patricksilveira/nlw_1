const express = require("express")
const server = express()

//pegar db
const db = require("./database/db.js")
// configurar pasta pública
//server.use => fazer configurações no express
server.use(express.static('public'))

server.use(express.urlencoded({ extended: true }))

// utilizando template engine - nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views/", {
        express: server,
        noCache: true

    })
    //configurar caminhos da aplicação
    //pagina inicial
    //req: requesição
    //res: resposta

server.get("/", (req, res) => {
    return res.render("index.html", { title: "Seu marketplace de coleta de residuos" })
})
server.get("/create-point", (req, res) => {
    // req.query : query strings da url
    // console.log{req.query}

    return res.render("create-point.html", {saved: true})
})

server.post("/savepoint", (req, res) => {
    //req.body: o corpo do formulário

    //console.log(req.body)
    //Inserir dados nos bancos de dados
    
// Inserir dados na tablea
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state, 
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
        `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData) 
    
})

server.get("/search", (req, res) => { 
    const search = req.query.search

    if(search == "") {
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }




    db.all(`SELECT * FROM places WHERE city LIKE  '%${search}%'`, function(err, rows) {
        if(err) {
            return console.log(err)
        }
        const total = rows.length
        
        return res.render("search-results.html", {places:rows, total: total})
    })

        
    })
    //ligar o servidor
server.listen(3000)