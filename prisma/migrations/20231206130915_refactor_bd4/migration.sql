/*
  Warnings:

  - A unique constraint covering the columns `[deckId,userId]` on the table `LearningDeck` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LearningDeck_deckId_userId_key" ON "LearningDeck"("deckId", "userId");
