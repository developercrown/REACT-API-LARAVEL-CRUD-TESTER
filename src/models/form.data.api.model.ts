
class DataModel{
    public type: string = "";
    public attributes: any = {};

    constructor(type: string, attributes: any) {
        this.type = type;
        this.attributes = attributes;
    }
}

export default class FormDataAPI{
    public data: DataModel;
    constructor(type: string, attributes: any) {
        this.data = new DataModel(type, attributes);
    }
}

 // {
    //     "data":{
    //         "type": "user",
    //         "attributes": {
    //             "username": "isc.corona@upn164.edu.mx",
    //             "password": "10650149",
    //             "system": "sia"
    //         }
    //     }
    // }