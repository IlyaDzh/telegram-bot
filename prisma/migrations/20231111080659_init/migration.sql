-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "telegram_id" BIGINT NOT NULL,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_telegram_id_key" ON "User"("telegram_id");
