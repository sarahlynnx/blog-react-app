const HOST = process.env.REACT_APP_SERVER_HOST || 'https://blog-server-8yo5.onrender.com';
export const getApiUrl = (endpoint) => `http://${HOST}${endpoint}`;
export const getBlogImageUrl = (postId, imageId) => {
    return `${getApiUrl(`/api/posts/${postId}/image/${imageId}`)}`;
};