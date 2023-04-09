const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../utils/mongoose");

class MeController {
    // [GET] /me/storage/courses/
    show(req, res, next) {
        Promise.all([
            Course.find({}).catch(next),
            Course.countDocumentsDeleted({}),
        ])
            .then(([courses, deletedCount]) => {
                res.render("me/stored-courses", {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GET] /me/trash/courses/
    trash(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render("me/trash", {
                    courses: multipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }
}

module.exports = new MeController();
