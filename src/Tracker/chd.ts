import { config } from '../Config';
import { parse } from 'node-html-parser';
import { SeedInfo, Tracker } from './interface';
import fs from 'fs';
import path from 'path';
const chdbitsHeaders = config.trackerHeaders;
const templatePath = path.resolve(__dirname, 'template.html');


export class Chd implements Tracker {
    public freeList = async () => {
        return await this.parseHtml();
    }
    private parseHtml:() => Promise<SeedInfo[]> = async () => {
        const root = parse(await this.getRawHtml());
        const table = root.querySelector('.torrents');
        const nodes = table!.childNodes.filter((i) => {
            return i.nodeType === 1;
        }).slice(1);
        const seedList = nodes.map((node) => {
            const td = node.childNodes.filter((i) => {
                return i.nodeType === 1;
            });
            const [ _, infoTd, __, ___, sizeTd, seederTd, downloaderTd, downloadedTd ] = td as unknown[] as HTMLElement[];
            const innerTd = infoTd.firstChild!.firstChild!.firstChild!;
            const span = (innerTd.childNodes as unknown as Node[]).filter((i) => {
                return i.nodeType === 1 && (i as any).rawTagName === 'span';
            })[0] as HTMLElement;
            const aliveTimeString = span && span.getAttribute ? span.getAttribute('title') : '-1'; // 2022-06-14 11:02:41
            const expire = Math.max(Math.floor((Number(new Date(aliveTimeString!)) - Number(Date.now())) / 1000), 0);

            const downloadLinkTd = infoTd.firstChild!.firstChild!.childNodes[1];
            const a = (downloadLinkTd.childNodes as unknown as Node[]).filter((i) => {
                return i.nodeType === 1 && (i as any).rawTagName === 'a';
            })[0] as HTMLElement;
            const downloadString = a && a.getAttribute ? a.getAttribute('href') : ''; // 'download.php?id=189194'
            const seedLink = `https://chdbits.co/${downloadString}&passkey=${config.passkey}`;

            const sizeString = sizeTd.textContent!;
            const size = sizeString.includes('TB') ?
            parseFloat(sizeString) * 1024 :
            sizeString.includes('MB') ?
            parseFloat(sizeString) / 1024 :
            sizeString.includes('GB') ?
            parseFloat(sizeString) :
            0;

            const seeder = parseInt(seederTd.textContent!);
            const downloader = parseInt(downloaderTd.textContent!);
            const downloaded = parseInt(downloadedTd.textContent!);

            return {
                size,
                seeder,
                downloader,
                downloaded,
                expire,
                seedLink,
            };
        });
        return seedList.filter((i) => {
            return i.downloaded === 0 && i.expire > 7200 && i.size < 100;
        });
    }
    private getRawHtml = async () => {
        if (!fs.existsSync(templatePath)) {
            const res = await fetch("https://chdbits.co/torrents.php", chdbitsHeaders);
            if (res.ok) {
                const rawHtml = await res.text();
                fs.writeFileSync(templatePath, rawHtml);
            } else {
                throw new Error('res is not ok');
            }
        }
        return fs.readFileSync(templatePath).toString();
    }
}
