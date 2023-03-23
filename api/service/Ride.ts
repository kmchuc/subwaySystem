import {prisma} from "../server";

type Ride = {
    id?: number,
    card: string,
    enterStation: string,
    exitStation?: string,
    fare: number,
}

async function getRide(cardId: number, cardNumber: string): Promise<Ride> {
    try {
        const fare = 2.75
        // in a perfect world users enter and exit through turnstile
        // but sometimes exit through emergency exit so decided to use
        // findMany to return array of rows in table for ride with null/undefined exit station
        // and use last instance
        const rides = await prisma.ride.findMany({
            where: {
                cardId: cardId,
                exitStation: {
                    name: undefined
                }
            },
            include: {
                card: true,
                enterStation: true,
            }
        });

        if (rides.length === 0) {
            throw new Error(`Failed to find rides using ${cardNumber}`)
        }

        const lastRide = rides[rides.length - 1];

        return {id: lastRide.id, card: lastRide.card.number, enterStation: lastRide.enterStation.name, fare: fare}
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function saveEntranceRide(cardNumber: string, enterStation: string, fare: number): Promise<void> {
    await prisma.ride.create({
        data: {
            card: {
                connect: {
                    number: cardNumber
                }
            },
            enterStation: {
                connectOrCreate: {
                    where: {
                        name: enterStation
                    },
                    create: {
                        name: enterStation
                    }
                }
            },
            fare: fare
        },
        include: {
            card: true,
            enterStation: true
        }
    });
}

export async function saveExitRide(cardId: number, cardNumber: string, exitStation: string): Promise<void> {
    try {
        const ride = await getRide(cardId, cardNumber);

        await prisma.ride.update({
            where: {
                id: ride.id
            },
            data: {
                exitStation: {
                    connectOrCreate: {
                        where: {
                            name: exitStation
                        },
                        create: {
                            name: exitStation
                        }
                    }
                }
            }
        })
    } catch (err) {
        console.error(err);
        throw err;
    }
}
