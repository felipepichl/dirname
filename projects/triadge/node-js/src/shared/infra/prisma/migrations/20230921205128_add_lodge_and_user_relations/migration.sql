/*
  Warnings:

  - You are about to drop the column `fk_address_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fk_lodge_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Lodge` table. All the data in the column will be lost.
  - Added the required column `adminUserId` to the `Lodge` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "phoneNumber" TEXT NOT NULL,
    "avatar" TEXT,
    "role" TEXT,
    "level" TEXT,
    "startDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "fkAddressId" TEXT,
    "lodgeId" TEXT,
    "administeredLodgeId" TEXT,
    CONSTRAINT "User_fkAddressId_fkey" FOREIGN KEY ("fkAddressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_lodgeId_fkey" FOREIGN KEY ("lodgeId") REFERENCES "Lodge" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatar", "createdAt", "email", "id", "level", "name", "password", "phoneNumber", "role", "startDate", "updatedAt") SELECT "avatar", "createdAt", "email", "id", "level", "name", "password", "phoneNumber", "role", "startDate", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_administeredLodgeId_key" ON "User"("administeredLodgeId");
CREATE TABLE "new_Lodge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "foundingDate" DATETIME,
    "isActive" BOOLEAN DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "fkAddressId" TEXT,
    "adminUserId" TEXT NOT NULL,
    CONSTRAINT "Lodge_fkAddressId_fkey" FOREIGN KEY ("fkAddressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lodge_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Lodge" ("avatar", "createdAt", "id", "name", "updatedAt") SELECT "avatar", "createdAt", "id", "name", "updatedAt" FROM "Lodge";
DROP TABLE "Lodge";
ALTER TABLE "new_Lodge" RENAME TO "Lodge";
CREATE UNIQUE INDEX "Lodge_adminUserId_key" ON "Lodge"("adminUserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
