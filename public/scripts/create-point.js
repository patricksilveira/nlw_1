function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    citySelect.InnerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true
    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false

        })
}


document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// Items de Coleta

//Pegar todos os LI
const itemsToCollect = document.querySelectorAll(".item-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

let selectedItem = []



function handleSelectedItem(event) {
    //adicionar ou remover classe no javascript
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    console.log('ITEM ID:', itemId)
        //Verificar items selecionados e pegar items.selected

    const alreadySelected = selectedItem.findIndex(item => {
        const itemFound = item === itemId
        return itemFound
    })
    if (alreadySelected >= 0) {
        //tirar da seleção
        const filteredItem = selectedItem.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItem = filteredItem
    } else {
        // Se não tiver, adicionar a seleçõa
        selectedItem.push(itemId)
    }
    //console.log(alreadySelected >= 0)
    //Se estiver selecionado, remover
console.log('selectedItems:', selectedItem)
    //Se estiver selecionado, tirar da seleção

    const collectedItems = document.querySelector("input[name=items]")

    //Atualizar o campo escondido\
    collectedItems.value = selectedItem
}