import { useRouter } from 'next/router';
import { MainLayout } from '@/shared/ui/layout';
import { LearnDeck } from '@/features/learn-deck';

export default function Deck() {
    const router = useRouter();

    return (
        <MainLayout>
            <LearnDeck />
        </MainLayout>
    );
}
