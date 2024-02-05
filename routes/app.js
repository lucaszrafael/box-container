Router.route('/:app_id', {
    // The name of the route.
    // Used to reference the route in path helpers and to find a default template
    // for the route if none is provided in the "template" option. If no name is
    // provided, the router guesses a name based on the path '/post/:_id'
    name: 'app',

    // If we want to provide a specific RouteController instead of an anonymous
    // one we can do that here. See the Route Controller section for more info.
    // controller: 'CustomController',

    // If the template name is different from the route name you can specify it
    // explicitly here.
    template: '',

    // A layout_interno template to be used with this route.
    // If there is no layout_interno provided, a default layout_interno will
    // be used.
    layoutTemplate: '',

    // A declarative way of providing templates for each yield region
    // in the layout_interno
    // yieldRegions: {
    //     'MyAside': {to: 'aside'},
    //     'MyFooter': {to: 'footer'}
    // },

    //Loading Template
    loadingTemplate: 'loading',
    // a place to put your subscriptions
    subscriptions: function () {
        // this.subscribe('items');
        //
        // // add the subscription to the waitlist
        this.subscribe('app', this.params.app_id).wait();

    },

    // Subscriptions or other things we want to "wait" on. This also
    // automatically uses the loading hook. That's the only difference between
    // this option and the subscriptions option above.
    waitOn: function () {
        import "/client/app/app.js"
        // return Meteor.subscribe('post', this.params._id);
    },

    // A data function that can be used to automatically set the data context for
    // our layout_interno. This function can also be used by webhooks and plugins. For
    // example, the "dataNotFound" plugin calls this function to see if it
    // returns a null value, and if so, renders the not found template.
    data: function () {

    },

    // You can provide any of the hook options described below in the "Using
    // Hooks" section.
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
    // where: 'client' or 'server',

    // The same thing as providing a function as the second parameter. You can
    // also provide a string action name here which will be looked up on a Controller
    // when the route runs. More on Controllers later. Note, the action function
    // is optional. By default a route will render its template, layout_interno and
    // regions automatically.
    // Example:
    //  action: 'myActionFunction'
    action: function () {
        this.render()
    }
});