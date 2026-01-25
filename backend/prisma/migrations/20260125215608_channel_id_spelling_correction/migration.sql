/*
  Warnings:

  - You are about to drop the column `channeId` on the `ChannelMember` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[channelId,userId]` on the table `ChannelMember` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `channelId` to the `ChannelMember` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChannelMember" DROP CONSTRAINT "ChannelMember_channeId_fkey";

-- DropIndex
DROP INDEX "ChannelMember_channeId_userId_key";

-- AlterTable
ALTER TABLE "ChannelMember" DROP COLUMN "channeId",
ADD COLUMN     "channelId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ChannelMember_channelId_userId_key" ON "ChannelMember"("channelId", "userId");

-- AddForeignKey
ALTER TABLE "ChannelMember" ADD CONSTRAINT "ChannelMember_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE CASCADE ON UPDATE CASCADE;
