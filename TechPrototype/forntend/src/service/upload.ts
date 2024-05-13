import { DUMMY_RESPONSE, PREFIX, ResponseData } from './common';

export async function imageUpload(data: File): Promise<ResponseData> {
    const url = `${PREFIX}/file/upload`;
    let res;
    const formData = new FormData();
    formData.append('file', data);

    try{
        let response = await fetch('http://localhost:8080/api/file/upload', {
            method: 'POST',
            body: formData,
            credentials: "include"
        });
        res = await response.json();

    } catch (e) {
        console.error(e);
        res = DUMMY_RESPONSE;
    }

    console.log(res);
    return res;
}
