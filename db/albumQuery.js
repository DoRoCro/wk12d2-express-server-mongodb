var MongoClient = require('mongodb').MongoClient

var AlbumQuery = function () {
  this.url = 'mongodb://localhost:27017/hmhb_albums'
}

AlbumQuery.prototype = {
  all: function (onQueryFinished) {
    MongoClient.connect(this.url, function (err, db) {
      if (err) console.log('Connection error on all: ' + err)
      if (db) {
        // console.log('connected to Mongo...')
        // GET THE RIGHT COLLECTION
        var collection = db.collection('albums')
        // FIND ALL ALBUMS
        // TURN THEM INTO AN ARRAY
        collection.find().toArray(function (err, docs) {
          // INVOKE A CALLBACK
          onQueryFinished(docs)
        })
      }
    })
  },

  add: function (albumToAdd, onQueryFinished) {
    MongoClient.connect(this.url, function (err, db) {
      if (err) console.log('Connection error on add: ' + err)
      if (db) {
        var collection = db.collection('albums')
        collection.insert(albumToAdd)
        collection.find().toArray(function (err, docs) {
          console.log(docs)
          onQueryFinished(docs)
        })
      }
    })
  }
}

module.exports = AlbumQuery
