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
    });

});
module.exports = router;