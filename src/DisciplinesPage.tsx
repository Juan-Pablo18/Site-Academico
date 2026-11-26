import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Chip,
  FormControl,
  InputAdornment,
  Menu,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import DownloadOutlined from "@mui/icons-material/DownloadOutlined";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import ExpandMoreOutlined from "@mui/icons-material/ExpandMoreOutlined";
import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import InsertDriveFileOutlined from "@mui/icons-material/InsertDriveFileOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import MoreHorizOutlined from "@mui/icons-material/MoreHorizOutlined";
import PlayCircleOutlineOutlined from "@mui/icons-material/PlayCircleOutlineOutlined";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import VideocamOutlined from "@mui/icons-material/VideocamOutlined";
import ViewListOutlined from "@mui/icons-material/ViewListOutlined";
import "./DisciplinesPage.css";

type DisciplineTheme = "light" | "dark";
type ViewMode = "list" | "cards";

type ClassDocument = {
  type: "PDF" | "ZIP";
  name: string;
};

type ClassSession = {
  id: string;
  date: string;
  title: string;
  next?: boolean;
  documents: ClassDocument[];
};

type Discipline = {
  id: string;
  name: string;
  code: string;
  credits: number;
  teacher: string;
  email: string;
  day: string;
  dayOrder: number;
  time: string;
  room: string;
  progress: number;
  absences: number;
  canMiss: number;
  grade: string;
  nextActivity: string;
  online?: boolean;
  recording?: string;
  sessions: ClassSession[];
};

const themeStorageKey = "lumen-disciplines-theme";

const getInitialTheme = (): DisciplineTheme => {
  try {
    const stored = window.localStorage.getItem(themeStorageKey);
    if (stored === "light" || stored === "dark") return stored;
  } catch {
    // Storage may be unavailable in private browsing.
  }
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const makeSessions = (id: string, topics: string[]): ClassSession[] =>
  topics.map((topic, index) => ({
    id: `${id}-${index}`,
    date: index === 0 ? "16 de nov." : index === 1 ? "09 de nov." : index === 2 ? "02 de nov." : "26 de out.",
    title: `Aula ${13 - index} — ${topic}`,
    next: index === 0,
    documents: index === 0
      ? []
      : index === 1
        ? [
            { type: "PDF", name: `Slides — ${topic}` },
            { type: "PDF", name: "Lista de exercícios" },
            { type: "ZIP", name: "Material extra" },
          ]
        : [{ type: "PDF", name: `Material da aula — ${topic}` }],
  }));

const disciplines: Discipline[] = [
  {
    id: "web",
    name: "Desenvolvimento Web",
    code: "WEB301",
    credits: 4,
    teacher: "Marina Costa",
    email: "marina.costa@lumen.edu",
    day: "Seg",
    dayOrder: 1,
    time: "19:00 — 21:00",
    room: "Lab 03",
    progress: 82,
    absences: 4,
    canMiss: 10,
    grade: "8,4 de 10",
    nextActivity: "Entrega do projeto final · 21 nov",
    sessions: makeSessions("web", ["Hooks", "Formulários", "Consumo de APIs", "Rotas e navegação"]),
  },
  {
    id: "database",
    name: "Banco de Dados",
    code: "BD204",
    credits: 4,
    teacher: "Rafael Mendes",
    email: "rafael.mendes@lumen.edu",
    day: "Ter",
    dayOrder: 2,
    time: "19:00 — 21:00",
    room: "Sala 12",
    progress: 76,
    absences: 8,
    canMiss: 8,
    grade: "8,7 de 10",
    nextActivity: "Modelagem relacional · 23 nov",
    sessions: makeSessions("database", ["Índices", "Normalização", "Consultas avançadas", "Relacionamentos"]),
  },
  {
    id: "ethics",
    name: "Ética e Computação",
    code: "ETC150",
    credits: 2,
    teacher: "Paula Rocha",
    email: "paula.rocha@lumen.edu",
    day: "Ter",
    dayOrder: 2,
    time: "21:00 — 22:30",
    room: "Online · Meet",
    progress: 64,
    absences: 3,
    canMiss: 6,
    grade: "7,9 de 10",
    nextActivity: "Debate sobre IA responsável · 24 nov",
    online: true,
    recording: "Gravação da aula 10 disponível",
    sessions: makeSessions("ethics", ["IA responsável", "Privacidade", "Cidadania digital", "Ética profissional"]),
  },
  {
    id: "engineering",
    name: "Engenharia de Software",
    code: "ENG210",
    credits: 4,
    teacher: "Carla Nunes",
    email: "carla.nunes@lumen.edu",
    day: "Qua",
    dayOrder: 3,
    time: "19:00 — 21:00",
    room: "Sala 08",
    progress: 70,
    absences: 6,
    canMiss: 9,
    grade: "8,2 de 10",
    nextActivity: "Revisão de arquitetura · 25 nov",
    sessions: makeSessions("engineering", ["Arquitetura", "Testes", "Padrões de projeto", "Requisitos"]),
  },
  {
    id: "ux",
    name: "UX e Design de Interfaces",
    code: "UX110",
    credits: 3,
    teacher: "Lucas Alves",
    email: "lucas.alves@lumen.edu",
    day: "Qui",
    dayOrder: 4,
    time: "19:00 — 21:00",
    room: "Lab 01",
    progress: 91,
    absences: 10,
    canMiss: 6,
    grade: "9,1 de 10",
    nextActivity: "Teste de usabilidade · 26 nov",
    sessions: makeSessions("ux", ["Prototipação", "Testes", "Design visual", "Pesquisa"]),
  },
  {
    id: "structures",
    name: "Estruturas de Dados",
    code: "ED202",
    credits: 4,
    teacher: "João Prado",
    email: "joao.prado@lumen.edu",
    day: "Sex",
    dayOrder: 5,
    time: "19:00 — 21:00",
    room: "Lab 02",
    progress: 61,
    absences: 14,
    canMiss: 5,
    grade: "5,2 de 10",
    nextActivity: "Exercícios de árvores · 27 nov",
    sessions: makeSessions("structures", ["Árvores", "Grafos", "Filas", "Listas"]),
  },
  {
    id: "architecture",
    name: "Arquitetura de Computadores",
    code: "AC101",
    credits: 4,
    teacher: "Ana Lima",
    email: "ana.lima@lumen.edu",
    day: "Sáb",
    dayOrder: 6,
    time: "09:00 — 11:00",
    room: "Sala 04",
    progress: 58,
    absences: 18,
    canMiss: 3,
    grade: "4,8 de 10",
    nextActivity: "Lista sobre memória · 28 nov",
    sessions: makeSessions("architecture", ["Memória", "Processadores", "Barramentos", "Representação de dados"]),
  },
];

const dayFilters = ["Todos", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Online"];

function AbsenceBadge({ subject }: { subject: Discipline }) {
  const level = subject.absences <= 14 ? "safe" : subject.absences <= 19 ? "attention" : "risk";
  return (
    <Box className="dp-absence">
      <Chip className={level} label={`${subject.absences}%`} size="small" />
      <Typography variant="caption">Pode faltar mais {subject.canMiss} aulas</Typography>
    </Box>
  );
}

function SubjectDetails({
  subject,
  openSessions,
  onToggleSession,
  onAction,
}: {
  subject: Discipline;
  openSessions: Set<string>;
  onToggleSession: (id: string) => void;
  onAction: (message: string) => void;
}) {
  return (
    <Box className="dp-expanded-content">
      <Box className="dp-detail-summary">
        <Box><Typography variant="caption">Nota parcial</Typography><strong>{subject.grade}</strong></Box>
        <Box><Typography variant="caption">Próxima atividade</Typography><strong>{subject.nextActivity}</strong></Box>
        <Box><Typography variant="caption">Contato do professor</Typography><Button startIcon={<EmailOutlined />} onClick={() => onAction("Contato do professor: recurso em breve.")}>{subject.email}</Button></Box>
      </Box>
      {subject.online && (
        <Box className="dp-online-actions">
          <Button variant="contained" startIcon={<VideocamOutlined />} onClick={() => onAction("Entrada na aula online: recurso em breve.")}>Entrar na aula</Button>
          <Button variant="outlined" startIcon={<PlayCircleOutlineOutlined />} onClick={() => onAction("Gravação da aula: recurso em breve.")}>{subject.recording}</Button>
        </Box>
      )}
      <Typography className="dp-documents-title">Documentos das aulas de {subject.day.toLowerCase()} — Prof. {subject.teacher}</Typography>
      <Box className="dp-session-list">
        {subject.sessions.map((session) => {
          const isOpen = openSessions.has(session.id);
          return (
            <Box className={`dp-session ${isOpen ? "open" : ""}`} key={session.id}>
              <Button className="dp-session-trigger" onClick={() => onToggleSession(session.id)} endIcon={session.next ? undefined : <ExpandMoreOutlined />}>
                <span><strong>{session.date}</strong> · {session.title}</span>
                <small>{session.next ? "Próxima aula" : `${session.documents.length} ${session.documents.length === 1 ? "documento" : "documentos"}`}</small>
              </Button>
              {isOpen && session.documents.length > 0 && (
                <Box className="dp-document-list">
                  {session.documents.map((document) => (
                    <Box key={document.name}>
                      <span className={`file-type ${document.type.toLowerCase()}`}>{document.type}</span>
                      <Typography>{document.name}</Typography>
                      <Button variant="outlined" startIcon={<DownloadOutlined />} onClick={() => onAction(`${document.name}: download em breve.`)}>Baixar</Button>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default function DisciplinesPage() {
  const [theme, setTheme] = useState<DisciplineTheme>(getInitialTheme);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Todos");
  const [sortBy, setSortBy] = useState("weekday");
  const [view, setView] = useState<ViewMode>("list");
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  const [openSessions, setOpenSessions] = useState<Set<string>>(() => new Set(["web-1"]));
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null);
  const [menuSubject, setMenuSubject] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    try {
      window.localStorage.setItem(themeStorageKey, theme);
    } catch {
      // The selected theme still works for the current session.
    }
  }, [theme]);

  const visibleSubjects = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = disciplines.filter((subject) => {
      const matchesSearch = !query || subject.name.toLowerCase().includes(query) || subject.teacher.toLowerCase().includes(query);
      const matchesFilter = filter === "Todos" || (filter === "Online" ? subject.online : subject.day === filter);
      return matchesSearch && matchesFilter;
    });
    return [...filtered].sort((a, b) => {
      if (sortBy === "progress") return b.progress - a.progress;
      if (sortBy === "absences") return b.absences - a.absences;
      if (sortBy === "name") return a.name.localeCompare(b.name);
      return a.dayOrder - b.dayOrder || a.time.localeCompare(b.time);
    });
  }, [filter, search, sortBy]);

  const averageProgress = Math.round(disciplines.reduce((total, subject) => total + subject.progress, 0) / disciplines.length);
  const highestAbsence = Math.max(...disciplines.map((subject) => subject.absences));
  const menuDiscipline = disciplines.find((subject) => subject.id === menuSubject);

  const toggleSession = (id: string) => {
    setOpenSessions((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setMenuSubject(null);
  };

  const handleMenuAction = (action: "details" | "message" | "remove") => {
    if (!menuDiscipline) return;
    if (action === "details") {
      setExpandedSubject((current) => current === menuDiscipline.id ? null : menuDiscipline.id);
    } else {
      setNotice(action === "message" ? "Mensagem ao professor: recurso em breve." : "Gerenciamento da disciplina: recurso em breve.");
    }
    closeMenu();
  };

  return (
    <Box className={`disciplines-page-shell disciplines-theme-${theme}`}>
      <Box className="dp-banner">
        <Box>
          <Typography variant="overline">GRADE CURRICULAR • 2026.2</Typography>
          <Typography component="h1">Minhas disciplinas</Typography>
          <Typography component="p">Veja horários, progresso e o percentual de faltas em cada disciplina.</Typography>
        </Box>
        <TextField
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar disciplina ou professor"
          aria-label="Buscar disciplina ou professor"
          size="small"
          slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchOutlined /></InputAdornment> } }}
        />
      </Box>

      <Box className="dp-summary-grid" aria-label="Resumo das disciplinas">
        <Card variant="outlined"><CardContent><span>Disciplinas</span><strong>{disciplines.length}</strong><small>25 créditos no semestre</small></CardContent></Card>
        <Card variant="outlined"><CardContent><span>Progresso médio</span><strong>{averageProgress}%</strong><small>do conteúdo concluído</small></CardContent></Card>
        <Card variant="outlined"><CardContent><span>Mais faltas</span><strong>{highestAbsence}%</strong><small>Arquitetura de Computadores</small></CardContent></Card>
        <Card variant="outlined"><CardContent><span>Próxima aula</span><strong>Seg, 19:00</strong><small>Desenvolvimento Web · Lab 03</small></CardContent></Card>
      </Box>

      <Box className="dp-toolbar">
        <Box className="dp-filter-pills" role="group" aria-label="Filtrar disciplinas">
          {dayFilters.map((item) => (
            <Button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>
              {item}
            </Button>
          ))}
        </Box>
        <Box className="dp-view-controls">
          <Button
            className="dp-theme-toggle"
            startIcon={theme === "light" ? <DarkModeOutlined /> : <LightModeOutlined />}
            onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}
          >
            {theme === "light" ? "🌙 Modo escuro" : "☀️ Modo claro"}
          </Button>
          <FormControl size="small">
            <Select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Ordenar disciplinas"
              MenuProps={{ disablePortal: true }}
            >
              <MenuItem value="weekday">Dia da semana</MenuItem>
              <MenuItem value="progress">Maior progresso</MenuItem>
              <MenuItem value="absences">Mais faltas</MenuItem>
              <MenuItem value="name">Nome</MenuItem>
            </Select>
          </FormControl>
          <ButtonGroup size="small" aria-label="Alternar visualização">
            <Button className={view === "list" ? "active" : ""} startIcon={<ViewListOutlined />} onClick={() => setView("list")}>Lista</Button>
            <Button className={view === "cards" ? "active" : ""} startIcon={<GridViewOutlined />} onClick={() => setView("cards")}>Cards</Button>
          </ButtonGroup>
        </Box>
      </Box>

      {view === "list" ? (
        <Box className="dp-list-table" role="table" aria-label="Disciplinas matriculadas">
          <Box className="dp-list-head" role="row">
            <span role="columnheader">Disciplina</span>
            <span role="columnheader">Professor</span>
            <span role="columnheader">Horário</span>
            <span role="columnheader">Progresso</span>
            <span role="columnheader">Faltas</span>
            <span />
          </Box>
          {visibleSubjects.map((subject) => (
            <Box className={`dp-subject-group ${expandedSubject === subject.id ? "expanded" : ""}`} key={subject.id}>
              <Box className="dp-list-row" role="row">
                <Box className="dp-subject-cell" role="cell">
                  <span className="dp-book-icon"><MenuBookOutlined /></span>
                  <Box><Typography>{subject.name}</Typography><span>{subject.code} · {subject.credits} créditos {subject.online && <Chip label="Online" size="small" />}</span></Box>
                </Box>
                <Typography role="cell">{subject.teacher}</Typography>
                <Box className="dp-schedule" role="cell"><strong>{subject.day} · {subject.time}</strong><span>{subject.room}</span></Box>
                <Box className="dp-progress-cell" role="cell"><strong>{subject.progress}%</strong><span><i style={{ width: `${subject.progress}%` }} /></span></Box>
                <AbsenceBadge subject={subject} />
                <Button
                  className="dp-more-button"
                  onClick={(event) => {
                    setMenuAnchor(event.currentTarget);
                    setMenuSubject(subject.id);
                  }}
                  aria-label={`Mais ações para ${subject.name}`}
                >
                  <MoreHorizOutlined />
                </Button>
              </Box>
              {expandedSubject === subject.id && (
                <SubjectDetails subject={subject} openSessions={openSessions} onToggleSession={toggleSession} onAction={setNotice} />
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Box className="dp-card-grid">
          {visibleSubjects.map((subject) => (
            <Card className={`dp-subject-card ${expandedSubject === subject.id ? "expanded" : ""}`} variant="outlined" key={subject.id}>
              <CardContent>
                <Box className="dp-card-heading">
                  <span className="dp-book-icon"><MenuBookOutlined /></span>
                  <Box><Typography component="h2">{subject.name}</Typography><Typography variant="caption">{subject.code} · {subject.credits} créditos</Typography></Box>
                  <Button
                    className="dp-more-button"
                    onClick={(event) => {
                      setMenuAnchor(event.currentTarget);
                      setMenuSubject(subject.id);
                    }}
                    aria-label={`Mais ações para ${subject.name}`}
                  >
                    <MoreHorizOutlined />
                  </Button>
                </Box>
                {subject.online && <Chip className="online" label="Online" size="small" />}
                <Box className="dp-card-meta">
                  <Box><span>Professor</span><strong>{subject.teacher}</strong></Box>
                  <Box><span>Horário</span><strong>{subject.day} · {subject.time}</strong></Box>
                  <Box><span>Local</span><strong>{subject.room}</strong></Box>
                </Box>
                <Box className="dp-card-progress"><Box><span>Progresso</span><strong>{subject.progress}%</strong></Box><span><i style={{ width: `${subject.progress}%` }} /></span></Box>
                <AbsenceBadge subject={subject} />
                {subject.online && <Button variant="contained" fullWidth startIcon={<VideocamOutlined />} onClick={() => setNotice("Entrada na aula online: recurso em breve.")}>Entrar na aula</Button>}
                <Button className="dp-card-details" fullWidth onClick={() => setExpandedSubject((current) => current === subject.id ? null : subject.id)}>
                  {expandedSubject === subject.id ? "Ocultar detalhes" : "Ver detalhes"}
                </Button>
              </CardContent>
              {expandedSubject === subject.id && (
                <SubjectDetails subject={subject} openSessions={openSessions} onToggleSession={toggleSession} onAction={setNotice} />
              )}
            </Card>
          ))}
        </Box>
      )}

      {visibleSubjects.length === 0 && (
        <Box className="dp-empty-state">
          <Typography variant="h6">Nenhuma disciplina encontrada</Typography>
          <Typography>Revise a busca ou selecione outro filtro.</Typography>
        </Box>
      )}

      <Box className="dp-absence-legend" aria-label="Legenda de faltas">
        <Chip className="safe" label="até 14%" size="small" /><span>tranquilo</span>
        <Chip className="attention" label="15–19%" size="small" /><span>atenção</span>
        <Chip className="risk" label="20%+" size="small" /><span>risco (limite de reprovação: 25%)</span>
      </Box>

      <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu} disablePortal>
        <MenuItem onClick={() => handleMenuAction("details")}>Ver detalhes</MenuItem>
        <MenuItem onClick={() => handleMenuAction("message")}>Enviar mensagem</MenuItem>
        <MenuItem onClick={() => handleMenuAction("remove")}>Gerenciar disciplina</MenuItem>
      </Menu>

      <Snackbar open={notice !== ""} autoHideDuration={3500} onClose={() => setNotice("")}>
        <Alert severity="info" variant="filled" onClose={() => setNotice("")}>{notice}</Alert>
      </Snackbar>
    </Box>
  );
}
