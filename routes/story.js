var express = require('express');
var router = express.Router();
const { pool, query } = require('../models/db');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:id', async function (req, res, next) {
  try {
    const story = await query(
      'SELECT * FROM story WHERE id = ?',
      req.params.id
    );

    const links = await query(
      'SELECT * FROM links WHERE story_id = ?',
      req.params.id
    );

    res.render( 'story',{
      status: 200,
      story: story[0],
      links:links
    });



  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
