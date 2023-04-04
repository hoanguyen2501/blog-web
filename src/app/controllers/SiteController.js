const Course = require('../models/Course');
const { mutilpleMongooseToObject } = require('../../utils/mongoose');

class SiteController {
    // [GET] /
    index(req, res) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: mutilpleMongooseToObject(courses),
                });
            })
            .catch((error) => next(error));
    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
