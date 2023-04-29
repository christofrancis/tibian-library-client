//saving login response (token and name) to session storage
export const authorization = (response, callback) => {
  if (window !== "undefined") {
    //converting javascript object to json
    sessionStorage.setItem(
      "adminToken",
      JSON.stringify(response.data.adminToken)
    );

    sessionStorage.setItem("user", JSON.stringify(response.data.name));
  }
  callback();
};

//accessing to ADMIN's user name from session storage
export const getAdminUser = () => {
  if (window !== "undefined") {
    if (
      (sessionStorage.getItem("user") &&
        sessionStorage.getItem("adminToken")) !== "undefined"
    ) {
      return JSON.parse(sessionStorage.getItem("user"));
    } else {
      return false;
    }
  }
};

//accessing ADMIN's token from session storage also converting json to javascript object
export const getAdminToken = () => {
  if (window !== "undefined") {
    if (sessionStorage.getItem("adminToken")) {
      return JSON.parse(sessionStorage.getItem("adminToken"));
    } else {
      return false;
    }
  }
};

//removing token from session storage
export const logout = (callback) => {
  if (window !== "undefined") {
    sessionStorage.removeItem("adminToken");
    sessionStorage.removeItem("modToken");
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("user");
  }
  callback();
};
