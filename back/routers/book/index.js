const router = require('express').Router();
router.get("/", (req,res)=>{
    res.send("책페이지");
});
module.exports = router;