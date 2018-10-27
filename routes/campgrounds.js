const express = require("express"),
      router = express.Router({mergeParms:true});


router.gett('/', (req, res) => {
  res.render('Hello World');
});

module.exports = router;
