-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priorityId" INTEGER DEFAULT 0;

-- CreateTable
CREATE TABLE "Priority" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "Priority_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Priority_uuid_key" ON "Priority"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Priority_priority_key" ON "Priority"("priority");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_priorityId_fkey" FOREIGN KEY ("priorityId") REFERENCES "Priority"("id") ON DELETE SET NULL ON UPDATE CASCADE;
