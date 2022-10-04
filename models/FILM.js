const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    country: {
        type: Array,
        required: true
    },
    actors: {
        type: String,
        required: true
    },
    checked: {
        type: Array,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    voice: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
    },
    rate:{
        type:Number
    }
    ,
    urlVideo: {
        type: String
    },
    urlFoto: {
        type: String
    },
    dateAdded: {
        type:Date
    },
    comments: {
        type:Array
    }
},
{
    collection: 'Films'
});

const FILM = mongoose.model('FILM', FilmSchema);
module.exports = FILM;