/*
  Warnings:

  - You are about to drop the column `fk_user_id` on the `Attendance` table. All the data in the column will be lost.
  - You are about to drop the column `present` on the `Attendance` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "UserAttendance" (
    "present" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "attendanceId" TEXT NOT NULL,

    PRIMARY KEY ("userId", "attendanceId"),
    CONSTRAINT "UserAttendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserAttendance_attendanceId_fkey" FOREIGN KEY ("attendanceId") REFERENCES "Attendance" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Attendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Attendance" ("createdAt", "date", "id", "updatedAt") SELECT "createdAt", "date", "id", "updatedAt" FROM "Attendance";
DROP TABLE "Attendance";
ALTER TABLE "new_Attendance" RENAME TO "Attendance";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
