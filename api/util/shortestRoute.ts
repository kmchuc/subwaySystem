import {TrainLine} from "../service/Subway";

interface SubwayStation {
    name: string;
    distance: number;
    previous: SubwayStation | null;
}

export function shortestRoute(trainLines: TrainLine[], origin: string, destination: string): string[] {
    const allStations: SubwayStation[] = [];
    let startStation: SubwayStation | undefined;
    let endStation: SubwayStation | undefined;

    // Initialize all stations with infinite distance and null previous
    for (const line of trainLines) {
        for (const station of line.stations) {
            const s: SubwayStation = { name: station, distance: Infinity, previous: null };
            allStations.push(s);

            if (station === origin) {
                startStation = s;
                startStation.distance = 0;
            }

            if (station === destination) {
                endStation = s;
            }
        }
    }

    console.log('allStations', allStations);

    if (!startStation || !endStation) {
        throw new Error("Origin or destination not found");
    }

    const unvisited: SubwayStation[] = [...allStations];

    while (unvisited.length > 0) {
        // Find station with the smallest distance
        const current: SubwayStation = unvisited.reduce((prev, current) => prev.distance < current.distance ? prev: current);
        console.log('current', current);
        unvisited.splice(unvisited.indexOf(current), 1);

        // Stop if destination is reached
        if (current === endStation) {
            break;
        }

        // Update distances of neighboring stations
        for (const line of trainLines) {
            if (line.stations.includes(current.name)) {
                const currentIndex = line.stations.indexOf(current.name);

                // Check previous station
                if (currentIndex > 0) {
                    const prevStation = allStations.find(s => s.name === line.stations[currentIndex - 1])!;
                    console.log('current.distance', current.distance);
                    const newDistance = current.distance + 1;
                    console.log('newDistance', newDistance);
                    if (newDistance < prevStation.distance) {
                        prevStation.distance = newDistance;
                        prevStation.previous = current;
                    }
                }

                // Check next station
                if (currentIndex < line.stations.length - 1) {
                    const nextStation = allStations.find(s => s.name === line.stations[currentIndex + 1])!;
                    const newDistance = current.distance + 1; // Distance between two stations is 1
                    if (newDistance < nextStation.distance) {
                        nextStation.distance = newDistance;
                        nextStation.previous = current;
                    }
                }
            }
        }

        console.log('allStations', allStations);
    }

    // Build route from end station to start station
    const route: string[] = [];
    let current = endStation;
    while (current) {
        route.unshift(current.name);
        // @ts-ignore
        current = current.previous;
    }

    if (route[0] !== origin) {
        throw new Error("Route could not be found");
    }

    return route;
}