/*
  Warnings:

  - You are about to drop the column `private` on the `Deck` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Deck` table. All the data in the column will be lost.
  - Added the required column `category` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL
);
INSERT INTO "new_Deck" ("id", "name") SELECT "id", "name" FROM "Deck";
DROP TABLE "Deck";
ALTER TABLE "new_Deck" RENAME TO "Deck";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
