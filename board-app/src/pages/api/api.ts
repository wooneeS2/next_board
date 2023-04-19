import { BoardType, boardData } from '@/data/board-data';
import { NextApiRequest, NextApiResponse } from 'next';
import { Article } from '../writing';

type PutParams = {
    article: Article;
    articleId: number;
};

const getBoardListData = (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(200).json(boardData);
};

const postBoadList = (req: NextApiRequest, res: NextApiResponse) => {
    const { article } = req.body;
    boardData.push({
        id: boardData.length + 1,
        title: article.title,
        writer: '워니',
        mainText: article.mainText,
        createDate: '2022-09-09',
        editDate: '',
    });
    return res.status(200).json(boardData);
};

const putArticle = (req: NextApiRequest, res: NextApiResponse) => {
    const updatedBoard: PutParams = req.body;
    const indexToUpdate: number = boardData.findIndex(
        board => board.id === updatedBoard.articleId
    );
    if (indexToUpdate === -1) {
        return res.status(405).json('게시물이 존재하지 않습니다.');
    } else {
        boardData[indexToUpdate] = {
            id: updatedBoard.articleId,
            title: updatedBoard.article.title,
            writer: '워니',
            mainText: updatedBoard.article.mainText,
            createDate: boardData[indexToUpdate].createDate,
            editDate: '2022-09-09',
        };
        return res.status(200).json(boardData);
    }
};

const deleteArticle = (req: NextApiRequest, res: NextApiResponse) => {
    const { articleId } = req.body;
    const indexToDelete: number = boardData.findIndex(
        board => board.id === articleId
    );
    if (indexToDelete === -1) {
        return res.status(400).json('게시물이 존재하지 않습니다.');
    } else {
        boardData.splice(indexToDelete, 1);
        return res.status(200).json(boardData);
    }
};

export function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    if (method === 'GET') {
        getBoardListData(req, res);
        return;
    } else if (method === 'POST') {
        postBoadList(req, res);
        return;
    } else if (method === 'PUT') {
        putArticle(req, res);
        return;
    } else if (method === 'DELETE') {
        deleteArticle(req, res);
        return;
    }
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
}

export default handler;
