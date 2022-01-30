import UserAPI from "./user";
export default class Shareweave {
    constructor() {
        this.user = new UserAPI();
    }
}
