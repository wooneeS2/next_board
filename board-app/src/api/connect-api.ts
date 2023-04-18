import { Article } from '@/pages/writing';
import axios from 'axios';

export const getBoardListData = async () => {
    const response = await axios.get('/api/hello');
    return response.data;
};

export const postBoardData = async (article: Article) => {
    const response = await axios.post('/api/hello', {
        article,
    });

    return response.data;
};
