const router = require('express').Router();
const dao = require('../DAO');

// 문제 List return API
// GET http://localhost:5000/question
// 쿼리스트링 count = 가져올 리스트의 갯수
router.get("/", async (req,res) => {        
    let count = req.query.count ? req.query.count : 15;
    let query = `SELECT * FROM question ORDER BY idx DESC LIMIT ${count}`;    
    const conn = await require('../../database')();
    conn.query(query, (err,row) => {
        if(err) console.log(err);
        res.send(row);
        conn.end();
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
            console.log(_rows);
            res.send(_rows);
            conn.end();
        });        
    })    
});

// GET http://localhost:5000/question/:idx
// 데이터 하나 가져오기
router.get("/:idx", async (req, res) => {
    const { idx } = req.params;
    let query = `
    SELECT question.idx as qidx, question.subject as qsubject, make_time, answer.idx as aidx, answer.subject as asubject, answer.isAnswer, question.modify_time
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
        conn.end();
    });
});

// 데이터 수정 API
// PATCH http://localhost:5000/:idx
// -d "subject=modify_subject"
router.patch("/:idx", async (req,res) => {
    const idx = req.params.idx;
    if(!idx || idx === undefined)
    {
        res.send({msg:"idx null"});
        return;
    }
    const { subject } = req.body;    
    let query = `UPDATE question SET `;
    query += `modify_time = now(), `;
    if(subject) {
        query += `subject = "${subject}" `;
    }
    query += `WHERE idx = ${idx}`;
    const conn = await require("../../database")();
    conn.query(query, (err, row) => {
        if(err) console.log(err);
        row.idx = idx;
        res.send(row);
        conn.end();
    });
});

// 데이터 삭제 API
// DELETE http://localhost:5000/:idx
router.delete("/:idx", async (req, res) => {
    const idx = req.params.idx;
    if(!idx || idx === undefined)
    {
        res.send({msg:"idx null"});
        return;
    }
    let query = `DELETE FROM question WHERE idx = ${idx}`;
    const conn = await require("../../database")();
    conn.query(query, (err, row) => {
        if(err) console.log(err);        
        res.send(row);
        conn.end();
    });    
});

module.exports = router;