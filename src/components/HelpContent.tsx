import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import {
  HelpCircle,
  BookOpen,
  MessageCircle,
  Mail,
  ChevronDown,
  ExternalLink,
  Keyboard,
  CheckCircle,
  Clock,
  AlertCircle,
  Zap,
  Search,
} from 'lucide-react';

// --- Data ---

const kpiCards = [
  {
    label: 'Articles',
    value: '248',
    trend: '+12',
    up: true,
    icon: BookOpen,
    bg: 'rgba(99,102,241,0.15)',
    color: '#6366F1',
  },
  {
    label: 'Avg Response',
    value: '2.4h',
    trend: '-18%',
    up: true,
    icon: Clock,
    bg: 'rgba(34,197,94,0.15)',
    color: '#22C55E',
  },
  {
    label: 'Uptime',
    value: '99.9%',
    trend: '+0.1%',
    up: true,
    icon: Zap,
    bg: 'rgba(59,130,246,0.15)',
    color: '#3B82F6',
  },
  {
    label: 'Open Tickets',
    value: '7',
    trend: '-3',
    up: true,
    icon: AlertCircle,
    bg: 'rgba(245,158,11,0.15)',
    color: '#F59E0B',
  },
];

interface FaqItem {
  q: string;
  a: string;
}
interface FaqCategory {
  category: string;
  items: FaqItem[];
}

const faqData: FaqCategory[] = [
  {
    category: 'Account & Access',
    items: [
      {
        q: 'How do I reset my password?',
        a: 'Go to the login page and click "Forgot password". Enter your registered email address and we will send you a reset link within a few minutes. The link is valid for 24 hours.',
      },
      {
        q: 'How do I enable two-factor authentication?',
        a: 'Navigate to Settings → Security and toggle on Two-Factor Authentication. You can use an authenticator app (Google Authenticator, Authy) or receive codes via SMS.',
      },
      {
        q: 'Can I change my email address?',
        a: 'Yes. Go to Settings → Profile, click "Edit", update your email, and verify the new address via the confirmation link we send.',
      },
    ],
  },
  {
    category: 'Billing & Plans',
    items: [
      {
        q: 'How do I upgrade my plan?',
        a: 'Open Settings → Billing and choose "Upgrade Plan". Changes take effect immediately and you are only billed pro-rata for the remainder of the current billing cycle.',
      },
      {
        q: 'Where can I find my invoices?',
        a: 'All invoices are listed under Settings → Billing → Invoice History. Each invoice can be downloaded as a PDF.',
      },
    ],
  },
  {
    category: 'Data & Exports',
    items: [
      {
        q: 'How do I export my data?',
        a: 'From any table view, click the "Export" button in the top-right corner. You can export as CSV, Excel, or PDF. Large exports are queued and emailed to you when ready.',
      },
      {
        q: 'Is my data backed up?',
        a: 'Yes. We perform automated daily backups with a 30-day retention period. Point-in-time recovery is available on Enterprise plans.',
      },
    ],
  },
  {
    category: 'Integrations',
    items: [
      {
        q: 'Which integrations are supported?',
        a: 'We currently support Slack, Zapier, HubSpot, Salesforce, and a REST API. More integrations are added monthly — check the Integrations marketplace for the latest list.',
      },
      {
        q: 'How do I set up the Slack integration?',
        a: 'Go to Settings → Integrations → Slack and click "Connect". You will be prompted to authorize the app in your Slack workspace. Choose the channel where you want notifications to be posted.',
      },
    ],
  },
];

const gettingStarted = [
  { label: 'Complete your profile', done: true },
  { label: 'Invite your first team member', done: true },
  { label: 'Connect an integration', done: false },
  { label: 'Generate your first report', done: false },
  { label: 'Set up notifications', done: false },
];

const shortcuts = [
  { key: '⌘ K', desc: 'Open command palette' },
  { key: '⌘ /', desc: 'Toggle sidebar' },
  { key: '⌘ D', desc: 'Go to Dashboard' },
  { key: '⌘ R', desc: 'Go to Reports' },
  { key: 'G H', desc: 'Go to Help' },
];

type StatusLevel = 'operational' | 'degraded' | 'outage';

const systemStatus: { label: string; status: StatusLevel }[] = [
  { label: 'API', status: 'operational' },
  { label: 'Dashboard', status: 'operational' },
  { label: 'Reports Engine', status: 'degraded' },
  { label: 'Notifications', status: 'operational' },
];

const statusSx: Record<StatusLevel, { color: string; label: string }> = {
  operational: { color: '#22C55E', label: 'Operational' },
  degraded: { color: '#F59E0B', label: 'Degraded' },
  outage: { color: '#EF4444', label: 'Outage' },
};

const popularResources = [
  { label: 'Getting Started Guide', href: '#' },
  { label: 'API Reference', href: '#' },
  { label: 'Video Tutorials', href: '#' },
  { label: 'Release Notes', href: '#' },
  { label: 'Community Forum', href: '#' },
  { label: 'Status Page', href: '#' },
];

// --- Component ---

export function HelpContent() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAccordion =
    (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const filteredFaq = faqData
    .map((cat) => ({
      ...cat,
      items: cat.items.filter(
        (item) =>
          searchQuery === '' ||
          item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.a.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <Box
      sx={{
        display: 'grid',
        height: '100%',
        gridTemplateRows: 'auto 1fr auto',
        gridTemplateColumns: '1fr 280px',
        gap: 1.5,
      }}
    >
      {/* ── Row 1: Header + KPI chips ── */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gridColumn: '1 / -1',
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            Help Center
          </Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Find answers, guides, and contact support
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {kpiCards.map((k) => (
            <Card
              key={k.label}
              sx={{
                px: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                minWidth: 130,
              }}
            >
              <Box
                sx={{ p: 1, borderRadius: 1.5, bgcolor: k.bg, display: 'flex' }}
              >
                <k.icon size={16} color={k.color} />
              </Box>
              <Box>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    display: 'block',
                    lineHeight: 1.2,
                  }}
                >
                  {k.label}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                  <Typography
                    sx={{
                      fontSize: '0.875rem',
                      fontWeight: 700,
                      color: 'text.primary',
                    }}
                  >
                    {k.value}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '0.65rem',
                      color: k.up ? '#22C55E' : '#EF4444',
                      fontWeight: 600,
                    }}
                  >
                    {k.trend}
                  </Typography>
                </Stack>
              </Box>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* ── Left col: FAQ accordion ── */}
      <Card sx={{ display: 'flex', flexDirection: 'column', minHeight: 0 }}>
        <CardContent sx={{ p: 2, pb: '8px !important', flexShrink: 0 }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={1.5}
          >
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Frequently Asked Questions
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Browse by category or search below
              </Typography>
            </Box>
            <Chip
              label={`${faqData.reduce((acc, c) => acc + c.items.length, 0)} articles`}
              size="small"
              sx={{
                height: 22,
                fontSize: '0.65rem',
                fontWeight: 600,
                bgcolor: 'rgba(99,102,241,0.12)',
                color: '#6366F1',
                '& .MuiChip-label': { px: 1 },
              }}
            />
          </Stack>

          {/* Search bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              px: 1.5,
              py: 0.75,
              borderRadius: 1.5,
              border: '1px solid',
              borderColor: 'divider',
              mb: 1,
            }}
          >
            <Search size={14} color="#6B7280" />
            <Box
              component="input"
              placeholder="Search articles…"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              sx={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '0.8rem',
                color: 'text.primary',
                width: '100%',
                '&::placeholder': { color: 'text.disabled' },
              }}
            />
          </Box>
        </CardContent>

        <Box sx={{ flexGrow: 1, overflow: 'auto', px: 2, pb: 2 }}>
          {filteredFaq.length === 0 && (
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              No articles match your search.
            </Typography>
          )}
          {filteredFaq.map((cat) => (
            <Box key={cat.category} sx={{ mb: 1.5 }}>
              <Typography
                variant="caption"
                sx={{
                  display: 'block',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'text.disabled',
                  fontWeight: 600,
                  mb: 0.5,
                }}
              >
                {cat.category}
              </Typography>
              {cat.items.map((item, idx) => {
                const panelId = `${cat.category}-${idx}`;
                return (
                  <Accordion
                    key={panelId}
                    expanded={expanded === panelId}
                    onChange={handleAccordion(panelId)}
                    disableGutters
                    elevation={0}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: '8px !important',
                      mb: 0.75,
                      '&:before': { display: 'none' },
                      '&.Mui-expanded': { borderColor: 'primary.main' },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ChevronDown size={14} />}
                      sx={{
                        px: 1.5,
                        minHeight: '40px !important',
                        '& .MuiAccordionSummary-content': {
                          my: '8px !important',
                        },
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <HelpCircle size={14} color="#6366F1" />
                        <Typography
                          sx={{ fontSize: '0.8rem', fontWeight: 500 }}
                        >
                          {item.q}
                        </Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails sx={{ px: 1.5, pb: 1.5, pt: 0 }}>
                      <Typography
                        variant="caption"
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        {item.a}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })}
            </Box>
          ))}
        </Box>
      </Card>

      {/* ── Right col: stacked cards ── */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          minHeight: 0,
          overflow: 'auto',
        }}
      >
        {/* Getting Started */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 1.5 }}
            >
              <CheckCircle size={14} color="#22C55E" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Getting Started
              </Typography>
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {gettingStarted.map((step) => (
                <Stack
                  key={step.label}
                  direction="row"
                  alignItems="center"
                  spacing={1}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: '50%',
                      border: '2px solid',
                      borderColor: step.done ? '#22C55E' : 'divider',
                      bgcolor: step.done ? '#22C55E' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {step.done && (
                      <Box
                        component="span"
                        sx={{
                          color: '#fff',
                          fontSize: '0.55rem',
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </Box>
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      color: step.done ? 'text.secondary' : 'text.primary',
                      textDecoration: step.done ? 'line-through' : 'none',
                    }}
                  >
                    {step.label}
                  </Typography>
                </Stack>
              ))}
            </Box>
            <LinearProgress
              variant="determinate"
              value={
                (gettingStarted.filter((s) => s.done).length /
                  gettingStarted.length) *
                100
              }
              sx={{
                mt: 1.5,
                height: 4,
                borderRadius: 2,
                '& .MuiLinearProgress-bar': { bgcolor: '#22C55E' },
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: 'text.secondary', display: 'block', mt: 0.5 }}
            >
              {gettingStarted.filter((s) => s.done).length} of{' '}
              {gettingStarted.length} complete
            </Typography>
          </CardContent>
        </Card>

        {/* Keyboard Shortcuts */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 1.5 }}
            >
              <Keyboard size={14} color="#6366F1" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Keyboard Shortcuts
              </Typography>
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {shortcuts.map((s) => (
                <Stack
                  key={s.key}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="caption"
                    sx={{ color: 'text.secondary' }}
                  >
                    {s.desc}
                  </Typography>
                  <Chip
                    label={s.key}
                    size="small"
                    sx={{
                      height: 18,
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      fontFamily: 'monospace',
                      bgcolor: 'rgba(99,102,241,0.12)',
                      color: '#6366F1',
                      '& .MuiChip-label': { px: 0.75 },
                    }}
                  />
                </Stack>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Contact Support */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              sx={{ mb: 1.5 }}
            >
              <MessageCircle size={14} color="#3B82F6" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Contact Support
              </Typography>
            </Stack>
            <Stack spacing={0.75}>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<MessageCircle size={13} />}
                endIcon={<ExternalLink size={11} />}
                sx={{
                  justifyContent: 'flex-start',
                  fontSize: '0.75rem',
                  textTransform: 'none',
                }}
              >
                Start live chat
              </Button>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<Mail size={13} />}
                endIcon={<ExternalLink size={11} />}
                sx={{
                  justifyContent: 'flex-start',
                  fontSize: '0.75rem',
                  textTransform: 'none',
                }}
              >
                Email support
              </Button>
              <Button
                variant="outlined"
                size="small"
                fullWidth
                startIcon={<BookOpen size={13} />}
                endIcon={<ExternalLink size={11} />}
                sx={{
                  justifyContent: 'flex-start',
                  fontSize: '0.75rem',
                  textTransform: 'none',
                }}
              >
                Browse docs
              </Button>
            </Stack>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card sx={{ flexShrink: 0 }}>
          <CardContent sx={{ p: 2, pb: '8px !important' }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mb: 1.5 }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                System Status
              </Typography>
              <Chip
                label="Live"
                size="small"
                sx={{
                  height: 18,
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  bgcolor: 'rgba(34,197,94,0.12)',
                  color: '#22C55E',
                  '& .MuiChip-label': { px: 0.75 },
                }}
              />
            </Stack>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {systemStatus.map((svc) => (
                <Stack
                  key={svc.label}
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="caption">{svc.label}</Typography>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: statusSx[svc.status].color,
                      }}
                    />
                    <Typography
                      sx={{
                        fontSize: '0.65rem',
                        color: statusSx[svc.status].color,
                        fontWeight: 600,
                      }}
                    >
                      {statusSx[svc.status].label}
                    </Typography>
                  </Stack>
                </Stack>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* ── Bottom row: Popular Resources (spans both columns) ── */}
      <Card sx={{ gridColumn: '1 / -1', flexShrink: 0 }}>
        <CardContent sx={{ p: 2, pb: '8px !important' }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{ mb: 1.5 }}
          >
            <BookOpen size={14} color="#6366F1" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Popular Resources
            </Typography>
          </Stack>
          <Divider sx={{ mb: 1.5 }} />
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {popularResources.map((r) => (
              <Button
                key={r.label}
                variant="text"
                size="small"
                endIcon={<ExternalLink size={11} />}
                sx={{
                  fontSize: '0.75rem',
                  textTransform: 'none',
                  color: '#6366F1',
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1.5,
                  bgcolor: 'rgba(99,102,241,0.06)',
                  '&:hover': { bgcolor: 'rgba(99,102,241,0.12)' },
                }}
              >
                {r.label}
              </Button>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
