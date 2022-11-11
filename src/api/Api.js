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
};
