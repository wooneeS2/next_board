'use client';
import { boardData } from '@/\bdata/board-data';
import { useRouter, useParams } from 'next/navigation';

const MainArticle = () => {
    const params = useParams();
    const router = useRouter();
    const articleId: number = Number(params.articleId);
    return (
        <>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button
                    onClick={() => {
                        router.back();
                    }}
                >
                    이전
                </button>
                <p>{boardData[articleId].title}</p>
                <p>{boardData[articleId].writer}</p>
                <p>{`${boardData[articleId].createDate}(${boardData[articleId].editDate})`}</p>
                <button>수정</button>
                <button>삭제</button>
            </div>
            <p style={{ whiteSpace: 'pre-wrap' }}>
                {boardData[articleId].mainText}
            </p>
        </>
    );
};

export default MainArticle;
