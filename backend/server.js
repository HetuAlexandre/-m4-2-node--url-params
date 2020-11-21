"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

const { top50 } = require('./data/top50');


express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------
  // add new endpoints here 👇
  // .get(`top50/artist/drake`, (req, res) => {

  // })





  .get("/top50/song/:rank", (req, res) => {
    const specificSong =  top50.filter((song)=> {
    return song.rank.toString() === req.params.rank
    })
    specificSong.length === 0 ? 
    res.status(404).json({
      status: 404, 
      data: "Song not found." 
    }):
      res.status(202).json({
      status: 202,  
      data : [...specificSong] 
    });

    // requestSong.length === 0 ? res.status(404).json({ 
    //   status: 404, 
    //   data: "Song not found." }):
    //   res.status(200).json({
    //   status:200,
    //   data : [...specificSong]
    // });
    
  })


  .get("/top50", (req, res) => {
    res.status(200).json({
      status:200,
      data: [...top50]
    });
  })

  // add new endpoints here ☝️
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
