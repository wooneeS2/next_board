import { ReactQueryProvider } from '@/components/provider/react-query';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ReactQueryProvider>
            <Component {...pageProps} />
        </ReactQueryProvider>
    );
}
