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
