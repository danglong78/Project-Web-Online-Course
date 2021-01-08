const WeeklyTransaction = require('../../models/weekly_transaction').model;


global.__lastWeekDate = new Date(2020, 12, 12);

const updateWeeklyTransactions = async() => {
    await WeeklyTransaction.deleteMany(
        {
            date: {
                $lte: __lastWeekDate
            }
        }
    ).save();
}

// setInterval(() => {
//     __lastWeekDate.setDate(__lastWeekDate.getDate() + 1);
//     updateWeeklyTransactions();

// }, 3600 * 24);

module.exports = updateWeeklyTransactions;