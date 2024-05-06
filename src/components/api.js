const HOST = 'localhost:3000';
export const getApiUrl = (endpoint) => `http://${HOST}${endpoint}`;
export const getBlogImageUrl = (postId, imageId) => {
    return `${getApiUrl(`/api/posts/${postId}/image/${imageId}`)}`;
};