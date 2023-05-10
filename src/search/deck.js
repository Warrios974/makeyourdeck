export const theDeck = {
    name: undefined,
    author : undefined,
    visibility : undefined,
    cards : {
        mainDeck : [],
        reserve : []
    }
}

export const buildDeck = async (deck) => {

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