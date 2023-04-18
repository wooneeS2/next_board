import { boardData } from '@/data/board-data';
import { useRouter } from 'next/router';

const MainArticle = () => {
    //TODO 리액트쿼리 처리해주기
    //TODO 데이터 없을 때 처리해주기
    const router = useRouter();

    const articleParams = router.query.articleId;
    const articleId: number = Number(articleParams) - 1;

    if (!articleParams) {
        return <>게시물이 존재하지 않습니다.</>;
    }

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
