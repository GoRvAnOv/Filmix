const express = require('express');
const FILM = require('../models/FILM');
const Film = require('../models/FILM');
const path = require('path');
const router = express.Router();
const axios = require('axios').default;

//const createPath = (page) => path.resolve(__dirname, './views', `${page}.ejs`);

router.get("/", (req, res) => {
    const sort = req.query.sort;
    if (sort) {
      FILM.find()
        .sort({ rating: 1 })
        .limit(6)
        .then((films) => res.render("index.ejs", { films }));
    } else {
      FILM.find()
        .limit(6)
        .then((films) => res.render("index.ejs", { films }));
    }
  });

// sending images
router.get('/files/posters/:id', (req, res) =>{
    const id = req.params.id;
    res.sendFile(path.join(__dirname, '..', `/files/posters/${id}`))
})

router.get('/films/files/posters/:id', (req, res) =>{
    const id = req.params.id;
    res.sendFile(path.join(__dirname, '..', `/files/posters/${id}`));
})

router.get('/films/files/movies/:id', (req, res) =>{
    const id = req.params.id;
    res.sendFile(path.join(__dirname, '..', `/files/movies/${id}`))
})

router.get('/films', (req, res) =>{
    FILM
        .find().sort({"rate": -1})
        .then(films => res.render('films.ejs', {films}))
});

router.get('/films/:id', (req, res) =>{
    const id = req.params['id'];
     FILM
        .findById(id)
        .then(item => res.render('template.ejs', {item}));   
        })

router.post('/films/:id', (req, res) =>{
    const {username, comments} = req.body;
    const id = req.params['id'];
    const dateAdded = new Date();
    console.log(req.body);
    /*FILM.updateOne({_id:`${id}`},{
        $push:{
            comment: `${comment}`
        }
    })*/
    /*FILM.updateOne({name:"Boom"},{
        $addToSet:{
            comments: `${comment}`
        }

    })*/
    FILM
        .findByIdAndUpdate(id, {$push:{comments: {username: username, comment:comments, dateAdded:dateAdded}}})
        .then((result) => res.status(200));
})
router.delete('/films/:id', (req, res) =>{
    const id = req.params['id'];
    FILM.findByIdAndRemove(id, (err, result) => {
        if (err){
            console.log(err)
        }
        else{
            console.log("Removed User : ", result);
        }
    })

})
//.findByIdAndUpdate(id, {$push:{comments: `${comments}`}})
router.get('/admin-panel', (req, res) => {
    res.render('admin-panel.ejs');
})
router.post('/admin-panel', (req, res) => {
    try{
        const { name, year, director, country, actors, checked_inputs, quality, voice, description, type } = req.body;
        let checked = checked_inputs.split(',')
        console.log(req.body);
        console.log(checked)
        console.log(Array.isArray(checked))
        /*if (!req.files) {
            return res.status(400).send("No files were uploaded.");
        }*/
        const file = req.files;
        //const urlVideo = path.join(__dirname, '..', '/files/movies'+ file.video.name);
        const urlVideo = '/files/movies/'+ file.video.name;
        const urlFoto = '/files/posters/'+ file.foto.name;
        file.video.mv(urlVideo);
        file.foto.mv(urlFoto);
        let rate = 0;
        let comment = [];
        const dateAdded = new Date();
        const film = new Film({ name, year, director, country, actors, checked, quality, voice, description, type, rate, urlVideo, urlFoto, dateAdded, comment});
        film
            .save();
        /*if(!res.status(400)){
            alert('error');
        }*/
       
    }

    catch(err){
        console.log(err);
    }
    
})

module.exports = router;
