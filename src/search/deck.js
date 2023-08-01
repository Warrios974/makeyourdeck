import { getCards } from "../api/MagicApi"
import { checkCommanderType, isCommanderCard, isCommanderDeck, isLegalCard } from "../utils/functions/mainFunction"

export const theDeck = {
    name: null,
    author : null,
    public : null,
    type: null,
    image: null,
    cards : {
        mainDeck : []
    },
    isInit : false
}

export function deckBuild(deck) {

    const decktype = deck.type

    let localDeck = JSON.parse(JSON.stringify(deck))

    function addCard(card, typeSelect) {

        const currentCard = JSON.parse(JSON.stringify(card))

        if (typeSelect === 'commander' && currentCard && isLegalCard(card, decktype)) {
            
            let commanderCard = localDeck.cards.commander.cards
            
            let commanderType = localDeck.cards.commander.type
            
            let mainDeck = localDeck.cards.mainDeck.cards
            const cardInMainDeck = mainDeck.find(element => element.id === currentCard['id'])

            if (cardInMainDeck) {
                
                return localDeck
            }
            
            //si un deck commander car i peut etre un autre deck
            if (decktype === 'commander' || decktype === 'brawl') {

                const typeCommander = checkCommanderType(currentCard)
                const commanderCardName = currentCard.name
                
                if (!isCommanderCard(currentCard, decktype)) {
                
                    return localDeck
                }

                if (isCommanderCard(currentCard, decktype) && commanderCard.length === 0 && commanderType === null) {

                    // if (typeCommander === "Partner with") {
                    //     const getHerPartner = currentCard.all_parts.find((card) => (card.name !== commanderCardName && card.component === 'combo_piece') )
                    //     //const herPartnerUri = getHerPartner.uri
                    //     //const herPatner = await getCards(herPartnerUri)
                    //     commanderCard.push(currentCard)
                    //     //commanderCard.push(herPatner)
                    //     localDeck.cards.commander.type = typeCommander
                    //     return localDeck
                    // }

                    localDeck.cards.commander.type = typeCommander
                    commanderCard.push(currentCard)
                    return localDeck
                }

                if (commanderType === "Partner with" && commanderCard.length < 2) {
                    const getHerPartner = commanderCard[0].all_parts.find((card) => (card.name !== commanderCard[0].name && card.component === 'combo_piece') )
                    const namePartner = getHerPartner.name
                    if (commanderCardName !== namePartner) {
                        return localDeck
                    }
                    if (commanderCardName === namePartner) {
                        commanderCard.push(currentCard)
                        return localDeck
                    }
                }

                if (typeCommander === "Partner with" && commanderCard[0]) {
                    return localDeck
                }

                const commanderCardInDeckName = (commanderCard[0] && commanderCard[0].name) ? commanderCard[0].name : ''

                if (commanderCardName === commanderCardInDeckName) {
                    return localDeck
                }

                if (commanderType === 'normal') {
                    return localDeck
                }

                if (commanderCard.length === 2) {
                    return localDeck
                }

                commanderCard.push(currentCard)
                return localDeck
            }

            if (decktype === 'oathbreaker') {

                const typeCommander = checkCommanderType(currentCard)
                const commanderCardId = currentCard.id

                const isGoodCommanderCard = isCommanderCard(currentCard, decktype)
                
                if (!isGoodCommanderCard) {
                
                    return localDeck
                }
                
                if (isGoodCommanderCard) {
                    const isInCommanderZone = commanderCard.find((card) => card.id === commanderCardId)
                    if (isInCommanderZone) return localDeck
                    
                    const isInCommanderDeck = mainDeck.find((card) => card.id === commanderCardId)
                    if (isInCommanderDeck) return localDeck

                    const typeCard = currentCard.type_line.includes('Planeswalker') ? 'Planeswalker' : 
                        currentCard.type_line.includes('Socery') ? 'Socery' : 
                        currentCard.type_line.includes('Instant') ? 'Instant' : currentCard.type_line
                        
                    const alreadyHaveTypeCard = commanderCard.find((card) => card.type_line.includes(typeCard)) ? true : false
                    
                    if (commanderCard.length < 2 && alreadyHaveTypeCard) {
                        return localDeck
                    }

                    const typeCardsInCommandeZone = []

                    commanderCard.forEach((card) => {
                        const typeCard = currentCard.type_line.includes('Planeswalker') ? 'Planeswalker' : 
                            currentCard.type_line.includes('Socery') ? 'Socery' : 
                            currentCard.type_line.includes('Instant') ? 'Instant' : currentCard.type_line

                        typeCardsInCommandeZone.push(typeCard)
                    })

                    if (commanderCard.length < 2 && !alreadyHaveTypeCard) {
                        if (commanderCard.length === 0) {
                            if(typeCard === 'Planeswalker') localDeck.cards.commander.type = typeCommander
                            commanderCard.push(currentCard)
                            return localDeck
                        }
                        if (commanderCard.length > 0) {
                            if (typeCardsInCommandeZone.includes("Planeswalker")) {
                                commanderCard.push(currentCard)
                                return localDeck
                            }
                            
                            if (typeCardsInCommandeZone.includes("Instant") || typeCardsInCommandeZone.includes("Socery")) {
                                localDeck.cards.commander.type = typeCommander
                                commanderCard.push(currentCard)
                                return localDeck
                            }

                            return localDeck
                        }
                    }

                    if (commanderCard.length > 1) return localDeck
                }
            }
        }
        
        if (typeSelect === 'mainDeck' && currentCard && isLegalCard(card, decktype)) {

            let mainDeck = localDeck.cards.mainDeck.cards
            
            const cardInMainDeck = mainDeck.find(element => element.id === currentCard['id'])

            if (isCommanderDeck(decktype)) {

                let commanderCard = localDeck.cards.commander.cards
                const cardInCommandeZone = commanderCard.find(element => element.id === currentCard['id'])
                
                if (cardInCommandeZone) {
                
                    return localDeck
                }

                if (!cardInMainDeck) {
                    currentCard['quantity'] = 1
                    mainDeck.push(currentCard)
                    return localDeck
                }

                if (cardInMainDeck) return localDeck
            }

            if (!isCommanderDeck(decktype)) {

                let reserveDeck = localDeck.cards.reserve !== null && localDeck.cards.reserve.cards
    
                const cardInReserveDeck = reserveDeck.find(element => element.id === currentCard['id'])
    
                if (!cardInMainDeck) {
                    currentCard['quantity'] = 1
                    mainDeck.push(currentCard)
                    return localDeck
                }
                
                const cardsInMainDeck = cardInMainDeck.quantity 
                const cardsInReservenDeck = cardInReserveDeck !== undefined ? cardInReserveDeck.quantity : 0
    
                const totalCopiesCard = cardsInMainDeck + cardsInReservenDeck
        
                if (cardInMainDeck) {
                    if (localDeck.cards.numberExemple === 1) return localDeck
                    if (totalCopiesCard < 4) cardInMainDeck.quantity += 1
                    return localDeck
                }
            }
        }
        
        if (typeSelect === 'reserve' && currentCard && isLegalCard(card, decktype)) {

            let mainDeck = localDeck.cards.mainDeck.cards !== null && localDeck.cards.mainDeck.cards
            let reserveDeck = localDeck.cards.reserve.cards

            const cardInMainDeck = mainDeck.find(element => element.id === currentCard['id'])
            const cardInReserveDeck = reserveDeck.find(element => element.id === currentCard['id'])
    
            if (decktype === 'commander' || decktype === 'brawl') {

            }
            if (!cardInReserveDeck) {
                currentCard['quantity'] = 1
                reserveDeck.push(currentCard)
                return localDeck
            }
            
            const cardsInMainDeck = cardInMainDeck !== undefined ? cardInMainDeck.quantity : 0
            const cardsInReservenDeck = cardInReserveDeck.quantity

            const totalCopiesCard = cardsInMainDeck + cardsInReservenDeck
    
            if (cardInReserveDeck) {
                if (localDeck.cards.numberExemple === 1) return localDeck
                if (totalCopiesCard < 4) cardInReserveDeck.quantity += 1
                return localDeck
            }
            
        }

        return localDeck
    }

    function removeCard(card, typeSelect) {
        

        let cardId = card.id

        if (card && typeSelect === "mainDeck") {

            let mainDeck = localDeck.cards.mainDeck.cards
    
            const cardInMainDeck = mainDeck.find(element => element.id === cardId)
    
            if (cardInMainDeck) {
                if ((cardInMainDeck.quantity < 4 || cardInMainDeck.quantity === 4) && cardInMainDeck.quantity > 0) cardInMainDeck.quantity -= 1
                if (cardInMainDeck.quantity === 0) mainDeck = mainDeck.filter((element) => element.id !== card.id)
            }

            localDeck.cards.mainDeck.cards = mainDeck

            return localDeck
        }
        
        if (card && typeSelect === "commander") {

            let commander = localDeck.cards.commander

            const cardInMainDeck = commander.cards.find(element => element.id === cardId)
    
            if (cardInMainDeck) {
                commander.cards = commander.cards.filter((element) => element.id !== cardId)
            }

            if (commander.cards.length === 0) {
                commander.type = null
            }
        }

        if (card && typeSelect === "reserve") {

            let reserve = localDeck.cards.reserve.cards
    
            const cardInReserveDeck = reserve.find(element => element.id === cardId)
    
            if (cardInReserveDeck) {
                if ((cardInReserveDeck.quantity < 4 || cardInReserveDeck.quantity === 4) && cardInReserveDeck.quantity > 0) cardInReserveDeck.quantity -= 1
                if (cardInReserveDeck.quantity === 0) reserve = reserve.filter((element) => element.id !== card.id)
            }

            localDeck.cards.reserve.cards = reserve

            return localDeck
        }

        return localDeck
    }

    return {
        initDeck,
        addCard,
        removeCard
    }
}

export function initDeck(name, format, deck){


    const formatRoleDeck = {
        standard: {
            totalDeckCard : 60,
            reserveDeckCard: 15,
            commander: false,
            numberCopy: 4
        },
        modern : {
            totalDeckCard : 60,
            reserveDeckCard: 15,
            commander: false,
            numberCopy: 4
        },
        vintage : {
            totalDeckCard : 60,
            reserveDeckCard: 15,
            commander: false,
            numberCopy: 4
        },
        brawl : {
            totalDeckCard : 60,
            reserveDeckCard: 0,
            commander: true,
            numberCopy: 1
        },
        commander : {
            totalDeckCard : 100,
            reserveDeckCard: 0,
            commander: true,
            numberCopy: 1
        },
        duel : {
            totalDeckCard : 100,
            reserveDeckCard: 0,
            commander: true,
            numberCopy: 1
        },
        oathbreaker : {
            totalDeckCard : 60,
            reserveDeckCard: 0,
            commander: true,
            numberCopy: 1
        }
    }
    
    let localDeck = JSON.parse(JSON.stringify(deck))

    const nameDeck = name

    const formatDeck = format

    localDeck.name = nameDeck
    
    const roles = JSON.parse(JSON.stringify(formatRoleDeck[formatDeck]))

    let localCards = {
        commander : null,
        signature : null,
        mainDeck : null,
        reserve : null,
        numberExemple : null
    }

    if (roles.totalDeckCard) localCards.mainDeck = {cards: [], total : roles.totalDeckCard}
    if (roles.reserveDeckCard) localCards.reserve = {cards: [], total : roles.reserveDeckCard}
    if (roles.commander) localCards.commander = {type: null, cards: []}
    if (roles.numberCopy) localCards.numberExemple = roles.numberCopy

    localDeck.cards = localCards
    
    return localDeck
}