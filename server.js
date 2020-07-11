const 
    express = require('express'),
    nunjucks = require('nunjucks'),
    videos = require("./data")

    server = express()

// porta observada e msg que está rodando
server.listen(3000, () => {
    console.log("server runnig")
})

// config do nunjucks
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

// config da engine
server.set("view engine", "njk")

// pastas do server
server.use(express.static('public'))

// rotas
server.get("/", (req, res) => {
    res.render("apresentation")
})

server.get("/sobre", (req, res) => {
    const about = [
        {
            name: 'Pedro Loos',
            photo: '/assets/pedro-lood.png',
            role: 'Divulgador Científico - Ciência Todo Dia',
            description: 'Criador do canal <a href="http://youtube.com/CienciaTodoDia">Ciência Todo Dia</a>, palestrante e graduando em física pela UFSC.',
            links: [
                { name: 'Facebook', url: 'http://localhost:3000/sobre1' },
                { name: 'Twitter', url: 'http://localhost:3000/sobre2' },
                { name: 'Linkedin', url: 'http://localhost:3000/sobre3' }
            ]
        },

        {
            name: 'Caique Andrade',
            photo: '/assets/caique-andrade.jpeg',
            role: 'Estudante de Web Developement - Rocketseat',
            description: 'Aprendendo as melhores tecnologias do mercado e evoluindo a cada dia.',
            links: [
                { name: "Github", url: "http://localhost:3000/sobre4" },
                { name: "Twitter", url: "http://localhost:3000/sobre5" },
                { name: "Linkedin", url: "http://localhost:3000/sobre6" }
            ]
        }

    ]

    res.render("about", { about })
})

server.get("/classes", (req, res) => {
    res.render("classes", { cards: videos })
})

server.get("/video", (req, res) => {
    const 
        id = req.query.id, 
        video = videos.find( (video) => {
            return video.id == id
        })

        if (!video) {
            return res.render("not-found", { type: "Vídeo não encontrado"})
        }

        res.render("video", { card: video })
})

server.use(function(req, res) {
    res.status(404).render("not-found", { type: "Página não encontrada"})
})

