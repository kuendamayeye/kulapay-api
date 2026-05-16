-- CreateEnum
CREATE TYPE "EstadoUsuario" AS ENUM ('ACTIVO', 'BLOQUEADO', 'SUSPENSO');

-- CreateEnum
CREATE TYPE "EstadoCarteira" AS ENUM ('ACTIVA', 'CONGELADA', 'ENCERRADA');

-- CreateEnum
CREATE TYPE "TipoCarteira" AS ENUM ('PESSOAL', 'AGENTE', 'COMERCIANTE', 'POUPANCA');

-- CreateEnum
CREATE TYPE "EstadoTransaccao" AS ENUM ('PENDENTE', 'SUCESSO', 'FALHADA', 'REVERTIDA');

-- CreateEnum
CREATE TYPE "TipoTransaccao" AS ENUM ('TRANSFERENCIA', 'DEPOSITO', 'LEVANTAMENTO', 'PAGAMENTO', 'PAGAMENTO_SERVICO', 'RECARGA', 'DEPOSITO_POUPANCA', 'DESEMBOLSO_CREDITO', 'PAGAMENTO_CREDITO');

-- CreateEnum
CREATE TYPE "EstadoCredito" AS ENUM ('PENDENTE', 'APROVADO', 'REJEITADO', 'ACTIVO', 'CONCLUIDO', 'INCUMPRIDO');

-- CreateEnum
CREATE TYPE "EstadoKyc" AS ENUM ('PENDENTE', 'VERIFICADO', 'REJEITADO');

-- CreateEnum
CREATE TYPE "CanalNotificacao" AS ENUM ('SMS', 'EMAIL', 'PUSH');

-- CreateEnum
CREATE TYPE "EstadoNotificacao" AS ENUM ('PENDENTE', 'ENVIADA', 'FALHADA');

-- CreateTable
CREATE TABLE "Utilizador" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "genero" TEXT,
    "dataNascimento" TIMESTAMP(3),
    "numeroDocumento" TEXT,
    "fotoPerfilUrl" TEXT,
    "hashPin" TEXT NOT NULL,
    "idiomaPreferido" TEXT NOT NULL DEFAULT 'pt',
    "verificado" BOOLEAN NOT NULL DEFAULT false,
    "estado" "EstadoUsuario" NOT NULL DEFAULT 'ACTIVO',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Utilizador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tokens_reset" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiryDate" TIMESTAMP(3) NOT NULL,
    "utilizadorId" TEXT,

    CONSTRAINT "tokens_reset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EnderecoUtilizador" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "provincia" TEXT,
    "municipio" TEXT,
    "comuna" TEXT,
    "bairro" TEXT,
    "latitude" DECIMAL(10,7),
    "longitude" DECIMAL(10,7),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EnderecoUtilizador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Carteira" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "saldo" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "moeda" TEXT NOT NULL DEFAULT 'AOA',
    "tipoCarteira" "TipoCarteira" NOT NULL DEFAULT 'PESSOAL',
    "estado" "EstadoCarteira" NOT NULL DEFAULT 'ACTIVA',
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carteira_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaccao" (
    "id" TEXT NOT NULL,
    "codigoReferencia" TEXT NOT NULL,
    "carteiraRemetenteId" TEXT,
    "carteiraDestinoId" TEXT,
    "tipoTransaccao" "TipoTransaccao" NOT NULL,
    "valor" DECIMAL(18,2) NOT NULL,
    "taxa" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "moeda" TEXT NOT NULL DEFAULT 'AOA',
    "estado" "EstadoTransaccao" NOT NULL DEFAULT 'PENDENTE',
    "canal" TEXT,
    "descricao" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "concluidoEm" TIMESTAMP(3),

    CONSTRAINT "Transaccao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Agente" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "nomeNegocio" TEXT NOT NULL,
    "codigoAgente" TEXT NOT NULL,
    "saldoOperacional" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Agente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comerciante" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "nomeNegocio" TEXT NOT NULL,
    "tipoNegocio" TEXT,
    "codigoComerciante" TEXT NOT NULL,
    "qrCode" TEXT,
    "estado" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Comerciante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContaPoupanca" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "carteiraId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "valorMeta" DECIMAL(18,2),
    "valorActual" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "taxaJuro" DECIMAL(5,2),
    "dataMaturidade" TIMESTAMP(3),
    "estado" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ContaPoupanca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Credito" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "carteiraId" TEXT NOT NULL,
    "valorPrincipal" DECIMAL(18,2) NOT NULL,
    "taxaJuro" DECIMAL(5,2) NOT NULL,
    "valorTotal" DECIMAL(18,2) NOT NULL,
    "valorPago" DECIMAL(18,2) NOT NULL DEFAULT 0,
    "duracaoMeses" INTEGER NOT NULL,
    "pontuacaoCredito" INTEGER,
    "estado" "EstadoCredito" NOT NULL DEFAULT 'PENDENTE',
    "aprovadoEm" TIMESTAMP(3),
    "vencimentoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Credito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PagamentoCredito" (
    "id" TEXT NOT NULL,
    "creditoId" TEXT NOT NULL,
    "transaccaoId" TEXT NOT NULL,
    "valor" DECIMAL(18,2) NOT NULL,
    "pagoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PagamentoCredito_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentoKyc" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "numeroDocumento" TEXT NOT NULL,
    "frenteDocumentoUrl" TEXT,
    "versoDocumentoUrl" TEXT,
    "selfieUrl" TEXT,
    "estadoVerificacao" "EstadoKyc" NOT NULL DEFAULT 'PENDENTE',
    "verificadoEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DocumentoKyc_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SessaoDispositivo" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "identificadorDispositivo" TEXT NOT NULL,
    "nomeDispositivo" TEXT,
    "enderecoIp" TEXT,
    "ultimoAcesso" TIMESTAMP(3),
    "activa" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SessaoDispositivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notificacao" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "canal" "CanalNotificacao" NOT NULL,
    "estado" "EstadoNotificacao" NOT NULL DEFAULT 'PENDENTE',
    "enviadaEm" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Notificacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LogAuditoria" (
    "id" TEXT NOT NULL,
    "utilizadorId" TEXT,
    "accao" TEXT NOT NULL,
    "tipoEntidade" TEXT NOT NULL,
    "entidadeId" TEXT NOT NULL,
    "metadados" JSONB,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LogAuditoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Utilizador_telefone_key" ON "Utilizador"("telefone");

-- CreateIndex
CREATE UNIQUE INDEX "Utilizador_email_key" ON "Utilizador"("email");

-- CreateIndex
CREATE INDEX "Utilizador_telefone_idx" ON "Utilizador"("telefone");

-- CreateIndex
CREATE INDEX "Utilizador_numeroDocumento_idx" ON "Utilizador"("numeroDocumento");

-- CreateIndex
CREATE INDEX "EnderecoUtilizador_utilizadorId_idx" ON "EnderecoUtilizador"("utilizadorId");

-- CreateIndex
CREATE INDEX "Carteira_utilizadorId_idx" ON "Carteira"("utilizadorId");

-- CreateIndex
CREATE UNIQUE INDEX "Transaccao_codigoReferencia_key" ON "Transaccao"("codigoReferencia");

-- CreateIndex
CREATE INDEX "Transaccao_codigoReferencia_idx" ON "Transaccao"("codigoReferencia");

-- CreateIndex
CREATE INDEX "Transaccao_carteiraRemetenteId_idx" ON "Transaccao"("carteiraRemetenteId");

-- CreateIndex
CREATE INDEX "Transaccao_carteiraDestinoId_idx" ON "Transaccao"("carteiraDestinoId");

-- CreateIndex
CREATE INDEX "Transaccao_estado_idx" ON "Transaccao"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "Agente_utilizadorId_key" ON "Agente"("utilizadorId");

-- CreateIndex
CREATE UNIQUE INDEX "Agente_codigoAgente_key" ON "Agente"("codigoAgente");

-- CreateIndex
CREATE UNIQUE INDEX "Comerciante_utilizadorId_key" ON "Comerciante"("utilizadorId");

-- CreateIndex
CREATE UNIQUE INDEX "Comerciante_codigoComerciante_key" ON "Comerciante"("codigoComerciante");

-- CreateIndex
CREATE INDEX "ContaPoupanca_utilizadorId_idx" ON "ContaPoupanca"("utilizadorId");

-- CreateIndex
CREATE INDEX "Credito_utilizadorId_idx" ON "Credito"("utilizadorId");

-- CreateIndex
CREATE INDEX "Credito_estado_idx" ON "Credito"("estado");

-- CreateIndex
CREATE UNIQUE INDEX "PagamentoCredito_transaccaoId_key" ON "PagamentoCredito"("transaccaoId");

-- CreateIndex
CREATE INDEX "PagamentoCredito_creditoId_idx" ON "PagamentoCredito"("creditoId");

-- CreateIndex
CREATE INDEX "DocumentoKyc_utilizadorId_idx" ON "DocumentoKyc"("utilizadorId");

-- CreateIndex
CREATE INDEX "SessaoDispositivo_utilizadorId_idx" ON "SessaoDispositivo"("utilizadorId");

-- CreateIndex
CREATE INDEX "Notificacao_utilizadorId_idx" ON "Notificacao"("utilizadorId");

-- CreateIndex
CREATE INDEX "LogAuditoria_utilizadorId_idx" ON "LogAuditoria"("utilizadorId");

-- CreateIndex
CREATE INDEX "LogAuditoria_tipoEntidade_idx" ON "LogAuditoria"("tipoEntidade");

-- AddForeignKey
ALTER TABLE "tokens_reset" ADD CONSTRAINT "tokens_reset_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EnderecoUtilizador" ADD CONSTRAINT "EnderecoUtilizador_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Carteira" ADD CONSTRAINT "Carteira_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaccao" ADD CONSTRAINT "Transaccao_carteiraRemetenteId_fkey" FOREIGN KEY ("carteiraRemetenteId") REFERENCES "Carteira"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaccao" ADD CONSTRAINT "Transaccao_carteiraDestinoId_fkey" FOREIGN KEY ("carteiraDestinoId") REFERENCES "Carteira"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Agente" ADD CONSTRAINT "Agente_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comerciante" ADD CONSTRAINT "Comerciante_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContaPoupanca" ADD CONSTRAINT "ContaPoupanca_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContaPoupanca" ADD CONSTRAINT "ContaPoupanca_carteiraId_fkey" FOREIGN KEY ("carteiraId") REFERENCES "Carteira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Credito" ADD CONSTRAINT "Credito_carteiraId_fkey" FOREIGN KEY ("carteiraId") REFERENCES "Carteira"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagamentoCredito" ADD CONSTRAINT "PagamentoCredito_creditoId_fkey" FOREIGN KEY ("creditoId") REFERENCES "Credito"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PagamentoCredito" ADD CONSTRAINT "PagamentoCredito_transaccaoId_fkey" FOREIGN KEY ("transaccaoId") REFERENCES "Transaccao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentoKyc" ADD CONSTRAINT "DocumentoKyc_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SessaoDispositivo" ADD CONSTRAINT "SessaoDispositivo_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notificacao" ADD CONSTRAINT "Notificacao_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogAuditoria" ADD CONSTRAINT "LogAuditoria_utilizadorId_fkey" FOREIGN KEY ("utilizadorId") REFERENCES "Utilizador"("id") ON DELETE SET NULL ON UPDATE CASCADE;
