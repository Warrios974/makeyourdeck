export const theDeck = {
    name: null,
    author : null,
    visibility : null,
    cards : {
        mainDeck : [],
        reserve : []
    },
    isInit : false
}

export const deckBuild = async (deck) => {

    let currentDeck

    if (isVoid) {
        
        return 'Deck vide'
    }
    
    function isVoid(){

        const originDeck = JSON.parse(JSON.stringify(theDeck))
        
        const JSONDeck = JSON.stringify(deck)
        const JSONOriginDeck = JSON.stringify(originDeck)

        if (JSONDeck === JSONOriginDeck) return true

        return false

    }

    return currentDeck
}