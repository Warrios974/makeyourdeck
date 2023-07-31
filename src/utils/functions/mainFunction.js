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

export const sortByColors = (cards) => {

    const colors = {"W": 0, "U": 1, "B": 2, "R": 3, "G": 4, "M" : 5, "L" : 6}

    const color = (card) => {
        if (card.colors) {
            if (card.colors.length > 1) {
                return "M"
            }else{
                if (card.colors[0]) {
                    return card.colors[0]
                }else{
                    return "L"
                }
            }
        }else{
            if (card.card_faces[0].colors.length > 1) {
                return "M"
            }else{
                if (card.card_faces[0].colors[0]) {
                    return card.card_faces[0].colors[0]
                }else{
                    return "L"
                }
            }
        }
    }

    const sort = (a, b) => {

        const colorA = color(a)
        const colorB = color(b)

        return colors[colorA] - colors[colorB]
    }

    let sortData = cards.status === 404 ? cards : cards.sort(sort)

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