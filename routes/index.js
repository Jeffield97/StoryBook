const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest} = require('../middleware/auth')

//@desc Login/Landing Page
//@route GET /
router.get('/',ensureGuest, (req, res) => {
    res.render('login',{
       layout: 'login', 
    })
})

//@desc Dashboards
//@route GET /dashboard
router.get('/dashboard',ensureAuth, (req, res) => {
    console.log(req.user)
    res.render('dashboard',{
        name: req.user.displayName
        })
})
module.exports = router