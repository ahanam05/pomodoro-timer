const User = require('../models/User');
const UserTimeData = require('../models/UserTimeData');

module.exports.clock_get = (req, res) => {
    res.render('clock');
}

module.exports.clock_post = async (req, res) => {
    console.log(req.body);

    const { userID, pomoMins, breakMins, date } = req.body;

    try {
        const time = await UserTimeData.findOne({ userID });

        if (time) {
            time.totalPomoMins += pomoMins;
            time.totalBreakMins += breakMins;

            const existingPomoIndex = time.yearPomoMins.findIndex((entry) => entry.date === date);
            const existingBreakIndex = time.yearBreakMins.findIndex((entry) => entry.date === date);

            if (existingPomoIndex >= 0) {
                time.yearPomoMins[existingPomoIndex].minutes += pomoMins;
            } else {
                time.yearPomoMins.push({ date, minutes: pomoMins });

                if (time.yearPomoMins.length > 365) {
                    time.yearPomoMins.shift();
                }
            }

            if (existingBreakIndex >= 0) {
                time.yearBreakMins[existingBreakIndex].minutes += breakMins;
            } else {
                time.yearBreakMins.push({ date, minutes: breakMins });

                if (time.yearBreakMins.length > 365) {
                    time.yearBreakMins.shift();
                }
            }

            await time.save();
            console.log('User time data updated successfully.');
            res.status(200).json({ message: 'User time data updated successfully.' });
        } else {
            const newTime = new UserTimeData({
                userID,
                totalPomoMins: pomoMins,
                totalBreakMins: breakMins,
                yearPomoMins: [{ date, minutes: pomoMins }],
                yearBreakMins: [{ date, minutes: breakMins }],
            });

            await newTime.save();
            console.log('New user time data created successfully.');
            res.status(201).json({ message: 'New user time data created successfully.' });
        }
    } catch (error) {
        console.error('Error saving user time data:', error);
        res.status(500).json({ error: 'Failed to save user time data.' });
    }
};
