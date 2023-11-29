-- CreateTable
CREATE TABLE "LearningDeck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deckId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    CONSTRAINT "LearningDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LearningDeck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "deckId" TEXT NOT NULL,
    "learningDeckId" TEXT,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_learningDeckId_fkey" FOREIGN KEY ("learningDeckId") REFERENCES "LearningDeck" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Card_learningDeckId_fkey" FOREIGN KEY ("learningDeckId") REFERENCES "LearningDeck" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Card_learningDeckId_fkey" FOREIGN KEY ("learningDeckId") REFERENCES "LearningDeck" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("answer", "deckId", "id", "question") SELECT "answer", "deckId", "id", "question" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "userId" BIGINT,
    CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deck" ("id", "name") SELECT "id", "name" FROM "Deck";
DROP TABLE "Deck";
ALTER TABLE "new_Deck" RENAME TO "Deck";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
