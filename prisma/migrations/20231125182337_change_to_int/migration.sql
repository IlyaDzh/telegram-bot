/*
  Warnings:

  - You are about to alter the column `userId` on the `Deck` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `userId` on the `LearningDeck` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `User` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,
    CONSTRAINT "Deck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Deck" ("id", "name", "private", "userId") SELECT "id", "name", "private", "userId" FROM "Deck";
DROP TABLE "Deck";
ALTER TABLE "new_Deck" RENAME TO "Deck";
CREATE TABLE "new_LearningDeck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "deckId" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "LearningDeck_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "Deck" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "LearningDeck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_LearningDeck" ("deckId", "id", "userId") SELECT "deckId", "id", "userId" FROM "LearningDeck";
DROP TABLE "LearningDeck";
ALTER TABLE "new_LearningDeck" RENAME TO "LearningDeck";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "role" INTEGER NOT NULL
);
INSERT INTO "new_User" ("id", "name", "role", "username") SELECT "id", "name", "role", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
