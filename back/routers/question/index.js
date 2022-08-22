const router = require('express').Router();
const dao = require('../DAO');

// 문제 List return API
router.get("/", async (req,res) => {        
    let count = req.query.count ? req.query.count : 15;
    let query = `SELECT * FROM question ORDER BY idx DESC LIMIT ${count}`;
    console.log(query);
    const conn = await require('../../database')();
    conn.query(query, (err,row) => {
        if(err) console.log(err);
        res.send(row);
    });
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

// 데이터 하나 가져오기
router.get("/:idx", async (req, res) => {
    const { idx } = req.params;
    let query = `
    SELECT question.idx as qidx, question.subject as qsubject, make_time, answer.idx as aidx, answer.subject as asubject, answer.isAnswer
    FROM question JOIN answer ON question.idx = answer.pkey WHERE question.idx = ${idx}
    `;
    const conn = await require("../../database")();
    conn.query(query, (err,row) => {        
        if(row.length <= 0)
        {
            res.send({msg : "No Data"});
            return;
        }

        if(err) console.log(err);
        console.log(row[0]);
        const data = {
            qidx : row[0].qidx,
            subject : row[0].qsubject,
            make_time : row[0].make_time,
            answers : []
        }
        for(let i=0; i<row.length; i++)
        {
            const aobj = {
                idx : row[i].aidx,
                subject : row[i].asubject,
                isAnswer : row[i].isAnswer
            };
            data.answers[i] = aobj;
        }
        res.send(data);
    });
});

module.exports = router;