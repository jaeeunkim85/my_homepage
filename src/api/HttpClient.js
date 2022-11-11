import Axios from "axios";

class HttpClient {
  static instance;

  constructor() {
    this.axiosInstance = Axios.create({
      baseURL: "http://127.0.0.1:5173/",
      headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
    });
    this.axiosInstance.interceptors.response.use(
      (response) => this.responseHandler(response),
      async (error) => {
        console.log("error.response.status " + error.response.status);
        if (
          error.response &&
          error.response.status === 400 &&
          error.response.data.message === "."
        ) {
          //sessionStorage.clear();
          //location.replace("/");
        }
        throw error;
      }
    );
  }

  responseHandler = async (response) => {
    return response;
  };

  static getInstance = () => {
    if (
      HttpClient.instance === null ||
      HttpClient.instance === undefined ||
      !(HttpClient.instance instanceof HttpClient)
    ) {
      HttpClient.instance = new HttpClient();
    }
    return HttpClient.instance.axiosInstance;
  };
}

export default HttpClient.getInstance();
