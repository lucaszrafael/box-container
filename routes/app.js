Router.route('/:app_id', {

    name: 'app',


    template: '',

   
    layoutTemplate: '',

    loadingTemplate: 'loading',
    
    subscriptions: function () {
    
    
        this.subscribe('app', this.params.app_id).wait();

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