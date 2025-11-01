const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5010;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hellow From the server Api!");
});

app.listen(port, () => {
  console.log("This App is listening from port number :", port);
});
