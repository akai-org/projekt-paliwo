const path= require('path');

const express = require('express');

const router =  express.Router();

router.get('/register', (req, res, next) => {
   res.send('<h1>REGISTER PAGE</h1>');
});

module.exports = router;