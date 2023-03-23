import express from 'express';
import { PrismaClient } from '@prisma/client'
import { getRoute, upsertTrainLine } from "./service/Subway";
import { updateCard } from './service/Card';
import { rideTransaction, saveTransaction } from "./service/Transaction";

const server = express()
const port = 3000

export const prisma = new PrismaClient()

async function main() {
    server.use(express.json());

    server.post('/train-line', async (req, res) => {
        const train = req.body.name;
        const stations = req.body.stations;
        const fare = Number(req.body.fare);

        // station or train name isn't included
        if (!train || !stations || !fare) return console.error(400, 'train/stations/fare required');

        const trainLine = await upsertTrainLine(stations, train, fare);

        res.send(trainLine);
    })

    server.get('/route', async (req, res) => {
        const origin = req.query.origin;
        const destination = req.query.destination;

        // origin or destination isn't included
        if (!origin || !destination) return console.error(400, 'origin/destination required');

        const shortestTrainLine = await getRoute(origin.toString(), destination.toString());

        res.send(shortestTrainLine)
    })

    server.post('/card', async (req, res) => {
        const number = req.body.number;
        const amount = req.body.amount;

        // origin or destination isn't included
        if (!number || !amount) return console.error(400, 'number/amount required');

        const card = await updateCard(number, amount);

        res.send({ "number": card.number, "amount": card.amount });
    })

    server.post('/station/:station/enter', async (req, res) => {
        const station = req.params.station;
        const cardNumber = req.body.card_number;

        // if station or cardNumber isn't in request
        if (!station || !cardNumber) return console.error(400, 'station/cardNumber required');

        const balance = await rideTransaction(cardNumber, station);

        res.send(balance);
    })

    server.post('/station/:station/exit', async (req, res) => {
        const station = req.params.station;
        const cardNumber = req.body.card_number;

        // if station or cardNumber isn't in request
        if (!station || !cardNumber) return console.error(400, 'station/cardNumber required');

        const balance = await saveTransaction(cardNumber, station);

        res.send(balance);
    })

    server.listen(port, () => {
        console.log(`Subway app listening on port ${port}`)
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })