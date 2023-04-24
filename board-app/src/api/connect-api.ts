import {
    ArticleType,
    BoardType,
    CommentType,
    GetBoardType,
} from '@/type/types';
import axios, { AxiosResponse } from 'axios';

export const getBoardListData = async (
    currentPage: number
): Promise<GetBoardType> => {
    const response = await axios.get(`/api/api?pageno=${currentPage}`);
    return response.data;
};

export const postBoardData = async (
    article: ArticleType
): Promise<BoardType[]> => {
    const response = await axios.post('/api/api', {
        article,
    });

    return response.data;
};

export const putArticleData = async (
    article: ArticleType,
    articleId: number
): Promise<BoardType[]> => {
    const response = await axios.put('/api/api', {
        article,
        articleId,
    });
    return response.data;
};

export const deleteArticleData = async (
    articleId: number
): Promise<BoardType[]> => {
    const response = await axios.delete('/api/api', { data: { articleId } });
    return response.data;
};

export const getArticleData = async (articleId: number): Promise<BoardType> => {
    const response = await axios.get(`/api/article-api?articleId=${articleId}`);
    return response.data;
};

export const postComment = async (
    comment: CommentType,
    articleId: number
): Promise<BoardType[]> => {
    const response = await axios.post('/api/comment-api', {
        comment,
        articleId,
    });
    return response.data;
};
