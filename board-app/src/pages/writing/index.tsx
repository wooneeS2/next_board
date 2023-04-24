import { useMutation } from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postBoardData } from '@/api/connect-api';
import { ArticleType } from '@/type/types';

const Writing = () => {
    const [article, setArticle] = useState<ArticleType>({
        title: '',
        mainText: '',
    });
    const router = useRouter();

    const saveMutation = useMutation(postBoardData, {
        onSuccess: () => {
            router.push('/');
        },
        onError: () => {
            alert('글 작성에 실패했습니다.');
        },
    });

    return (
        <>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    if (!saveMutation.isLoading) {
                        saveMutation.mutate(article);
                    }
                }}
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <input
                    type="text"
                    placeholder="제목을 입력해주세요."
                    onChange={e => {
                        setArticle(prevState => ({
                            ...prevState,
                            title: e.target.value,
                        }));
                    }}
                ></input>
                <textarea
                    cols={40}
                    rows={5}
                    placeholder="본문을 입력해주세요."
                    onChange={e => {
                        setArticle(prevState => ({
                            ...prevState,
                            mainText: e.target.value,
                        }));
                    }}
                ></textarea>
                <button type="submit" disabled={saveMutation.isLoading}>
                    저장
                </button>
            </form>
        </>
    );
};

export default Writing;
