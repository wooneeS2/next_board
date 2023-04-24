import {
    deleteArticleData,
    getArticleData,
    postComment,
} from '@/api/connect-api';
import { CommentParams } from '@/pages/api/comment-api';
import { BoardType, CommentType } from '@/type/types';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';

const MainArticle = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const articleParams = router.query.articleId;
    const articleId: number = Number(articleParams);

    const response = useQuery(['getArticleData', articleId], ({ queryKey }) =>
        getArticleData(queryKey[1] as number)
    );
    const articleData = response.data as BoardType;
    const [comment, setCommentObj] = useState<CommentType>({
        id: 2,
        writer: '워니',
        text: '',
    });
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

    const commentSaveMutation = useMutation(
        (postData: CommentParams) => {
            return postComment(postData.comment, postData.articleId);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('getArticleData');
                setCommentObj(prev => ({ ...prev, text: '' }));
            },
            onError: () => {
                alert('댓글 작성에 실패했습니다.');
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
            <hr />
            {articleData.comments.map(comments => {
                return (
                    <div
                        key={comments.id}
                        style={{ display: 'flex', flexDirection: 'row' }}
                    >
                        <p style={{ fontWeight: 'bold', marginRight: '10px' }}>
                            {comments.writer}
                        </p>
                        <p>{comments.text}</p>
                    </div>
                );
            })}
            <hr />
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!commentSaveMutation.isLoading) {
                        commentSaveMutation.mutate({ comment, articleId });
                    }
                }}
            >
                <input
                    type="text"
                    onChange={e => {
                        setCommentObj(prev => ({
                            ...prev,
                            text: e.target.value,
                        }));
                    }}
                    value={comment.text}
                />
                <button type="submit" disabled={commentSaveMutation.isLoading}>
                    등록
                </button>
            </form>
        </>
    );
};

export default MainArticle;
