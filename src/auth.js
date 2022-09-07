import { baseURI } from "./config";
import moment from "moment";
class Auth {
  constructor() {
    this.userData = JSON.parse(localStorage.getItem("user_data"));
    this.authenticated =
      this.userData &&
      moment.utc(this.userData[".expires"]).local().isAfter(moment())
        ? true
        : false;
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      var myHeaders = new Headers();
      // myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      var urlencoded = new URLSearchParams();
      urlencoded.append("userName", credentials.email);
      urlencoded.append("Password", credentials.password);
      urlencoded.append("grant_type", "password");
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };

      fetch(`${baseURI}/token`, requestOptions)
        .then((response) => {
          response.text().then((res) => {
            res = JSON.parse(res);
            if (response.status === 200) {
              res[".expires"] = moment().add(moment.duration(3, "days"));
              localStorage.setItem("user_data", JSON.stringify(res));
              this.userData = res;
              this.authenticated = true;
              resolve(res);
            } else {
              reject(res);
            }
          });
        })

        .catch((err) => reject(err));
    });
  }
  clearLocalStorage() {
    if (localStorage.getItem("user_data")) {
      localStorage.removeItem("user_data");
    }
  }
  logout(cb) {
    this.authenticated = false;
    this.userData = null;
    this.twoFactorAuthData = null;
    this.clearLocalStorage();
    cb();
  }
  isAuthenticated() {
    return this.authenticated;
  }
}
export default new Auth();
