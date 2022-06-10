import { AxiosResponse } from 'axios';

class ApiRequest{
    public response: any = null;
    public responseText: any = null;
    public responseURL: string | null = null;
    public status: number = 0;
    public statusText: string = "";

    constructor(request: XMLHttpRequest){
        this.response = request.response;
        this.responseText = request.responseText;
        this.responseURL = request.responseURL;
        this.status = request.status;
        this.statusText = request.statusText;
    }
}

export default class ApiResponseModel{
    public data: any;
    public request: ApiRequest | null = null;
    public status: number = 0;

    constructor(request: AxiosResponse){
        this.data = request.data;
        this.request = new ApiRequest(request.request);
        this.status = request.status;
    }
}