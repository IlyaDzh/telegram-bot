-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "chatId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" INTEGER NOT NULL DEFAULT 2
);

-- CreateTable
CREATE TABLE "Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "question" TEXT NOT NULL,
    "questionMode" TEXT NOT NULL DEFAULT 'text',
    "answer" TEXT NOT NULL,
    "answerMode" TEXT NOT NULL DEFAULT 'text',
    "deckId" TEXT NOT NULL,
    CONSTRAINT "Card_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "LearningDeck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deckId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "LearningDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LearningDeck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "LearningDeck_deckId_userId_key" ON "LearningDeck"("deckId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "_KnownCards_AB_unique" ON "_KnownCards"("A", "B");

-- CreateIndex
CREATE INDEX "_KnownCards_B_index" ON "_KnownCards"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UnknownCards_AB_unique" ON "_UnknownCards"("A", "B");

-- CreateIndex
CREATE INDEX "_UnknownCards_B_index" ON "_UnknownCards"("B");
