-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "avatar" TEXT,
    "role" TEXT,
    "level" TEXT,
    "startDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "fk_lodge_id" TEXT,
    "fk_address_id" TEXT,
    CONSTRAINT "User_fk_lodge_id_fkey" FOREIGN KEY ("fk_lodge_id") REFERENCES "Lodge" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_fk_address_id_fkey" FOREIGN KEY ("fk_address_id") REFERENCES "Address" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_User" ("avatar", "createdAt", "email", "fk_address_id", "fk_lodge_id", "id", "level", "name", "password", "phoneNumber", "role", "startDate", "updatedAt") SELECT "avatar", "createdAt", "email", "fk_address_id", "fk_lodge_id", "id", "level", "name", "password", "phoneNumber", "role", "startDate", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
