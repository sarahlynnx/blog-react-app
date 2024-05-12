const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL || "https://blog-server-8yo5.onrender.com";
export const getApiUrl = (endpoint) => `${BASE_URL}${endpoint}`;
export const getBlogImageUrl = (postId, imageId) => {
    return `${getApiUrl(`/api/posts/${postId}/image/${imageId}`)}`;
}