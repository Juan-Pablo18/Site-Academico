import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  IconButton,
  Input,
  Link
} from "@mui/material";
import AccessibilityNewOutlined from "@mui/icons-material/AccessibilityNewOutlined";
import ArrowBackOutlined from "@mui/icons-material/ArrowBackOutlined";
import BadgeOutlined from "@mui/icons-material/BadgeOutlined";
import CameraAltOutlined from "@mui/icons-material/CameraAltOutlined";
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined";
import DownloadOutlined from "@mui/icons-material/DownloadOutlined";
import LockOutlined from "@mui/icons-material/LockOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import WhatsApp from "@mui/icons-material/WhatsApp";
import { ContractPage, NegotiationPage, PaymentMethodsPage } from "./FinancialModules";
import { AnnouncementPage, ServicePage } from "./PortalContentPages";
import AnnouncementsPage from "./AnnouncementsPage";
import GradesPage from "./GradesPage";
import DisciplinesPage from "./DisciplinesPage";
import profileLibraryUrl from "./imports/profile-library.png";

type IconName =
  | "home"
  | "chart"
  | "book"
  | "clipboard"
  | "user"
  | "calendar"
  | "bell"
  | "moon"
  | "sun"
  | "accessibility"
  | "arrow"
  | "clock"
  | "star"
  | "graduation"
  | "building"
  | "megaphone"
  | "payment"
  | "currency"
  | "check"
  | "menu"
  | "close";

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v11h14V9M9 20v-6h6v6"/></>,
    chart: <><path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/></>,
    book: <><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v18H7.5A3.5 3.5 0 0 0 4 23Z"/><path d="M20 5.5A3.5 3.5 0 0 0 16.5 2H13v18h3.5a3.5 3.5 0 0 1 3.5 3Z"/></>,
    clipboard: <><path d="M9 5H6a2 2 0 0 0-2 2v14h16V7a2 2 0 0 0-2-2h-3"/><rect x="9" y="2" width="6" height="5" rx="1"/><path d="m8 14 2 2 5-5"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    moon: <path d="M21 15.5A9 9 0 1 1 8.5 3 7 7 0 0 0 21 15.5Z"/>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></>,
    accessibility: <><circle cx="12" cy="4" r="2"/><path d="M5 8h14M12 6v7M8 22l4-9 4 9"/></>,
    arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>,
    graduation: <><path d="m2 9 10-5 10 5-10 5Z"/><path d="M6 11.5V16c3.5 3 8.5 3 12 0v-4.5M22 9v6"/></>,
    building: <><path d="M3 21h18M5 21V9h14v12M3 9l9-6 9 6M9 13v4M15 13v4"/></>,
    megaphone: <><path d="m3 11 14-6v14L3 13Z"/><path d="M7 14v5h4l-1-6"/></>,
    payment: <><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 9h20M6 15h4"/></>,
    currency: <><circle cx="12" cy="12" r="9"/><path d="M15 8.5c-.7-.6-1.7-1-3-1-1.7 0-3 1-3 2.3 0 3.5 6 1.4 6 4.6 0 1.3-1.3 2.3-3 2.3-1.3 0-2.5-.4-3.3-1.2M12 5.5v13"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function ProfileDataBlock({ label, value }: { label: string; value: string }) {
  return (
    <Box className="profile-data-block">
      <Typography component="span">{label}</Typography>
      <Typography component="strong">{value}</Typography>
    </Box>
  );
}

function ProfileActionCard({
  icon,
  title,
  description,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button className="profile-action-card" onClick={onClick}>
      <span>{icon}</span>
      <span>
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
      <ChevronRightOutlined />
    </button>
  );
}

type MenuCategory = "Início" | "Anúncios" | "Financeiro" | "Serviços";

const navigationMenus: {
  title: MenuCategory;
  icon: IconName;
  items: { label: string; icon: IconName; destination?: string }[];
}[] = [
  {
    title: "Início",
    icon: "home",
    items: [
      { label: "Visão geral", icon: "chart", destination: "Dashboard" },
      { label: "Meu perfil", icon: "user", destination: "Meu perfil" },
      { label: "Disciplinas", icon: "book", destination: "Disciplinas" },
      { label: "Notas e Frequências", icon: "chart", destination: "Notas" },
      { label: "Secretaria e suporte", icon: "graduation", destination: "Secretaria e suporte" },
    ],
  },
  {
    title: "Anúncios",
    icon: "megaphone",
    items: [
      { label: "Comunicados", icon: "megaphone", destination: "Comunicados" },
      { label: "Avisos acadêmicos", icon: "bell", destination: "Avisos acadêmicos" },
      { label: "Eventos e atividades", icon: "calendar", destination: "Eventos e atividades" },
      { label: "Novidades da instituição", icon: "building", destination: "Novidades da instituição" },
    ],
  },
  {
    title: "Financeiro",
    icon: "payment",
    items: [
      { label: "Métodos de pagamento", icon: "payment", destination: "Métodos de pagamento" },
      { label: "Negociação", icon: "currency", destination: "Negociação" },
      { label: "Contrato", icon: "clipboard", destination: "Contrato" },
    ],
  },
  {
    title: "Serviços",
    icon: "building",
    items: [
      { label: "Eletivas", icon: "star", destination: "Eletivas" },
      { label: "Jornada acadêmica", icon: "graduation", destination: "Jornada acadêmica" },
      { label: "Horas complementares", icon: "clock", destination: "Horas complementares" },
      { label: "DP", icon: "clipboard", destination: "DP" },
    ],
  },
];

const announcementPages = ["Comunicados", "Avisos acadêmicos", "Eventos e atividades", "Novidades da instituição"];
const servicePages = ["Eletivas", "Jornada acadêmica", "Horas complementares", "DP"];

const events = [
  { day: "10", month: "NOV", title: "Semana Acadêmica 2026", subject: "08:00 às 18:00 • Auditório principal" },
  { day: "14", month: "NOV", title: "Palestra: Carreiras em TI", subject: "19:00 às 21:00 • Auditório 2" },
];

const initialSubjects = [
  { name: "Desenvolvimento Web", code: "WEB301", teacher: "Marina Costa", grade: 9.4, status: "Aprovado", day: "Seg", time: "19:00 — 21:00", room: "Lab 03", credits: 4, progress: 82, absences: 4 },
  { name: "Banco de Dados", code: "BD204", teacher: "Rafael Mendes", grade: 8.7, status: "Aprovado", day: "Ter", time: "19:00 — 21:00", room: "Sala 12", credits: 4, progress: 76, absences: 8 },
  { name: "Engenharia de Software", code: "ENG210", teacher: "Carla Nunes", grade: 8.2, status: "Aprovado", day: "Qua", time: "19:00 — 21:00", room: "Sala 08", credits: 4, progress: 70, absences: 6 },
  { name: "UX e Design de Interfaces", code: "UX110", teacher: "Lucas Alves", grade: 9.1, status: "Aprovado", day: "Qui", time: "19:00 — 21:00", room: "Lab 01", credits: 3, progress: 91, absences: 10 },
  { name: "Estruturas de Dados", code: "ED202", teacher: "João Prado", grade: 5.2, status: "Em andamento", day: "Sex", time: "19:00 — 21:00", room: "Lab 02", credits: 4, progress: 61, absences: 14 },
  { name: "Arquitetura de Computadores", code: "AC101", teacher: "Ana Lima", grade: 4.8, status: "Em andamento", day: "Sáb", time: "09:00 — 11:00", room: "Sala 04", credits: 4, progress: 58, absences: 18 },
];

const enrollmentOptions = [
  { id: "cloud", name: "Computação em Nuvem", code: "CLD310", teacher: "Fernanda Reis", schedule: "Seg • 21:00 — 23:00", seats: 12, credits: 4, area: "Infraestrutura e sistemas" },
  { id: "security", name: "Segurança da Informação", code: "SEC320", teacher: "Bruno Dias", schedule: "Ter • 21:00 — 23:00", seats: 7, credits: 4, area: "Cibersegurança" },
  { id: "mobile", name: "Desenvolvimento Mobile", code: "MOB305", teacher: "Diego Ramos", schedule: "Qua • 21:00 — 23:00", seats: 15, credits: 4, area: "Desenvolvimento de software" },
  { id: "ai", name: "Inteligência Artificial Aplicada", code: "IA401", teacher: "Patrícia Melo", schedule: "Qui • 21:00 — 23:00", seats: 4, credits: 4, area: "Dados e inteligência artificial" },
  { id: "data", name: "Engenharia de Dados", code: "DAD330", teacher: "Renato Gomes", schedule: "Sex • 21:00 — 23:00", seats: 9, credits: 4, area: "Dados e arquitetura" },
];

const schoolDocuments = [
  { title: "Declaração de matrícula", description: "Comprove seu vínculo acadêmico no semestre atual.", time: "Emissão imediata" },
  { title: "Histórico escolar", description: "Consulte notas, créditos e disciplinas concluídas.", time: "Até 2 dias úteis" },
  { title: "Atestado de frequência", description: "Documento oficial com sua frequência consolidada.", time: "Até 2 dias úteis" },
  { title: "Ementas e planos de ensino", description: "Acesse o conteúdo programático das disciplinas.", time: "Emissão imediata" },
];

type ProfileSection = "personal" | "password" | "student-card" | "accessibility";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [login, setLogin] = useState({ ra: "", cpf: "" });
  const [authError, setAuthError] = useState("");
  const [authNotice, setAuthNotice] = useState("");
  const [emailDialogMode, setEmailDialogMode] = useState<"forgot" | "access" | null>(null);
  const [accessEmail, setAccessEmail] = useState("");
  const [signupOpen, setSignupOpen] = useState(false);
  const [signup, setSignup] = useState({ name: "", ra: "", cpf: "", email: "" });
  const [dark, setDark] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(100);
  const [active, setActive] = useState("Dashboard");
  const [accessOpen, setAccessOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState<MenuCategory | null>(null);
  const [megaMenuNotice, setMegaMenuNotice] = useState("");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [gradeFilter, setGradeFilter] = useState("Todas");
  const [selectedEnrollment, setSelectedEnrollment] = useState<string[]>([]);
  const [enrollmentDone, setEnrollmentDone] = useState(false);
  const [supportNotice, setSupportNotice] = useState("");
  
  // Profile state
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSaved, setProfileSaved] = useState(false);
  const [profileError, setProfileError] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileCover, setProfileCover] = useState(profileLibraryUrl);
  const [profileSection, setProfileSection] = useState<ProfileSection | null>(null);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [logoutDone, setLogoutDone] = useState(false);
  const [profile, setProfile] = useState({
    name: "João Silva",
    email: "joao.silva@lumenacademy.edu.br",
    phone: "(11) 91234-5678",
    city: "Jundiaí, SP",
    course: "Sistemas de Informação",
    password: "",
    confirmPassword: "",
  });

  // Subjects state for delete
  const [allSubjects, setAllSubjects] = useState(initialSubjects);
  const [subjectToDelete, setSubjectToDelete] = useState<string | null>(null);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? "dark" : "light",
          primary: {
            main: dark ? "#e36a78" : "#a51c30",
            contrastText: "#ffffff",
          },
        },
        typography: {
          fontFamily: "inherit",
          h1: { fontFamily: "Georgia, serif" },
          h2: { fontFamily: "Georgia, serif" },
          h3: { fontFamily: "Georgia, serif" },
          h4: { fontFamily: "Georgia, serif" },
        },
      }),
    [dark]
  );

  const visibleSubjects = useMemo(
    () => allSubjects.filter((subject) => subject.name.toLowerCase().includes(subjectSearch.toLowerCase())),
    [allSubjects, subjectSearch],
  );
  const visibleGrades = gradeFilter === "Todas"
    ? allSubjects
    : allSubjects.filter((subject) => subject.status === gradeFilter);
  const newCredits = enrollmentOptions
    .filter((subject) => selectedEnrollment.includes(subject.id))
    .reduce((total, subject) => total + subject.credits, 0);
  const semesterAverage = allSubjects.reduce((total, subject) => total + subject.grade, 0) / allSubjects.length;
  const approvedSubjects = allSubjects.filter((subject) => subject.grade >= 6).length;
  const activeMenuCategory =
    active === "Anúncios"
      ? "Anúncios"
      : navigationMenus.find((menu) => menu.items.some((item) => item.destination === active))?.title ?? "Início";
  const visibleMenu = navigationMenus.find((menu) => menu.title === megaMenuOpen);
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date());

  const changePage = (label: string) => {
    setActive(label);
  };

  useEffect(() => {
    if (!megaMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMegaMenuOpen(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [megaMenuOpen]);

  const selectMegaMenuItem = (label: string, destination?: string) => {
    setMegaMenuOpen(null);
    if (destination) {
      changePage(destination);
      return;
    }
    setMegaMenuNotice(`${label}: serviço disponível em breve.`);
  };

  const toggleEnrollment = (id: string) => {
    setEnrollmentDone(false);
    setSelectedEnrollment((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  };

  const saveProfile = () => {
    if (profile.password !== profile.confirmPassword) {
      setProfileError("As senhas informadas não são iguais.");
      return;
    }
    if (profile.name.trim() === "") {
      setProfileError("O nome não pode estar vazio.");
      return;
    }
    
    setProfileError("");
    setProfileSaving(true);
    
    setTimeout(() => {
      setProfileSaving(false);
      setProfileSaved(true);
    }, 2000);
  };

  const handleDeleteSubject = () => {
    if (subjectToDelete) {
      setAllSubjects(allSubjects.filter(s => s.code !== subjectToDelete));
      setSubjectToDelete(null);
    }
  };

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    if (login.ra.length < 6 || login.cpf.length !== 11) {
      setAuthError("Informe um RA válido e um CPF com 11 números.");
      return;
    }
    setAuthError("");
    setAuthenticated(true);
  };

  const handleSignup = () => {
    if (
      signup.name.trim().length < 3 ||
      signup.ra.length < 6 ||
      signup.cpf.length !== 11 ||
      !signup.email.includes("@")
    ) {
      setAuthError("Preencha todos os dados do cadastro corretamente.");
      return;
    }
    setLogin({ ra: signup.ra, cpf: signup.cpf });
    setAccessEmail(signup.email);
    setSignupOpen(false);
    setAuthError("");
    setAuthNotice(`Cadastro realizado. Enviamos o link de acesso para ${signup.email}.`);
  };

  const handleEmailRequest = () => {
    if (!accessEmail.includes("@")) {
      setAuthError("Informe um e-mail válido para receber o link.");
      return;
    }
    const message = emailDialogMode === "forgot"
      ? `Enviamos as orientações de acesso para ${accessEmail}.`
      : `Enviamos seu link de acesso para ${accessEmail}.`;
    setEmailDialogMode(null);
    setAuthError("");
    setAuthNotice(message);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {!authenticated ? (
        <Box className="login-page">
          <Box className="login-panel" component="section">
            <Box className="login-brand">
              <Box className="login-brand-mark">
                <img src="/lumen-academy-logo.png" alt="" />
              </Box>
              <Typography variant="subtitle1" component="span">Lumen Academy</Typography>
            </Box>

            <Box className="login-content">
              <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800 }}>
                PORTAL ACADÊMICO
              </Typography>
              <Typography variant="h3" component="h1" sx={{ mt: 1, fontWeight: 800 }}>
                Aluno Online
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1, mb: 4 }}>
                Acesse sua jornada acadêmica com seu RA e CPF.
              </Typography>

              {authError && <Alert severity="error" sx={{ mb: 2 }}>{authError}</Alert>}

              <Box component="form" onSubmit={handleLogin}>
                <Stack spacing={2.25}>
                  <TextField
                    label="Número do RA"
                    value={login.ra}
                    onChange={(event) => setLogin({ ...login, ra: event.target.value.replace(/\D/g, "").slice(0, 12) })}
                    slotProps={{ htmlInput: { inputMode: "numeric" } }}
                    autoComplete="username"
                    helperText="Seu registro acadêmico"
                    fullWidth
                    required
                  />
                  <TextField
                    label="CPF"
                    type="password"
                    value={login.cpf}
                    onChange={(event) => setLogin({ ...login, cpf: event.target.value.replace(/\D/g, "").slice(0, 11) })}
                    slotProps={{ htmlInput: { inputMode: "numeric" } }}
                    autoComplete="current-password"
                    helperText="Use os 11 números do seu CPF"
                    fullWidth
                    required
                  />
                  <Box className="login-help-row">
                    <Link component="button" type="button" onClick={() => setEmailDialogMode("forgot")} underline="hover">
                      Esqueci minha senha
                    </Link>
                  </Box>
                  <Button type="submit" variant="contained" size="large" fullWidth>
                    Entrar no site
                  </Button>
                  <Button variant="outlined" size="large" fullWidth onClick={() => setEmailDialogMode("access")}>
                    Receber link de acesso por e-mail
                  </Button>
                </Stack>
              </Box>

              <Divider sx={{ my: 3 }}>PRIMEIRO ACESSO</Divider>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, textAlign: "center" }}>
                Ainda não possui acesso ao portal?
              </Typography>
              <Button variant="text" fullWidth onClick={() => setSignupOpen(true)}>
                Criar minha conta
              </Button>
            </Box>

            <Typography className="login-footer" variant="caption" color="text.secondary">
              Ambiente seguro para alunos Lumen Academy
            </Typography>
          </Box>

          <Box className="login-hero" component="section">
            <Typography className="login-quote" variant="h5" component="p">
              “Conhecimento é a única bagagem que nunca pesa, mas sempre impulsiona.”
            </Typography>
            <Box className="login-hero-logo">
              <img src="/lumen-academy-logo.png" alt="Lumen Academy — Onde o conhecimento acende" />
            </Box>
            <Typography className="login-description" variant="h6" component="p">
              Aulas, notas, frequências e muito mais. Tudo que você precisa para ir mais longe.
            </Typography>
          </Box>

          <Dialog open={signupOpen} onClose={() => setSignupOpen(false)} fullWidth maxWidth="xs">
            <DialogTitle>Criar conta de aluno</DialogTitle>
            <DialogContent>
              <Typography color="text.secondary" variant="body2" sx={{ mb: 2.5 }}>
                Preencha seus dados para receber o link de primeiro acesso.
              </Typography>
              <Stack spacing={2}>
                <TextField label="Nome completo" value={signup.name} onChange={(event) => setSignup({ ...signup, name: event.target.value })} fullWidth required />
                <TextField label="Número do RA" value={signup.ra} onChange={(event) => setSignup({ ...signup, ra: event.target.value.replace(/\D/g, "").slice(0, 12) })} slotProps={{ htmlInput: { inputMode: "numeric" } }} fullWidth required />
                <TextField label="CPF" type="password" value={signup.cpf} onChange={(event) => setSignup({ ...signup, cpf: event.target.value.replace(/\D/g, "").slice(0, 11) })} slotProps={{ htmlInput: { inputMode: "numeric" } }} fullWidth required />
                <TextField label="E-mail" type="email" value={signup.email} onChange={(event) => setSignup({ ...signup, email: event.target.value })} fullWidth required />
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSignupOpen(false)}>Cancelar</Button>
              <Button variant="contained" onClick={handleSignup}>Criar conta</Button>
            </DialogActions>
          </Dialog>

          <Dialog open={emailDialogMode !== null} onClose={() => setEmailDialogMode(null)} fullWidth maxWidth="xs">
            <DialogTitle>{emailDialogMode === "forgot" ? "Recuperar acesso" : "Receber link de acesso"}</DialogTitle>
            <DialogContent>
              <Typography color="text.secondary" variant="body2" sx={{ mb: 2.5 }}>
                Informe o e-mail cadastrado para receber as orientações.
              </Typography>
              <TextField label="E-mail cadastrado" type="email" value={accessEmail} onChange={(event) => setAccessEmail(event.target.value)} fullWidth autoFocus />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setEmailDialogMode(null)}>Cancelar</Button>
              <Button variant="contained" onClick={handleEmailRequest}>Enviar por e-mail</Button>
            </DialogActions>
          </Dialog>

          <Snackbar open={authNotice !== ""} autoHideDuration={5000} onClose={() => setAuthNotice("")}>
            <Alert severity="success" variant="filled" onClose={() => setAuthNotice("")}>{authNotice}</Alert>
          </Snackbar>
        </Box>
      ) : (
      <div
        className={`app ${dark ? "dark" : ""} ${highContrast ? "high-contrast" : ""}`}
        style={{ fontSize: `${fontScale}%` }}
      >
        <a href="#conteudo" className="skip-link">Pular para o conteúdo principal</a>

        <div className={`page ${active === "Meu perfil" ? "profile-view" : ""}`}>
          <header className={`portal-header ${active === "Meu perfil" ? "profile-portal-header" : ""}`}>
            <button className="portal-brand" onClick={() => changePage("Dashboard")} aria-label="Ir para o início">
              <span className="portal-brand-mark"><img src="/lumen-academy-logo.png" alt="" /></span>
              <span><strong>Lumen</strong><strong>Academy</strong></span>
            </button>
            <nav className="portal-primary-nav" aria-label="Navegação principal">
              {navigationMenus.map((menu) => {
                const selected = megaMenuOpen === menu.title || (!megaMenuOpen && activeMenuCategory === menu.title);
                return (
                  <button
                    key={menu.title}
                    className={selected ? "active" : ""}
                    onClick={() => {
                      if (menu.title === "Anúncios") {
                        setMegaMenuOpen(null);
                        changePage("Anúncios");
                        return;
                      }
                      setMegaMenuOpen((current) => current === menu.title ? null : menu.title);
                    }}
                    aria-expanded={megaMenuOpen === menu.title}
                    aria-haspopup="dialog"
                  >
                    <Icon name={menu.icon} size={17} />
                    <span>{menu.title}</span>
                  </button>
                );
              })}
            </nav>
            <div className="header-actions">
              {active !== "Meu perfil" && (
                <button className="portal-icon-button" onClick={() => setSupportNotice("Você tem 3 notificações acadêmicas não lidas.")} aria-label="Notificações"><Icon name="bell" /><i>3</i></button>
              )}
              <button className="portal-profile-button" onClick={() => changePage("Meu perfil")} aria-label="Abrir meu perfil">
                <span className="avatar">JS</span>
                <span><strong>João Silva</strong><small>Aluno</small></span>
              </button>
            </div>
          </header>

          {megaMenuOpen && visibleMenu && (
            <>
              <button className="mega-menu-backdrop" onClick={() => setMegaMenuOpen(null)} aria-label="Fechar menu" />
              <Box className="mega-menu-panel" component="section" role="dialog" aria-modal="true" aria-label={`Menu ${visibleMenu.title}`}>
                <Box className="mega-menu-header">
                  <Box className="mega-menu-brand">
                    <Box className="mega-menu-brand-mark"><img src="/lumen-academy-logo.png" alt="" /></Box>
                    <Box>
                      <Typography component="strong">Lumen Academy</Typography>
                      <Typography component="span">{visibleMenu.title}</Typography>
                    </Box>
                  </Box>
                  <Button
                    className="mega-menu-close-button"
                    color="inherit"
                    endIcon={<Icon name="close" size={18} />}
                    onClick={() => setMegaMenuOpen(null)}
                  >
                    Fechar
                  </Button>
                </Box>
                <Box className="mega-menu-category-heading">
                  <Icon name={visibleMenu.icon} />
                  <Box>
                    <Typography variant="overline">NAVEGAÇÃO</Typography>
                    <Typography component="h2">{visibleMenu.title}</Typography>
                  </Box>
                </Box>
                <Box className={`mega-menu-grid ${visibleMenu.title === "Serviços" ? "services-grid" : ""}`}>
                  {visibleMenu.items.map((item) => (
                    <Button
                      key={item.label}
                      className={`mega-menu-item ${item.destination === active ? "active" : ""}`}
                      color="inherit"
                      startIcon={<Icon name={item.icon} />}
                      endIcon={<Icon name="arrow" size={17} />}
                      onClick={() => selectMegaMenuItem(item.label, item.destination)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Box>
              </Box>
            </>
          )}

          <main id="conteudo" className={active === "Meu perfil" ? "profile-main" : undefined}>
            {active === "Dashboard" ? (
              <>
                <section className="home-hero">
                  <Box className="home-hero-copy">
                    <Typography variant="overline">SEMESTRE 2026.2</Typography>
                    <Typography component="h1">Bem-vindo de volta,<br /><strong>João!</strong></Typography>
                    <Typography component="p">Continue evoluindo nos seus estudos e conquiste ainda mais em sua jornada acadêmica.</Typography>
                    <Button variant="contained" endIcon={<Icon name="arrow" size={17} />} onClick={() => setActive("Disciplinas")}>
                      Acessar meu curso
                    </Button>
                    <Link
                      className="hero-photo-credit"
                      href="https://unsplash.com/@austin_7792"
                      target="_blank"
                      rel="noreferrer"
                      underline="hover"
                    >
                      Foto: Austin / Unsplash
                    </Link>
                  </Box>
                  <Card className="student-performance-card">
                    <CardContent>
                      <Box className="student-performance-profile">
                        <Avatar className="student-photo">JS</Avatar>
                        <Box><Typography variant="h6">Olá, João!</Typography><Typography variant="caption">Sistemas de Informação • 4º semestre</Typography></Box>
                        <Icon name="arrow" size={18} />
                      </Box>
                      <Divider />
                      <Typography className="performance-title"><Icon name="chart" size={18} /> Seu desempenho</Typography>
                      <Box className="performance-metrics">
                        <Box><span><Icon name="chart" /></span><strong>{semesterAverage.toFixed(1).replace(".", ",")}</strong><small>Média geral</small></Box>
                        <Box><span><Icon name="calendar" /></span><strong>94%</strong><small>Frequência</small></Box>
                        <Box><span><Icon name="book" /></span><strong>{allSubjects.length - approvedSubjects}</strong><small>Em andamento</small></Box>
                      </Box>
                      <Button fullWidth endIcon={<Icon name="arrow" size={16} />} onClick={() => setActive("Notas")}>Ver meu desempenho</Button>
                    </CardContent>
                  </Card>
                </section>

                <Box className="home-overview-grid">
                  <Card className="my-courses-card" variant="outlined">
                    <Box className="home-card-title">
                      <Box><i /><Typography component="h2">Meus Cursos</Typography></Box>
                      <Button endIcon={<Icon name="arrow" size={15} />} onClick={() => setActive("Disciplinas")}>Ver disciplinas</Button>
                    </Box>
                    <CardContent>
                      <Box className="course-identity">
                        <strong>SI</strong>
                        <Typography>Sistemas de Informação</Typography>
                      </Box>
                      <Box className="course-progress-area">
                        <Chip label="Em andamento" color="success" size="small" />
                        <Box>
                          <Typography variant="caption">Progresso do curso</Typography>
                          <Box className="course-progress-track"><i /></Box>
                          <Typography variant="caption">65%</Typography>
                        </Box>
                      </Box>
                      <Button variant="contained" endIcon={<Icon name="arrow" size={16} />} onClick={() => setActive("Disciplinas")}>Acessar curso</Button>
                    </CardContent>
                  </Card>

                  <Card className="home-calendar-card" variant="outlined">
                    <Box className="home-card-title">
                      <Box><Icon name="calendar" size={19} /><Typography component="h2">Meu Calendário</Typography></Box>
                    </Box>
                    <CardContent>
                      {events.map((event) => (
                        <Box className="home-calendar-event" key={event.day}>
                          <Box><strong>{event.day}</strong><span>{event.month}</span></Box>
                          <Box><Typography variant="subtitle2">{event.title}</Typography><Typography variant="caption">{event.subject}</Typography></Box>
                        </Box>
                      ))}
                      <Button endIcon={<Icon name="arrow" size={15} />} onClick={() => setActive("Eventos e atividades")}>Ver calendário completo</Button>
                    </CardContent>
                  </Card>
                </Box>
              </>
            ) : active === "Anúncios" ? (
              <AnnouncementsPage />
            ) : active === "Notas" ? (
              <GradesPage />
            ) : active === "Disciplinas" ? (
              <DisciplinesPage />
            ) : active === "Matrícula" ? (
              <>
                <div className="page-heading photo-heading enrollment-hero">
                  <div><span className="eyebrow">SISTEMAS DE INFORMAÇÃO • 2026.2</span><h1>Construa seu próximo semestre</h1><p>Disciplinas recomendadas para aprofundar sua formação em tecnologia.</p></div>
                  <span className="open-badge">Matrículas abertas</span>
                </div>
                {enrollmentDone && <div className="success-message" role="status"><Icon name="check" /> Matrícula enviada com sucesso! Você receberá a confirmação por e-mail.</div>}
                <div className="enrollment-layout">
                  <section className="enrollment-list" aria-label="Disciplinas disponíveis">
                    {enrollmentOptions.map((subject) => {
                      const selected = selectedEnrollment.includes(subject.id);
                      return (
                        <label className={`card enrollment-item ${selected ? "selected" : ""}`} key={subject.id}>
                          <input type="checkbox" checked={selected} onChange={() => toggleEnrollment(subject.id)} />
                          <i aria-hidden="true">{selected && <Icon name="check" size={15} />}</i>
                          <div><em>{subject.area}</em><strong>{subject.name}</strong><span>{subject.code} • {subject.teacher} • {subject.schedule}</span></div>
                          <small>{subject.seats} vagas</small>
                        </label>
                      );
                    })}
                  </section>
                  <aside className="card enrollment-summary">
                    <div className="summary-title"><div className="subject-icon"><Icon name="clipboard" size={18} /></div><div><strong>Resumo</strong><span>Sua seleção atual</span></div></div>
                    <dl><div><dt>Disciplinas atuais</dt><dd>{allSubjects.length}</dd></div><div><dt>Novas disciplinas</dt><dd>{selectedEnrollment.length}</dd></div><div><dt>Total de créditos</dt><dd>{24 + newCredits}</dd></div></dl>
                    <button disabled={!selectedEnrollment.length} onClick={() => setEnrollmentDone(true)}>Confirmar matrícula <Icon name="arrow" size={17} /></button>
                    <p>Revise sua seleção antes de confirmar.</p>
                  </aside>
                </div>
              </>
            ) : active === "Secretaria e suporte" ? (
              <>
                <div className="page-heading photo-heading support-hero">
                  <div><span className="eyebrow">ATENDIMENTO AO ALUNO</span><h1>Secretaria e suporte</h1><p>Solicite documentos, acompanhe prazos e encontre os canais certos para cada necessidade.</p></div>
                  <button className="hero-action" onClick={() => setSupportNotice("Atendimento iniciado. Nossa equipe responderá em até 1 dia útil.")}>Abrir atendimento</button>
                </div>
                <div className="support-layout">
                  <section>
                    <div className="editorial-heading compact"><div><span>SERVIÇOS DIGITAIS</span><h2>Documentação escolar</h2></div></div>
                    <div className="document-grid">
                      {schoolDocuments.map((document) => (
                        <Card className="document-card" variant="outlined" key={document.title}>
                          <CardContent>
                            <div className="document-icon"><Icon name="clipboard" /></div>
                            <Typography variant="h6">{document.title}</Typography>
                            <Typography variant="body2" color="text.secondary">{document.description}</Typography>
                            <Chip label={document.time} size="small" variant="outlined" />
                            <Button onClick={() => setSupportNotice(`${document.title}: solicitação registrada com sucesso.`)}>Solicitar documento</Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </section>
                  <aside className="support-aside">
                    <Card variant="outlined"><CardContent><Typography variant="overline">SECRETARIA</Typography><Typography variant="h6">Atendimento acadêmico</Typography><Typography variant="body2" color="text.secondary">Segunda a sexta, das 8h às 20h.</Typography><Button onClick={() => setSupportNotice("Protocolo acadêmico aberto.")}>Abrir protocolo</Button></CardContent></Card>
                    <Card variant="outlined"><CardContent><Typography variant="overline">SUPORTE TÉCNICO</Typography><Typography variant="h6">Problemas com o portal?</Typography><Typography variant="body2" color="text.secondary">Receba ajuda com acesso, senha e serviços digitais.</Typography><Button onClick={() => setSupportNotice("Chamado técnico aberto.")}>Falar com suporte</Button></CardContent></Card>
                  </aside>
                </div>
              </>
            ) : active === "Métodos de pagamento" ? (
              <PaymentMethodsPage />
            ) : active === "Negociação" ? (
              <NegotiationPage />
            ) : active === "Contrato" ? (
              <ContractPage onOpenDocuments={() => setActive("Secretaria e suporte")} />
            ) : announcementPages.includes(active) ? (
              <AnnouncementPage section={active} onRead={setSupportNotice} />
            ) : servicePages.includes(active) ? (
              <ServicePage section={active} onAction={setSupportNotice} />
            ) : (
              <Box className="profile-page">
                <Box className="profile-cover" sx={{ backgroundImage: `linear-gradient(90deg, rgba(57, 4, 13, .94) 0%, rgba(106, 13, 28, .69) 48%, rgba(38, 4, 10, .28) 100%), url("${profileCover}")` }}>
                  <Box className="profile-cover-copy">
                    <Typography component="span">PERFIL ACADÊMICO</Typography>
                    <Typography component="h1">Meu perfil</Typography>
                    <Typography component="p">Gerencie seus dados, acesso e identificação acadêmica.</Typography>
                  </Box>
                  <Button className="profile-cover-button" component="label" startIcon={<CameraAltOutlined />}>
                    Trocar capa
                    <Input
                      type="file"
                      inputProps={{ accept: "image/*" }}
                      onChange={(event) => {
                        const file = (event.target as HTMLInputElement).files?.[0];
                        if (file) setProfileCover(URL.createObjectURL(file));
                      }}
                      sx={{ display: "none" }}
                    />
                  </Button>
                  <Typography className="profile-cover-date">{formattedDate}</Typography>
                </Box>

                {profileError && (
                  <Alert severity="error" className="profile-error">
                    {profileError}
                  </Alert>
                )}

                {profileSection === null ? (
                  <Box className="profile-content-layout">
                    <Card className="profile-identity-card" variant="outlined">
                      <Box className="profile-photo-wrap">
                        <Avatar src={profilePhoto || undefined}>JS</Avatar>
                        <IconButton component="label" aria-label="Alterar foto do perfil">
                          <CameraAltOutlined />
                          <Input
                            type="file"
                            inputProps={{ accept: "image/*" }}
                            onChange={(event) => {
                              const file = (event.target as HTMLInputElement).files?.[0];
                              if (file) setProfilePhoto(URL.createObjectURL(file));
                            }}
                            sx={{ display: "none" }}
                          />
                        </IconButton>
                      </Box>
                      <Typography component="h2">{profile.name}</Typography>
                      <Chip className="profile-active-chip" label="Ativo" size="small" variant="outlined" />
                      <Button className="profile-primary-button" onClick={() => setProfileSection("personal")}>Editar perfil</Button>
                      <Box className="profile-ra-block">
                        <Typography component="span">Registro acadêmico</Typography>
                        <Typography component="strong">RA 20261234</Typography>
                      </Box>
                      <Box className="profile-facts">
                        <Box><span>Curso</span><strong>{profile.course}</strong></Box>
                        <Box><span>Ingresso</span><strong>02/02/2026</strong></Box>
                        <Box><span>Turno</span><strong>Noturno</strong></Box>
                      </Box>
                    </Card>

                    <Box className="profile-details-column">
                      <Box className="profile-metrics">
                        <ProfileDataBlock label="Semestre atual" value="3º" />
                        <ProfileDataBlock label="Frequência" value="94%" />
                        <ProfileDataBlock label="Média geral" value="8,4" />
                      </Box>

                      <Box className="profile-contact-section">
                        <Typography component="h2">Contato e local</Typography>
                        <Box className="profile-contact-grid">
                          <ProfileDataBlock label="E-mail institucional" value={profile.email} />
                          <ProfileDataBlock label="Telefone" value={profile.phone} />
                          <ProfileDataBlock label="Cidade" value={profile.city} />
                          <ProfileDataBlock label="Campus" value="Campus Central" />
                        </Box>
                      </Box>

                      <Box className="profile-lower-grid">
                        <Box className="profile-student-card-section">
                          <Typography component="h2">Carteirinha de estudante</Typography>
                          <button className="profile-student-card" onClick={() => setProfileSection("student-card")}>
                            <Box className="student-card-top"><strong>LUMEN ACADEMY</strong><span>ESTUDANTE</span></Box>
                            <Box className="student-card-person">
                              <Avatar src={profilePhoto || undefined}>JS</Avatar>
                              <Box><strong>{profile.name}</strong><span>RA 20261234</span><span>{profile.course}</span></Box>
                            </Box>
                            <small>Válida até 31/12/2026 · Toque para abrir</small>
                            <i aria-hidden="true" />
                          </button>
                          <Button className="profile-outline-button" startIcon={<DownloadOutlined />} onClick={() => setSupportNotice("Carteirinha digital preparada para download.")}>
                            Baixar carteirinha (PNG)
                          </Button>
                        </Box>

                        <Box className="profile-account-section">
                          <Typography component="h2">Gerenciar conta</Typography>
                          <Box className="profile-account-actions">
                            <ProfileActionCard icon={<PersonOutlined />} title="Dados pessoais" description="Contato, cidade e curso" onClick={() => setProfileSection("personal")} />
                            <ProfileActionCard icon={<LockOutlined />} title="Alterar senha" description="Atualize sua senha de acesso" onClick={() => setProfileSection("password")} />
                            <ProfileActionCard icon={<AccessibilityNewOutlined />} title="Acessibilidade" description="Texto, contraste e aparência" onClick={() => setProfileSection("accessibility")} />
                          </Box>
                        </Box>
                      </Box>

                      <Box className="profile-overview-logout">
                        <Button className="profile-outline-button" startIcon={<LogoutOutlined />} onClick={() => setLogoutOpen(true)}>Sair da conta</Button>
                      </Box>
                    </Box>
                  </Box>
                ) : (
                  <Stack className="profile-section-detail" spacing={2}>
                    <Button
                      startIcon={<ArrowBackOutlined />}
                      onClick={() => {
                        setProfileError("");
                        setProfileSection(null);
                      }}
                      sx={{ alignSelf: "flex-start" }}
                    >
                      Voltar para meu perfil
                    </Button>

                    {profileSection === "personal" && (
                      <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 750 }}>Dados pessoais</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Mantenha seus dados atualizados para receber comunicados importantes.
                          </Typography>
                          <Stack spacing={2}>
                            <Button component="label" variant="outlined" sx={{ alignSelf: "flex-start" }}>
                              Alterar foto
                              <Input
                                type="file"
                                inputProps={{ accept: "image/*" }}
                                onChange={(event) => {
                                  const file = (event.target as HTMLInputElement).files?.[0];
                                  if (file) setProfilePhoto(URL.createObjectURL(file));
                                }}
                                sx={{ display: "none" }}
                              />
                            </Button>
                            <TextField label="Nome completo" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} fullWidth />
                            <TextField label="E-mail" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} fullWidth />
                            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                              <TextField label="Telefone" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} fullWidth />
                              <TextField label="Cidade" value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} fullWidth />
                            </Stack>
                            <TextField label="Curso" value={profile.course} onChange={(e) => setProfile({ ...profile, course: e.target.value })} fullWidth />
                            <Button variant="contained" onClick={saveProfile} disabled={profileSaving || profile.name.trim() === ""} sx={{ alignSelf: { sm: "flex-end" } }}>
                              {profileSaving ? <CircularProgress size={24} color="inherit" /> : "Salvar alterações"}
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    )}

                    {profileSection === "password" && (
                      <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 750 }}>Alterar senha</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Use uma senha forte e diferente das que você usa em outros serviços.
                          </Typography>
                          <Stack spacing={2}>
                            <TextField label="Nova senha" type="password" placeholder="Mínimo de 6 caracteres" value={profile.password} onChange={(e) => setProfile({ ...profile, password: e.target.value })} fullWidth />
                            <TextField label="Confirmar nova senha" type="password" placeholder="Repita a nova senha" value={profile.confirmPassword} onChange={(e) => setProfile({ ...profile, confirmPassword: e.target.value })} fullWidth />
                            <Button variant="contained" onClick={saveProfile} disabled={profileSaving || profile.password.length < 6} sx={{ alignSelf: { sm: "flex-end" } }}>
                              {profileSaving ? <CircularProgress size={24} color="inherit" /> : "Atualizar senha"}
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    )}

                    {profileSection === "student-card" && (
                      <Card sx={{ borderRadius: 3, bgcolor: "primary.main", color: "primary.contrastText" }}>
                        <CardContent sx={{ p: { xs: 2.5, sm: 4 } }}>
                          <Stack direction="row" sx={{ mb: 4, justifyContent: "space-between", alignItems: "flex-start" }}>
                            <Box>
                              <Typography variant="overline" sx={{ opacity: 0.8 }}>LUMEN ACADEMY</Typography>
                              <Typography variant="h6" sx={{ fontWeight: 750 }}>Carteirinha digital</Typography>
                            </Box>
                            <BadgeOutlined fontSize="large" />
                          </Stack>
                          <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                            <Avatar src={profilePhoto || undefined} sx={{ width: 64, height: 64, bgcolor: "primary.dark", fontWeight: 750 }}>JS</Avatar>
                            <Box sx={{ minWidth: 0 }}>
                              <Typography variant="h6" sx={{ fontWeight: 750 }} noWrap>{profile.name}</Typography>
                              <Typography variant="body2" sx={{ opacity: 0.85 }}>RA 20261234</Typography>
                              <Typography variant="body2" sx={{ opacity: 0.85 }} noWrap>{profile.course}</Typography>
                            </Box>
                          </Stack>
                          <Divider sx={{ my: 3, borderColor: "primary.light" }} />
                          <Typography variant="caption" sx={{ opacity: 0.85 }}>Válida até dezembro de 2026</Typography>
                        </CardContent>
                      </Card>
                    )}

                    {profileSection === "accessibility" && (
                      <Card variant="outlined" sx={{ borderRadius: 3 }}>
                        <CardContent>
                          <Typography variant="h6" sx={{ fontWeight: 750 }}>Acessibilidade</Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Ajuste a interface para uma leitura mais confortável.
                          </Typography>
                          <Stack spacing={2}>
                            <Box>
                              <Typography variant="subtitle2">Tamanho do texto</Typography>
                              <Stack direction="row" spacing={1} sx={{ mt: 1, alignItems: "center" }}>
                                <Button variant="outlined" onClick={() => setFontScale(Math.max(90, fontScale - 10))}>A−</Button>
                                <Chip label={`${fontScale}%`} />
                                <Button variant="outlined" onClick={() => setFontScale(Math.min(130, fontScale + 10))}>A+</Button>
                              </Stack>
                            </Box>
                            <Divider />
                            <FormControlLabel control={<Switch checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} />} label="Ativar alto contraste" />
                            <FormControlLabel control={<Switch checked={dark} onChange={(e) => setDark(e.target.checked)} />} label="Ativar modo escuro" />
                            <Button onClick={() => { setFontScale(100); setHighContrast(false); setDark(false); }} sx={{ alignSelf: "flex-start" }}>
                              Restaurar preferências
                            </Button>
                          </Stack>
                        </CardContent>
                      </Card>
                    )}
                  </Stack>
                )}

                <Dialog open={logoutOpen} onClose={() => setLogoutOpen(false)} fullWidth maxWidth="xs">
                  <DialogTitle>Sair da conta?</DialogTitle>
                  <DialogContent>
                    <Typography color="text.secondary">Você precisará entrar novamente para acessar o portal.</Typography>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setLogoutOpen(false)}>Cancelar</Button>
                    <Button color="error" variant="contained" onClick={() => { setLogoutOpen(false); setLogoutDone(true); setAuthenticated(false); setDark(false); }}>Sair da conta</Button>
                  </DialogActions>
                </Dialog>

                <Snackbar open={profileSaved} autoHideDuration={3000} onClose={() => setProfileSaved(false)}>
                  <Alert severity="success" variant="filled">Alterações salvas com sucesso!</Alert>
                </Snackbar>
                <Snackbar open={logoutDone} autoHideDuration={3000} onClose={() => setLogoutDone(false)}>
                  <Alert severity="info" variant="filled">Sessão encerrada com segurança.</Alert>
                </Snackbar>
              </Box>
            )}
          </main>
          {active !== "Meu perfil" && <footer className="institutional-footer">
            <Typography variant="caption">© 2026 Lumen Academy</Typography>
            <Typography variant="caption">Todos os direitos reservados</Typography>
            <Box>
              <Button color="inherit" onClick={() => setSupportNotice("Política de Privacidade disponível na central de documentos.")}>Política de Privacidade</Button>
              <Button color="inherit" onClick={() => setActive("Contrato")}>Termos de Uso</Button>
              <Button color="inherit" onClick={() => setActive("Secretaria e suporte")}>Contato</Button>
            </Box>
          </footer>}
        </div>

        <Snackbar open={supportNotice !== ""} autoHideDuration={4000} onClose={() => setSupportNotice("")}>
          <Alert severity="success" variant="filled" onClose={() => setSupportNotice("")}>{supportNotice}</Alert>
        </Snackbar>
        <Snackbar open={megaMenuNotice !== ""} autoHideDuration={3500} onClose={() => setMegaMenuNotice("")}>
          <Alert severity="info" variant="filled" onClose={() => setMegaMenuNotice("")}>{megaMenuNotice}</Alert>
        </Snackbar>
        {active !== "Meu perfil" && <IconButton
          className="whatsapp-trigger"
          component="a"
          href="https://wa.me/"
          target="_blank"
          rel="noreferrer"
          aria-label="Abrir WhatsApp"
        >
          <WhatsApp />
        </IconButton>}
        <button className="access-trigger" onClick={() => setAccessOpen(!accessOpen)} aria-expanded={accessOpen} aria-controls="access-panel">
          <Icon name="accessibility" /><span>Acessibilidade</span>
        </button>
        {accessOpen && (
          <aside className="access-panel" id="access-panel" aria-label="Opções de acessibilidade">
            <div className="access-title"><div><Icon name="accessibility" /><strong>Acessibilidade</strong></div><button onClick={() => setAccessOpen(false)} aria-label="Fechar opções"><Icon name="close" size={18} /></button></div>
            <p>Ajuste a visualização conforme sua necessidade.</p>
            <div className="font-controls"><span>Tamanho do texto</span><div><button onClick={() => setFontScale(Math.max(90, fontScale - 10))} aria-label="Diminuir texto">A−</button><b>{fontScale}%</b><button onClick={() => setFontScale(Math.min(130, fontScale + 10))} aria-label="Aumentar texto">A+</button></div></div>
            <label className="switch-row"><span><strong>Alto contraste</strong><small>Realça textos e contornos</small></span><input type="checkbox" checked={highContrast} onChange={(e) => setHighContrast(e.target.checked)} /><i /></label>
            <label className="switch-row"><span><strong>Modo escuro</strong><small>Reduz a luminosidade</small></span><input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} /><i /></label>
            <button className="reset" onClick={() => { setFontScale(100); setHighContrast(false); setDark(false); }}>Restaurar preferências</button>
          </aside>
        )}
      </div>
      )}
    </ThemeProvider>
  );
}
