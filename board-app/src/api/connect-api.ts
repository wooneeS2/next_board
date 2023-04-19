import { Article } from '@/pages/writing';
import axios from 'axios';

//TODO 리턴타입 지정해주기
//low level에서 지정해주기
export const getBoardListData = async () => {
    const response = await axios.get('/api/api');
    return response.data;
};

export const postBoardData = async (article: Article) => {
    const response = await axios.post('/api/api', {
        article,
    });

    return response.data;
};

export const putArticleData = async (article: Article, articleId: number) => {
    const response = await axios.put('/api/api', {
        article,
        articleId,
    });
    return response.data;
};

export const deleteArticleData = async (articleId: number) => {
    const response = await axios.delete('/api/api', { data: { articleId } });
    return response.data;
};

export const getArticleData = async (articleId: number) => {
    const response = await axios.get(`/api/article-api?articleId=${articleId}`);
    return response.data;
};
