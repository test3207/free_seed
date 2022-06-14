import { Client } from './interface';
export class QBClient implements Client {
    download = async (seedLink: string) => {
        fetch("http://localhost:8080/api/v2/torrents/add", {
            "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-language": "en,zh-CN;q=0.9,zh;q=0.8,en-US;q=0.7",
                "cache-control": "no-cache",
                "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryRRvk9t1h0Fryx5NE",
                "pragma": "no-cache",
                "upgrade-insecure-requests": "1",
                "cookie": "SID=Zgcw7KsGviHoUzhWveKg8yP/GpDEV11f",
                "Referer": "http://localhost:8080/download.html",
                "Referrer-Policy": "same-origin"
            },
            "body": `------WebKitFormBoundaryRRvk9t1h0Fryx5NE\r\nContent-Disposition: form-data; name=\"urls\"\r\n\r\n${seedLink}\r\n------WebKitFormBoundaryRRvk9t1h0Fryx5NE\r\nContent-Disposition: form-data; name=\"autoTMM\"\r\n\r\nfalse\r\n------WebKitFormBoundaryRRvk9t1h0Fryx5NE\r\nContent-Disposition: form-data; name=\"savepath\"\r\n\r\nD:\\pt\r\n------WebKitFormBoundaryRRvk9t1h0Fryx5NE\r\nContent-Disposition: form-data; name=\"cookie\"\r\n\r\n\r\n------WebKitFormBoundaryRRvk9t1h0Fryx5NE\r\nContent-Disposition: form-data; name=\"rename\"\r\n\r\n\r\n------WebKitFormBoundaryRRvk9t1h0Fryx5NE\r\nContent-Disposition: form-data; name=\"category\"\r\n\r\nchd_rss\r\n------WebKitFormBoundaryRRvk9t1h0Fryx5NE\r\nContent-Disposition: form-data; name=\"paused\"\r\n\r\nfalse\r\n------WebKitFormBoundaryRRvk9t1h0Fryx5NE\r\nContent-Disposition: form-data; name=\"contentLayout\"\r\n\r\nOriginal\r\n------WebKitFormBoundaryRRvk9t1h0Fryx5NE\r\nContent-Disposition: form-data; name=\"dlLimit\"\r\n\r\nNaN\r\n------WebKitFormBoundaryRRvk9t1h0Fryx5NE\r\nContent-Disposition: form-data; name=\"upLimit\"\r\n\r\nNaN\r\n------WebKitFormBoundaryRRvk9t1h0Fryx5NE--\r\n`,
            "method": "POST"
        });
        return true;
    }
    list = async (catelog?: string) => {
        return [];
    }
    delete = async (seedName: string) => {
        return true;
    }
}
