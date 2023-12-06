-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "questionMode" TEXT NOT NULL DEFAULT 'text',
    "answer" TEXT NOT NULL,
    "answerMode" TEXT NOT NULL DEFAULT 'text',
    "deckId" TEXT NOT NULL,
    "learningDeckId" TEXT,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Card_learningDeckId_fkey" FOREIGN KEY ("learningDeckId") REFERENCES "LearningDeck" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Card_learningDeckId_fkey" FOREIGN KEY ("learningDeckId") REFERENCES "LearningDeck" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("answer", "answerMode", "deckId", "id", "learningDeckId", "question", "questionMode") SELECT "answer", coalesce("answerMode", 'text') AS "answerMode", "deckId", "id", "learningDeckId", "question", coalesce("questionMode", 'text') AS "questionMode" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE TABLE "new_User" (
    "id" BIGINT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 2
);
INSERT INTO "new_User" ("id", "name", "role", "username") SELECT "id", "name", "role", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
