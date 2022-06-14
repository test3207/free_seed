type Item = {
    hash: string,
}
export interface Client {
    download(seedLink:string): Promise<boolean>;
    list(): Promise<Item[]>;
    delete(hash:string): Promise<boolean>;
}
