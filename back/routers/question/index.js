const router = require('express').Router();
const dao = require('../DAO');

// 문제 List return API
router.get("/", (req,res) => {    
    res.send("문제 페이지");
});

// 문제 등록 API
router.post("/", async (req,res) => {            
    let query = `INSERT INTO question (subject, make_time) VALUES ("${req.body.subject}", now())`;
    const conn = await require("../../database")();
    conn.query(query, (err,rows) => {
        if(err) console.log(err);
        const { insertId } = rows;        
        let sub_query = "INSERT INTO answer (subject, isAnswer, pkey) VALUES ";
        for(let i=0; i<req.body.answers.length; i++)
        {
            const obj = req.body.answers[i];
            sub_query += `("${obj.subject}", ${obj.isAnswer}, ${insertId})`;
            if(i+1 < req.body.answers.length)
            {
                sub_query += ", ";
            }
        }        
        conn.query(sub_query, (_err, _rows) => {
            if(_err) console.log(_err);
            res.send(_rows);
        });        
    })    
});

module.exports = router;