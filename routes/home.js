Router.route('/', {

    name: 'home',

    template: 'app',

    loadingTemplate: 'loading',

    subscriptions: function () {

    },
    waitOn: function () {
        import "/client/app/app.js"

    },

    data: function () {

    },

    onRun: function () {
        this.next()
    },
    onRerun: function () {
        this.next()
    },
    onBeforeAction: function () {
        this.render('loading')
        this.next()
    },
    onAfterAction: function () {
    },
    onStop: function () {
    },

    action: function () {
        this.render()
    }
});