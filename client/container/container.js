import "./container.html"

Template.container.helpers({
    "status_buttons": () => {
        let status = Template.instance().add_hover.get()
        if(status){
            return "block"
        } else{
            return "none"
        }
    },
    "items": () => {
        let data = Template.instance().container_data.get()

        // console.log("data", data)

        if(!data) return

        // Treats the data to return the types to the HTML correctly
        let items = data.items.map((item) => {

            if(item.type === "box"){
                item.box = true

                // If the box doesn't have a color, set it to orange
                if(!item.color) item.color = "orange"

            } else{
                item.container = true
            }

            return item
        })

        console.log("items", items)

        return items

    },
});

Template.container.events({
    "mouseover .btn_area": (event, template) => {
        event.stopPropagation()
        Template.instance().add_hover.set(true)
    },
    "mouseout .btn_area": (event, template) => {
        event.stopPropagation()
        Template.instance().add_hover.set(false)
    },
    // Adds a box to the container
    "click .btn_add_box": function (event, template) {
        event.stopPropagation()
        // Gets the container data
        let container = Template.instance().container_data.get()

        // Adds a box to the container items
        container.items.push({type: "box"})

        // Updates the container data
        Template.instance().container_data.set(container)
    },
    // Adds a container to the parent container
    "click .btn_add_container": function (event, template) {
        event.stopPropagation()
        // Gets the container data
        let container = Template.instance().container_data.get()

        // Adds an empty container to the parent container items
        container.items.push({type: "container", items: []})

        // Updates the container data
        Template.instance().container_data.set(container)
    },

    // Submits the container build form
    "submit #build_form": function (event, template) {
        event.preventDefault()

        let build_data = $("#build_input").val()

        // Checks if the input is valid JSON
        try {

            // Removes the initial and final double quotes from the string
            build_data = build_data.replace(/^"(.*)"$/, '$1')

            let data_json = JSON.parse(build_data)


            // Updates the container data
            Template.instance().container_data.set(null)

            // Creates a delay to update the container data
            Meteor.setTimeout(() => {
                template.container_data.set(data_json)
            }, 50)


        } catch (error) {
            alert("Invalid JSON")
        }

    },

    // Prints the container JSON
    "click #print_json_btn": function (event, template) {
        // Gets the container data
        let data = Template.instance().container_data.get()

        // Converts the data to string
        let data_string = JSON.stringify(data, null, 2)

        // Prints the data in the json_print_input
        $("#json_print_input").val(data_string)
    },

    // Saves the container data to the database
    "click #save_container_btn": function (event, template) {
        // Gets the container data
        let data = Template.instance().container_data.get()

        // Gets the app ID. If not available, creates a new app. If available, updates the app data

        let app_id = Router.current().params.app_id

        if(app_id){
            // Updates the app data
            let result = Apps.update({_id: app_id}, {$set: data})

            if(result){
                window.alert("Data updated successfully")
            } else{
                window.alert("Error updating data")
            }
        } else{
            // Creates a new app
            let app_id = Apps.insert(data)

            if(app_id){
                // Redirects to the app page
                Router.go("app", {app_id: app_id})
            }
        }
    },
});

Template.container.onRendered(function () {


});

Template.container.onCreated(function () {

    // Variable that stores all the container elements. If on the app route, fetches container data and passes elements from the database

    let container_data

    // If there are registered items, add them

    let app_id = Router.current().params.app_id

    if(app_id && this.data.main){
        container_data = Apps.findOne({_id: app_id})
        console.log("container_data", container_data)
    } else {
        // If there is data in the container, add it
        if (this.data && !this.data.main) {
            container_data = this.data
        }

        // If it's the main route, create an empty container
        if(this.data.main){
            container_data = {
                "type": "container", "items": []
            }
        }
    }



    Template.instance().container_data = new ReactiveVar(container_data)

    // Variable that controls the visibility of container and box buttons
    Template.instance().add_hover = new ReactiveVar(false)

});

Template.container.onDestroyed(function () {

});
