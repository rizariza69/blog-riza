const router = require('express').Router()
const Controller = require('../controllers/articles')
const auth = require('../helpers/auth')




router.get('/', Controller.findAll)
      .get('/getmyarticle',auth, Controller.getMyArticle)     
      .post('/create', auth,Controller.create)
      .delete('/:id', Controller.deleteArticle)
      .put('/:id', auth, Controller.update)
      .put('comment/:id', auth, Controller.commentArticle)
      .put('/comment/delete/:id', auth, Controller.deleteComment)
      

module.exports = router