const express = require('express')
const { restart } = require('nodemon')
const router = express.Router()

//@desc Login/Landing Page
//@route GET /
router.get('/', (req, res) => {
    res.send('Login')
})

//@desc Dashboards
//@route GET /dashboard
router.get('/dashboard', (req, res) => {
    res.send('Dashboard')
})
module.exports = router