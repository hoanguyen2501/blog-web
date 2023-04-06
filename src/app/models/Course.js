const mongoose = require('mongoose');
const slug = require('mongoose-slug-updater');

const Schema = mongoose.Schema;
mongoose.plugin(slug);

const Course = new Schema(
    {
        name: { type: String, maxLength: 255 },
        description: { type: String },
        image: { type: String },
        videoId: { type: String },
        slug: { type: String, slug: 'name', unique: true },
        level: { type: String },
    },
    { timestamps: true },
);

module.exports = mongoose.model('Course', Course);
