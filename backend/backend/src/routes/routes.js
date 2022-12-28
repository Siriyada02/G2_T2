const express = require('express')

const {API1_2,API3,API4} = require('../controllers/All_API')



const router = express.Router();

router.get('/API1_2/Test', API1_2)
router.get('/API3/Test', API3)
router.post('/API4/Test', API4)

module.exports = router;