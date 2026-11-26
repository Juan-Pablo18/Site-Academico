import { useEffect, useState } from "react"
import { Box, Button, Card, Chip, IconButton, Typography } from "@mui/material"
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined"
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined"
import CalendarMonthOutlined from "@mui/icons-material/CalendarMonthOutlined"
import CampaignOutlined from "@mui/icons-material/CampaignOutlined"
import ChevronRightOutlined from "@mui/icons-material/ChevronRightOutlined"
import CloudOutlined from "@mui/icons-material/CloudOutlined"
import DescriptionOutlined from "@mui/icons-material/DescriptionOutlined"
import EventOutlined from "@mui/icons-material/EventOutlined"
import InfoOutlined from "@mui/icons-material/InfoOutlined"
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined"
import PlaceOutlined from "@mui/icons-material/PlaceOutlined"
import WarningAmberOutlined from "@mui/icons-material/WarningAmberOutlined"

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1741707596397-efaae09503b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=82&w=1800",
    alt: "Estudantes em uma biblioteca universitária",
  },
  {
    image:
      "https://images.unsplash.com/photo-1778876091264-1446d649156c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=82&w=1800",
    alt: "Auditório durante a Semana Acadêmica",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=82&w=1800",
    alt: "Mesa de estudos com livros e caderno",
  },
  {
    image:
      "https://images.unsplash.com/photo-1722171098271-185f35942797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=82&w=1800",
    alt: "Megafone vermelho",
  },
]

const events = [
  {
    day: "10",
    title: "Semana Acadêmica 2025",
    time: "08:00 às 18:00",
    place: "Auditório Principal",
  },
  {
    day: "14",
    title: "Palestra: Carreiras em TI",
    time: "19:00 às 21:00",
    place: "Auditório 2",
  },
  {
    day: "18",
    title: "Workshop de Segurança da Informação",
    time: "14:00 às 17:00",
    place: "Laboratório de Informática",
  },
  {
    day: "22",
    title: "Feira de Estágios",
    time: "09:00 às 16:00",
    place: "Pátio da Faculdade",
  },
]

const academics = [
  {
    title: "Prova de Banco de Dados",
    detail: "12/11  •  19h às 21h",
    due: "Hoje",
    urgency: "critical",
  },
  {
    title: "Trabalho em Grupo – Engenharia de Software",
    detail: "Entrega 15/11  •  Plataforma AVA",
    due: "Amanhã",
    urgency: "critical",
  },
  {
    title: "Lista de Exercícios – POO",
    detail: "Prazo 10/11",
    due: "Em 6 dias",
    urgency: "warning",
  },
  {
    title: "Reunião de Orientação (TCC)",
    detail: "20/11  •  14h",
    due: "Em 10 dias",
    urgency: "later",
  },
]

const importantNotices = [
  {
    title: "Aulas suspensas hoje (10/11)",
    description:
      "Devido às fortes chuvas, não haverá aula hoje. Acompanhe o site para atualizações.",
    time: "Hoje, 08:15",
    label: "Urgente",
    tone: "urgent",
    icon: <CloudOutlined />,
  },
  {
    title: "Mudança no horário da biblioteca",
    description:
      "A biblioteca estará aberta das 08h às 17h neste sábado (11/11).",
    time: "Hoje, 07:50",
    label: "Importante",
    tone: "important",
    icon: <WarningAmberOutlined />,
  },
  {
    title: "Pagamento da mensalidade",
    description: "O vencimento da mensalidade do mês 11 é até o dia 15/11.",
    time: "Ontem, 16:20",
    label: "Aviso",
    tone: "notice",
    icon: <InfoOutlined />,
  },
]

function SectionTitle({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Box className="announcements-card-heading">
      <Box className="announcements-card-icon">{icon}</Box>
      <Box>
        <Typography component="h2">{title}</Typography>
        <Typography component="p">{description}</Typography>
      </Box>
      <Button
        endIcon={<ArrowForwardOutlined />}
        className="announcements-see-all"
      >
        Ver todos
      </Button>
    </Box>
  )
}

export default function AnnouncementsPage() {
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % slides.length)
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  const nextSlide = () => setSlide((current) => (current + 1) % slides.length)

  return (
    <Box className="announcements-page">
      <Box
        className="announcements-hero"
        onClick={nextSlide}
        sx={{ backgroundImage: `url("${slides[slide].image}")` }}
        aria-label={slides[slide].alt}
      >
        <Box className="announcements-hero-overlay" />
        <Box className="announcements-hero-content">
          <Typography className="announcements-kicker" component="span">
            <CampaignOutlined /> ANÚNCIOS
          </Typography>
          <Typography component="h1">Fique por dentro de tudo</Typography>
          <Typography component="p">
            Aqui você encontra os principais comunicados, eventos, avisos
            acadêmicos e informações importantes da nossa instituição.
          </Typography>
          <Box
            className="announcements-dots"
            aria-label="Navegação do carrossel"
          >
            {slides.map((item, index) => (
              <IconButton
                key={item.alt}
                className={slide === index ? "active" : ""}
                onClick={(event) => {
                  event.stopPropagation()
                  setSlide(index)
                }}
                aria-label={`Mostrar imagem ${index + 1}: ${item.alt}`}
              />
            ))}
          </Box>
        </Box>

      </Box>

      <Box className="announcements-grid">
        <Card className="announcements-section-card" variant="outlined">
          <SectionTitle
            icon={<EventOutlined />}
            title="Eventos"
            description="Participe dos eventos e atividades da faculdade."
          />
          <Box className="announcements-banner events-banner">
            <Typography component="strong">
              Semana
              <br />
              Acadêmica
            </Typography>
            <Typography component="span">
              Palestras • Workshops • Networking
            </Typography>
          </Box>
          <Box className="announcements-list">
            {events.map((event) => (
              <Box className="announcement-event-row" key={event.day}>
                <Box className="announcement-date">
                  <Typography component="span">NOV</Typography>
                  <Typography component="strong">{event.day}</Typography>
                </Box>
                <Box className="announcement-row-copy">
                  <Typography component="strong">{event.title}</Typography>
                  <Typography component="span">
                    <AccessTimeOutlined /> {event.time}
                  </Typography>
                  <Typography component="span">
                    <PlaceOutlined /> {event.place}
                  </Typography>
                </Box>
                <ChevronRightOutlined />
              </Box>
            ))}
          </Box>
        </Card>

        <Card className="announcements-section-card" variant="outlined">
          <SectionTitle
            icon={<MenuBookOutlined />}
            title="Escolaridade"
            description="Informações sobre provas, trabalhos e atividades acadêmicas."
          />
          <Box className="announcements-banner study-banner">
            <Typography component="strong">
              Estude,
              <br />
              Conquiste
              <br />
              Seu futuro
            </Typography>
          </Box>
          <Box className="announcements-list">
            {academics.map((item) => (
              <Box
                className={`announcement-academic-row ${item.urgency}`}
                key={item.title}
              >
                <Box className="academic-document">
                  <DescriptionOutlined />
                </Box>
                <Box className="announcement-row-copy">
                  <Typography component="strong">{item.title}</Typography>
                  <Typography component="span">{item.detail}</Typography>
                </Box>
                <Chip
                  label={item.due}
                  className={`academic-due ${item.urgency}`}
                  size="small"
                />
              </Box>
            ))}
          </Box>
        </Card>

        <Card
          className="announcements-section-card important-card"
          variant="outlined"
        >
          <Box className="important-card-heading">
            <SectionTitle
              icon={<CampaignOutlined />}
              title="Importantes"
              description="Comunicados urgentes e informações essenciais."
            />
          </Box>
          <Box className="announcements-banner important-banner">
            <Typography component="strong">
              Atenção
              <br />
              alunos!
            </Typography>
          </Box>
          <Box className="announcements-list important-list">
            {importantNotices.map((notice) => (
              <Box className="announcement-important-row" key={notice.title}>
                <Box className="important-icon">{notice.icon}</Box>
                <Box className="announcement-row-copy">
                  <Typography component="strong">{notice.title}</Typography>
                  <Typography component="p">{notice.description}</Typography>
                  <Typography component="small">{notice.time}</Typography>
                </Box>
                <Chip
                  label={notice.label}
                  className={`important-label ${notice.tone}`}
                  size="small"
                  icon={<Box component="i" />}
                />
              </Box>
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  )
}
