import { useState } from "react"
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Drawer,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import ArrowForwardOutlined from "@mui/icons-material/ArrowForwardOutlined"
import CheckOutlined from "@mui/icons-material/CheckOutlined"
import CloseOutlined from "@mui/icons-material/CloseOutlined"
import PriorityHighOutlined from "@mui/icons-material/PriorityHighOutlined"
import "./GradesPage.css"

type GradeStatus = "Aprovado" | "Em recuperação" | "Reprovado"
type AttendanceStatus = "Regular" | "Abaixo do mínimo"
type ActiveTab = "grades" | "attendance"

type Subject = {
  code: string
  name: string
  teacher: string
  teacherInitials: string
  grades: [number, number, number]
  attendance: number
  absences: number
}

const subjects: Subject[] = [
  {
    code: "CF",
    name: "Cálculo Fundamental",
    teacher: "Mariana Alves",
    teacherInitials: "MA",
    grades: [4, 5, 6],
    attendance: 92,
    absences: 2,
  },
  {
    code: "BD",
    name: "Banco de Dados",
    teacher: "João Pedro Costa",
    teacherInitials: "JP",
    grades: [7, 5, 6],
    attendance: 100,
    absences: 0,
  },
  {
    code: "SI",
    name: "Segurança da Informação",
    teacher: "Camila Santos",
    teacherInitials: "CS",
    grades: [4, 4.5, 5],
    attendance: 71,
    absences: 6,
  },
  {
    code: "PO",
    name: "POO",
    teacher: "Rafael Mendes",
    teacherInitials: "RM",
    grades: [5, 6, 6.4],
    attendance: 80,
    absences: 4,
  },
  {
    code: "MA",
    name: "Metodologias Ágeis",
    teacher: "Juliana Ferreira",
    teacherInitials: "JF",
    grades: [6, 7, 5],
    attendance: 95,
    absences: 1,
  },
]

const formatNumber = (value: number) => value.toFixed(1).replace(".", ",")
const getAverage = (subject: Subject) =>
  subject.grades.reduce((total, grade) => total + grade, 0) /
  subject.grades.length

const getGradeStatus = (subject: Subject): GradeStatus => {
  if (subject.code === "SI") return "Reprovado"
  return getAverage(subject) >= 6 ? "Aprovado" : "Em recuperação"
}

const getAttendanceStatus = (subject: Subject): AttendanceStatus =>
  subject.attendance >= 75 ? "Regular" : "Abaixo do mínimo"

const getStatusTone = (status: GradeStatus | AttendanceStatus) => {
  if (status === "Aprovado" || status === "Regular") return "success"
  if (status === "Em recuperação") return "warning"
  return "danger"
}

function StatusChip({ label }: { label: GradeStatus | AttendanceStatus }) {
  return (
    <Chip
      className={`grades-status ${getStatusTone(label)}`}
      label={label}
      size="small"
    />
  )
}

function ProgressRing({
  value,
  tone,
  suffix = "",
}: {
  value: number
  tone: "success" | "warning" | "danger"
  suffix?: string
}) {
  return (
    <Box
      className={`grades-progress-ring ${tone}`}
      sx={{ "--ring-progress": `${Math.min(value, 100)}%` }}
      aria-label={
        suffix ? `${Math.round(value)}${suffix}` : formatNumber(value / 10)
      }
    >
      <Typography component="strong">
        {suffix ? `${Math.round(value)}${suffix}` : formatNumber(value / 10)}
      </Typography>
    </Box>
  )
}

function SubjectIdentity({ subject }: { subject: Subject }) {
  return (
    <Box className="grades-subject-identity">
      <Box className="grades-subject-code">{subject.code}</Box>
      <Typography component="strong">{subject.name}</Typography>
    </Box>
  )
}

function TeacherIdentity({ subject }: { subject: Subject }) {
  return (
    <Box className="grades-teacher-identity">
      <Avatar>{subject.teacherInitials}</Avatar>
      <Typography component="span">{subject.teacher}</Typography>
    </Box>
  )
}

function AssessmentCard({ label, value }: { label: string value: number }) {
  const passing = value >= 6
  return (
    <Card
      className={`assessment-card ${passing ? "passing" : "below"}`}
      variant="outlined"
    >
      <Box className="assessment-icon">
        {passing ? <CheckOutlined /> : <PriorityHighOutlined />}
      </Box>
      <Box className="assessment-copy">
        <Typography component="strong">{label}</Typography>
        <Typography component="span">
          {passing
            ? "Acima da média"
            : `Faltam ${formatNumber(6 - value)} para 6,0`}
        </Typography>
      </Box>
      <Typography className="assessment-value" component="strong">
        {formatNumber(value)}
      </Typography>
      <Box className="assessment-track">
        <Box
          className="assessment-fill"
          sx={{ "--bar-progress": `${value * 10}%` }}
        />
        <Box className="assessment-marker" />
      </Box>
    </Card>
  )
}

function DetailsPanel({
  subject,
  tab,
  onClose,
}: {
  subject: Subject | null
  tab: ActiveTab
  onClose: () => void
}) {
  if (!subject) return null

  const average = getAverage(subject)
  const gradeStatus = getGradeStatus(subject)
  const attendanceStatus = getAttendanceStatus(subject)
  const gradeTone = getStatusTone(gradeStatus)
  const attendanceTone = getStatusTone(attendanceStatus)
  const isGrades = tab === "grades"
  const missingPoints = Math.max(0, 6 - average)
  const missingAttendance = Math.max(0, 75 - subject.attendance)

  const gradeMessage =
    gradeStatus === "Aprovado"
      ? "Aprovado! Você atingiu a nota mínima."
      : gradeStatus === "Reprovado"
        ? "Reprovado nesta disciplina."
        : `Faltam ${formatNumber(missingPoints)} pontos para a aprovação.`

  return (
    <Drawer
      anchor="right"
      open
      onClose={onClose}
      slotProps={{ paper: { className: "grades-details-drawer" } }}
    >
      <Box className="grades-details-panel" role="dialog" aria-modal="true">
        <Box className="grades-details-hero">
          <IconButton onClick={onClose} aria-label="Fechar detalhes">
            <CloseOutlined />
          </IconButton>
          <Typography className="grades-details-kicker" component="span">
            {isGrades ? "NOTAS DA DISCIPLINA" : "FREQUÊNCIA DA DISCIPLINA"}
          </Typography>
          <Box className="grades-details-title">
            <Box>{subject.code}</Box>
            <Typography component="h2">{subject.name}</Typography>
          </Box>
          <Box className="grades-details-teacher">
            <Avatar>{subject.teacherInitials}</Avatar>
            <Typography component="span">Prof(a). {subject.teacher}</Typography>
          </Box>
        </Box>

        <Box className="grades-details-body">
          <Card className="grades-overview-card">
            <ProgressRing
              value={isGrades ? average * 10 : subject.attendance}
              tone={isGrades ? gradeTone : attendanceTone}
              suffix={isGrades ? "" : "%"}
            />
            <Box>
              <StatusChip label={isGrades ? gradeStatus : attendanceStatus} />
              <Typography component="strong">
                {isGrades
                  ? gradeMessage
                  : `${subject.absences} faltas no semestre`}
              </Typography>
              <Typography component="span">
                {isGrades
                  ? "Média das 3 avaliações · mínima 6,0"
                  : "Frequência mínima exigida: 75%"}
              </Typography>
            </Box>
          </Card>

          {isGrades && gradeStatus === "Reprovado" && (
            <Box className="grades-failed-alert">
              <Typography component="strong">
                Reprovado: faltaram {formatNumber(missingPoints)} pontos para a
                média 6,0.
              </Typography>
            </Box>
          )}

          <Box className="grades-detail-section">
            <Typography component="h3">
              {isGrades ? "Avaliações" : "Presença"}
            </Typography>
            {isGrades ? (
              <Box className="assessment-list">
                {subject.grades.map((grade, index) => (
                  <AssessmentCard
                    key={`N${index + 1}`}
                    label={`N${index + 1}`}
                    value={grade}
                  />
                ))}
              </Box>
            ) : (
              <Card
                className={`attendance-card ${
                  subject.attendance >= 75 ? "passing" : "below"
                }`}
                variant="outlined"
              >
                <Box className="assessment-icon">
                  {subject.attendance >= 75 ? (
                    <CheckOutlined />
                  ) : (
                    <PriorityHighOutlined />
                  )}
                </Box>
                <Box className="assessment-copy">
                  <Typography component="strong">Presença</Typography>
                  <Typography component="span">
                    {subject.attendance >= 75
                      ? "Dentro do mínimo exigido"
                      : `Faltam ${missingAttendance}% para o mínimo`}
                  </Typography>
                </Box>
                <Typography className="assessment-value" component="strong">
                  {subject.attendance}%
                </Typography>
                <Box className="assessment-track attendance">
                  <Box
                    className="assessment-fill"
                    sx={{ "--bar-progress": `${subject.attendance}%` }}
                  />
                  <Box className="assessment-marker" />
                </Box>
              </Card>
            )}
          </Box>

          <Typography
            className={`grades-panel-message ${
              isGrades ? gradeTone : attendanceTone
            }`}
          >
            {isGrades
              ? gradeStatus === "Aprovado"
                ? "Parabéns! Você já garantiu a aprovação nesta disciplina."
                : gradeStatus === "Reprovado"
                  ? "Você não atingiu a média mínima. Procure o(a) professor(a) para saber os próximos passos."
                  : "Continue se dedicando! Você consegue alcançar seus objetivos."
              : subject.attendance >= 75
                ? "Ótimo! Sua frequência está dentro do exigido."
                : "Atenção! Sua frequência está abaixo do mínimo exigido."}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  )
}

export default function GradesPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("grades")
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

  const panelTitle =
    activeTab === "grades" ? "Minhas notas" : "Minhas frequências"
  const footerRule =
    activeTab === "grades"
      ? "Nota mínima para aprovação: 6,0"
      : "Frequência mínima para aprovação: 75%"

  const switchTab = (tab: ActiveTab) => {
    setActiveTab(tab)
    setSelectedSubject(null)
  }

  return (
    <Box className="grades-page">
      <Box className="grades-hero">
        <Box>
          <Typography component="span">MEU CURSO · SEMESTRE 2026.2</Typography>
          <Typography component="h1">Notas e Frequências</Typography>
          <Typography component="p">
            Acompanhe seu desempenho acadêmico de forma simples e moderna.
          </Typography>
        </Box>
        <Card className="grades-progress-card">
          <Typography component="strong">Seu progresso no curso</Typography>
          <Typography component="span">5 disciplinas · 3 aprovadas</Typography>
        </Card>
      </Box>

      <Box
        className="grades-tabs"
        role="tablist"
        aria-label="Notas e frequências"
      >
        <Button
          className={activeTab === "grades" ? "active" : ""}
          onClick={() => switchTab("grades")}
          role="tab"
          aria-selected={activeTab === "grades"}
        >
          Minhas Notas
        </Button>
        <Button
          className={activeTab === "attendance" ? "active" : ""}
          onClick={() => switchTab("attendance")}
          role="tab"
          aria-selected={activeTab === "attendance"}
        >
          Minhas Frequências
        </Button>
      </Box>

      <Box className="grades-summary">
        <Card variant="outlined">
          <Typography component="strong">{subjects.length}</Typography>
          <Typography component="span">Disciplinas no semestre</Typography>
        </Card>
        <Card variant="outlined">
          <Typography component="strong">3</Typography>
          <Typography component="span">Aprovadas</Typography>
        </Card>
        <Card variant="outlined">
          <Typography component="strong">2</Typography>
          <Typography component="span">Precisam de atenção</Typography>
        </Card>
      </Box>

      <Card className="grades-table-card" variant="outlined">
        <Box className="grades-table-title">
          <Box />
          <Typography component="h2">{panelTitle}</Typography>
        </Box>
        <TableContainer>
          <Table
            className={`grades-data-table ${activeTab}`}
            aria-label={panelTitle}
          >
            <TableHead>
              <TableRow>
                <TableCell>Disciplina</TableCell>
                <TableCell>Professor(a)</TableCell>
                {activeTab === "grades" ? (
                  <>
                    <TableCell>Nota</TableCell>
                    <TableCell>Situação</TableCell>
                  </>
                ) : (
                  <>
                    <TableCell>Frequência</TableCell>
                    <TableCell>Faltas</TableCell>
                    <TableCell>Situação</TableCell>
                  </>
                )}
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {subjects.map((subject) => {
                const average = getAverage(subject)
                const gradeStatus = getGradeStatus(subject)
                const attendanceStatus = getAttendanceStatus(subject)
                return (
                  <TableRow key={subject.code}>
                    <TableCell>
                      <SubjectIdentity subject={subject} />
                    </TableCell>
                    <TableCell>
                      <TeacherIdentity subject={subject} />
                    </TableCell>
                    {activeTab === "grades" ? (
                      <>
                        <TableCell>
                          <Box className="grades-score-cell">
                            <Typography component="strong">
                              {formatNumber(average)}
                            </Typography>
                            {average < 6 && (
                              <Typography component="span">
                                Faltam {formatNumber(6 - average)}{" "}
                                {6 - average === 1 ? "ponto" : "pontos"}
                              </Typography>
                            )}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <StatusChip label={gradeStatus} />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>
                          <ProgressRing
                            value={subject.attendance}
                            tone={getStatusTone(attendanceStatus)}
                            suffix="%"
                          />
                        </TableCell>
                        <TableCell>
                          {subject.absences}{" "}
                          {subject.absences === 1 ? "falta" : "faltas"}
                        </TableCell>
                        <TableCell>
                          <StatusChip label={attendanceStatus} />
                        </TableCell>
                      </>
                    )}
                    <TableCell>
                      <Button
                        variant="contained"
                        endIcon={<ArrowForwardOutlined />}
                        onClick={() => setSelectedSubject(subject)}
                      >
                        Ver detalhes
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="grades-table-footer">
          <Typography component="span">{footerRule}</Typography>
          <Typography component="span">
            Continue se dedicando! Você consegue alcançar seus objetivos.
          </Typography>
        </Box>
      </Card>

      <DetailsPanel
        subject={selectedSubject}
        tab={activeTab}
        onClose={() => setSelectedSubject(null)}
      />
    </Box>
  )
}
