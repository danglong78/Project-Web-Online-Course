const WeeklyTransaction = require(__basedir + '/models/weekly_transaction').model;


global.__lastWeekDate = new Date(2020, 12, 12);

const updateWeeklyTransactions = () => {
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