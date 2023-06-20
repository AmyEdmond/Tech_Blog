const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      user_id: req.session.user_id,
    },
    
    include: [
      {
        model: Comment,
          include: {
          model: User
         },
      },
      {
        model: User,
        
      },
    ],
  })
    .then((postData) => {
      const posts = postData.map((post) => post.get({ plain: true }));
      res.render('dashboard', {
        posts,
        logged_in: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    
    include: [
      {
        model: User,
        
      },
      {
        model: Comment,
        
        include: {
          model: User,
          
        },
      },
    ],
  })
    .then((PostData) => {
      if (!PostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      const post = PostData.get({ plain: true });
      console.log('sending ' + req.session.username);
      res.render('edit-post', {
        post,
        logged_in: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/new', (req, res) => {
  res.render('new-post', { username: req.session.username });
});

module.exports = router;