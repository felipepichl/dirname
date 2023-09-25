/*
  Warnings:

  - Made the column `foundingDate` on table `Lodge` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Lodge" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "latitude" REAL,
    "longitude" REAL,
    "foundingDate" DATETIME NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "fkAddressId" TEXT,
    "adminUserId" TEXT,
    CONSTRAINT "Lodge_fkAddressId_fkey" FOREIGN KEY ("fkAddressId") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Lodge_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Lodge" ("adminUserId", "avatar", "createdAt", "fkAddressId", "foundingDate", "id", "isActive", "latitude", "longitude", "name", "updatedAt") SELECT "adminUserId", "avatar", "createdAt", "fkAddressId", "foundingDate", "id", coalesce("isActive", true) AS "isActive", "latitude", "longitude", "name", "updatedAt" FROM "Lodge";
DROP TABLE "Lodge";
ALTER TABLE "new_Lodge" RENAME TO "Lodge";
CREATE UNIQUE INDEX "Lodge_adminUserId_key" ON "Lodge"("adminUserId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
