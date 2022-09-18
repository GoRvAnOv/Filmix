const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const app = express();
const Film = require('./models/FILM');
const FILM = require('./models/FILM');
var methodOverride = require('method-override');
const {sendFilms} = require('./controllers/post-controller');
const {FindById} = require('./controllers/post-controller');
const filmRoutes = require('./routes/film-routes');
const PORT = 3000;

app.use(methodOverride('X-HTTP-Method-Override')); //middlware for put, delete methods
app.use(express.static('styles'));
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


mongoose
    .connect('mongodb+srv://gorvanov:Filmix2022@cluster0.msg1kpv.mongodb.net/Filmix?retryWrites=true&w=majority')
    .then((res) => console.log('Connected to db'))
    .catch((error) => console.log(error));

app.use(filmRoutes);

app.listen(PORT, () =>{
    console.log('success')
})