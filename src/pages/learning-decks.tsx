import { MainLayout } from '@/shared/ui/layout';
import { LearningDeckList } from '@/features/learning-deck-list';

export default function LearningDecks() {
    return (
        <MainLayout>
            <LearningDeckList />
        </MainLayout>
    );
}
