import { useMutation, useQueryClient } from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { postBoardData } from '@/api/connect-api';

export type Article = {
    title: string;
    mainText: string;
};

const Writing = () => {
    const [article, setArticle] = useState<Article>({
        title: '',
        mainText: '',
    });
    const router = useRouter();

    const saveMutation = useMutation(postBoardData, {
        onSuccess: () => {
            router.push('/');
        },
    });

    return (
        <>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    saveMutation.mutate(article);
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
                <button type="submit">저장</button>
            </form>
        </>
    );
};

export default Writing;
