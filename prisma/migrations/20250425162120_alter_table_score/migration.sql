/*
  Warnings:

  - A unique constraint covering the columns `[challenge_id]` on the table `UserScore` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserScore_challenge_id_key" ON "UserScore"("challenge_id");
