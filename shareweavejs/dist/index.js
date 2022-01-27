import UserAPI from "./user";
export default class Shareweave {
    user;
    constructor() {
        this.user = new UserAPI();
    }
}
