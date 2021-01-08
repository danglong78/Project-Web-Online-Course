const WeeklyTransaction = require("../../models/weekly_transaction").model;
const CONFIG = require("../../config.json");

// global.__lastWeekDate = new Date(2020, 12, 12);

let weekStartDate = new Date(CONFIG.seeder.weekStart);

const updateWeeklyTransactions = async () => {
  await WeeklyTransaction.deleteMany({
    date: {
      $lte: weekStartDate,
    },
  });
};

// setInterval(() => {
//     __lastWeekDate.setDate(__lastWeekDate.getDate() + 1);
//     updateWeeklyTransactions();

// }, 3600 * 24);

module.exports = updateWeeklyTransactions;
