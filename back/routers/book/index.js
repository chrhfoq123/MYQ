const router = require('express').Router();
router.get("/", (req, res)=>{
    res.send("책페이지");
});

router.post("/", async (req, res)=>{
    //INSERT INTO book (subject, memo, make_time) VALUES ("대충문제집 이름", "어쩌구한 메모", now());
    const { subject, memo } = req.body;    
    if(subject === undefined) {
        res.send({msg : "Subject Null"});
        return;
    }    
    
    let query = `INSERT INTO book (subject, memo, make_time) VALUES ("${subject}", "${memo}", now());`;    

    const conn = await require("../../database")();
    conn.query(query, (err, row) => {
        if(err) console.log(err);        
        row.idx = row.insertId;
        res.send(row);
        conn.end();
    });
});
module.exports = router;

// 문제집 (부모) 을 insert 할때 사용자가 선택한 문제(자식)의 KEY값을 저장 (1. JOIN용 테이블 생성하여 KEY값 저장, 2. 같은 테이블에 column 을 추가해서 "," 로 구분하여 KEY값 저장)
// 문제집을 select 할때 사용자가 선택한 문제들을 조회할수 있어야함