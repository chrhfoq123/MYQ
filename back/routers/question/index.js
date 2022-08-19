const router = require('express').Router();
const dao = require('../DAO');

// 문제 List return API
router.get("/", (req,res) => {    
    res.send("문제 페이지");
});

// 문제 등록 API
router.post("/", async (req,res) => {
    //let query = `INSERT INTO question (subject, make_time) VALUES ("${req.body.subject}", now())`;    
    res.send("SDFDSF");
});

module.exports = router;