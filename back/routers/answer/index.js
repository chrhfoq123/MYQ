const router = require('express').Router();

router.get("/", (req,res)=>{
    res.send("객관식 페이지");
});
module.exports = router;