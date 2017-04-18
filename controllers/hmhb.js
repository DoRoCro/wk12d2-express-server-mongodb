var express = require('express')
// var app = express()
var hmhbRouter = express.Router()

var AlbumQuery = require('../db/albumQuery')
var albumQuery = new AlbumQuery()

// album by id
hmhbRouter.get('/:id', function (req, res) {
  albumQuery.all(function (albums) {
    res.json(albums[req.params.id])
  })
})

// album index
hmhbRouter.get('/', function (req, res) {
  albumQuery.all(function (albums) {
    res.json(albums)
  })
})

module.exports = hmhbRouter
