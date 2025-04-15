const Rectangle = require('../models/rectangleModel');

exports.getRectangle = (req, res) => {
    res.render('rectangle', { perimeter: null });
};

exports.postRectangle = (req, res) => {
    const { width, height } = req.body;

    const rectangle = new Rectangle(Number(width), Number(height));
    const perimeter = rectangle.getPerimeter();

    res.render('rectangle', { perimeter });
};