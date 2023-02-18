const express = require("express"); //conecta con la libreria de expres
const mongoose = require("mongoose"); // conecta con la libreria de mongoose
const cors = require("cors");
const app = express();
const port = 2000;
let db = "";

app.use(express.json());
app.use(cors());

// app.get("/Ejercicio/01", async (req, res) => {
//   const result = await db
//     .collection("movies")
//     .find({ genres: { $eq: "Thriller" } })
//     .limit(200)
//     .toArray();

//   res.send(result);
// });

app.post("/Ejercicio/03", async (req, res) => {
  console.log(req.body.genres);
  const result = await db
    .collection("movies")
    .find({
      $and: [{genres:{$in:[req.body.genres]}}, {languages:{$in: [req.body.languages]}}],
    })
    .limit(Number(req.body.limit))
    .sort({ year: -1 })
    .toArray();
// console.log(result[0]);
  res.send(result);
});

mongoose
  .connect(
    "mongodb+srv://bit:core123@cluster0.i090fv3.mongodb.net/sample_mflix?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conectado a la BD de  mongo ");
    db = mongoose.connection.db;
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);

});
