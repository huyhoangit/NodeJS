const CircleK = require('./models/circleKModel');

const circle = new CircleK(5);

console.log(`Perimeter of the circle: ${circle.getPerimeter()}`);
console.log(`Area of the circle: ${circle.getArea()}`);