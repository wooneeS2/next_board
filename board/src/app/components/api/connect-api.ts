import axios from 'axios';

export const getBoardListData = async () => {
    const response = await axios.get('/api/hello');
    return response.data;
};
