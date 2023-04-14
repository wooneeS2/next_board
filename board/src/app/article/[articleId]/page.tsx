'use client';
import { boardData } from '@/\bdata/board-data';
import { useRouter, useParams } from 'next/navigation';

const MainArticle = () => {
    const params = useParams();
    const articleId: number = Number(params.articleId);
    return (
        <>
            <p>{boardData[articleId].title}</p>
            <p>{boardData[articleId].writer}</p>
            <p>{`${boardData[articleId].createDate}(${boardData[articleId].editDate})`}</p>
            <p style={{ whiteSpace: 'pre-wrap' }}>
                {boardData[articleId].mainText}
            </p>
        </>
    );
};

export default MainArticle;
