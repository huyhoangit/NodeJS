class CircleK {
    constructor(r) {
        this.r = r;
    }

    getPerimeter() {
        return 2 * Math.PI * this.r;
    }
    getArea() {
        return Math.PI * this.r * this.r;
    }
}

module.exports = CircleK;