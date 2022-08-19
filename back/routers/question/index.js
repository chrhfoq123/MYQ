const router = require('express').Router();
const conn = require('../../database');
router.get("/", (req,res) => {
    
    res.send("문제 페이지");
});

module.exports = router;