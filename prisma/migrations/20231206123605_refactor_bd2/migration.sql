/*
  Warnings:

  - You are about to alter the column `learningDeckId` on the `Card` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `LearningDeck` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `LearningDeck` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "questionMode" TEXT NOT NULL DEFAULT 'text',
    "answer" TEXT NOT NULL,
    "answerMode" TEXT NOT NULL DEFAULT 'text',
    "deckId" TEXT NOT NULL,
    "learningDeckId" INTEGER,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_learningDeckId_fkey" FOREIGN KEY ("learningDeckId") REFERENCES "LearningDeck" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Card_learningDeckId_fkey" FOREIGN KEY ("learningDeckId") REFERENCES "LearningDeck" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("answer", "answerMode", "deckId", "id", "learningDeckId", "question", "questionMode") SELECT "answer", "answerMode", "deckId", "id", "learningDeckId", "question", "questionMode" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_LearningDeck" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "deckId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    CONSTRAINT "LearningDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LearningDeck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LearningDeck" ("deckId", "id", "userId") SELECT "deckId", "id", "userId" FROM "LearningDeck";
DROP TABLE "LearningDeck";
ALTER TABLE "new_LearningDeck" RENAME TO "LearningDeck";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
