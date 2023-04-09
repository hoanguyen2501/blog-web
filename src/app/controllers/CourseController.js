const Course = require("../models/Course");
const { mongooseToObject } = require("../../utils/mongoose");

class CourseController {
    // [GET] /courses/:slug
    show(req, res, next) {
        var _slug = req.params.slug;
        Course.findOne({ slug: _slug })
            .then((course) =>
                res.render("courses/show", {
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
        return;
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render("courses/create");
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = { ...req.body };
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg`;

        Course.create(formData)
            .then(() => res.redirect("/me/storage/courses"))
            .catch((error) => {
                next(error);
            });
        return;
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        const id = req.params.id;
        Course.findById(id)
            .then((course) =>
                res.render("courses/edit", {
                    course: mongooseToObject(course),
                })
            )
            .catch(next);
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        const id = req.params.id;
        const formData = { ...req.body };
        Course.findByIdAndUpdate(id, formData)
            .then(() => res.redirect("/me/storage/courses"))
            .catch(next);
    }

    // [DELETE] /course/:id
    destroy(req, res, next) {
        const id = req.params.id;
        Course.delete({ _id: id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [DELETE] /course/:id/force
    forceDestroy(req, res, next) {
        const id = req.params.id;
        Course.deleteOne({ _id: id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        const id = req.params.id;
        Course.restore({ _id: id })
            .then(() => res.redirect("back"))
            .catch(next);
    }

    // [POST] /courses/handle-form-action
    handleFormAction(req, res, next) {
        var action = req.body.action;
        switch (action) {
            case "delete":
                Course.delete({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            case "restore":
                Course.restore({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            case "destroy":
                Course.deleteMany({ _id: { $in: req.body.courseIds } })
                    .then(() => res.redirect("back"))
                    .catch(next);
                break;
            default:
                res.json("Action is invalid!!!");
                break;
        }
    }
}

module.exports = new CourseController();
