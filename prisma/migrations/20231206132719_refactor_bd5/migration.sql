-- CreateTable
CREATE TABLE "_KnownCards" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_KnownCards_A_fkey" FOREIGN KEY ("A") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_KnownCards_B_fkey" FOREIGN KEY ("B") REFERENCES "LearningDeck" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_UnknownCards" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_UnknownCards_A_fkey" FOREIGN KEY ("A") REFERENCES "Card" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_UnknownCards_B_fkey" FOREIGN KEY ("B") REFERENCES "LearningDeck" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

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
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("answer", "answerMode", "deckId", "id", "learningDeckId", "question", "questionMode") SELECT "answer", "answerMode", "deckId", "id", "learningDeckId", "question", "questionMode" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_KnownCards_AB_unique" ON "_KnownCards"("A", "B");

-- CreateIndex
CREATE INDEX "_KnownCards_B_index" ON "_KnownCards"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UnknownCards_AB_unique" ON "_UnknownCards"("A", "B");

-- CreateIndex
CREATE INDEX "_UnknownCards_B_index" ON "_UnknownCards"("B");
