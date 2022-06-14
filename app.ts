import cron from 'node-cron';
import { Chd } from './src/Tracker';
import { QBClient } from './src/Client';

const schedule = '0,30 * * * *';

const chd = new Chd();
const qb = new QBClient();

const run = async () => {
    const list = await chd.freeList();
    for (const seed of list) {
        qb.download(seed.seedLink);
    }
    console.log(`${Date.now()}, downloading ${list.length} torrents`);
    console.table(list);
}

cron.schedule(schedule, run);
run();

console.log(`app started`);
