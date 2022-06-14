export enum HitRun {
    null,
    'h3',
    'h5',
}
export type SeedInfo = {
    hitRun?: HitRun,
    size: number, // GB
    seeder: number,
    downloader: number,
    downloaded: number,
    expire: number, // seconds
    seedLink: string,
    hash?: string,
}

export interface Tracker {
    freeList(): Promise<SeedInfo[]>;
}
