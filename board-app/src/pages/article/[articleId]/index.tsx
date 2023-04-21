import { deleteArticleData, getArticleData } from '@/api/connect-api';
import { BoardType } from '@/data/board-data';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from 'react-query';

const MainArticle = () => {
    const router = useRouter();

    const articleParams = router.query.articleId;
    const articleId: number = Number(articleParams);

    const response = useQuery(['getArticleData', articleId], ({ queryKey }) =>
        getArticleData(queryKey[1] as number)
    );
    const deleteMutation = useMutation(
        (articleId: number) => {
            return deleteArticleData(articleId);
        },
        {
            onSuccess: () => {
                router.push('/');
            },
            onError: () => {
                alert('삭제에 실패했습니다.');
            },
        }
    );

    const articleData: BoardType = response.data;

    if (response.isLoading) {
        return <>Loading.....</>;
    }

    if (response.isError) {
        return <>Error...!</>;
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
                <p>{articleData.title}</p>
                <p>{articleData.writer}</p>
                <p>{`${articleData.createDate}(${articleData.editDate})`}</p>
                <button
                    onClick={() => {
                        router.push(`/article/${articleData.id}/edit`);
                    }}
                >
                    수정
                </button>
                <button
                    onClick={() => {
                        deleteMutation.mutate(articleData.id);
                    }}
                >
                    삭제
                </button>
            </div>
            <p style={{ whiteSpace: 'pre-wrap' }}>{articleData.mainText}</p>
        </>
    );
};

export default MainArticle;
