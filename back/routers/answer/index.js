const router = require('express').Router();

router.patch("/:idx", async (req,res)=>{    
    const idx = req.params.idx;
    if(!idx || idx === undefined)
    {
        res.send({msg:"idx null"});
        return;
    }
    const data = req.body;            
    let query = `UPDATE answer SET `;    

    for(let obj in data)
    {
        query += `${obj} = "${data[obj]}",`;
    }        
    if(query.charAt(query.length-1) === ',')
    {
        query = query.substring(0, query.length-1);
    }
    query += ` WHERE idx = ${idx}`;    

    const conn = await require("../../database")();
    conn.query(query, (err, row) => {
        if(err) console.log(err);
        row.idx = idx;
        res.send(row);
        conn.end();
    });

});

// 문제 등록
router.post("/", async (req,res)=>{
    console.log(req.body);
    const idx = req.body[0].idx;
    if(idx === undefined || idx === null) 
    {
        res.send({msg : "PK NULL"});
        return;
    }
    
    const d_query = `DELETE FROM book_child WHERE parent=${idx}`;    
    const conn = await require("../../database")();
    conn.query(d_query, (err, row) => {
        if(err) console.log(err);
        let sub_query = "INSERT INTO book_child (\`parent\`, \`key\`) VALUES ";
        for(let i=0; i<req.body.length; i++)
        {
            const obj = req.body[i];
            sub_query += `(${idx}, ${obj.qid})`;
            if(i+1 < req.body.length)
            {
                sub_query += ", ";
            }
        }
        conn.query(sub_query, (_err, _row) => {
            if(_err) console.log(_err);
            res.send(_row);
            conn.end();
        });
    });    
});

// 문제 삭제 API
router.delete("/:idx", async (req, res) => {
    const idx = req.params.idx;
    let query = `DELETE FROM answer WHERE idx = ${idx}`;
    const conn = await require("../../database")();
    conn.query(query, (err, row) => {
        if(err) console.log(err);        
        res.send(row);
        conn.end();
    });    
});

module.exports = router;