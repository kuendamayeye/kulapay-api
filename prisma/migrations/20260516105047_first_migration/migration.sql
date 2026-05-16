-- CreateEnum
CREATE TYPE "EstadoMembro" AS ENUM ('ACTIVO', 'PENDENTE', 'SUSPENSO', 'SAIU');

-- CreateEnum
CREATE TYPE "EstadoContribuicao" AS ENUM ('PENDENTE', 'PAGO', 'ATRASADO', 'FALHOU');

-- CreateEnum
CREATE TYPE "MetodoPagamento" AS ENUM ('DINHEIRO', 'TRANSFERENCIA', 'REFERENCIA', 'MOBILE_MONEY');

-- CreateEnum
CREATE TYPE "FrequenciaCiclo" AS ENUM ('SEMANAL', 'MENSAL');

-- CreateEnum
CREATE TYPE "EstadoConvite" AS ENUM ('PENDENTE', 'ACEITE', 'EXPIRADO');

-- CreateTable
CREATE TABLE "Grupo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT,
    "valorPorCiclo" DECIMAL(65,30) NOT NULL,
    "maximoMembros" INTEGER NOT NULL,
    "frequenciaCiclo" "FrequenciaCiclo" NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL,
    "publico" BOOLEAN NOT NULL DEFAULT false,
    "permitirEntradaAutomatica" BOOLEAN NOT NULL DEFAULT false,
    "nivelMinimoConfianca" INTEGER NOT NULL DEFAULT 1,
    "criadoPorId" TEXT NOT NULL,
    "criadoPorAgenteId" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Grupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MembroGrupo" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "dataEntrada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ordemRecebimento" INTEGER NOT NULL,
    "jaRecebeu" BOOLEAN NOT NULL DEFAULT false,
    "estado" "EstadoMembro" NOT NULL DEFAULT 'ACTIVO',

    CONSTRAINT "MembroGrupo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contribuicao" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "valor" DECIMAL(65,30) NOT NULL,
    "pagoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "EstadoContribuicao" NOT NULL,
    "metodoPagamento" "MetodoPagamento" NOT NULL,
    "referencia" TEXT,
    "AgenteId" TEXT,

    CONSTRAINT "Contribuicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Convite" (
    "id" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "convidadoPorId" TEXT NOT NULL,
    "utilizadorConvidadoId" TEXT,
    "telefone" TEXT,
    "token" TEXT NOT NULL,
    "estado" "EstadoConvite" NOT NULL,
    "expiraEm" TIMESTAMP(3) NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Convite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CalendarioPagamento" (
    "id" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "membroId" TEXT NOT NULL,
    "numeroCiclo" INTEGER NOT NULL,
    "dataPrevista" TIMESTAMP(3) NOT NULL,
    "pago" BOOLEAN NOT NULL DEFAULT false,
    "pagoEm" TIMESTAMP(3),

    CONSTRAINT "CalendarioPagamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MembroGrupo_utilizadorId_grupoId_key" ON "MembroGrupo"("utilizadorId", "grupoId");

-- CreateIndex
CREATE UNIQUE INDEX "Convite_token_key" ON "Convite"("token");

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_criadoPorId_fkey" FOREIGN KEY ("criadoPorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grupo" ADD CONSTRAINT "Grupo_criadoPorAgenteId_fkey" FOREIGN KEY ("criadoPorAgenteId") REFERENCES "Agente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembroGrupo" ADD CONSTRAINT "MembroGrupo_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MembroGrupo" ADD CONSTRAINT "MembroGrupo_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribuicao" ADD CONSTRAINT "Contribuicao_AgenteId_fkey" FOREIGN KEY ("AgenteId") REFERENCES "Agente"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribuicao" ADD CONSTRAINT "Contribuicao_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contribuicao" ADD CONSTRAINT "Contribuicao_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalendarioPagamento" ADD CONSTRAINT "CalendarioPagamento_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "Grupo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
