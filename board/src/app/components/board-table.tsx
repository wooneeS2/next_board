'use client';
import { boardType } from '@/\bdata/board-data';
import { useRouter } from 'next/navigation';
import { getBoardListData } from './api/connect-api';
import { useQuery } from 'react-query';
import { useEffect, useState } from 'react';

export const BoardTable = () => {
    const router = useRouter();
    const response = useQuery(['getBoardListData'], getBoardListData);
    const [boardListData, setBoardListData] = useState<boardType[]>([]);

    useEffect(() => {
        setBoardListData(response.data);
    }, [response.isLoading]);

    if (response.isLoading || !boardListData) {
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
                    {boardListData.map((data: boardType) => {
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
