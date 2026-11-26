import { useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined";
import CheckCircleOutlineOutlined from "@mui/icons-material/CheckCircleOutlineOutlined";
import ContentCopyOutlined from "@mui/icons-material/ContentCopyOutlined";
import CreditCardOutlined from "@mui/icons-material/CreditCardOutlined";
import CurrencyExchangeOutlined from "@mui/icons-material/CurrencyExchangeOutlined";
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined";
import DownloadOutlined from "@mui/icons-material/DownloadOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import EventBusyOutlined from "@mui/icons-material/EventBusyOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import NotificationsActiveOutlined from "@mui/icons-material/NotificationsActiveOutlined";
import PercentOutlined from "@mui/icons-material/PercentOutlined";
import PixOutlined from "@mui/icons-material/PixOutlined";
import PrintOutlined from "@mui/icons-material/PrintOutlined";
import QrCode2Outlined from "@mui/icons-material/QrCode2Outlined";
import ReceiptLongOutlined from "@mui/icons-material/ReceiptLongOutlined";
import SavingsOutlined from "@mui/icons-material/SavingsOutlined";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import ShieldOutlined from "@mui/icons-material/ShieldOutlined";
import SmsOutlined from "@mui/icons-material/SmsOutlined";
import VerifiedUserOutlined from "@mui/icons-material/VerifiedUserOutlined";
import WorkspacePremiumOutlined from "@mui/icons-material/WorkspacePremiumOutlined";

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

function ModuleHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <Box className="finance-heading">
      <Typography component="span">{eyebrow}</Typography>
      <Typography component="h1">{title}</Typography>
      <Typography component="p">{description}</Typography>
    </Box>
  );
}

function SecurityMarks() {
  return (
    <Box className="security-marks" aria-label="Meios aceitos e selos de segurança">
      <span>VISA</span>
      <span>mastercard</span>
      <span>ELO</span>
      <span>AMEX</span>
      <Divider orientation="vertical" flexItem />
      <span><ShieldOutlined /> Conexão Segura SSL</span>
      <span><VerifiedUserOutlined /> Padrão PCI-DSS</span>
    </Box>
  );
}

type ChargeType = "enrollment" | "monthly";
type PaymentMethod = "pix" | "card" | "boleto";

export function PaymentMethodsPage() {
  const [chargeType, setChargeType] = useState<ChargeType>("enrollment");
  const [method, setMethod] = useState<PaymentMethod>("pix");
  const [installments, setInstallments] = useState(6);
  const [notice, setNotice] = useState("");
  const [paid, setPaid] = useState(false);
  const amount = chargeType === "enrollment" ? 5340 : 890;
  const pixTotal = amount * 0.95;
  const cardTotal = installments <= 6 ? amount : amount * (1 + 0.0149 * installments);
  const installmentValue = cardTotal / installments;
  const pixCode = "00020126580014BR.GOV.BCB.PIX0136LUMEN-ACADEMY-2026-2-ALUNO520400005303986";

  const copyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setNotice("Código Pix copiado. Agora é só abrir o aplicativo do seu banco.");
    } catch {
      setNotice("Selecione e copie o código Pix exibido abaixo.");
    }
  };

  const confirmPayment = () => {
    setPaid(true);
    setNotice(
      method === "boleto"
        ? "Boleto acadêmico gerado. O vencimento da matrícula é em 2 dias."
        : "Pagamento registrado com sucesso. A liberação foi iniciada.",
    );
  };

  return (
    <Box className="financial-module payment-module">
      <ModuleHeading
        eyebrow="FINANCEIRO • PAGAMENTO PROTEGIDO"
        title="Métodos de pagamento"
        description="Invista na sua formação com clareza. Escolha o tipo de pagamento e veja valores, prazos e condições antes de confirmar."
      />

      {paid && (
        <Alert severity="success" className="module-alert" icon={<CheckCircleOutlineOutlined />}>
          {method === "boleto"
            ? "Boleto emitido. O acesso às aulas será liberado após a compensação, em 1 a 3 dias úteis."
            : "Tudo certo. Seu pagamento foi confirmado e o acesso será liberado imediatamente."}
        </Alert>
      )}
      {notice && <Alert severity="info" onClose={() => setNotice("")}>{notice}</Alert>}

      <Box className="charge-choice-grid">
        <Card className={`charge-choice light ${chargeType === "enrollment" ? "selected" : ""}`} variant="outlined">
          <CardActionArea onClick={() => setChargeType("enrollment")}>
            <CardContent>
              <Chip label="PAGAMENTO ÚNICO" size="small" />
              <Typography variant="h5">Matrícula</Typography>
              <Typography color="text.secondary">Garante sua vaga para o semestre 2026.2.</Typography>
              <Typography className="charge-value">{formatBRL(5340)}</Typography>
              <Typography variant="caption">Pix, cartão de crédito ou boleto acadêmico</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={`charge-choice wine ${chargeType === "monthly" ? "selected" : ""}`}>
          <CardActionArea onClick={() => setChargeType("monthly")}>
            <CardContent>
              <Chip label="RECORRENTE" size="small" />
              <Typography variant="h5">Mensalidades</Typography>
              <Typography>Cobrança mensal com lembrete antes do vencimento.</Typography>
              <Typography className="charge-value">{formatBRL(890)} / mês</Typography>
              <Typography variant="caption">No cartão, usa apenas o limite de cada mês</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>

      <Box className="payment-layout">
        <Stack className="payment-method-list" spacing={1.25}>
          {[
            { id: "pix" as const, title: "Pix", detail: "Confirmação imediata", icon: <PixOutlined />, badge: "5% DE DESCONTO" },
            { id: "card" as const, title: "Cartão de crédito", detail: "Até 6x sem juros ou 12x com juros", icon: <CreditCardOutlined />, badge: "PARCELA MÍN. R$ 50" },
            { id: "boleto" as const, title: "Boleto acadêmico", detail: "Compensação em 1 a 3 dias úteis", icon: <ReceiptLongOutlined />, badge: "VENCE EM 2 DIAS" },
          ].map((item) => (
            <Card className={`payment-method ${method === item.id ? "selected" : ""}`} variant="outlined" key={item.id}>
              <CardActionArea onClick={() => { setMethod(item.id); setPaid(false); }}>
                <CardContent>
                  <Box className="payment-method-icon">{item.icon}</Box>
                  <Box>
                    <Typography variant="subtitle1">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{item.detail}</Typography>
                  </Box>
                  <Chip label={item.badge} size="small" />
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Stack>

        <Card className="payment-detail" variant="outlined">
          <CardContent>
            {method === "pix" && (
              <Stack spacing={2.25}>
                <Box className="detail-title">
                  <Box><PixOutlined /><Typography variant="h5">Pagar com Pix</Typography></Box>
                  <Chip label="5% DE DESCONTO" color="success" />
                </Box>
                <Box className="price-comparison">
                  <Box><Typography variant="caption">Valor original</Typography><Typography>{formatBRL(amount)}</Typography></Box>
                  <Box><Typography variant="caption">Você economiza</Typography><Typography>- {formatBRL(amount * 0.05)}</Typography></Box>
                  <Box><Typography variant="caption">Valor final no Pix</Typography><Typography variant="h4">{formatBRL(pixTotal)}</Typography></Box>
                </Box>
                <Box className="pix-area">
                  <Box className="qr-code-demo" aria-label="QR Code Pix ilustrativo">
                    <QrCode2Outlined />
                  </Box>
                  <Box>
                    <Typography variant="subtitle2">Escaneie ou use o Pix Copia e Cola</Typography>
                    <Typography variant="body2" color="text.secondary">A confirmação é imediata e libera o acesso na hora.</Typography>
                    <TextField value={pixCode} size="small" fullWidth slotProps={{ htmlInput: { readOnly: true, "aria-label": "Código Pix Copia e Cola" } }} />
                    <Button startIcon={<ContentCopyOutlined />} onClick={copyPix}>Copiar código Pix</Button>
                  </Box>
                </Box>
                <Button variant="contained" size="large" onClick={confirmPayment}>Confirmar pagamento de {formatBRL(pixTotal)}</Button>
              </Stack>
            )}

            {method === "card" && (
              <Stack spacing={2.25}>
                <Box className="detail-title">
                  <Box><CreditCardOutlined /><Typography variant="h5">Cartão de crédito</Typography></Box>
                  <Chip label={chargeType === "monthly" ? "COBRANÇA RECORRENTE" : "ATÉ 6X SEM JUROS"} />
                </Box>
                {chargeType === "monthly" && (
                  <Alert severity="info">
                    A mensalidade é recorrente: apenas {formatBRL(amount)} do limite é utilizado a cada mês, sem comprometer o valor total do semestre.
                  </Alert>
                )}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField label="Número do cartão" placeholder="0000 0000 0000 0000" fullWidth />
                  <TextField label="Nome impresso" placeholder="NOME DO TITULAR" fullWidth />
                </Stack>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                  <TextField label="Validade" placeholder="MM/AA" fullWidth />
                  <TextField label="CVV" placeholder="000" fullWidth />
                  <FormControl fullWidth>
                    <InputLabel id="installments-label">Parcelas</InputLabel>
                    <Select
                      labelId="installments-label"
                      label="Parcelas"
                      value={installments}
                      onChange={(event) => setInstallments(Number(event.target.value))}
                    >
                      {Array.from({ length: 12 }, (_, index) => index + 1).map((count) => {
                        const total = count <= 6 ? amount : amount * (1 + 0.0149 * count);
                        return (
                          <MenuItem value={count} key={count}>
                            {count}x de {formatBRL(total / count)} {count <= 6 ? "sem juros" : "com juros"}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Stack>
                <Box className="card-summary">
                  <Typography variant="body2">Parcela selecionada</Typography>
                  <Typography variant="h4">{installments}x de {formatBRL(installmentValue)}</Typography>
                  <Typography variant="caption">
                    Total: {formatBRL(cardTotal)} {installments > 6 && "• simulação com juros de 1,49% a.m."}
                  </Typography>
                </Box>
                <Button variant="contained" size="large" onClick={confirmPayment}>Pagar com cartão</Button>
              </Stack>
            )}

            {method === "boleto" && (
              <Stack spacing={2.25}>
                <Box className="detail-title">
                  <Box><ReceiptLongOutlined /><Typography variant="h5">Boleto bancário acadêmico</Typography></Box>
                  <Chip label="COMPENSAÇÃO EM 1 A 3 DIAS ÚTEIS" />
                </Box>
                <Alert severity="warning">
                  {chargeType === "enrollment"
                    ? "Para matrícula, o boleto vence em 2 dias. A vaga e o acesso às aulas são liberados após a compensação bancária."
                    : "A mensalidade fica disponível por boleto a cada mês. O pagamento é identificado após a compensação bancária."}
                </Alert>
                <Box className="boleto-steps">
                  <Box><CalendarMonthOutlined /><Typography><strong>Vencimento</strong><span>{chargeType === "enrollment" ? "Em 2 dias" : "Na data da mensalidade"}</span></Typography></Box>
                  <Box><ReceiptLongOutlined /><Typography><strong>Pagamento</strong><span>Banco, lotérica ou internet banking</span></Typography></Box>
                  <Box><SchoolOutlined /><Typography><strong>Liberação</strong><span>Após compensação bancária</span></Typography></Box>
                </Box>
                <Box className="card-summary">
                  <Typography variant="body2">Valor do boleto</Typography>
                  <Typography variant="h4">{formatBRL(amount)}</Typography>
                </Box>
                <Button variant="contained" size="large" onClick={confirmPayment}>Gerar boleto acadêmico</Button>
              </Stack>
            )}
            <SecurityMarks />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export function NegotiationPage() {
  const [option, setOption] = useState<"cash" | "installments">("cash");
  const [installments, setInstallments] = useState(3);
  const [completed, setCompleted] = useState(false);
  const principal = 1780;
  const charges = 214.6;
  const negotiatedCharges = charges * 0.5;
  const installmentTotal = principal + negotiatedCharges;
  const selectedTotal = option === "cash" ? principal : installmentTotal;

  if (completed) {
    return (
      <Box className="financial-module negotiation-module">
        <Card className="agreement-success">
          <CardContent>
            <Box className="success-seal"><CheckCircleOutlineOutlined /></Box>
            <Typography variant="overline">ACORDO CONFIRMADO</Typography>
            <Typography component="h1">Pronto, Ingrid. Matrícula liberada.</Typography>
            <Typography component="p">
              Seu vínculo está regularizado e as aulas seguem normalmente. Você já pode retomar seus estudos com tranquilidade.
            </Typography>
            <Divider />
            <Typography variant="h6">Lembretes configurados</Typography>
            <Typography color="text.secondary">
              Enviaremos avisos 3 dias e 1 dia antes de cada vencimento para você manter o benefício do acordo.
            </Typography>
            <Box className="reminder-channels">
              <Chip icon={<EmailOutlined />} label="E-mail" />
              <Chip icon={<SmsOutlined />} label="SMS" />
              <Chip icon={<NotificationsActiveOutlined />} label="Portal" />
            </Box>
            <Button variant="contained" onClick={() => setCompleted(false)}>Ver detalhes do acordo</Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box className="financial-module negotiation-module">
      <ModuleHeading
        eyebrow="REGULARIZAÇÃO FINANCEIRA"
        title="Vamos ajustar sua rota?"
        description="Olá, Ingrid. Sabemos que imprevistos acontecem. Vamos regularizar seu vínculo para você seguir com o que importa: seus estudos e a sua formatura."
      />

      <Box className="negotiation-summary">
        <Box>
          <Typography variant="overline">SEU CENÁRIO ATUAL</Typography>
          <Typography variant="h5">Resumo das mensalidades em aberto</Typography>
        </Box>
        <Box className="open-items" role="table" aria-label="Competências em aberto">
          <Box role="row"><span role="cell">Setembro</span><strong role="cell">{formatBRL(890)}</strong></Box>
          <Box role="row"><span role="cell">Outubro</span><strong role="cell">{formatBRL(890)}</strong></Box>
          <Box role="row"><span role="cell">Multa e juros</span><strong role="cell">{formatBRL(charges)}</strong></Box>
          <Box className="open-total" role="row"><span role="cell">Total atual</span><strong role="cell">{formatBRL(principal + charges)}</strong></Box>
        </Box>
      </Box>

      <Typography className="section-kicker" variant="overline">ESCOLHA COMO RETOMAR</Typography>
      <Box className="agreement-options">
        <Card className={`agreement-option ${option === "cash" ? "selected" : ""}`} variant="outlined">
          <CardActionArea onClick={() => setOption("cash")}>
            <CardContent>
              <Box className="agreement-icon"><SavingsOutlined /></Box>
              <Chip label="MELHOR CONDIÇÃO" />
              <Typography variant="h5">Quitação à vista</Typography>
              <Typography color="text.secondary">Isenção total e imediata de juros e multa.</Typography>
              <Typography className="agreement-price">{formatBRL(principal)}</Typography>
              <Typography variant="body2">Vínculo regularizado na hora</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={`agreement-option ${option === "installments" ? "selected" : ""}`} variant="outlined">
          <CardActionArea onClick={() => setOption("installments")}>
            <CardContent>
              <Box className="agreement-icon"><CurrencyExchangeOutlined /></Box>
              <Chip label="50% DE DESCONTO NOS ENCARGOS" />
              <Typography variant="h5">Parcelamento do saldo</Typography>
              <Typography color="text.secondary">Dilua o valor nas próximas mensalidades do semestre.</Typography>
              <Typography className="agreement-price">{installments}x de {formatBRL(installmentTotal / installments)}</Typography>
              <Typography variant="body2">Total negociado: {formatBRL(installmentTotal)}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>

      {option === "installments" && (
        <Card className="installment-simulator" variant="outlined">
          <CardContent>
            <Box>
              <Typography variant="overline">SIMULADOR INTERATIVO</Typography>
              <Typography variant="h5">Quantas parcelas cabem no seu mês?</Typography>
              <Typography color="text.secondary">Arraste para comparar. O valor é atualizado em tempo real.</Typography>
            </Box>
            <Box className="simulator-control">
              <Slider
                value={installments}
                onChange={(_, value) => setInstallments(value as number)}
                min={2}
                max={6}
                step={1}
                marks
                valueLabelDisplay="auto"
                aria-label="Quantidade de parcelas"
              />
              <Box className="simulator-result">
                <Typography variant="caption">Sua simulação</Typography>
                <Typography variant="h3">{installments}x de {formatBRL(installmentTotal / installments)}</Typography>
                <Typography>Total do acordo: <strong>{formatBRL(installmentTotal)}</strong></Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      )}

      <Card className="agreement-confirmation">
        <CardContent>
          <Box>
            <Typography variant="overline">RESUMO DA ESCOLHA</Typography>
            <Typography variant="h5">{option === "cash" ? "Quitação à vista" : `${installments} parcelas mensais`}</Typography>
            <Typography color="text.secondary">
              {option === "cash"
                ? "Juros e multa totalmente isentos. Regularização imediata."
                : "Encargos reduzidos pela metade e incluídos nas próximas mensalidades."}
            </Typography>
          </Box>
          <Box>
            <Typography variant="caption">Total</Typography>
            <Typography variant="h4">{formatBRL(selectedTotal)}</Typography>
            <Button variant="contained" size="large" onClick={() => setCompleted(true)}>Confirmar e regularizar vínculo</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

function LegalTerm({ term, explanation }: { term: string; explanation: string }) {
  return (
    <Tooltip title={explanation} arrow placement="top">
      <Box component="span" className="legal-term" tabIndex={0}>
        {term}<InfoOutlined />
      </Box>
    </Tooltip>
  );
}

const contractPlainText = `CONTRATO DE PRESTAÇÃO DE SERVIÇOS EDUCACIONAIS

1. Do objeto
A instituição presta ao aluno serviços educacionais do curso de Análise e Desenvolvimento de Sistemas, conforme o calendário acadêmico vigente.

2. Do valor e da forma de pagamento
A semestralidade será paga em seis parcelas mensais. Em caso de inadimplência, o aluno poderá regularizar sua situação pela área de negociação do portal.

3. Do trancamento e do cancelamento
O aluno poderá solicitar o trancamento ou o cancelamento por requerimento no portal, com antecedência mínima de trinta dias do vencimento da próxima parcela.

4. Do recesso e do reembolso
Antes do início das aulas, o aluno poderá desistir da matrícula e receber a devolução dos valores pagos, conforme as condições deste contrato.

5. Das bolsas e descontos
Bolsas e descontos permanecem ativos enquanto o aluno mantiver média igual ou superior a 7,0 e frequência mínima de 75%.

6. Das disposições finais
As partes elegem o foro da comarca da instituição para dirimir eventuais dúvidas sobre este contrato.`;

export function ContractPage({ onOpenDocuments }: { onOpenDocuments: () => void }) {
  const [readToEnd, setReadToEnd] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [signed, setSigned] = useState(false);
  const contractRef = useRef<HTMLDivElement>(null);
  const canSign = readToEnd && accepted && verificationCode.length === 6;

  const handleContractScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    if (element.scrollHeight - element.scrollTop - element.clientHeight <= 8) setReadToEnd(true);
  };

  const downloadContract = () => {
    const plainLines = contractPlainText
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split("\n")
      .flatMap((line) => {
        if (line.length <= 82) return [line];
        const words = line.split(" ");
        const wrapped: string[] = [];
        let current = "";
        words.forEach((word) => {
          if (`${current} ${word}`.trim().length > 82) {
            wrapped.push(current);
            current = word;
          } else {
            current = `${current} ${word}`.trim();
          }
        });
        if (current) wrapped.push(current);
        return wrapped;
      });
    const escapePdf = (line: string) => line.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    const stream = [
      "BT",
      "/F1 11 Tf",
      "50 790 Td",
      "16 TL",
      ...plainLines.flatMap((line, index) => [
        index === 0 ? "" : "T*",
        `(${escapePdf(line)}) Tj`,
      ]).filter(Boolean),
      "ET",
    ].join("\n");
    const objects = [
      "<< /Type /Catalog /Pages 2 0 R >>",
      "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
      "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
      "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
      `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    ];
    let pdf = "%PDF-1.4\n";
    const offsets: number[] = [0];
    objects.forEach((object, index) => {
      offsets.push(pdf.length);
      pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
    });
    const xrefOffset = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    offsets.slice(1).forEach((offset) => {
      pdf += `${offset.toString().padStart(10, "0")} 00000 n \n`;
    });
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
    const file = new Blob([pdf], { type: "application/pdf" });
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = "contrato-lumen-academy.pdf";
    link.click();
    URL.revokeObjectURL(url);
  };

  if (signed) {
    return (
      <Box className="financial-module contract-module">
        <Card className="contract-success">
          <CardContent>
            <CheckCircleOutlineOutlined />
            <Typography variant="overline">ASSINATURA CONCLUÍDA</Typography>
            <Typography component="h1">Sua vaga está garantida.</Typography>
            <Typography component="p">
              Enviamos o contrato assinado em PDF para o seu e-mail. Ele também está disponível na aba Documentos.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button variant="contained" startIcon={<DownloadOutlined />} onClick={downloadContract}>Baixar contrato</Button>
              <Button variant="outlined" startIcon={<DescriptionOutlined />} onClick={onOpenDocuments}>Ir para Documentos</Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const summaries = [
    { label: "Valor", value: "R$ 5.340,00 por semestralidade", icon: <SavingsOutlined /> },
    { label: "Cancelamento", value: "Aviso prévio para trancamento", icon: <EventBusyOutlined /> },
    { label: "Bolsas", value: "Mantidas com média 7,0", icon: <WorkspacePremiumOutlined /> },
    { label: "Frequência", value: "Mínimo de 75%", icon: <PercentOutlined /> },
  ];

  return (
    <Box className="financial-module contract-module">
      <ModuleHeading
        eyebrow="CONTRATO E TERMOS DE MATRÍCULA"
        title="Leia com clareza antes de assinar"
        description="Primeiro, veja os pontos essenciais. Depois, leia o contrato completo com tudo o que possui validade jurídica."
      />

      <Box className="legal-summary-grid">
        {summaries.map((item) => (
          <Card variant="outlined" key={item.label}>
            <CardContent>
              <Box>{item.icon}</Box>
              <Typography variant="overline">{item.label}</Typography>
              <Typography variant="subtitle1">{item.value}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
      <Alert severity="info">Este resumo facilita a leitura. Em caso de dúvida, prevalece o texto integral do contrato abaixo.</Alert>

      <Card className="contract-reader" variant="outlined">
        <Box className="contract-toolbar">
          <Box>
            <DescriptionOutlined />
            <Box><Typography variant="overline">DOCUMENTO OFICIAL</Typography><Typography variant="h6">Contrato de Prestação de Serviços Educacionais</Typography></Box>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button size="small" variant="outlined" startIcon={<DownloadOutlined />} onClick={downloadContract}>Baixar PDF</Button>
            <Button size="small" variant="outlined" startIcon={<PrintOutlined />} onClick={() => window.print()}>Imprimir</Button>
          </Stack>
        </Box>
        <Box className="contract-scroll" ref={contractRef} onScroll={handleContractScroll} tabIndex={0}>
          <Box className="contract-copy">
            <Typography component="h2">Contrato de Prestação de Serviços Educacionais</Typography>
            <Typography component="h3">1. Do objeto</Typography>
            <Typography component="p">
              A instituição presta ao aluno serviços educacionais do curso de Análise e Desenvolvimento de Sistemas, conforme o calendário acadêmico vigente.
            </Typography>
            <Typography component="h3">2. Do valor e da forma de pagamento</Typography>
            <Typography component="p">
              A <LegalTerm term="semestralidade" explanation="Valor total dos serviços educacionais contratados para um semestre letivo." /> será paga em seis parcelas mensais. Em caso de <LegalTerm term="inadimplência" explanation="Situação em que um pagamento não é realizado até a data combinada." />, o aluno poderá regularizar sua situação pela área de negociação do portal.
            </Typography>
            <Typography component="h3">3. Do trancamento e do cancelamento</Typography>
            <Typography component="p">
              O aluno poderá solicitar o <LegalTerm term="trancamento" explanation="Pausa formal e temporária do vínculo acadêmico, solicitada pelo portal." /> ou o cancelamento por requerimento no portal, com antecedência mínima de trinta dias do vencimento da próxima parcela.
            </Typography>
            <Typography component="h3">4. Do recesso e do reembolso</Typography>
            <Typography component="p">
              Durante o <LegalTerm term="recesso" explanation="Período previsto no calendário sem atividades letivas regulares." />, permanecem válidas as regras acadêmicas. Antes do início das aulas, o aluno poderá desistir da matrícula e receber a devolução dos valores pagos, conforme as condições deste contrato.
            </Typography>
            <Typography component="h3">5. Das bolsas e descontos</Typography>
            <Typography component="p">
              Bolsas e descontos permanecem ativos enquanto o aluno mantiver média igual ou superior a 7,0 e frequência mínima de 75%.
            </Typography>
            <Typography component="h3">6. Das disposições finais</Typography>
            <Typography component="p">
              As partes elegem o foro da comarca da instituição para dirimir eventuais dúvidas sobre este contrato.
            </Typography>
            <Box className="contract-end-marker">
              <CheckCircleOutlineOutlined />
              <Typography>Você chegou ao final do contrato.</Typography>
            </Box>
          </Box>
        </Box>
      </Card>

      <Card className={`signature-panel ${readToEnd ? "unlocked" : ""}`} variant="outlined">
        <CardContent>
          <Box className="signature-status">
            {readToEnd ? <CheckCircleOutlineOutlined /> : <ShieldOutlined />}
            <Box>
              <Typography variant="h6">{readToEnd ? "Leitura concluída. Assinatura liberada." : "Leia o contrato até o final"}</Typography>
              <Typography color="text.secondary">
                {readToEnd
                  ? "Confirme o aceite e digite o código de 6 dígitos enviado ao seu celular."
                  : "Por segurança jurídica, o aceite e o código ficam disponíveis após a leitura integral."}
              </Typography>
            </Box>
          </Box>
          <FormControlLabel
            control={<Checkbox checked={accepted} disabled={!readToEnd} onChange={(event) => setAccepted(event.target.checked)} />}
            label="Li e aceito o Contrato de Prestação de Serviços Educacionais."
          />
          <TextField
            label="Código de verificação"
            placeholder="000000"
            value={verificationCode}
            disabled={!readToEnd}
            onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, "").slice(0, 6))}
            slotProps={{ htmlInput: { inputMode: "numeric", maxLength: 6 } }}
            helperText="Código de 6 dígitos enviado ao celular final ••88"
          />
          <Button variant="contained" size="large" disabled={!canSign} onClick={() => setSigned(true)}>
            Assinar e garantir minha vaga
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
