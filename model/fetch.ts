export class GetResult {
    public status: boolean;
    public message: string;
    public data: any[];
    constructor() {
        this.status = false;
        this.message = "";
        this.data = [];
    }
}
