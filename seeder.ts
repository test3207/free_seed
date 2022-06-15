import { QBClient } from "./src/Client";
import { Tlf } from "./src/Seeder/tlf";

new Tlf(500, new QBClient());
console.log(`processing`);
