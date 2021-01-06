const { subCatList } = require("../../generator");
const { getObjectId } = require("../../helpers/index");

const subCats = [];

for (let i = 0; i < subCatList.length; i++) {
  subCats.push({
    id: getObjectId(subCatList[i]),
    name: subCatList[i],
  });
}

module.exports = subCats;
