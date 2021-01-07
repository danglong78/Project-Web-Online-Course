const { adminList } = require("../../generator");
const { getObjectId } = require("../../helpers/index");

const admins = [];

for (let j = 0; j < adminList.length; j++) {
  admins.push({
    id: getObjectId(adminList[j]),
  });
}

module.exports = admins;
