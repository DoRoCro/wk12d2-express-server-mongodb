var express = require('express')
// var app = express()
var hmhbRouter = express.Router()

var AlbumQuery = require('../db/albumQuery')
var albumQuery = new AlbumQuery()

// album by id - TODO sledgehammer approach of using existing all: method and select via index in array...
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

// album update
hmhbRouter.put('/:id', function (req, res) {
  albumQuery.all(function (albums) {
    var album = {
      album_type: req.body.album_type,
      artists: req.body.artists,
      available_markets: req.body.available_markets,
      external_urls: req.body.external_urls,
      href: req.body.href,
      id: req.body.id,
      images: req.body.images,
      name: req.body.name,
      type: req.body.type,
      uri: req.body.uri
    }
    console.log(album)
    albums[req.params.id] = album
    // res.json({data: albums})
    res.json(albums)
    // need some db update code here...
    albumQuery.update([req.params.id], function (results) {
      // do nothing?
    })
  })
})

// add new album
hmhbRouter.post('/', function (req, res) {
  var newAlbum = {
    album_type: req.body.album_type,
    artists: req.body.artists,
    available_markets: req.body.available_markets,
    external_urls: req.body.external_urls,
    href: req.body.href,
    id: req.body.id,
    images: req.body.images,
    name: req.body.name,
    type: req.body.type,
    uri: req.body.uri
  }
  albumQuery.add(newAlbum, function (results) {
    res.json(results)
  })
})

// TODO delete album
hmhbRouter.delete('/:id', function (req, res) {
  albumQuery.delete(req.params.id, function (albums) {
    res.json(albums)
    albums.splice(req.params.id, 1)
    res.json({data: albums})
  })
})
module.exports = hmhbRouter
