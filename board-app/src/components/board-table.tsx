import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { getBoardListData } from '@/api/connect-api';
import { useState } from 'react';

const takeAllPageLength = (dataLength: number) => {
    if (dataLength % 10 > 1) {
        return Math.floor(dataLength / 10) + 1;
    }
    return Math.floor(dataLength / 10);
};

export const BoardTable = () => {
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState(1);
    const response = useQuery(
        ['getBoardListData', currentPage],
        ({ queryKey }) => getBoardListData(queryKey[1] as number)
    );
    const allPageLength = takeAllPageLength(
        response.data?.boardLength as number
    );

    const clickNextButton = () => {
        if (currentPage >= allPageLength) {
            return;
        }
        setCurrentPage(prev => {
            return prev + 1;
        });
    };
    const clickPrevButton = () => {
        if (currentPage <= 1) {
            return;
        }
        setCurrentPage(prev => {
            return prev - 1;
        });
    };

    const pagination = Array.from({ length: allPageLength }, (_, index) => (
        <button
            key={index}
            onClick={() => {
                setCurrentPage(index + 1);
            }}
            style={{
                color: currentPage === index + 1 ? 'blue' : 'black',
                border: 'none',
                backgroundColor: 'transparent',
            }}
        >
            {index + 1}
        </button>
    ));

    if (response.isLoading) {
        return (
            <>
                <p>Loading....</p>
            </>
        );
    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <td></td>
                        <th>아이디</th>
                        <th>제목</th>
                        <th>글쓴이</th>
                        <th>등록일</th>
                        <th>수정일</th>
                    </tr>
                </thead>

                <tbody>
                    {response.data?.boardData.map(data => {
                        return (
                            <tr
                                key={data.id}
                                onClick={() => {
                                    router.push(`/article/${data.id}`);
                                }}
                            >
                                <td></td>
                                <td>{data.id}</td>
                                <td>{data.title}</td>
                                <td>{data.writer}</td>
                                <td>{data.createDate}</td>
                                <td>
                                    {data.editDate === '' ? '-' : data.editDate}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <button
                    type="button"
                    onClick={clickPrevButton}
                    disabled={currentPage <= 1}
                >
                    이전 페이지
                </button>
                {pagination}
                <button
                    type="button"
                    onClick={clickNextButton}
                    disabled={currentPage >= allPageLength}
                >
                    다음 페이지
                </button>
            </div>
        </>
    );
};
