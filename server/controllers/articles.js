const Article = require('../models/article')
const jwt = require('jsonwebtoken')


module.exports = {
    create: (req,res) => {
    let token = req.headers.token;
    let decode = jwt.verify(token, process.env.JWT_TOKEN);
   
        Article
            .create({
                title : req.body.title,
                description: req.body.description,
                userId: decode.id     
            })

            .then(article => {
                console.log('masuk==>', req.body);
                
                res.status(200).json({
                    msg:'create success',
                    article
                })
            })

            .catch(err => {
                res.status(500).json({
                    err
                })
            })
    },
    delete: (req,res) => {
        Article
            .deleteOne(
                {
                    _id:req.params.id
                })

            .then(article  => {
                res.status(200).json({
                    msg: 'delete success',
                    data: article 

                })
            })

            .catch(err => {
                res.status(500).json({
                    msg: 'error'
                })
            })
    },
    myArticle: (req,res) => {
        let token = req.headers.token;
        let decoded = jwt.verify(token, process.env.JWT_TOKEN);
        Article
        .find({
            userId:decoded.id
        })
        .populate("userId")
        .then(articles => {
            res.status(200).json({
              message: "data my article",
              articles
            });
          })
          .catch(err => {
            res.status(400).json({
              message: err.message
            });
          });

    },
    findAll: (req,res) =>{
        Article
            .find().populate()
            .then(article => {
                res.status(200).json({
                    msg:'create success',
                    data: article 
                })
            })

            .catch(err => {
                res.status(500).json({
                    msg:'error'
                })
            })
    },
    findOne: (req,res) => {
        Article
            .findOne({
                _id:req.params.id
            })
            .populate("userId")
            .then(article  => {
                res.status(200).json({
                    msg:'success find id',
                    data: article 
                })
            })

            .catch(err => {
                res.status(500).json({
                    msg: 'error'
                })
            })
    },

    update: (req,res) => {
        Article
            .update(
                {
                    _id:req.params.id
                },
                {$set:
                    {
                        title : req.body.title,
                        description: req.body.description,  
                    }
            })

            .then(article  => {
                res.status(200).json({
                    msg:'update success',
                    data: article 
                })
            })

            .catch(err => {
                res.status(500).json({
                    msg:'error'
                })
            })
    },

  commentArticle:(req, res)=> {
    let token = req.headers.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    let id = req.params.id;
    Article
    .updateOne(
      {_id: id},
      {
        $push: {
          comments: { 
            comment: req.body.comment,
            date: new Date(),
            name: decode.name
          }
        }
      }
    )
    .then(result => {
      res.status(200).json({
        message: "comment successfully update",
        result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
  },

   deleteComment:(req, res) => {
    let idArticle = req.params.id;
    console.log(idArticle);
    console.log(req.body.idComment);
    Article.updateOne(
      {_id: idArticle},
      {
        $pull: {
          comments: { 
            _id: req.body.idComment
          }
        }
      }
    )
    .then(result => {
      res.status(200).json({
        message: "comment successfully deleted",
        result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
  }
    


    
}



