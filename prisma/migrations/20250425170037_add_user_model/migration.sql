/*
  Warnings:

  - A unique constraint covering the columns `[challenge_id,user_id]` on the table `UserScore` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[challenge_id,word,user_id]` on the table `UserWord` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `UserScore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `UserWord` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "UserScore_challenge_id_key";

-- DropIndex
DROP INDEX "UserWord_challenge_id_word_key";

-- AlterTable
ALTER TABLE "UserScore" ADD COLUMN     "user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserWord" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserScore_challenge_id_user_id_key" ON "UserScore"("challenge_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserWord_challenge_id_word_user_id_key" ON "UserWord"("challenge_id", "word", "user_id");

-- AddForeignKey
ALTER TABLE "UserWord" ADD CONSTRAINT "UserWord_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserScore" ADD CONSTRAINT "UserScore_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
