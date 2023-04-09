const moment = require("moment");

function formatDateTimeFromMongoose(mongooseObject) {
    var documentKeys = mongooseObject._doc;
    for (const key in documentKeys) {
        var isDateType =
            Object.prototype.toString.call(documentKeys[key]) ===
            "[object Date]";
        if (isDateType) {
            documentKeys[key] = moment(documentKeys[key]).format(
                "DD-MM-YYYY | HH:mm:ss"
            );
        }
    }
}

module.exports = {
    multipleMongooseToObject: function (mongooses) {
        return mongooses.map((mongoose) => {
            formatDateTimeFromMongoose(mongoose);
            return mongoose.toObject();
        });
    },
    mongooseToObject: function (mongoose) {
        formatDateTimeFromMongoose(mongoose);
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
