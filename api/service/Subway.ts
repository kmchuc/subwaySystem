import {prisma} from "../server";
import {shortestRoute} from "../util/shortestRoute";

export type Station = {
    id: number,
    name: string,
};

type Train = {
    name: string,
    trainLine: TrainLine
}

export type TrainLine = {
    stations: string[],
    name: string,
    fare: number,
};

type Route = {
    route: string[],
}

interface SubwayStation {
    name: string;
    neighbors: SubwayStation[];
}

interface Path {
    distance: number;
    previous: Path | null;
}


// getTrain queries for existing Train in db, if it doesn't exist, creates
export async function getTrain(trainName: string) {
    const trainLookUp = await prisma.train.findFirst({
        where: {
            name: trainName,
        },
        include: {
            trainLine: true,
        }
    });

    if (trainLookUp === null) {
        return prisma.train.create({
            data: {
                name: trainName,
            }
        });
    }

    return trainLookUp;
}

// getStation queries for existing Station in db, if it doesn't exist, create
async function getStation(stationName: string) {
    const stationLookUp = await prisma.station.findFirst({
        where: {
            name: stationName,
        }
    });

    if (stationLookUp === null) {
        return prisma.station.create({
            data: {
                name: stationName,
            },
        });
    }

    return stationLookUp;
}

// using Train name and Station name from lookup, create TrainLine in db
export async function upsertTrainLine(stations: string[], train: string, fare: number): Promise<TrainLine> {
    const trainLookUp = await getTrain(train);
    let stationsLookUp: Station[] = [];

    for (const station of stations) {
        const createdStation = await getStation(station);
        stationsLookUp.push(createdStation);
    }

    const upsertedTrainLine = await prisma.trainLine.upsert({
        where: {
            trainId: trainLookUp.id
        },
        create: {
            train: {
                connectOrCreate: {
                    where: {
                        id: trainLookUp.id
                    },
                    create: {
                        name: trainLookUp.name
                    },
                }
            },
            stations: {
                connectOrCreate: stationsLookUp.map(station => {
                    return {
                        where: {
                            id: station.id
                        },
                        create: {
                            name: station.name
                        }
                    }
                })
            },
            fare: fare
        },
        update: {
            stations: {
                connectOrCreate: stationsLookUp.map(station => {
                    return {
                        where: {
                            id: station.id
                        },
                        create: {
                            name: station.name
                        }
                    }
                }),
                update: stationsLookUp.map(station => {
                    return {
                        where: {
                            id: station.id
                        },
                        data: {
                            name: station.name
                        }
                    }
                })
            },
            fare: fare
        },
        include: {
            stations: true,
            train: true
        }
    });

    const stationNames: string[] = upsertedTrainLine.stations.map((station) => {
        return station.name;
    });

    return {stations: stationNames, name: upsertedTrainLine.train.name, fare: fare};
}

async function getAllTrainLines(): Promise<TrainLine[]> {
    try {
        const trainLines = await prisma.trainLine.findMany({
            include: {
                train: true,
                stations: true
            }
        });

        return trainLines.map((trainLine) => {
            const stationNames: string[] = [];
            trainLine.stations.map((station) => {
                return stationNames.push(station.name)
            });
            return {stations: stationNames, name: trainLine.train.name, fare: trainLine.fare}
        })
    } catch (e) {
        console.error('Error occurring while getting all train lines: ', e);
        throw e;
    }
}

export async function getRoute(origin: string, destination: string): Promise<Route> {
    const allTrainLines = await getAllTrainLines();

    try {
        const path = shortestRoute(allTrainLines, origin, destination);

        return {route: path};
    } catch (err) {
        console.error('Error occurred while finding path: ', err);
        throw err;
    }
}