const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Blog = require('../../models/Blog');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route POST api/blogs
// @desc Create a Blog
// @access Private
router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const newBlog = new Blog({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const blog = await newBlog.save();

      res.json(blog);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route GET api/blogs
// @desc Get all Blogs
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    res.send(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route GET api/blogs/:id
// @desc Get blog by id
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    console.log(req.params.id);
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        msg: 'Blog not found',
      });
    }

    res.send(blog);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Blog not found',
      });
    }
    res.status(500).send('Server Error');
  }
});

// @route DELETE api/blogs/:id
// @desc Remove a Blog
// @access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        msg: 'Blog not found',
      });
    }

    //A user should only delete their blog
    if (blog.user.toString() != req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User not authorised to delete blogs from others!' });
    }

    await blog.remove();

    res.send({ msg: 'Blog Removed!' });
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Blog not found',
      });
    }

    res.status(500).send('Server Error');
  }
});

// @route PUT api/blogs/like/:id
// @desc like a blog
// @access Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    //check if the blog has already been liked
    if (
      blog.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({
        msg: 'Blog already liked',
      });
    }
    blog.likes.unshift({
      user: req.user.id,
    });

    await blog.save();

    res.json(blog.likes);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Blog not found',
      });
    }

    res.status(500).send('Server Error');
  }
});

// @route PUT api/blogs/unlike/:id
// @desc like a blog
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    //check if the blog has already been liked
    if (
      blog.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({
        msg: 'Blog has not been liked by user to unlike',
      });
    }

    //Get remove index
    const removeIndex = blog.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    blog.likes.splice(removeIndex, 1);

    await blog.save();

    res.json(blog.likes);
  } catch (error) {
    console.error(error.message);

    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        msg: 'Blog not found',
      });
    }

    res.status(500).send('Server Error');
  }
});

// @route POST api/blogs/comment/:id
// @desc Comment on a blog
// @access Private
router.post(
  '/comment/:id',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const blog = await Blog.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      blog.comments.unshift(newComment);

      await blog.save();

      res.json(blog.comments);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route DELETE api/blogs/comment/:id/:comment_id
// @desc Delete a Comment on a blog
// @access Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    //Get the comment
    const comment = blog.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Handle - if the comment does not exist
    if (!comment) {
      return res.status(404).json({ msg: 'Comment does not exist!' });
    }

    // Check user is authorised to delete
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorised' });
    }

    //Get remove index
    const removeIndex = blog.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    blog.comments.splice(removeIndex, 1);

    await blog.save();

    res.json(blog.comments);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
