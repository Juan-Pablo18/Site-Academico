import { useRef, useState, type FormEvent } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined";
import CampaignOutlined from "@mui/icons-material/CampaignOutlined";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import QueryBuilderOutlined from "@mui/icons-material/QueryBuilderOutlined";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import SchoolOutlined from "@mui/icons-material/SchoolOutlined";
import StarBorderOutlined from "@mui/icons-material/StarBorderOutlined";
import TaskAltOutlined from "@mui/icons-material/TaskAltOutlined";

const announcementContent: Record<string, { eyebrow: string; description: string; items: { tag: string; title: string; detail: string; date: string }[] }> = {
  Comunicados: {
    eyebrow: "COMUNICAÇÃO INSTITUCIONAL",
    description: "Informações oficiais da Lumen Academy para apoiar sua rotina acadêmica.",
    items: [
      { tag: "Institucional", title: "Atualização do calendário acadêmico 2026.2", detail: "Consulte as novas datas de avaliações e atividades complementares.", date: "Hoje, 10:30" },
      { tag: "Biblioteca", title: "Horário estendido durante a semana de provas", detail: "A biblioteca central funcionará até as 22h nos dias úteis.", date: "Ontem" },
      { tag: "Campus", title: "Manutenção programada no portal", detail: "Alguns serviços poderão ficar indisponíveis no domingo, das 2h às 4h.", date: "12 AGO" },
    ],
  },
  "Avisos acadêmicos": {
    eyebrow: "VIDA ACADÊMICA",
    description: "Prazos, avaliações e orientações importantes para o seu semestre.",
    items: [
      { tag: "Prazo", title: "Entrega do Projeto Integrador", detail: "Envie a versão final até 22 de outubro pelo ambiente da disciplina.", date: "22 OUT" },
      { tag: "Avaliação", title: "Prova de Banco de Dados", detail: "A avaliação será realizada no laboratório 04.", date: "25 OUT" },
      { tag: "Matrícula", title: "Período de ajustes da grade", detail: "Solicitações de inclusão e troca de turma seguem abertas nesta semana.", date: "28 OUT" },
    ],
  },
  "Eventos e atividades": {
    eyebrow: "AGENDA DO CAMPUS",
    description: "Participe de encontros, palestras e experiências que ampliam sua formação.",
    items: [
      { tag: "Palestra", title: "Carreiras em tecnologia e produto", detail: "Encontro com profissionais de empresas parceiras no auditório principal.", date: "14 NOV" },
      { tag: "Semana acadêmica", title: "Lumen Tech Week 2026", detail: "Cinco dias de oficinas, desafios e apresentações de projetos.", date: "18 NOV" },
      { tag: "Workshop", title: "Portfólio para desenvolvedores", detail: "Atividade prática com vagas limitadas e certificado de participação.", date: "21 NOV" },
    ],
  },
  "Novidades da instituição": {
    eyebrow: "LUMEN ACADEMY",
    description: "Projetos, parcerias e conquistas que movimentam nossa comunidade.",
    items: [
      { tag: "Parceria", title: "Novo programa de estágio com empresas de tecnologia", detail: "A iniciativa conecta estudantes a oportunidades a partir do terceiro semestre.", date: "08 AGO" },
      { tag: "Infraestrutura", title: "Laboratório de inovação entra em funcionamento", detail: "O novo espaço reúne equipamentos para projetos de dados, IA e computação em nuvem.", date: "05 AGO" },
      { tag: "Pesquisa", title: "Projetos de iniciação científica recebem inscrições", detail: "Estudantes podem enviar propostas com orientação docente até o fim do mês.", date: "01 AGO" },
    ],
  },
};

const serviceContent: Record<string, { description: string; status: string; action: string; steps: string[] }> = {
  Eletivas: {
    description: "Explore disciplinas que complementam sua formação e amplie sua trilha profissional.",
    status: "Inscrições abertas",
    action: "Ver disciplinas eletivas",
    steps: ["Consulte as opções disponíveis", "Verifique horários e pré-requisitos", "Inclua a disciplina na sua grade"],
  },
  "Jornada acadêmica": {
    description: "Acompanhe os principais marcos da sua graduação, créditos e conquistas.",
    status: "65% do curso concluído",
    action: "Acessar minha jornada",
    steps: ["Visualize sua evolução", "Revise os créditos concluídos", "Planeje os próximos semestres"],
  },
  "Horas complementares": {
    description: "Registre certificados e acompanhe a validação das atividades complementares.",
    status: "48 de 80 horas validadas",
    action: "Enviar certificado",
    steps: ["Selecione o tipo de atividade", "Envie o certificado", "Acompanhe a análise da secretaria"],
  },
  DP: {
    description: "Organize disciplinas em dependência e consulte as próximas ofertas disponíveis.",
    status: "Nenhuma nova pendência identificada",
    action: "Consultar situação",
    steps: ["Revise sua situação acadêmica", "Consulte turmas disponíveis", "Solicite orientação da coordenação"],
  },
};

const academicJourneySemesters = [
  { number: 1, status: "Concluído", subjects: [{ name: "Fundamentos de Sistemas", credits: 6, situation: "Aprovada" }, { name: "Lógica de Programação", credits: 8, situation: "Aprovada" }, { name: "Comunicação Acadêmica", credits: 4, situation: "Aprovada" }] },
  { number: 2, status: "Concluído", subjects: [{ name: "Programação Orientada a Objetos", credits: 8, situation: "Aprovada" }, { name: "Matemática Aplicada", credits: 6, situation: "Aprovada" }, { name: "Arquitetura de Computadores", credits: 6, situation: "Aprovada" }] },
  { number: 3, status: "Concluído", subjects: [{ name: "Banco de Dados I", credits: 8, situation: "Aprovada" }, { name: "Desenvolvimento Web", credits: 8, situation: "Aprovada" }, { name: "Engenharia de Requisitos", credits: 6, situation: "Aprovada" }] },
  { number: 4, status: "Concluído", subjects: [{ name: "Estruturas de Dados", credits: 8, situation: "Aprovada" }, { name: "Banco de Dados II", credits: 8, situation: "Aprovada" }, { name: "Experiência do Usuário", credits: 6, situation: "Aprovada" }] },
  { number: 5, status: "Em andamento", subjects: [{ name: "Engenharia de Software", credits: 8, situation: "Em andamento" }, { name: "Computação em Nuvem", credits: 7, situation: "Em andamento" }, { name: "Projeto Integrador V", credits: 6, situation: "Em andamento" }] },
  { number: 6, status: "Planejado", subjects: [{ name: "Segurança da Informação", credits: 8, situation: "Planejada" }, { name: "Desenvolvimento Mobile", credits: 8, situation: "Planejada" }, { name: "Gestão de Projetos", credits: 6, situation: "Planejada" }] },
  { number: 7, status: "Planejado", subjects: [{ name: "Inteligência Artificial", credits: 8, situation: "Planejada" }, { name: "Engenharia de Dados", credits: 8, situation: "Planejada" }, { name: "Eletiva Profissional", credits: 6, situation: "Planejada" }] },
  { number: 8, status: "Planejado", subjects: [{ name: "Trabalho de Conclusão de Curso", credits: 12, situation: "Planejada" }, { name: "Governança de TI", credits: 6, situation: "Planejada" }, { name: "Empreendedorismo", credits: 6, situation: "Planejada" }] },
];

const initialCertificates = [
  { id: 1, activity: "Monitoria de Algoritmos", category: "Ensino", hours: 12, status: "Validado" },
  { id: 2, activity: "Curso de UX Research", category: "Extensão", hours: 8, status: "Validado" },
  { id: 3, activity: "Iniciação científica em dados", category: "Pesquisa", hours: 8, status: "Validado" },
  { id: 4, activity: "Semana Acadêmica Lumen", category: "Extensão", hours: 6, status: "Em análise" },
  { id: 5, activity: "Oficina de Escrita Científica", category: "Pesquisa", hours: 4, status: "Em análise" },
  { id: 6, activity: "Curso livre de acessibilidade", category: "Ensino", hours: 9, status: "Validado" },
  { id: 7, activity: "Palestra sem comprovante", category: "Extensão", hours: 2, status: "Recusado" },
];

const dependencySubjects = [
  { subject: "Estruturas de Dados", origin: "2025.2", credits: 8, status: "Em andamento" },
  { subject: "Cálculo Aplicado", origin: "2024.2", credits: 6, status: "Regularizada" },
  { subject: "Banco de Dados I", origin: "2025.1", credits: 8, status: "Regularizada" },
];

const availableDependencyClasses = [
  { id: "ed-noite", subject: "Estruturas de Dados", shift: "Noite", days: "Ter e Qui", seats: 8 },
  { id: "calculo-manha", subject: "Cálculo Aplicado", shift: "Manhã", days: "Seg e Qua", seats: 12 },
  { id: "bd-tarde", subject: "Banco de Dados I", shift: "Tarde", days: "Ter e Sex", seats: 5 },
  { id: "ed-manha", subject: "Estruturas de Dados", shift: "Manhã", days: "Sáb", seats: 10 },
];

const electiveAreas = [
  { value: "Tecno", label: "Tecnologia" },
  { value: "Negócios", label: "Negócios" },
  { value: "Artes", label: "Artes" },
  { value: "Humanas", label: "Humanas" },
] as const;

type ElectiveEnrollment = {
  id: string;
  title: string;
  status: "Pendente" | "Confirmada";
};

const initialElectiveEnrollments: ElectiveEnrollment[] = [
  { id: "physics-lab", title: "Lab de Física", status: "Pendente" },
  { id: "data-analysis", title: "Análise de Dados", status: "Confirmada" },
];

const electiveCourses = [
  {
    title: "Programação Web I",
    area: "Tecno",
    description: "Explore o desenvolvimento web, programação e interfaces responsivas.",
    modules: 2,
    credits: 7,
    schedule: "Quartas, das 19h às 21h",
    prerequisites: "Lógica de Programação",
    image: "https://images.unsplash.com/photo-1753715613434-9c7cb58876b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
  },
  {
    title: "Design Thinking",
    area: "Negócios",
    description: "Explore como analisar desafios e criar soluções centradas nas pessoas.",
    modules: 3,
    credits: 7,
    schedule: "Terças, das 18h30 às 20h30",
    prerequisites: "Sem pré-requisitos",
    image: "https://images.unsplash.com/photo-1623652554515-91c833e3080e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
  },
  {
    title: "Fotografia Digital",
    area: "Artes",
    description: "Fotografia digital que complementa sua formação criativa e visual.",
    modules: 3,
    credits: 6,
    schedule: "Sábados, das 9h às 12h",
    prerequisites: "Câmera própria ou smartphone",
    image: "https://images.unsplash.com/photo-1522325430955-e2d3bb38c71a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
  },
  {
    title: "Finanças Pessoais",
    area: "Negócios",
    description: "Organize suas finanças pessoais e tome decisões com mais segurança.",
    modules: 2,
    credits: 12,
    schedule: "Quintas, das 20h às 22h",
    prerequisites: "Sem pré-requisitos",
    image: "https://images.unsplash.com/photo-1625225233840-695456021cde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
  },
  {
    title: "História da Arte",
    area: "Artes",
    description: "Conheça movimentos, obras e contextos essenciais da história da arte.",
    modules: 4,
    credits: 10,
    schedule: "Segundas, das 19h às 21h",
    prerequisites: "Sem pré-requisitos",
    image: "https://images.unsplash.com/photo-1778975024871-6e4827556f9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
  },
  {
    title: "Sustentabilidade",
    area: "Humanas",
    description: "Estude sustentabilidade e soluções para um futuro mais equilibrado.",
    modules: 3,
    credits: 10,
    schedule: "Sextas, das 18h30 às 20h30",
    prerequisites: "Sem pré-requisitos",
    image: "https://images.unsplash.com/photo-1762381157166-f51ac99ab412?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=900",
  },
];

export function AnnouncementPage({ section, onRead }: { section: string; onRead: (message: string) => void }) {
  const content = announcementContent[section] ?? announcementContent.Comunicados;
  return (
    <Box className="portal-content-page">
      <Box className="portal-page-heading">
        <CampaignOutlined />
        <Box>
          <Typography variant="overline">{content.eyebrow}</Typography>
          <Typography component="h1">{section}</Typography>
          <Typography component="p">{content.description}</Typography>
        </Box>
      </Box>
      <Alert severity="info">Você receberá uma notificação quando houver uma nova publicação nesta categoria.</Alert>
      <Box className="announcement-list">
        {content.items.map((item) => (
          <Card variant="outlined" key={item.title}>
            <CardContent>
              <Box className="announcement-meta">
                <Chip label={item.tag} size="small" />
                <Typography variant="caption">{item.date}</Typography>
              </Box>
              <Typography variant="h5">{item.title}</Typography>
              <Typography color="text.secondary">{item.detail}</Typography>
              <Button endIcon={<ArrowForwardOutlined />} onClick={() => onRead(`${item.title}: publicação aberta.`)}>Ler publicação</Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

function ElectivesPage({ onAction }: { onAction: (message: string) => void }) {
  const [activeArea, setActiveArea] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<(typeof electiveCourses)[number] | null>(null);
  const [enrollments, setEnrollments] = useState(initialElectiveEnrollments);
  const [enrollmentsOpen, setEnrollmentsOpen] = useState(false);
  const [enrollmentToRemove, setEnrollmentToRemove] = useState<ElectiveEnrollment | null>(null);
  const visibleCourses = activeArea
    ? electiveCourses.filter((course) => course.area === activeArea)
    : electiveCourses;
  const visibleEnrollments = enrollments.slice(0, 2);

  const removeEnrollment = () => {
    if (!enrollmentToRemove) return;
    setEnrollments((current) => current.filter((item) => item.id !== enrollmentToRemove.id));
    onAction(`${enrollmentToRemove.title}: inscrição removida.`);
    setEnrollmentToRemove(null);
  };

  const renderEnrollment = (enrollment: ElectiveEnrollment) => {
    const pending = enrollment.status === "Pendente";
    return (
      <Box className="enrolled-subject" key={enrollment.id}>
        <Box className={`enrolled-subject-icon ${pending ? "pending" : "confirmed"}`}>
          {pending ? <QueryBuilderOutlined /> : <TaskAltOutlined />}
        </Box>
        <Box className="enrolled-subject-copy">
          <Typography>{enrollment.title}</Typography>
          <Chip label={enrollment.status} size="small" />
        </Box>
        <Button
          className="enrollment-remove-button"
          onClick={() => setEnrollmentToRemove(enrollment)}
          aria-label={`Remover inscrição em ${enrollment.title}`}
        >
          Remover
        </Button>
      </Box>
    );
  };

  return (
    <Box className="electives-page">
      <Box className="electives-support-column">
        <Card className="electives-status-card">
          <CardContent>
            <StarBorderOutlined />
            <Typography component="h1">Inscrições abertas</Typography>
          </CardContent>
        </Card>

        <Card className="electives-enrollments-card">
          <CardContent>
            <Typography component="h2">Minhas inscrições</Typography>
            {visibleEnrollments.map(renderEnrollment)}
            {visibleEnrollments.length === 0 && (
              <Typography className="enrollments-empty">Nenhuma inscrição ativa.</Typography>
            )}
            <Button className="electives-view-all" onClick={() => setEnrollmentsOpen(true)}>Ver Mais</Button>
          </CardContent>
        </Card>

        <Card className="electives-filter-card">
          <CardContent>
            <Typography component="h2">Filtrar por área</Typography>
            <Box className="elective-filter-pills" role="group" aria-label="Filtrar eletivas por área">
              {electiveAreas.map((area) => (
                <Button
                  key={area.value}
                  className={activeArea === area.value ? "active" : ""}
                  onClick={() => setActiveArea((current) => current === area.value ? null : area.value)}
                  aria-pressed={activeArea === area.value}
                >
                  {area.label}
                </Button>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box className="electives-main-column">
        <Box className="electives-steps" aria-label="Como funciona">
          {["Consulte Opções", "Verifique Horários", "Adicione na Grade"].map((step, index) => (
            <Box key={step}>
              <span>{index + 1}</span>
              <Typography>{step}</Typography>
              {index < 2 && <ArrowForwardOutlined />}
            </Box>
          ))}
        </Box>

        <Box className="electives-grid" aria-live="polite">
          {visibleCourses.map((course) => (
            <Card className="elective-course-card" variant="outlined" key={course.title}>
              <Box className="elective-cover">
                <img src={course.image} alt={`Imagem da disciplina ${course.title}`} />
                <Chip label={course.area} size="small" />
              </Box>
              <CardContent>
                <Typography component="h2">{course.title}</Typography>
                <Typography component="p">{course.description}</Typography>
                <Typography className="elective-meta">{course.modules} módulos • {course.credits} créditos</Typography>
                <Button fullWidth variant="contained" onClick={() => setSelectedCourse(course)}>Ver Detalhes</Button>
              </CardContent>
            </Card>
          ))}
        </Box>

        {visibleCourses.length === 0 && (
          <Alert severity="info">Nenhuma eletiva disponível para esta área no momento.</Alert>
        )}
      </Box>

      <Dialog
        open={selectedCourse !== null}
        onClose={() => setSelectedCourse(null)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="elective-dialog-title"
      >
        {selectedCourse && (
          <>
            <Box className="elective-dialog-cover">
              <img src={selectedCourse.image} alt="" />
              <IconButton onClick={() => setSelectedCourse(null)} aria-label="Fechar detalhes"><CloseOutlined /></IconButton>
            </Box>
            <DialogTitle id="elective-dialog-title">{selectedCourse.title}</DialogTitle>
            <DialogContent>
              <Typography color="text.secondary">{selectedCourse.description}</Typography>
              <Box className="elective-dialog-details">
                <Box><Typography variant="caption">Área</Typography><Typography>{selectedCourse.area}</Typography></Box>
                <Box><Typography variant="caption">Carga acadêmica</Typography><Typography>{selectedCourse.modules} módulos • {selectedCourse.credits} créditos</Typography></Box>
                <Box><Typography variant="caption">Horário</Typography><Typography>{selectedCourse.schedule}</Typography></Box>
                <Box><Typography variant="caption">Pré-requisitos</Typography><Typography>{selectedCourse.prerequisites}</Typography></Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedCourse(null)}>Voltar</Button>
              <Button
                variant="contained"
                onClick={() => {
                  onAction(`${selectedCourse.title}: solicitação para adicionar à grade registrada.`);
                  setSelectedCourse(null);
                }}
              >
                Adicionar à grade
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Dialog
        className="electives-enrollments-dialog"
        open={enrollmentsOpen}
        onClose={() => setEnrollmentsOpen(false)}
        fullWidth
        maxWidth="xs"
        aria-labelledby="enrollments-dialog-title"
      >
        <DialogTitle id="enrollments-dialog-title">
          Minhas inscrições
          <IconButton onClick={() => setEnrollmentsOpen(false)} aria-label="Fechar minhas inscrições">
            <CloseOutlined />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box className="enrollment-modal-list">
            {enrollments.map(renderEnrollment)}
            {enrollments.length === 0 && (
              <Typography className="enrollments-empty">Nenhuma inscrição ativa.</Typography>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        className="electives-confirm-dialog"
        open={enrollmentToRemove !== null}
        onClose={() => setEnrollmentToRemove(null)}
        fullWidth
        maxWidth="xs"
        aria-labelledby="remove-enrollment-dialog-title"
      >
        <DialogTitle id="remove-enrollment-dialog-title">Remover inscrição?</DialogTitle>
        <DialogContent>
          <Typography>
            Remover inscrição em {enrollmentToRemove?.title}?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEnrollmentToRemove(null)}>Cancelar</Button>
          <Button className="confirm-remove-button" onClick={removeEnrollment}>Remover</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export function ServicePage({ section, onAction }: { section: string; onAction: (message: string) => void }) {
  const [selectedSemester, setSelectedSemester] = useState(5);
  const [certificateCategory, setCertificateCategory] = useState("Ensino");
  const [certificateHours, setCertificateHours] = useState("");
  const [certificateName, setCertificateName] = useState("");
  const [certificateFile, setCertificateFile] = useState("");
  const [certificateMessage, setCertificateMessage] = useState("");
  const [certificateFilter, setCertificateFilter] = useState("Todos");
  const [certificates, setCertificates] = useState(initialCertificates);
  const [shiftFilter, setShiftFilter] = useState("Todos");
  const [requestedClasses, setRequestedClasses] = useState<string[]>([]);
  const certificateFormRef = useRef<HTMLDivElement>(null);
  const dependenciesRef = useRef<HTMLDivElement>(null);
  if (section === "Eletivas") return <ElectivesPage onAction={onAction} />;
  const content = serviceContent[section] ?? serviceContent.DP;
  const isAcademicJourney = section === "Jornada acadêmica";
  const isComplementaryHours = section === "Horas complementares";
  const isDependencyPage = section === "DP";
  const semester = academicJourneySemesters.find((item) => item.number === selectedSemester) ?? academicJourneySemesters[4];
  const selectedCertificateStatus =
    certificateFilter === "Validados" ? "Validado" :
    certificateFilter === "Recusados" ? "Recusado" :
    certificateFilter;
  const visibleCertificates = certificateFilter === "Todos"
    ? certificates
    : certificates.filter((certificate) => certificate.status === selectedCertificateStatus);
  const visibleDependencyClasses = shiftFilter === "Todos"
    ? availableDependencyClasses
    : availableDependencyClasses.filter((item) => item.shift === shiftFilter);

  const handleCertificateSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!certificateName || !certificateHours || !certificateFile) return;
    setCertificates((current) => [
      {
        id: Date.now(),
        activity: certificateName,
        category: certificateCategory,
        hours: Number(certificateHours),
        status: "Em análise",
      },
      ...current,
    ]);
    setCertificateName("");
    setCertificateHours("");
    setCertificateFile("");
    setCertificateFilter("Todos");
    setCertificateMessage("Certificado enviado para análise.");
  };

  return (
    <Box className="portal-content-page service-content-page">
      <Box className="portal-page-heading">
        <SchoolOutlined />
        <Box>
          <Typography variant="overline">SERVIÇOS ACADÊMICOS</Typography>
          <Typography component="h1">{section}</Typography>
          <Typography component="p">{content.description}</Typography>
        </Box>
      </Box>
      <Box className="service-overview">
        <Card className="service-status-card">
          <CardContent>
            <StarBorderOutlined />
            <Typography variant="overline">SITUAÇÃO ATUAL</Typography>
            <Typography variant="h4">{content.status}</Typography>
            {isAcademicJourney && (
              <Box className="journey-progress">
                <Box className="journey-progress-track"><i /></Box>
                <Box className="journey-progress-indicators">
                  <Box><strong>195/300</strong><span>créditos</span></Box>
                  <Box><strong>5º semestre</strong><span>atual</span></Box>
                  <Box><strong>2028.2</strong><span>previsão de formatura</span></Box>
                </Box>
              </Box>
            )}
            {isComplementaryHours && (
              <Box className="complementary-progress">
                <Box className="complementary-progress-track"><i /></Box>
                <Box className="complementary-progress-indicators">
                  <Box><strong>48h</strong><span>validadas</span></Box>
                  <Box><strong>10h</strong><span>em análise</span></Box>
                  <Box><strong>22h</strong><span>faltam</span></Box>
                </Box>
              </Box>
            )}
            {isDependencyPage && (
              <Box className="dependency-indicators">
                <Box><strong>0</strong><span>novas pendências</span></Box>
                <Box><strong>1</strong><span>em andamento</span></Box>
                <Box><strong>2</strong><span>regularizadas</span></Box>
              </Box>
            )}
            <Button
              variant="contained"
              endIcon={<ArrowForwardOutlined />}
              onClick={() => {
                if (isComplementaryHours) {
                  certificateFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                } else if (isDependencyPage) {
                  dependenciesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  onAction(`${section}: solicitação iniciada com sucesso.`);
                }
              }}
            >
              {content.action}
            </Button>
          </CardContent>
        </Card>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6">Como funciona</Typography>
            <Stack spacing={2.25} className="service-steps">
              {content.steps.map((step, index) => (
                <Box key={step}>
                  <Box><TaskAltOutlined /></Box>
                  <Box><Typography variant="caption">ETAPA {index + 1}</Typography><Typography>{step}</Typography></Box>
                </Box>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Box>
      {isAcademicJourney && (
        <>
          <Card className="journey-timeline-card" variant="outlined">
            <CardContent>
              <Box className="journey-section-heading">
                <Box>
                  <Typography variant="overline">PLANEJAMENTO ACADÊMICO</Typography>
                  <Typography variant="h5">Linha do tempo por semestre</Typography>
                </Box>
                <Chip
                  className={`journey-status-chip ${
                    semester.status === "Concluído" ? "completed" : semester.status === "Em andamento" ? "current" : "planned"
                  }`}
                  label={semester.status}
                  size="small"
                />
              </Box>
              <Box className="semester-selector" role="tablist" aria-label="Selecionar semestre">
                {academicJourneySemesters.map((item) => {
                  const statusClass = item.status === "Concluído" ? "completed" : item.status === "Em andamento" ? "current" : "planned";
                  return (
                    <Button
                      key={item.number}
                      className={`${statusClass} ${selectedSemester === item.number ? "selected" : ""}`}
                      onClick={() => setSelectedSemester(item.number)}
                      role="tab"
                      aria-selected={selectedSemester === item.number}
                    >
                      <span>{item.number}º</span>
                      <small>{item.status}</small>
                    </Button>
                  );
                })}
              </Box>
              <Box className="journey-table" role="table" aria-label={`Disciplinas do ${selectedSemester}º semestre`}>
                <Box className="journey-table-head" role="row">
                  <span role="columnheader">Disciplina</span>
                  <span role="columnheader">Créditos</span>
                  <span role="columnheader">Situação</span>
                </Box>
                {semester.subjects.map((subject) => (
                  <Box className="journey-table-row" role="row" key={subject.name}>
                    <strong role="cell">{subject.name}</strong>
                    <span role="cell">{subject.credits}</span>
                    <Chip role="cell" label={subject.situation} size="small" />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card className="journey-milestones-card" variant="outlined">
            <CardContent>
              <Box className="journey-section-heading">
                <Box>
                  <Typography variant="overline">SUA EVOLUÇÃO</Typography>
                  <Typography variant="h5">Marcos e conquistas</Typography>
                </Box>
              </Box>
              <Box className="journey-milestones">
                <Box className="achieved"><TaskAltOutlined /><Box><Typography>Ciclo básico concluído</Typography><span>Fundamentos da formação completos</span></Box></Box>
                <Box className="achieved"><StarBorderOutlined /><Box><Typography>Metade do curso</Typography><span>Mais de 50% da jornada concluída</span></Box></Box>
                <Box className="locked"><QueryBuilderOutlined /><Box><Typography>Reta final</Typography><span>Disponível ao atingir 80%</span></Box></Box>
              </Box>
            </CardContent>
          </Card>
        </>
      )}
      {isComplementaryHours && (
        <>
          <Card className="service-detail-card complementary-categories-card" variant="outlined">
            <CardContent>
              <Box className="journey-section-heading">
                <Box>
                  <Typography variant="overline">DISTRIBUIÇÃO</Typography>
                  <Typography variant="h5">Horas por categoria</Typography>
                </Box>
              </Box>
              <Box className="complementary-category-grid">
                <Box>
                  <Typography>Ensino</Typography>
                  <strong>21h <span>de 30h</span></strong>
                  <Box className="category-progress teaching"><i /></Box>
                </Box>
                <Box>
                  <Typography>Pesquisa</Typography>
                  <strong>8h <span>de 20h</span></strong>
                  <Box className="category-progress research"><i /></Box>
                </Box>
                <Box>
                  <Typography>Extensão</Typography>
                  <strong>19h <span>de 30h</span></strong>
                  <Box className="category-progress extension"><i /></Box>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card className="service-detail-card certificate-form-card" variant="outlined" ref={certificateFormRef}>
            <CardContent>
              <Box className="journey-section-heading">
                <Box>
                  <Typography variant="overline">NOVO REGISTRO</Typography>
                  <Typography variant="h5">Enviar certificado</Typography>
                </Box>
              </Box>
              {certificateMessage && (
                <Alert severity="success" onClose={() => setCertificateMessage("")}>{certificateMessage}</Alert>
              )}
              <Box component="form" className="certificate-form-grid" onSubmit={handleCertificateSubmit}>
                <FormControl fullWidth>
                  <InputLabel id="certificate-category-label">Tipo de atividade</InputLabel>
                  <Select
                    labelId="certificate-category-label"
                    label="Tipo de atividade"
                    value={certificateCategory}
                    onChange={(event) => setCertificateCategory(event.target.value)}
                  >
                    <MenuItem value="Ensino">Ensino</MenuItem>
                    <MenuItem value="Pesquisa">Pesquisa</MenuItem>
                    <MenuItem value="Extensão">Extensão</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  label="Carga horária"
                  type="number"
                  value={certificateHours}
                  onChange={(event) => setCertificateHours(event.target.value.replace(/\D/g, "").slice(0, 3))}
                  slotProps={{ htmlInput: { min: 1, inputMode: "numeric" } }}
                  fullWidth
                />
                <TextField
                  className="certificate-full-field"
                  label="Nome da atividade"
                  value={certificateName}
                  onChange={(event) => setCertificateName(event.target.value)}
                  fullWidth
                />
                <Box className="certificate-upload certificate-full-field">
                  <Box>
                    <Typography variant="subtitle2">Certificado</Typography>
                    <Typography variant="caption">{certificateFile || "PDF ou imagem, até 10 MB"}</Typography>
                  </Box>
                  <Button component="label" variant="outlined">
                    Selecionar arquivo
                    <Input
                      type="file"
                      inputProps={{ accept: "application/pdf,image/*" }}
                      onChange={(event) => {
                        const file = (event.target as HTMLInputElement).files?.[0];
                        setCertificateFile(file?.name ?? "");
                      }}
                      sx={{ display: "none" }}
                    />
                  </Button>
                </Box>
                <Button
                  className="certificate-submit certificate-full-field"
                  type="submit"
                  variant="contained"
                  disabled={!certificateName || !certificateHours || !certificateFile}
                >
                  Enviar certificado
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card className="service-detail-card certificates-card" variant="outlined">
            <CardContent>
              <Box className="journey-section-heading">
                <Box>
                  <Typography variant="overline">HISTÓRICO</Typography>
                  <Typography variant="h5">Meus certificados</Typography>
                </Box>
              </Box>
              <Box className="service-filter-pills" role="group" aria-label="Filtrar certificados">
                {["Todos", "Validados", "Em análise", "Recusados"].map((filter) => (
                  <Button
                    key={filter}
                    className={certificateFilter === filter ? "active" : ""}
                    onClick={() => setCertificateFilter(filter)}
                    aria-pressed={certificateFilter === filter}
                  >
                    {filter}
                  </Button>
                ))}
              </Box>
              <Box className="certificates-table" role="table" aria-label="Meus certificados">
                <Box className="service-table-head" role="row">
                  <span role="columnheader">Atividade</span>
                  <span role="columnheader">Categoria</span>
                  <span role="columnheader">Horas</span>
                  <span role="columnheader">Situação</span>
                </Box>
                {visibleCertificates.map((certificate) => (
                  <Box className="service-table-row" role="row" key={certificate.id}>
                    <strong role="cell">{certificate.activity}</strong>
                    <span role="cell">{certificate.category}</span>
                    <span role="cell">{certificate.hours}h</span>
                    <Chip
                      role="cell"
                      className={
                        certificate.status === "Validado" ? "validated" :
                        certificate.status === "Em análise" ? "review" :
                        "refused"
                      }
                      label={certificate.status}
                      size="small"
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </>
      )}
      {isDependencyPage && (
        <>
          <Card className="service-detail-card dependencies-card" variant="outlined" ref={dependenciesRef}>
            <CardContent>
              <Box className="journey-section-heading">
                <Box>
                  <Typography variant="overline">ACOMPANHAMENTO</Typography>
                  <Typography variant="h5">Minhas dependências</Typography>
                </Box>
              </Box>
              <Box className="dependencies-table" role="table" aria-label="Minhas dependências">
                <Box className="service-table-head" role="row">
                  <span role="columnheader">Disciplina</span>
                  <span role="columnheader">Semestre de origem</span>
                  <span role="columnheader">Créditos</span>
                  <span role="columnheader">Situação</span>
                </Box>
                {dependencySubjects.map((item) => (
                  <Box className="service-table-row" role="row" key={item.subject}>
                    <strong role="cell">{item.subject}</strong>
                    <span role="cell">{item.origin}</span>
                    <span role="cell">{item.credits}</span>
                    <Chip className={item.status === "Regularizada" ? "validated" : "review"} label={item.status} size="small" role="cell" />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>

          <Card className="service-detail-card available-classes-card" variant="outlined">
            <CardContent>
              <Box className="journey-section-heading">
                <Box>
                  <Typography variant="overline">PRÓXIMAS OFERTAS</Typography>
                  <Typography variant="h5">Turmas disponíveis</Typography>
                </Box>
              </Box>
              <Box className="service-filter-pills" role="group" aria-label="Filtrar turmas por turno">
                {["Todos", "Manhã", "Tarde", "Noite"].map((filter) => (
                  <Button
                    key={filter}
                    className={shiftFilter === filter ? "active" : ""}
                    onClick={() => setShiftFilter(filter)}
                    aria-pressed={shiftFilter === filter}
                  >
                    {filter}
                  </Button>
                ))}
              </Box>
              <Box className="available-classes-table" role="table" aria-label="Turmas disponíveis">
                <Box className="service-table-head" role="row">
                  <span role="columnheader">Disciplina</span>
                  <span role="columnheader">Turno</span>
                  <span role="columnheader">Dias</span>
                  <span role="columnheader">Vagas</span>
                  <span role="columnheader">Ação</span>
                </Box>
                {visibleDependencyClasses.map((item) => {
                  const requested = requestedClasses.includes(item.id);
                  return (
                    <Box className="service-table-row" role="row" key={item.id}>
                      <strong role="cell">{item.subject}</strong>
                      <span role="cell">{item.shift}</span>
                      <span role="cell">{item.days}</span>
                      <span role="cell">{item.seats}</span>
                      <Button
                        role="cell"
                        variant={requested ? "outlined" : "contained"}
                        disabled={requested}
                        onClick={() => setRequestedClasses((current) => [...current, item.id])}
                      >
                        {requested ? "Solicitada ✓" : "Solicitar vaga"}
                      </Button>
                    </Box>
                  );
                })}
              </Box>
              <Typography className="classes-note">
                As solicitações passam pela análise da coordenação antes da confirmação da matrícula.
              </Typography>
            </CardContent>
          </Card>
        </>
      )}
      <Card className="service-help" variant="outlined">
        <CardContent>
          <MenuBookOutlined />
          <Box><Typography variant="h6">Precisa de orientação?</Typography><Typography color="text.secondary">A equipe acadêmica pode ajudar você a escolher o melhor caminho.</Typography></Box>
          <Button onClick={() => onAction("Atendimento acadêmico iniciado.")}>Falar com a equipe</Button>
        </CardContent>
      </Card>
    </Box>
  );
}
