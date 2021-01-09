const express = require("express");
const router = express.Router();
const search = require("../controllers/course/search");
const { addAdditionalFields } = require(__basedir +
  "/controllers/course/helpers");

router.route("/search").get( async function (req, res) {
    
  // console.log(req.query);
  const { q, p, cat } = req.query;

  const paginates = await search(q, cat, p?p:1, __CONFIG.paginateLimit);
  addAdditionalFields(paginates.docs);

  // console.log(paginates);

  res.render("courses/search_result", { paginates, key:(q && q.split(" ").join("+")) || "", cat, cats: __categories });
});

module.exports = router;
