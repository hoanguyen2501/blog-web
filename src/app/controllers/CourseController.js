const Course = require('../models/Course');
const { mongooseToObject } = require('../../utils/mongoose');

class CourseController {
    // [GET] /courses/:slug
    show(req, res) {
        var slug = req.params.slug;
        Course.findOne({ slug: slug })
            .then((course) =>
                res.render('courses/show', {
                    course: mongooseToObject(course),
                }),
            )
            .catch((error) => next(error));
    }
}

module.exports = new CourseController();
