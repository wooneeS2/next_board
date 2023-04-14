'use client';
import { boardData } from '@/\bdata/board-data';
import { useRouter } from 'next/navigation';

export const BoardTable = () => {
    const router = useRouter();
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
                    {boardData.map(data => {
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
