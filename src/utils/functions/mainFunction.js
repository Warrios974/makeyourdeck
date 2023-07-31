export const isCommanderDeck = (type) => {

    const typeCommanderDeck = ['commander', 'duel', 'brawl', 'oathbreaker']

    let isCommadnerDeck = false

    for (let index = 0; index < typeCommanderDeck.length; index++) {
        const element = typeCommanderDeck[index];
        if (element === type) {
            isCommadnerDeck = true
        }
    }

    return isCommadnerDeck
}

export const isCommanderCard = (card, decktype) => {

    const type = card.type_line

    const isLegendary = (type && type.includes('Legendary Creature')) ? true : false

    const isLegal = (isLegendary && card.legalities[decktype]) === 'legal' ? true : false

    if (isLegendary && isLegal) {
        return true
    }

    return false
}

export const checkCommanderType = (card) => {

    const isPartner = card.keywords.find((keyword) => keyword === "Partner") 
    const isPartnerWith = card.keywords.find((keyword) => keyword === "Partner with")
    const isFriendForever = card.keywords.find((keyword) => keyword === "Friends forever")
    

    if (isPartnerWith) {
        return "Partner with"
    }
    
    if (isPartner) {
        return "Partner"
    }
    
    if (isFriendForever) {
        return "Friends forever"
    }

    return "normal"
}

export const multicolorsAtTheEnd = (cards) => {
    
    const sort = (a, b) => {

        const newA = a.colors ? a.colors.length : a.card_faces[1].colors.length
        const newB = b.colors ? b.colors.length : b.card_faces[1].colors.length

        return newA - newB
    }
    const sortData = cards.status === 404 ? cards : cards.sort(sort)

    return sortData
}

export const sortByCost = (cards) => {

    const costLand = cards.filter(card => card.cmc === 0 && card.type_line === 'land')
    const costZero = cards.filter(card => card.cmc === 0 && card.type_line !== 'land')
    const costOne = cards.filter(card => card.cmc === 1)
    const costTwo = cards.filter(card => card.cmc === 2)
    const costThree = cards.filter(card => card.cmc === 3)
    const costfour = cards.filter(card => card.cmc === 4)
    const costFive = cards.filter(card => card.cmc === 5)
    const costSixPlus = cards.filter(card => card.cmc > 5)

    return [
        costZero,
        costOne,
        costTwo,
        costThree,
        costfour,
        costFive,
        costSixPlus,
        costLand
    ]
}