import { QBClient } from "../Client";
import { parse } from 'node-html-parser';
import { config } from '../Config';

export type SeederSeedInfo = {
    size: number,
    seeder: number,
    downloader: number,
    seedLink: string,
};

export class Tlf {
    private totalSize:number = 0;
    private currentPage:number = 0;
    constructor (private targetSize:number = 500, private client:QBClient) {
        this.download();
    }
    private download:() => Promise<void> = async () => {
        while (this.totalSize < this.targetSize) {
            const list = await this.parseHtml(this.currentPage++);
            for (let i = 0; i < list.length; i++) {
                if (list[i].seeder > 1 && (list[i].seeder + list[i].downloader) < 8) {
                    await this.client.download(list[i].seedLink, 'tlf_count');
                    console.log(`downloading ${list[i].seedLink}, size ${list[i].size}GB, current downloading size ${this.totalSize}GB`);
                    this.totalSize += list[i].size;
                    if (this.totalSize >= this.targetSize) {
                        process.exit(0);
                    }
                }
            }
        }
    }

    private parseHtml:(page:number) => Promise<SeederSeedInfo[]> = async (page:number) => {
        const root = parse(await this.getRawHtml(page));
        const table = root.querySelector('.torrents');
        const nodes = table!.childNodes.filter((i) => {
            return i.nodeType === 1;
        }).slice(1);
        const seedList = nodes.map((node) => {
            const td = node.childNodes.filter((i) => {
                return i.nodeType === 1;
            });
            const [ _, __, commentTd, ___, sizeTd, seederTd, downloaderTd ] = td as unknown[] as HTMLElement[];

            const a = (commentTd.firstChild! as any).rawTagName === 'a' ? (commentTd.firstChild! as HTMLElement) : (commentTd.firstChild!.firstChild! as HTMLElement);
            const id = parseInt(a.getAttribute('href')!.match(/\d+/)![0]);
            const seedLink = `https://pt.eastgame.org/download.php?id=${id}&passkey=${config.trackerPasskey.tlf}`;

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

            return {
                size,
                seeder,
                downloader,
                seedLink,
            };
        });
        return seedList;
    }
    private getRawHtml = async (page:number) => {
        const res = await fetch(
            `https://pt.eastgame.org/torrents.php?team1=1&team2=1&incldead=0&spstate=0&inclbookmarked=0&search=&search_area=0&search_mode=0&sort=7&type=asc&page=${page}`,
            config.trackerRequestOption.tlf,
        );
        if (res.ok) {
            const rawHtml = await res.text();
            return rawHtml;
        } else {
            throw new Error('res is not ok');
        }
    }
}
