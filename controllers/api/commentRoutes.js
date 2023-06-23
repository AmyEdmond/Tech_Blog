const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {
   try {
      const commentData = await Comment.findAll(); 
      res.status(200).json(commentData);;
    } catch (err) {
      res.status(500).json({message: "Something went wrong"});
    }
});



router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
  }
});

// router.put('/:id', withAuth, async (req, res) => {
//   try {
//     const commenttData = await Comment.update({
//      where: {
//       comment_id: req.params.id,
//   },
//   }); 
//   if (!commenttData) {
//     res.status(404).json({ message: 'No comment with this id!'});
//     return;
//   }
//   res.json(commenttData);
// } catch (err) {
//   res.status(500).json({message: "Something went wrong"});
// }
// });
  

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
        
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  res.render("all", { Comment });
});

module.exports = router;