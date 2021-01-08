const { mainCatMap } = require("../../generator");
const { getObjectId, getObjectIds } = require("../../helpers/index");

const mainCats = [];

for (let cat of mainCatMap.keys()) {
  mainCats.push({
    id: getObjectId(cat),
    name: cat,
    subCate: getObjectIds(mainCatMap.get(cat)),
  });
}

module.exports = mainCats;
