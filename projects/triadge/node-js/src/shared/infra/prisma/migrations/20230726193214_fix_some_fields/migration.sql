/*
  Warnings:

  - You are about to drop the column `created_at` on the `UserTokens` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserTokens" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "refresh_token" TEXT NOT NULL,
    "expires_date" DATETIME NOT NULL,
    "fk_user_id" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserTokens_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserTokens" ("createdAt", "expires_date", "fk_user_id", "id", "refresh_token", "updatedAt") SELECT "createdAt", "expires_date", "fk_user_id", "id", "refresh_token", "updatedAt" FROM "UserTokens";
DROP TABLE "UserTokens";
ALTER TABLE "new_UserTokens" RENAME TO "UserTokens";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
