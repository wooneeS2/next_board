import { boardData, boardType } from '@/\bdata/board-data';
import { NextApiRequest, NextApiResponse } from 'next';
import { todayDate } from '@/utils/date';

export function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    switch (method) {
        case 'GET':
            res.status(200).json(boardData);
            break;

        case 'POST':
            const boardDatas: boardType = req.body;
            boardData.push({
                id: boardDatas.id,
                title: boardDatas.title,
                writer: boardDatas.writer,
                mainText: boardDatas.mainText,
                createDate: todayDate,
                editDate: '',
            });
            res.status(200).json(boardData);
            break;

        case 'PUT':
            const updatedBoard: boardType = req.body;
            const indexToUpdate: number = boardData.findIndex(
                board => board.id === updatedBoard.id
            );
            if (indexToUpdate === -1) {
                res.status(404).json({
                    message: '게시물이 존재하지 않습니다.',
                });
            } else {
                boardData[indexToUpdate] = {
                    id: updatedBoard.id,
                    title: updatedBoard.title,
                    writer: updatedBoard.writer,
                    mainText: updatedBoard.mainText,
                    createDate: boardData[indexToUpdate].createDate,
                    editDate: todayDate,
                };
                res.status(200).json(boardData);
            }
            break;

        case 'DELETE':
            const boardIdToDelete: number = req.body.id;
            const indexToDelete: number = boardData.findIndex(
                board => board.id === boardIdToDelete
            );
            if (indexToDelete === -1) {
                res.status(404).json({
                    message: '게시물이 존재하지 않습니다.',
                });
            } else {
                boardData.splice(indexToDelete, 1);
                res.status(200).json(boardData);
            }
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
            break;
    }
}
