var express = require("express");
var router = express.Router();
const SqlRunner = require("../db/sql_runner");

router.get("/", function(req, res) {
  SqlRunner.run("SELECT placename,photo_notes,lat,long FROM locations").then(
    result => {
      res.status(200).json(result.rows);
    }
  );
});

router.post("/", function(req, res) {
  SqlRunner.run(
    "INSERT INTO locations (placename,photo_notes,lat,long) VALUES ($1, $2, $3, $4)",
    [req.body.placename, req.body.photo_notes, req.body.lat, req.body.long]
  ).then(result => {
    SqlRunner.run("SELECT placename,photo_notes,lat,long FROM locations").then(
      result => {
        res.status(201).json(result.rows);
      }
    );
  });
});

// router.delete('/:id', function(req, res){
//   SqlRunner.run("DELETE FROM locations WHERE id = $1", [req.params.id])
//     .then((result) => {
//       res.status(200).json(result);
//     });
// });
//
// router.delete('/title/:title', function(req, res){
//   console.log(req.params.);
//   SqlRunner.run("DELETE FROM books WHERE title = $1", [req.params.])
//   .then(result => {
//     SqlRunner.run("SELECT * FROM books ORDER BY title ASC").then(result => {
//       res.status(201).json(result.rows)
//     });
//   });
// });
//

//

module.exports = router;
