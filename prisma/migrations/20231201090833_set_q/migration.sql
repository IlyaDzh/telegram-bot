-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "questionMode" TEXT DEFAULT 'text',
    "answer" TEXT NOT NULL,
    "answerMode" TEXT DEFAULT 'text',
    "deckId" TEXT NOT NULL,
    "learningDeckId" TEXT,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_learningDeckId_fkey" FOREIGN KEY ("learningDeckId") REFERENCES "LearningDeck" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Card_learningDeckId_fkey" FOREIGN KEY ("learningDeckId") REFERENCES "LearningDeck" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("answer", "answerMode", "deckId", "id", "learningDeckId", "question", "questionMode") SELECT "answer", "answerMode", "deckId", "id", "learningDeckId", "question", "questionMode" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
