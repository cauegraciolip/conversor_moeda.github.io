const btn = document.querySelector("input[name=btn]")
const select = document.querySelector('select[name=moeda]')

const converter = (insert, value) => {
    return insert * value
}

const transformArr = (nome, cotacao) => {
    return {nome, cotacao}
}

let valor = []

const showData = (element) => {

    const input = document.getElementById('text').value

    const selectValue = select.options[select.selectedIndex].value

    let valores

    for ( let i in element ) {
        valores = transformArr(element[i].code, JSON.parse((element[i].high)))
        valor.push(valores)
    }

    let resultado = (index) => {
        document.getElementById('content').innerHTML = `${valor[index].nome}${input} = R$${converter(input, valor[index].cotacao).toFixed(2)}`
    }

    if ( selectValue == "USD" ) {
        resultado(0)
    } else if (selectValue == "EUR") {
        resultado(1)
    } else {
        resultado(2)
    }

}

btn.addEventListener('click', () => {

    getAPI("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"
    ).then(console.log).catch(console.error)

})

const getAPI = (url) => {
    const promiseCB = (reject) => {
        fetch(url)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                showData(data)
            })
            .then(() => {
                valor = []

            })
            .catch(reject)
    }
    return new Promise(promiseCB)
} 
