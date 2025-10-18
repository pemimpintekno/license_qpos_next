-- CreateTable
CREATE TABLE "licenseKey" (
    "id" TEXT NOT NULL,
    "serialKey" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'UNUSED',
    "deviceId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "activatedAt" TIMESTAMP(3),
    "createdById" TEXT NOT NULL,

    CONSTRAINT "licenseKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "licenseKey_serialKey_key" ON "licenseKey"("serialKey");

-- CreateIndex
CREATE UNIQUE INDEX "licenseKey_email_key" ON "licenseKey"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_username_key" ON "admin"("username");

-- AddForeignKey
ALTER TABLE "licenseKey" ADD CONSTRAINT "licenseKey_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
