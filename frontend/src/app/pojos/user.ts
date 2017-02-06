

export class User {

    constructor( public firstname?: string, public lastname?: string, public picture_url?: string, public token?: string ) {}

    public persist() {
        localStorage.setItem("user", JSON.stringify(this));
    }

    public static clear() {
        localStorage.removeItem("user");
    }

    public static revive(data:any) {
        return new User(data.firstname, data.lastname, data.picture_url, data.token);
    }

    public static restore() {
        let data = localStorage.getItem("user");
        let user = null;
        try {
            let tmp = JSON.parse(data);
            user = User.revive(tmp);
        } catch(e) {}
        
        return user;
  }

}