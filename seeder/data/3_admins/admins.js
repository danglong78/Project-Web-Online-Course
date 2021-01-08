const { adminList } = require("../../generator");
const { getObjectId } = require("../../helpers/index");
const faker = require("faker");

const admins = [];

for (let j = 0; j < adminList.length; j++) {
  admins.push({
    id: getObjectId(adminList[j]),
    name: faker.name.findName(),
  });
}

module.exports = admins;
