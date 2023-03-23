import {prisma} from "../server";

type Card = {
    id: number,
    number: string,
    amount: number,
}

async function createCard(number: string, amount: number): Promise<Card> {
    const newCard = await prisma.card.create({
        data: {
            number: number,
            amount: amount
        }
    });

    return { id: newCard.id, number: newCard.number, amount: newCard.amount };
}

export async function getCard(number: string): Promise<Card | null> {
    try {
        const foundCard = await prisma.card.findUnique({
            where: {
                number: number,
            }
        });

        if (!foundCard) {
            return null;
        }

        return { id: foundCard.id, number: foundCard.number, amount: foundCard.amount };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function updateCardBalance(number: string, newBalance: number): Promise<Card> {
    try {
        const updatedCard = await prisma.card.update({
            where: {
                number: number
            },
            data: {
                amount: newBalance
            }
        });

        return { id: updatedCard.id, number: updatedCard.number, amount: updatedCard.amount };
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function updateCard(number: string, amount: number): Promise<Card> {
    try {// check if card exists
        const existingCard = await getCard(number);
        // if card doesn't exist, create new card
        if (!existingCard) {
            const newCard = await createCard(number, amount);
            return newCard;
        }

        //if card does exist, update card balance with input amount
        const newBalance = amount + existingCard.amount;
        const updatedCard = await updateCardBalance(number, newBalance);
        return { id: updatedCard.id, number: updatedCard.number, amount: updatedCard.amount }
    } catch (err) {
        console.error(err);
        throw err;
    }
}
