const express = require("express");
const app = express();
app.get("/", (req,res)=>{
    res.send("Welcome");
});
const question = require("./routers/question");
app.use("/question", question);

const book = require("./routers/book");
app.use("/book", book);

const answer = require("./routers/answer");
app.use("/answer", answer);
app.listen(5000, ()=>{console.log(`Server Open`)});