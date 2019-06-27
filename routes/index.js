const express = require('express');
const router = express.Router();

const  loggedin = (req , res , next) =>{
  console.log(res.isAuthenticated)
  if(req.isAuthenticated()){
    next()
  }else {
    res.redirect('/login')
  }
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.get('/profile', loggedin, function(req, res, next) {
  res.send(req.session);
});


router.get('/logout', (req , res) =>{
  req.logout()
  res.send('/')
})
module.exports = router;
