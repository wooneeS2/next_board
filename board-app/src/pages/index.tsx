import { BoardTable } from '@/components/board-table';
import { useRouter } from 'next/navigation';

export default function Home() {
    const router = useRouter();
    return (
        <>
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
        </>
    );
}
