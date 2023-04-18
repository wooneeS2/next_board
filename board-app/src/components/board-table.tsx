import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';
import { BoardType } from '@/data/board-data';
import { getBoardListData } from '@/api/connect-api';

export const BoardTable = () => {
    const router = useRouter();
    const response = useQuery(['getBoardListData'], getBoardListData);

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
                    {response.data.map((data: BoardType) => {
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
        </>
    );
};
