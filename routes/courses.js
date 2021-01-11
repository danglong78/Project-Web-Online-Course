const express = require("express");
const router = express.Router();
const search = require("../controllers/course/search");
const getByCatID = require("../controllers/course/get_by_catID");
const { addAdditionalFields } = require(__basedir +
  "/controllers/course/helpers");

router.route("/search").get( async function (req, res) {
    
  // console.log(req.query);
  const { q, p, cat, sortBy } = req.query;

  const paginates = await search(q, cat, p?p:1, __CONFIG.paginateLimit, sortBy);
  addAdditionalFields(paginates.docs);

  // console.log(paginates);  
  if (sortBy === "rate") paginates.sortBy = "rate";
  else if (sortBy === "price") paginates.sortBy = "price";    

  res.render("courses/search_result", { paginates, key:(q && q.split(" ").join("+")) || "", p:paginates.page, cat, sortBy, cats: __categories });
});

router.route("/category/:catID").get(async function(req, res) {

  const catID = req.params.catID;
  const { p, sortBy } = req.query;
  const paginates = await getByCatID(catID, p?p:1, __CONFIG.paginateLimit, sortBy);
  
  // console.log(paginates);
  if (typeof paginates === "undefined") {
    // console.log("redirect");
    return res.redirect('/');
  }
  addAdditionalFields(paginates.docs);

  // console.log(paginates);

  res.render("courses/category", { paginates, sortBy, cats: __categories });
  // res.render("courses/category");
})

module.exports = router;
