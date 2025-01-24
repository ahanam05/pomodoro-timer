module.exports.analytics_get = (req, res) => {
    res.render('analytics');
    //send the last 7 days' time from the time database for particular user to the frontend's chart.js implementation
    //send all the required data like hours focused last week, percentage inc/dec calculations, breaks taken so far through this. 
}