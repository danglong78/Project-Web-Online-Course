const transactions = require("../8_transactions/transactions");
const CONFIG = require("../../../config.json");

const weeklyTrans = [];

const startWeekDate = new Date(CONFIG.seeder.weekStart);

for (tran of transactions) {
  if (tran.date > startWeekDate) {
    weeklyTrans.push(tran);
  }
}

module.exports = weeklyTrans;
