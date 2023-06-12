export const theDeck = {
    name: null,
    author : null,
    public : null,
    type: null,
    cards : {
        mainDeck : []
    },
    isInit : false
}

export async function deckBuild(deck) {

    let currentDeck

    let localDeck = JSON.parse(JSON.stringify(deck))

    let mainDeck = localDeck.cards.mainDeck

    function addCard(card) {

        if (card) {

            const cardInMainDeck = mainDeck.find(element => element.id === card['id'])
    
            if (!cardInMainDeck) {
                card['quantity'] = 1
                mainDeck.push(card)
                return localDeck
            }
    
            if (cardInMainDeck) {
                if (localDeck.cards.numberExemple === 1) return localDeck
                if (cardInMainDeck.quantity < 4) cardInMainDeck.quantity += 1
                return localDeck
            }
    
        }
        return deck
    }

    function removeCard(card) {
        if (card) {
    
            const cardInMainDeck = mainDeck.find(element => element.id === card.id)
    
            if (cardInMainDeck) {
                if ((cardInMainDeck.quantity < 4 || cardInMainDeck.quantity === 4) && cardInMainDeck.quantity > 0) cardInMainDeck.quantity -= 1
                if (cardInMainDeck.quantity === 0) mainDeck = mainDeck.filter((element) => element.id !== card.id)
            }

            localDeck.cards.mainDeck = mainDeck

            return localDeck
        }

        return deck
    }

    return {
        currentDeck,
        addCard,
        removeCard
    }
}