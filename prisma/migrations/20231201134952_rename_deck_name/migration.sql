/*
  Warnings:

  - You are about to drop the column `name` on the `Deck` table. All the data in the column will be lost.
  - Added the required column `title` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Deck" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL
);
INSERT INTO "new_Deck" ("category", "id") SELECT "category", "id" FROM "Deck";
DROP TABLE "Deck";
ALTER TABLE "new_Deck" RENAME TO "Deck";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
