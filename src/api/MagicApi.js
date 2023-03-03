const mtg = require('mtgsdk')

export const getAllCard = async () => {
        mtg.card.all()
            .on('data', function (card) {
            console.log(card.name)
            });
}