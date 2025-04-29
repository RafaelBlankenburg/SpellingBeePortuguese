/*
  Warnings:

  - A unique constraint covering the columns `[user_id,challenge_id]` on the table `UserScore` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "UserScore_challenge_id_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "UserScore_user_id_challenge_id_key" ON "UserScore"("user_id", "challenge_id");
