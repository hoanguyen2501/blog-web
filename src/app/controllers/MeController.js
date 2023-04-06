const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../utils/mongoose');

class MeController {
    // [GET] /me/storage/courses/
    show(req, res, next) {
        Course.find({})
            .then((courses) =>
                res.render('me/stored-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
        return;
    }
}

module.exports = new MeController();
