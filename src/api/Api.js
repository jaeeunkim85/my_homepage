import httpClient from "./httpClient";

export default {
  config: {
    header: {
      "Content-Type": "multipart/form-data",
    },
  },
  // 이미지 파일 업로드
  boardImageFiles: (files) => {
    const config = { header: { "Content-Type": "multipart/form-data" } };

    return httpClient.put(`/v1/file/upload`, files, config);
  },

  testapi: () => {
    return httpClient.get(`/v1/file/test`);
  },

  getCategory: () => {
    return httpClient.get(`/v1/blog/category`);
  },

  createBlog: (body) => {
    return httpClient.post(`/v1/blog/create`, body);
  },
  getCategoryList: (pageNo, pageSize, category) => {
    return httpClient.get(
      `/v1/blog/list?pageNo=${pageNo}&pageSize=${pageSize}&category=${category}`
    );
  },
  getBlogDetail: (id) => {
    return httpClient.get(`/v1/blog/${id}`);
  },
  editBlog: (body) => {
    return httpClient.post(`/v1/blog/edit`, body);
  },

  saveGuest: (body) => {
    return httpClient.post(`/v1/guest`, body);
  },

  getGuestList: (pageNo, pageSize) => {
    return httpClient.get(
      `/v1/guest/guestlist?pageNo=${pageNo}&pageSize=${pageSize}`
    );
  },

  updateGuestComment: (body) => {
    return httpClient.post(`/v1/guest/updateComment`, body);
  },

  deleteGuest: (body) => {
    return httpClient.post(`/v1/guest/deleteguest`, body);
  },

  updateGuest: (body) => {
    return httpClient.post(`/v1/guest/update`, body);
  },

  logining: () => {
    return httpClient.get(`/login/main`);
  },

  signupProcess: (body) => {
    return httpClient.post(`/v1/login/signup`, body);
  },
};
