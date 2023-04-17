'use client';
import { useRouter } from 'next/navigation';
import { BoardTable } from './components/board-table';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
export default function Home() {
    const router = useRouter();
    return (
        <QueryClientProvider client={queryClient}>
            <div>
                <p>게시판</p>
                <button
                    onClick={() => {
                        router.push('/writing');
                    }}
                >
                    글쓰기
                </button>
            </div>

            <BoardTable />
        </QueryClientProvider>
    );
}
