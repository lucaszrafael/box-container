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

        //Trata os dados para devolver os tipos para o html de forma correta
        let items = data.items.map((item) => {

            if(item.type === "box"){
                item.box = true

                //Caso o box não tiver cor, deixa como orange
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
    //Adiciona um box ao container
    "click .btn_add_box": function (event, template) {
        event.stopPropagation()
        //Pega os dados do container
        let container = Template.instance().container_data.get()

        //Adiciona uma box aos itens do container
        container.items.push({type: "box"})

        //Atualiza os dados do container

        Template.instance().container_data.set(container)
    },
    //Adiciona um container ao container pai
    "click .btn_add_container": function (event, template) {
        event.stopPropagation()
        //Pega os dados do container
        let container = Template.instance().container_data.get()

        //Adiciona um container vazio aos itens do container pai
        container.items.push({type: "container", items: []})

        //Atualiza os dados do container

        Template.instance().container_data.set(container)
    },

    //Submete o formulário de construção do container
    "submit #build_form": function (event, template) {
        event.preventDefault()

        let build_data = $("#build_input").val()

        //Verifica se o input é um json válido
        try {

            //Remove as aspas duplas iniciais e finais da string
            build_data = build_data.replace(/^"(.*)"$/, '$1')

            let data_json = JSON.parse(build_data)


            //Atualiza os dados do container
            Template.instance().container_data.set(null)

            //Cria um delay para atualizar os dados do container
            Meteor.setTimeout(() => {
                template.container_data.set(data_json)
            }, 50)


        } catch (error) {
            alert("JSON inválido")
        }

    },

    //Imprime o json do container
    "click #print_json_btn": function (event, template) {
        //Pega os dados do container
        let data = Template.instance().container_data.get()

        //Transforma os dados em string
        let data_string = JSON.stringify(data, null, 2)

        //Imprime os dados no input json_print_input
        $("#json_print_input").val(data_string)
    },

    //Salva os dados do container no banco de dados
    "click #save_container_btn": function (event, template) {
        //Pega os dados do container
        let data = Template.instance().container_data.get()

        //Pega o id do app. Caso não tiver, cria um novo app. Caso tiver, atualiza os dados do app

        let app_id = Router.current().params.app_id

        if(app_id){
            //Atualiza os dados do app
            let result = Apps.update({_id: app_id}, {$set: data})

            if(result){
                window.alert("Dados atualizados com sucesso")
            } else{
                window.alert("Erro ao atualizar os dados")
            }
        } else{
            //Cria um novo app
            let app_id = Apps.insert(data)

            if(app_id){
                //Redireciona para a página do app
                Router.go("app", {app_id: app_id})
            }
        }
    },
});

Template.container.onRendered(function () {


});

Template.container.onCreated(function () {

    //Variavel que armazena todos os elementos do container. Se estiver na rota do app, pega os dados do container e passa os elementos do banco de dados

    let container_data

    //Todo Se tiver itens cadastrados, adiciona

    let app_id = Router.current().params.app_id

    if(app_id && this.data.main){
        container_data = Apps.findOne({_id: app_id})
        console.log("container_data", container_data)
    } else {
        //Se tiver dados no container, adiciona
        if (this.data && !this.data.main) {
            container_data = this.data
        }

        //Se for a rota principal, cria um container vazio
        if(this.data.main){
            container_data = {
                "type": "container", "items": []
            }
        }
    }



    Template.instance().container_data = new ReactiveVar(container_data)

    //Variável que controla a visibilidade dos botões container e box
    Template.instance().add_hover = new ReactiveVar(false)

});

Template.container.onDestroyed(function () {

});