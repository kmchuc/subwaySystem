import { getCard, updateCardBalance } from "./Card";
import { saveEntranceRide, saveExitRide } from "./Ride";

type Transaction = {
    amount: number
};

export async function rideTransaction(cardNumber: string, station: string): Promise<Transaction> {
    try {
        const fare = 2.75;
        const card = await getCard(cardNumber);
        if (!card) {
            throw new Error(`Card number ${cardNumber} was not found`);
        }

        if (card.amount < fare) {
            throw new Error(`Insufficient balance for card ${cardNumber}`);
        }

        await saveEntranceRide(cardNumber, station, fare);
        const newBalance = card.amount - fare;
        await updateCardBalance(card.number, newBalance);

        return {amount: newBalance};
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function saveTransaction(cardNumber: string, station: string): Promise<Transaction>{
    try {
        const card = await getCard(cardNumber);
        if (!card) {
            throw new Error(`Card number ${cardNumber} not found`);
        }

        await saveExitRide(card.id, card.number, station);
        return { amount: card.amount }
    } catch (err) {
        throw new Error(`Error saving exit ride ${err}`);
    }
}