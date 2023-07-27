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