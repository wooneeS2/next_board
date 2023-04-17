import { boardData, boardType } from '@/\bdata/board-data';
import { todayDate } from '@/utils/date';
import { NextApiRequest } from 'next';

export async function GET(request: Request) {
    return new Response(JSON.stringify(boardData));
}

export async function POST(request: NextApiRequest) {
    const boardDatas: boardType = request.body;
    boardData.push({
        id: boardDatas?.id,
        title: boardDatas?.title,
        writer: boardDatas?.writer,
        mainText: boardDatas?.mainText,
        createDate: todayDate,
        editDate: '',
    });
    return new Response(JSON.stringify(boardData));
}

export async function PUT(request: NextApiRequest) {
    const updatedBoard: boardType = request.body;
    const indexToUpdate: number = boardData.findIndex(
        board => board.id === updatedBoard.id
    );
    if (indexToUpdate === -1) {
        return new Response('게시물이 존재하지 않습니다.');
    } else {
        boardData[indexToUpdate] = {
            id: updatedBoard.id,
            title: updatedBoard.title,
            writer: updatedBoard.writer,
            mainText: updatedBoard.mainText,
            createDate: boardData[indexToUpdate].createDate,
            editDate: todayDate,
        };
        return new Response(JSON.stringify(boardData));
    }
}

export async function DELETE(request: NextApiRequest) {
    const boardIdToDelete: number = request.body.id;
    const indexToDelete: number = boardData.findIndex(
        board => board.id === boardIdToDelete
    );
    if (indexToDelete === -1) {
        return new Response('게시물이 존재하지 않습니다.');
    } else {
        boardData.splice(indexToDelete, 1);
        return new Response(JSON.stringify(boardData));
    }
}
