const router = require('express').Router();
const conn = require('../../database');

// 문제 List return API
router.get("/", (req,res) => {    
    res.send("문제 페이지");
});

// 문제 등록 API
router.post("/", (req,res)=>{    
    res.send("SDFDSF");
});

module.exports = router;