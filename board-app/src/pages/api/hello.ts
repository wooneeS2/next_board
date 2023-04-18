import { BoardType, boardData } from '@/data/board-data';
import { NextApiRequest, NextApiResponse } from 'next';

export function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {
        case 'GET':
            res.status(200).json(boardData);
            break;
        case 'POST':
            const article = req.body;
            boardData.push({
                id: boardData.length + 1,
                title: article.article.title,
                writer: '워니',
                mainText: article.article.mainText,
                createDate: '2022-09-09',
                editDate: '',
            });
            res.status(200).json(boardData);
            break;
        case 'PUT':
            const updatedBoard: BoardType = req.body;
            const indexToUpdate: number = boardData.findIndex(
                board => board.id === updatedBoard.id
            );
            if (indexToUpdate === -1) {
                res.status(200).json('게시물이 존재하지 않습니다.');
                break;
            } else {
                boardData[indexToUpdate] = {
                    id: updatedBoard.id,
                    title: updatedBoard.title,
                    writer: updatedBoard.writer,
                    mainText: updatedBoard.mainText,
                    createDate: boardData[indexToUpdate].createDate,
                    editDate: '2022-09-09',
                };
                res.status(200).json(boardData);
                break;
            }
        case 'DELETE':
            const boardIdToDelete: number = req.body.id;
            const indexToDelete: number = boardData.findIndex(
                board => board.id === boardIdToDelete
            );
            if (indexToDelete === -1) {
                res.status(200).json('게시물이 존재하지 않습니다.');
                break;
            } else {
                boardData.splice(indexToDelete, 1);
                res.status(200).json(boardData);
                break;
            }

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}

export default handler;
