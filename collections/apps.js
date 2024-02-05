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
        // The user userId wants to update a document doc. (doc is the current version of the document from the database, without the proposed update.) Return true to permit the change.
        // fieldNames is an array of the (top-level) fields in doc that the client wants to modify, for example ['name', 'score'].
        // modifier is the raw Mongo modifier that the client wants to execute; for example, {$set: {'name.first': "Alice"}, $inc: {score: 1}}.
        update: function (userId, doc, fieldNames, modifier) {
            return true;
        },
        remove: function (userId, doc) {
            return true;
        }
    });
}

//HOOKS COLLECTION

// Fired before the doc is inserted.
// Allows you to modify doc as needed, or run additional functionality
// this.transform() obtains transformed version of document, if a transform was defined.
Apps.before.insert(function (userId, doc) {

});

// .before.update(userId, doc, fieldNames, modifier, options)
// Fired before the doc is updated.
// Allows you to to change the modifier as needed, or run additional functionality.
// this.transform() obtains transformed version of document, if a transform was defined.
// Important: Note that we are changing modifier, and not doc. Changing doc won't have any effect as the document is a copy and is not what ultimately gets sent down to the underlying update method.
Apps.before.update(function (userId, doc, fieldNames, modifier, options) {
    // modifier.$set = modifier.$set || {};
    // modifier.$set.modifiedAt = Date.now();
});

// .before.remove(userId, doc)
// Fired just before the doc is removed.
// Allows you to to affect your system while the document is still in existence -- useful for maintaining system integrity, such as cascading deletes.
// this.transform() obtains transformed version of document, if a transform was defined.
Apps.before.remove(function (userId, doc) {
    // ...
});

// .before.upsert(userId, selector, modifier, options)
// Fired before the doc is upserted.
// Allows you to to change the modifier as needed, or run additional functionality.
// this.transform() obtains transformed version of document, if a transform was defined.
// Note that calling upsert will always fire .before.upsert webhooks, but will call either .after.insert or .after.update webhooks depending on the outcome of the upsert operation. There is no such thing as a .after.upsert hook at this time.
Apps.before.upsert(function (userId, selector, modifier, options) {
    // modifier.$set = modifier.$set || {};
    // modifier.$set.modifiedAt = Date.now();
});

// .after.insert(userId, doc)
// Fired after the doc was inserted.
// Allows you to run post-insert tasks, such as sending notifications of new document insertions.
// this.transform() obtains transformed version of document, if a transform was defined;
// this._id holds the newly inserted _id if available.
Apps.after.insert(function (userId, doc) {
    // ...
});

// .after.update(userId, doc, fieldNames, modifier, options)
// Fired after the doc was updated.
// Allows you to to run post-update tasks, potentially comparing the previous and new documents to take further action.
// this.previous contains the document before it was updated.
// The optional fetchPrevious option, when set to false, will not fetch documents before running the webhooks. this.previous will then not be available. The default behavior is to fetch the documents.
// this.transform() obtains transformed version of document, if a transform was defined. Note that this function accepts an optional parameter to specify the document to transform — useful to transform previous: this.transform(this.previous).
// Important: If you have multiple webhooks defined, and at least one of them does not specify fetchPrevious: false, then the documents will be fetched and provided as this.previous to all hook callbacks. All after-update webhooks for the same collection must have fetchPrevious: false set in order to effectively disable the pre-fetching of documents.
///  It is instead recommended to use the collection-wide options (e.g. MyCollection.hookOptions.after.update = {fetchPrevious: false};).
Apps.after.update(function (userId, doc, fieldNames, modifier, options) {
    // ...
}, {fetchPrevious: true / false});

// Fired after the doc was removed.
// doc contains a copy of the document before it was removed.
// Allows you to to run post-removal tasks that don't necessarily depend on the document being found in the database (external service clean-up for instance).
// this.transform() obtains transformed version of document, if a transform was defined.
Apps.after.remove(function (userId, doc) {
    // ...
});

// .before.find(userId, selector, options)
// Fired before a find query.
// Allows you to to adjust selector/options on-the-fly.
Apps.before.find(function (userId, selector, options) {
    // ...
});

// .after.find(userId, selector, options, cursor)
// Fired after a find query.
//  Allows you to to act on a given find query. The cursor resulting from the query is provided as the last argument for convenience.
Apps.after.find(function (userId, selector, options, cursor) {
    // ...
});

// .before.findOne(userId, selector, options)
// Fired before a findOne query.
// Allows you to to adjust selector/options on-the-fly.
Apps.before.findOne(function (userId, selector, options) {
    // ...
});

// .after.findOne(userId, selector, options, doc)
// Fired after a findOne query.
// Allows you to to act on a given findOne query. The document resulting from the query is provided as the last argument for convenience.
Apps.after.findOne(function (userId, selector, options, doc) {
    // ...
});