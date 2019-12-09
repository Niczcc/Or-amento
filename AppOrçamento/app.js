class Despesa {
    constructor(ano, mes, dia, tipo, descricao, valor) {
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados() {
        for(let i in this) {
            if(this[i] == undefined || this[i] == '' || this[i] == null) {
                return false
            }
        }
        return true
    }
}

class Bd {
    constructor() {
        let id = localStorage.getItem('id')

        if(id === null) {
            localStorage.setItem('id', 0)
        } 
    }

    getProximoId() {
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1
    }

    gravar(d) {
        let id = this.getProximoId()

        localStorage.setItem(id, JSON.stringify(d))

        localStorage.setItem('id', id )
    }

    recuperarTodosRegistros() {

        let despesas = Array()

        let id = localStorage.getItem('id')
        //recuperar todas as despesas cadastradas no lcoalstorage
        for(let i = 1; i <= id; i++) {

            let despesa = JSON.parse(localStorage.getItem(i))

        //existe a possibilidade de haver indices que foram pulados/removidos
            if(despesa === null) {
                continue
            }
            despesas.push(despesa)
       }

       return despesas
    }

    pesuisar(despesa) {
        console.log(despesa)
    }
}

let bd = new Bd()

function cadastrarDespesa() {
    
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    let despesa = new Despesa(
        ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value
    )


    if(despesa.validarDados()) {
        bd.gravar(despesa)

        document.getElementById("modal_titulo").innerHTML = "Registro inserido com sucesso"
        document.getElementById("modal_titulo_div").className = "modal-header text-sucess"
        document.getElementById("modal_conteudo").innerHTML = "Despesa foi cadastrada com sucesso"
        document.getElementById("btn_modal").innerHTML = "Voltar e corrigir"
        document.getElementById("btn_modal").className = "btn btn-success"
        
        $('#registraDespesa').modal('show')

        ano.value = ''
        mes.value = ''
        dia.value = ''
        tipo.value = ''
        descricao.value = ''
        valor.value = ''



    } else {
        document.getElementById("modal_titulo").innerHTML = "Erro na inclusão do registro"
        document.getElementById("modal_titulo_div").className = "modal-header text-danger"
        document.getElementById("modal_conteudo").innerHTML = "Erro na gravação, verifique os campos preenchidos"
        document.getElementById("btn_modal").innerHTML = "Voltar e corrigir"
        document.getElementById("btn_modal").className = "btn btn-danger"
        $('#registraDespesa').modal('show')
    }
}

function consultaListaDespesas() {
    let despesas = Array()

    despesas = bd.recuperarTodosRegistros()
    
    //selecionando o elemento tbody da tabela
    var listasDespesas = document.getElementById('listaDespesas')

    //percorrer o array despesas dinamicamente
    despesas.forEach(function(d) {

        //criando a linha
        let linha = listasDespesas.insertRow()

        //criar as colunas
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
        //ajustar o tipo
        switch(d.tipo) {
            case '1': d.tipo = 'Alimentação'
                break
            case '2': d.tipo = 'Educação'
                break
            case '3': d.tipo = 'Lazer'
                break
            case '4': d.tipo = 'Saúde'
                break
            case '5': d.tipo = 'Transporte'
                break
        }
        linha.insertCell(1).innerHTML = d.tipo
        linha.insertCell(2).innerHTML = d.descricao
        linha.insertCell(3).innerHTML = d.valor

    })
}

function pesquisarDespesa() {
    let ano = document.getElementById('ano').value
    let mes = document.getElementById('mes').value
    let dia = document.getElementById('dia').value
    let tipo = document.getElementById('tipo').value
    let descricao = document.getElementById('descricao').value
    let valor = document.getElementById('valor').value

    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    bd.pesquisar(despesa)
}


