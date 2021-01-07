const { mainCatList, subCatList } = require("../../generator");
const { getObjectId, randSubCats } = require("../../helpers/index");
const CONFIG = require("../../../config.json");

const mainCats = [];

for (let i = 0; i < mainCatList.length; i++) {
  mainCats.push({
    id: getObjectId(mainCatList[i]),
    name: mainCatList[i],
    subCate: randSubCats(CONFIG.seeder.nSubCat),
  });
}

module.exports = mainCats;
