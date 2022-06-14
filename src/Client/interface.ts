type Item = {
    hash: string,
}
interface Client {
    download(seedLink:string): Promise<boolean>;
    list(): Promise<Item[]>;
    delete(hash:string): Promise<boolean>;
}
