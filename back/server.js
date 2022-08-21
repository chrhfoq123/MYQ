const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const question = require("./routers/question");
const book = require("./routers/book");
const answer = require("./routers/answer");

app.use(bodyParser.json());

app.get("/", (req,res)=>{ res.send("Welcome"); });

app.use("/question", question);
app.use("/book", book);
app.use("/answer", answer);

app.listen(5000, ()=>{console.log(`Server Open`)});