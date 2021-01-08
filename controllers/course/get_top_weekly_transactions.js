const Student = require('../../models/student').model;
const Course = require('../../models/course').model;
const WeeklyTransaction = require('../../models/weekly_transaction').model;

const getTopWeeklyTrans = async (n) => {
    let topWeekTrans;
    try {
        topWeeklyTrans = await WeeklyTransaction.aggregate([
            {
                $group: {
                    _id: $course,
                    count: { $sum: 1 }
                }
            },

            {
                $sort: {
                    count: -1
                }
            },

            {
                $limit: n
            }
        ])

        return topWeeklyTrans;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}


module.exports = getTopWeeklyTrans;