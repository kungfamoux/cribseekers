-- CreateEnum
CREATE TYPE "FinanceTransactionType" AS ENUM ('INSPECTION', 'ESCROW', 'PREMIUM', 'ADVERTISEMENT', 'MOVING_SERVICE', 'REFUND', 'PAYOUT');

-- CreateEnum
CREATE TYPE "CommissionType" AS ENUM ('INSPECTION_COMMISSION', 'REFERRAL_COMMISSION', 'PARTNER_COMMISSION');

-- CreateEnum
CREATE TYPE "CommissionStatus" AS ENUM ('PENDING', 'APPROVED', 'PAID', 'FAILED');

-- CreateEnum
CREATE TYPE "FinanceSettlementStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "PayoutStatus" AS ENUM ('PENDING', 'APPROVED', 'PROCESSING', 'COMPLETED', 'FAILED', 'REJECTED');

-- CreateEnum
CREATE TYPE "RevenueSource" AS ENUM ('INSPECTION', 'ESCROW', 'PREMIUM', 'ADVERTISEMENT', 'MOVING_SERVICE');

-- CreateTable
CREATE TABLE "finance_transactions" (
    "id" TEXT NOT NULL,
    "transactionType" "FinanceTransactionType" NOT NULL,
    "source" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'NGN',
    "platformRevenue" DECIMAL(18,2) NOT NULL,
    "serviceProviderRevenue" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "customerId" TEXT,
    "serviceProviderId" TEXT,
    "reference" TEXT NOT NULL,
    "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "finance_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "commissions" (
    "id" TEXT NOT NULL,
    "transactionId" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "commissionType" "CommissionType" NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "percentage" DECIMAL(5,2) NOT NULL,
    "status" "CommissionStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "commissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "finance_settlements" (
    "id" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "platformFee" DECIMAL(18,2) NOT NULL,
    "serviceProviderFee" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "status" "FinanceSettlementStatus" NOT NULL DEFAULT 'PENDING',
    "processedAt" TIMESTAMP(3),
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "finance_settlements_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payouts" (
    "id" TEXT NOT NULL,
    "agentId" TEXT NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "fee" DECIMAL(18,2) NOT NULL DEFAULT 100,
    "netAmount" DECIMAL(18,2) NOT NULL,
    "bankAccountId" TEXT NOT NULL,
    "status" "PayoutStatus" NOT NULL DEFAULT 'PENDING',
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "processedAt" TIMESTAMP(3),
    "reference" TEXT NOT NULL,
    "rejectionReason" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenue_records" (
    "id" TEXT NOT NULL,
    "source" "RevenueSource" NOT NULL,
    "amount" DECIMAL(18,2) NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT,
    "reference" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'SUCCESS',
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "revenue_records_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "finance_transactions_transactionType_idx" ON "finance_transactions"("transactionType");

-- CreateIndex
CREATE INDEX "finance_transactions_customerId_idx" ON "finance_transactions"("customerId");

-- CreateIndex
CREATE INDEX "finance_transactions_serviceProviderId_idx" ON "finance_transactions"("serviceProviderId");

-- CreateIndex
CREATE INDEX "finance_transactions_reference_idx" ON "finance_transactions"("reference");

-- CreateIndex
CREATE INDEX "finance_transactions_status_idx" ON "finance_transactions"("status");

-- CreateIndex
CREATE INDEX "finance_transactions_createdAt_idx" ON "finance_transactions"("createdAt");

-- CreateIndex
CREATE INDEX "commissions_transactionId_idx" ON "commissions"("transactionId");

-- CreateIndex
CREATE INDEX "commissions_agentId_idx" ON "commissions"("agentId");

-- CreateIndex
CREATE INDEX "commissions_commissionType_idx" ON "commissions"("commissionType");

-- CreateIndex
CREATE INDEX "commissions_status_idx" ON "commissions"("status");

-- CreateIndex
CREATE INDEX "finance_settlements_entityType_entityId_idx" ON "finance_settlements"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "finance_settlements_status_idx" ON "finance_settlements"("status");

-- CreateIndex
CREATE INDEX "payouts_agentId_idx" ON "payouts"("agentId");

-- CreateIndex
CREATE INDEX "payouts_bankAccountId_idx" ON "payouts"("bankAccountId");

-- CreateIndex
CREATE INDEX "payouts_status_idx" ON "payouts"("status");

-- CreateIndex
CREATE INDEX "payouts_approvedAt_idx" ON "payouts"("approvedAt");

-- CreateIndex
CREATE INDEX "revenue_records_source_idx" ON "revenue_records"("source");

-- CreateIndex
CREATE INDEX "revenue_records_date_idx" ON "revenue_records"("date");

-- CreateIndex
CREATE INDEX "revenue_records_customerId_idx" ON "revenue_records"("customerId");

-- CreateIndex
CREATE INDEX "revenue_records_status_idx" ON "revenue_records"("status");

-- AddForeignKey
ALTER TABLE "payouts" ADD CONSTRAINT "payouts_agentId_fkey" FOREIGN KEY ("agentId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payouts" ADD CONSTRAINT "payouts_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "bank_accounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;
