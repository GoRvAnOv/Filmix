const FILM = require('../models/FILM');
const path = require('path');
const createPath = (page) => path.resolve('./views', `${page}.ejs`);


const sendFilms = (req, res) =>{
    FILM
        .find().limit(6)
        .then(films => res.render(createPath('films'), {films}))
        
}

async function FindById(req, res){
     const id = req.params.id;
     FILM
        .findById(id)
        .then(item => res.render(`movies/${item.name}.ejs`, {item}));
}



module.exports = {
    sendFilms, FindById
}

