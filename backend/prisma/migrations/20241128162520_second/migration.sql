/*
  Warnings:

  - You are about to drop the column `email` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Posts` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Posts` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Posts` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Posts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Posts` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Posts_email_key";

-- AlterTable
ALTER TABLE "Posts" DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "subject" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Posts_title_key" ON "Posts"("title");
