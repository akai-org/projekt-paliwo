const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/user', (req, res, next) =>{
   res.send('<h1>USER PAGE</h1>');
});

module.exports = router;