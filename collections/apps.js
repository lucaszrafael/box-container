Apps = new Mongo.Collection("Apps");


if (Meteor.isServer) {
    Meteor.publish("app", function (app_id) {
        return [
            Apps.find({_id: app_id})
        ]
    });
}


if (Meteor.isServer) {
    Apps.allow({
        insert: function (userId) {
            return true;
        },

        update: function (userId, doc, fieldNames, modifier) {
            return true;
        },
        remove: function (userId, doc) {
            return true;
        }
    });
}


Apps.before.insert(function (userId, doc) {
});

Apps.before.update(function (userId, doc, fieldNames, modifier, options) {
});

Apps.before.remove(function (userId, doc) {
});

Apps.before.upsert(function (userId, selector, modifier, options) {
});

Apps.after.insert(function (userId, doc) {   
});

Apps.after.update(function (userId, doc, fieldNames, modifier, options) {}, {fetchPrevious: true / false});

Apps.after.remove(function (userId, doc) {
});

Apps.before.find(function (userId, selector, options) {
});

Apps.after.find(function (userId, selector, options, cursor) {
});

Apps.before.findOne(function (userId, selector, options) {
});

Apps.after.findOne(function (userId, selector, options, doc) {
});