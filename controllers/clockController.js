const User = require('../models/User');
const UserTimeData = require('../models/UserTimeData');

module.exports.clock_get = (req, res) => {
    res.render('clock');
}

module.exports.clock_post = async (req, res) => {
    console.log(req.body);
    const time = await UserTimeData.findOne({
        userId: req.body.userID //find by userid. if already present, must update. else must add new
    })

    if (time) {
        time.totalPomoMins += req.body.pomoMins;
        time.totalBreakMins += req.body.breakMins;

        const existingPomoIndex = time.yearPomoMins.findIndex(([date]) => date === req.body.date);
        const existingBreakIndex = time.yearBreakMins.findIndex(([date]) => date === req.body.date);

        if (existingPomoIndex >= 0) {
            time.yearPomoMins[existingPomoIndex][1] += pomoMins;
        } else {
            time.yearPomoMins.push([req.body.date, pomoMins]);

            if (time.yearPomoMins.length > 365) {
                time.yearPomoMins.shift();
            }
        }

        if (existingBreakIndex >= 0) {
            time.yearBreakMins[existingBreakIndex][1] += breakMins;
        } else {
            time.yearBreakMins.push([req.body.date, breakMins]);

            if (time.yearBreakMins.length > 365) {
                time.yearBreakMins.shift();
            }
        }

        await time.save();
        console.log('User time data updated successfully.');
    }
    else {
        const newTime = new UserTimeData({
            userID: req.body.userID,
            totalPomoMins: req.body.pomoMins,
            totalBreakMins: req.body.breakMins,
            yearPomoMins: [[req.body.date, req.body.pomoMins]],  //as first entry of the user means it's the only day in the array
            yearBreakMins: [[req.body.date, req.body.breakMins]],
        });

        newTime.save();

    }

}
