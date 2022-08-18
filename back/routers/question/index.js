const router = require('express').Router();

router.get("/", (req,res) => {
    res.send("문제 페이지");
});

module.exports = router;