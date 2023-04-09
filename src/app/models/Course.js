const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
const mongoose_delete = require("mongoose-delete");

const Schema = mongoose.Schema;

const Course = new Schema(
    {
        name: { type: String, maxLength: 255 },
        description: { type: String },
        image: { type: String },
        videoId: { type: String },
        slug: { type: String, slug: "name", unique: true },
        level: { type: String },
    },
    { timestamps: true }
);

const mongooseDeleteConfig = {
    deletedAt: true,
    overrideMethods: "all",
};

// Add plugin
mongoose.plugin(slug);
mongoose.plugin(mongoose_delete, mongooseDeleteConfig);

mongoose.set("strictQuery", false);
module.exports = mongoose.model("Course", Course);
