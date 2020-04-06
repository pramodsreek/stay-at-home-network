const express = require('express');
const router = express.Router();

// @route GET api/blogs
// @desc to test if route is working
// @access Public (no need to get authorisation using tokens)
router.get('/', (req, res) => res.send('Blogs  route'));

module.exports = router;
