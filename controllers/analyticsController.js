const User = require('../models/User');
const UserTimeData = require('../models/UserTimeData');

async function getPomoData(userID){
    const time = await UserTimeData.findOne({ userID: userID });

    if (!time) {
        throw new Error('No data found for the user');
    }

    const { totalPomoMins, totalBreakMins, yearPomoMins, yearBreakMins } = time;
    console.log("totalPomoMins: ", totalPomoMins);
    const totalPomoHours = totalPomoMins / 60;

    // Calculate last week's and second-to-last week's focus minutes
    let lastWeek = 0;
    let secondToLastWeek = 0;

    const lastWeekStart = Math.max(yearPomoMins.length - 7, 0);
    const secondToLastWeekStart = Math.max(yearPomoMins.length - 14, 0);

    for (let i = yearPomoMins.length - 1; i >= lastWeekStart; i--) {
        lastWeek += yearPomoMins[i].minutes;
    }

    for (let i = lastWeekStart - 1; i >= secondToLastWeekStart; i--) {
        secondToLastWeek += yearPomoMins[i].minutes;
    }

    let focusChange;
    let focusPercentage = 0; // Default to 0 if no change or division by zero

    if (secondToLastWeek > 0) {
        if (lastWeek > secondToLastWeek) {
            focusChange = 1; // Increase
            focusPercentage = ((lastWeek - secondToLastWeek) / secondToLastWeek) * 100;
        } else {
            focusChange = 0; // Decrease
            focusPercentage = ((secondToLastWeek - lastWeek) / secondToLastWeek) * 100;
        }
    } else {
        focusChange = 1; 
    }

    // Calculate breaks taken in the last week
    let lastWeekBreaks = 0;
    for (let i = yearBreakMins.length - 1; i >= Math.max(yearBreakMins.length - 7, 0); i--) {
        lastWeekBreaks += yearBreakMins[i].minutes;
    }
    const lastWeekBreakHours = lastWeekBreaks/60;

    // Get minutes for the last week in an array
    const lastWeekPomo = [];
    for (let i = lastWeekStart; i < yearPomoMins.length; i++) {
        lastWeekPomo.push(yearPomoMins[i].minutes);
    }

    const data = {
        totalPomoHours,
        focusChange,
        focusPercentage,
        lastWeekBreakHours,
        lastWeekPomo,
        yearPomoMins
    };

    return data;
}

module.exports.analytics_get = async (req, res) => {
    const userID = req.query.userID;
    console.log("In analytics_get", userID);
    try {
        const data = await getPomoData(userID);

        if (!data) {
            return res.render('analytics', {
                data: null,
                message: 'No data available. Start using the Pomodoro timer to see your analytics!',
            });
        }

        const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const weeklyProgressData = data.lastWeekPomo.map((mins, index) => ({
            day: daysOfWeek[index],
            mins: mins,
        }));

        data.weeklyProgressData = weeklyProgressData;

        const heatmapData = {};
        data.yearPomoMins.forEach((entry) => {
            heatmapData[entry.date] = entry.minutes;
        });

        data.heatmapData = heatmapData;
        console.log(data);
        res.render('analytics', { data, message: null });
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        res.status(500).render('error', {
            message: 'Failed to fetch analytics data. Please try again later.',
        });
    }
}