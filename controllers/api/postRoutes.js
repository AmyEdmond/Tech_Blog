const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all posts
router.get('/', async(req,res) => {
  try {
    const postData = await Post.findAll({
      
      include:[{ model: User, attributes: { exclude: ['password']}}, { model: Comment }]
    
  });

  res.status(200).json(postData);
  }catch(err) {
      res.status(500).json({message: "Something went wrong"})
  };
});

// router.get('/users/:user_id', async(req,res) => {
//   try {
//     const postData = await Post.findAll({
//       where: {
//         user_id: req.params.user_id,
//     },include:[{ model: User, attributes: { exclude: ['password'] }}, { model: Comment }]
//     });

//   res.status(200).json(postData);
//   }catch(err) {
//     console.log(err);
//       res.status(500).json({message: "Something went wrong"})
//   };
// });

// Get a single post
router.get('/:id', async(req, res) => {
  try {
    const postData = await Post.findOne(req.params.id, {
          where: {
              id: req.params.id,
          },
          include:[{ model: User }, { model: Comment }]
      });

if (postData[0] === 0) {
      res.status(404).json({ message: 'No post with this id!'});
      return;
    }
    res.json(postData);
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
  }
});

// Create a post
router.post('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.create({
      postTitle: req.body.postTitle,
      description: req.body.description,
      user_id: req.session.user_id
  }); 
    res.status(200).json(postData);;
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
  }
});

// Update a post
router.post('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.update({
      postTitle: req.body.postTitle,
      description: req.body.description,
    },
    { where: {
      id: req.params.id,
  },
  }); 
  if (postData[0] === 0) {
    res.status(404).json({ message: 'No post with this id!'});
    return;
  }
  res.json(postData);
} catch (err) {
  res.status(500).json({message: "Something went wrong"});
}
});

//Delete a post
router.delete('/:id', withAuth, async (req, res) => {
  console.log(req.params.id);
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;