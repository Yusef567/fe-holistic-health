import axios from "axios";

const apiInstance = axios.create({
  baseURL: "https://holistic-backend.onrender.com/api",
});

export const getCategories = async () => {
  try {
    const {
      data: { categories },
    } = await apiInstance.get("/categories");
    return categories;
  } catch (err) {
    throw err;
  }
};
