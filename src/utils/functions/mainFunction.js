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

export const isLegalCard = (card, decktype) => {

    const typeCardLegalities = card.legalities

    const isLegalCard = typeCardLegalities[decktype] === 'legal' ? true : false

    return isLegalCard
}

export const isCommanderCard = (card, decktype) => {

    const type = card.type_line

    let isGoodCard

    if (decktype !== 'oathbreaker') {
        isGoodCard = (type && type.includes('Legendary Creature')) ? true : false
    }

    if (decktype === 'oathbreaker') {
        isGoodCard = (type && (type.includes('Planeswalker') || type.includes('Instant') || type.includes('Sorcery'))) ? true : false
    }

    const isLegal = (isGoodCard && card.legalities[decktype]) === 'legal' ? true : false

    if (isGoodCard && isLegal) {
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

export const typeCard = (card) => {

    if (card.type_line.includes('Planeswalker')) return 'Planeswalker'
    if (card.type_line.includes('Creature')) return 'Creature'
    if (card.type_line.includes('Enchantment')) return 'Enchantment'
    if (card.type_line.includes('Artefact')) return 'Artefact'
    if (card.type_line.includes('Battle')) return 'Battle'
    if (card.type_line.includes('Instant')) return 'Instant'
    if (card.type_line.includes('Sorcery')) return 'Sorcery'
    if (card.type_line.includes('Land')) return 'Land'

    return null
}

export const sortByColors = (cards) => {

    const colors = { "W": 0, "U": 1, "B": 2, "R": 3, "G": 4, "M": 5, "L": 6 }

    const color = (card) => {
        if (card.colors) {
            if (card.colors.length > 1) {
                return "M"
            } else {
                if (card.colors[0]) {
                    return card.colors[0]
                } else {
                    return "L"
                }
            }
        } else {
            if (card.card_faces[0].colors.length > 1) {
                return "M"
            } else {
                if (card.card_faces[0].colors[0]) {
                    return card.card_faces[0].colors[0]
                } else {
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

    const costLand = cards.filter(card => typeCard(card) === "Land" && card.cmc === 0)
    const costZero = cards.filter(card => card.cmc === 0 && typeCard(card) !== 'Land')
    const costOne = cards.filter(card => card.cmc === 1)
    const costTwo = cards.filter(card => card.cmc === 2)
    const costThree = cards.filter(card => card.cmc === 3)
    const costfour = cards.filter(card => card.cmc === 4)
    const costFive = cards.filter(card => card.cmc === 5)
    const costSixPlus = cards.filter(card => card.cmc > 5)

    return [
        {columnName: "0", cards: costZero},
        {columnName: "1",cards: costOne},
        {columnName: "2",cards: costTwo},
        {columnName: "3",cards: costThree},
        {columnName: "4",cards: costfour},
        {columnName: "5",cards: costFive},
        {columnName: "6",cards: costSixPlus},
        {columnName: "Land",cards: costLand}
    ]
}

export const sortByType = (cards) => {

    const typeCardOrder = {
        Planeswalker: 0,
        Creature: 1,
        Enchantment: 2,
        Artefact: 3,
        Battle: 4,
        Instant: 5,
        Sorcery: 6,
        Land: 7,
    }

    const sort = (a, b) => {
        return typeCardOrder[typeCard(a)] - typeCardOrder[typeCard(b)]
    }

    const sortData = cards.sort(sort)

    return sortData
}
