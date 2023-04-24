import { getArticleData, putArticleData } from '@/api/connect-api';
import { ArticleType, BoardType } from '@/type/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

export interface PutArticleParams {
    updatedArticle: ArticleType;
    articleId: number;
}

const EditArticle = () => {
    const router = useRouter();
    console.log(router.query);

    const articleId = Number(router.query.articleId);

    if (isNaN(articleId)) {
        throw new Error('Invalid articleId');
    }

    const response = useQuery(['getArticleData', articleId], ({ queryKey }) =>
        getArticleData(queryKey[1] as number)
    );

    const articleData = response.data as BoardType;
    const [updatedArticle, setUpdatedArticle] = useState<ArticleType>({
        title: articleData.title,
        mainText: articleData.mainText,
    });

    const putMutation = useMutation(
        (putData: PutArticleParams) => {
            return putArticleData(putData.updatedArticle, putData.articleId);
        },
        {
            onSuccess: () => {
                router.push('/');
            },
            onError: () => {
                alert('게시글을 수정할 수 없습니다.');
            },
        }
    );

    if (response.isLoading) {
        return <>Loading.....</>;
    }

    if (response.isError) {
        return <>Error...!</>;
    }

    return (
        <form
            onSubmit={e => {
                e.preventDefault();
                putMutation.mutate({
                    articleId,
                    updatedArticle,
                });
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button
                    type="button"
                    onClick={() => {
                        router.back();
                    }}
                >
                    이전
                </button>
                <input
                    type="text"
                    value={updatedArticle.title}
                    onChange={e => {
                        setUpdatedArticle(prevState => ({
                            ...prevState,
                            title: e.target.value,
                        }));
                    }}
                ></input>
                <p>{articleData.writer}</p>
                <p>{`${articleData.createDate}(${articleData.editDate})`}</p>
                <button type="submit">저장</button>
            </div>
            <textarea
                cols={40}
                rows={5}
                style={{ whiteSpace: 'pre-wrap' }}
                value={updatedArticle.mainText}
                onChange={e => {
                    setUpdatedArticle(prevState => ({
                        ...prevState,
                        mainText: e.target.value,
                    }));
                }}
            ></textarea>
        </form>
    );
};

export default EditArticle;
