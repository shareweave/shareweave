import UserAPI from "./user"

export default class Shareweave {
  user: UserAPI

  constructor() {
    this.user = new UserAPI()
  }
}
