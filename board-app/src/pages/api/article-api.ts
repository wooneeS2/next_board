import { boardData } from './../../data/board-data';
import { NextApiRequest, NextApiResponse } from 'next';

const covertIdToNumber = (id: string) => {
    //쿼리로 받아오는건 string일 수 밖에 없어서 number로 먼저 변환
    //NaN 혹은 0이 반환될 수 도 있기 때문에 0보다 큰 수일 때만 numberId 리턴
    const numberId = Number(id);
    if (numberId > 0) {
        return numberId;
    }
    return -1;
};

export function handler(req: NextApiRequest, res: NextApiResponse) {
    const { articleId } = req.query;
    const index = boardData.findIndex(
        article => article.id === covertIdToNumber(articleId as string)
    );

    if (index === -1) {
        res.status(405).json({ message: 'Article not found' });
    } else {
        const article = boardData[index];
        res.status(200).json(article);
    }
}

export default handler;
