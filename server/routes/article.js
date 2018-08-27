const router = require('express').Router()
const Controller = require('../controllers/articles')
const auth = require('../helpers/auth')




router.get('/', Controller.findAll)
      .get('/:id',auth, Controller.findOne)
      .get('/myArticle',auth,Controller.myArticle)     
      .post('/create', auth,Controller.create)
      .delete('/:id',auth, Controller.delete)
      .put('/:id', auth,Controller.update)
      .put('comment/:id', auth, Controller.commentArticle)
      .put('/comment/delete/:id', auth, Controller.deleteComment)
      

module.exports = router