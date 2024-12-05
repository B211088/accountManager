import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const fetchAccounts = () => axios.get(`${URL}/accounts`);
export const createAccount = (payload) =>
  axios.post(`${URL}/accounts`, payload);
export const updateAccount = (payload) =>
  axios.put(`${URL}/accounts/${payload._id}`, payload);

export const deleteAccount = (payload) =>
  axios.delete(`${URL}/accounts/${payload._id}`, payload);

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${URL}/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const downloadFile = async (filename) => {
  const response = await axios.get(`${URL}/download/${filename}`, {
    responseType: "blob",
  });

  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};

export const fetchFiles = async () => {
  try {
    const response = await axios.get(`${URL}/files`);
    return response.data;
  } catch (error) {
    console.error("Không thể lấy danh sách file", error);
    throw error;
  }
};
