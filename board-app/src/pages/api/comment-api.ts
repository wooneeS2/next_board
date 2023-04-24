import { boardData } from '@/data/board-data';
import { CommentType } from '@/type/types';
import { NextApiRequest, NextApiResponse } from 'next';

export type CommentParams = {
    comment: CommentType;
    articleId: number;
};

const postBoadList = (req: NextApiRequest, res: NextApiResponse) => {
    const commentsData: CommentParams = req.body;

    const indexToUpdateComment = boardData.findIndex(
        board => board.id === commentsData.articleId
    );
    if (indexToUpdateComment === -1) {
        return res.status(405).json('게시글이 존재하지 않습니다.');
    } else {
        boardData[indexToUpdateComment].comments.push(commentsData.comment);
    }

    return res.status(200).json(boardData);
};

function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    res.setHeader('Allow', ['POST']);
    if (method === 'POST') {
        postBoadList(req, res);
        return;
    } else {
        res.status(405).end(`Method ${method} Not Allowed`);
    }
}

export default handler;
