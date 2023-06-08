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

export async function deckBuild(deck,cards) {

    let currentDeck

    let localDeck = JSON.parse(JSON.stringify(deck))

    let mainDeck = localDeck.cards.mainDeck

    function addCard(cardId) {

        if (cardId && localDeck.cards.numberExemple > 1) {
    
            const cardInMainDeck = mainDeck.find(card => card.id === cardId)
            
            const isInMainDeck = cardInMainDeck ? true : false
    
            if (!isInMainDeck) {
                const card = cards.find(card => card.id === cardId)
                card.quantity = 1
                mainDeck.push(card)
            }
    
            if (isInMainDeck) {
                if (cardInMainDeck.quantity < 4) cardInMainDeck.quantity += 1
            }

            return localDeck
        }

        return deck
    }

    function removeCard(cardId) {
        if (cardId && localDeck.cards.numberExemple > 1) {
    
            const cardInMainDeck = mainDeck.find(card => card.id === cardId)
            
            const isInMainDeck = cardInMainDeck ? true : false
    
            if (isInMainDeck) {
                if ((cardInMainDeck.quantity < 4 || cardInMainDeck.quantity === 4) && cardInMainDeck.quantity > 0) cardInMainDeck.quantity -= 1
                if (cardInMainDeck.quantity === 0) mainDeck = mainDeck.filter((card) => card.id !== cardId)
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