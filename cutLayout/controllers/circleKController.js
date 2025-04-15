const CircleK = require('../models/circleKModel');

exports.getCircleK = (req, res) => {
    res.render('circleK');
};

exports.postCircleK = (req, res) => {
    const radius = parseFloat(req.body.radius);
    if (isNaN(radius) || radius <= 0) {
        return res.status(400).send('Invalid radius');
    }
    const circumference = 2 * Math.PI * radius;
    const area = Math.PI * radius * radius;
    res.json({ circumference: circumference.toFixed(2), area: area.toFixed(2) });
};