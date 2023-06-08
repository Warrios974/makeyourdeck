import { getCards } from "../api/MagicApi"

export const theFilter = {
    name: null,
    oracle: null,
    set: null,
    formats: {
        standard : false,
        modern : false,
        commander : false,
    },
    order: {
        cmc: false,
        name: false,
        rarity: false,
        color: false
    },
    colors: {
        white : false,
        blue : false,
        black : false,
        red : false,
        green : false,
        colorless : false,
        multicolor : false,
    },
    rarities: {
        common : false,
        uncommon : false,
        rare : false,
        mythic : false,
    },
    types: {
        planeswalker : false,
        creature : false,
        instant : false,
        sorcery : false,
        enchantment : false,
        artifact : false,
        land : false,
        battle : false
    }
}

export async function search(filter){

    const apiURI = 'https://api.scryfall.com/cards/search?'

    const search = 'q='

    if (isVoid()) {

        const url = 'https://api.scryfall.com/cards/search?q=' + encodeURIComponent('-t:land')

        const cards = await getCards(url)
        
        return cards 

    }

    const formatURI = createURIFormat() + '+'

    if (filter.name !== null && filter.name !== '') {

        const url = apiURI + search + formatURI + encodeURIComponent(filter.name)

        const cards = await getCards(url)

        return cards 
        
    }

    const oracle = createURIOracle(filter.oracle)

    const notLand = filter.types.land === false ? '+' + encodeURIComponent('-t:land') : ''

    const colorsURI = createURIColors()

    const raritiesURI = createURIRarities()

    const typesURI = createURITypes()

    const orderURI = createURIOrder()


    // Pas oublier le plus + entre les differents catégorie sans encoder
    let url = apiURI + search + formatURI + colorsURI + raritiesURI + typesURI + oracle + notLand + orderURI

    const cards = await getCards(url)

    //functions
    function addAndConcatener(type,table,filter) {
        
        let URI = ''
        
        let list = []

        for (let index = 0; index < table.length; index++) {

            const element = table[index]

            //const regex = new RegExp("/" + tabColor[1] + "/g")

            if(filter[element[0]] === true) list.push(encodeURIComponent(element[1]))

            //if(colorsFilter[tabColor[0]] === false) colorsURI.replace(regex, '')
        }
        
        for (let index = 0; index < list.length; index++) {

            const element = list[index]
            
            if( index === 0 || index === list.length ) {
                URI += element
            }else{
                if(list.length > 1) URI += '+or+' + element
            }

        }

        return URI
    }

    function createURIColors(){

        const colorsFilter = filter.colors

        const colors = [
            ['white', 'c:w'],
            ['blue', 'c:u'],
            ['black', 'c:b'],
            ['red', 'c:r'],
            ['green', 'c:g'],
            ['colorless', 'c:c'],
            ['multicolor', 'c:m']
        ]

        const colorsURI = addAndConcatener('color',colors,colorsFilter)

        if(!colorsURI) return ''

        return `+(${colorsURI})`

    }

    function createURIRarities(){

        const raritiesFilter = filter.rarities

        const rarities = [
            ['common', 'r:common'],
            ['uncommon', 'r:uncommon'],
            ['rare', 'r:rare'],
            ['mythic', 'r:mythic']
        ]
        
        const raritiesURI = addAndConcatener('rarity',rarities,raritiesFilter)

        if(!raritiesURI) return ''

        return `+(${raritiesURI})`

    }
    
    function createURITypes(){

        const typesFilter = filter.types

        const types = [
            ['planeswalker', 't:planeswalker'],
            ['creature', 't:creature'],
            ['instant', 't:instant'],
            ['sorcery', 't:sorcery'],
            ['enchantment', 't:enchantment'],
            ['artifact', 't:artifact'],
            ['land', 't:land'],
            ['battle', 't:battle']
        ]
        
        const typesURI = addAndConcatener('type',types,typesFilter)

        if(!typesURI) return ''

        return `+(${typesURI})`

    }

    function createURIOrder(){

        const orderFilter = filter.order

        const order = [
            ['cmc', 'order:cmc'],
            ['name', 'order:name'],
            ['rarity', 'order:rarity'],
            ['color', 'order:color']
        ]
        
        const orderURI = addAndConcatener('order',order,orderFilter)
        
        if(!orderURI) return ''

        return `+${orderURI}`

    }

    function createURIFormat(){

        const formatsFilter = filter.formats

        const formats = [
            ['standard', 'f:standard'],
            ['modern', 'f:modern'],
            ['vintage', 'f:vintage'],
            ['commander', 'f:commander'],
            ['brawl', 'f:brawl'],
            ['duel', 'f:duel']
        ]
        
        const orderURI = addAndConcatener('formats',formats,formatsFilter)
        
        if(!orderURI) return ''

        return `${orderURI}`

    }

    function createURIOracle(params) {

        if (params === null || params === '') {
            return ''
        }else{
            return encodeURIComponent('fo:"' + filter.oracle+ '"')
        }

    }

    function isVoid(){

        const OriginFilters = { ...theFilter, colors:{...theFilter.colors}, rarities:{...theFilter.rarities} }

        const JSONFilters = JSON.stringify(filter)
        const JSONOriginFilters = JSON.stringify(OriginFilters)

        if (JSONFilters === JSONOriginFilters) return true

        return false

    }

    return cards
}

