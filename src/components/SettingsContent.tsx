import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import Tooltip from '@mui/material/Tooltip';
import {
  User,
  Shield,
  Bell,
  Users,
  CreditCard,
  Key,
  Save,
  Trash2,
  Copy,
  Download,
  Plus,
  LogOut,
  Monitor,
  Smartphone,
  Globe,
} from 'lucide-react';

// --- Mock Data ---

const profileData = {
  name: 'John Doe',
  email: 'john@myapp.com',
  role: 'Lead Developer',
  bio: 'Building great products with modern web technologies. Passionate about developer experience and clean code.',
  timezone: 'UTC−5 (Eastern Time)',
  joined: 'Jan 12, 2024',
  avatar: 'JD',
  phone: '+1 (555) 012-3456',
  location: 'New York, NY',
};

const securityData = {
  passwordLastChanged: 'March 14, 2026',
  twoFactorEnabled: true,
  activeSessions: [
    { device: 'Chrome on MacOS', location: 'New York, NY', lastActive: '2 minutes ago', current: true },
    { device: 'Safari on iPhone', location: 'New York, NY', lastActive: '1 hour ago', current: false },
    { device: 'Firefox on Windows', location: 'London, UK', lastActive: '3 days ago', current: false },
  ],
  recentLogins: [
    { time: 'Apr 28, 2026 09:12', ip: '192.168.1.1', location: 'New York, NY', status: 'success' },
    { time: 'Apr 27, 2026 14:33', ip: '192.168.1.1', location: 'New York, NY', status: 'success' },
    { time: 'Apr 25, 2026 08:45', ip: '203.0.113.42', location: 'London, UK', status: 'success' },
    { time: 'Apr 24, 2026 22:17', ip: '198.51.100.7', location: 'Unknown', status: 'failed' },
  ],
};

const notificationCategories = [
  { id: 'events',  label: 'Events & Alerts',   desc: 'System events, errors, and threshold alerts',   email: true,  push: true,  inApp: true  },
  { id: 'reports', label: 'Weekly Reports',     desc: 'Automated performance and usage reports',        email: true,  push: false, inApp: false },
  { id: 'billing', label: 'Billing & Payments', desc: 'Invoices, payment confirmations, renewals',      email: true,  push: true,  inApp: true  },
  { id: 'team',    label: 'Team Activity',      desc: 'Member joins, role changes, and invites',        email: false, push: false, inApp: true  },
  { id: 'product', label: 'Product Updates',    desc: 'New features, improvements, and changelogs',     email: true,  push: false, inApp: true  },
];

const teamMembers = [
  { name: 'John Doe',    email: 'john@myapp.com',  role: 'Owner',  status: 'Online',  joined: 'Jan 12, 2024', initials: 'JD', roleColor: '#6366F1', roleColorBg: 'rgba(99,102,241,0.15)'   },
  { name: 'Sarah Kim',   email: 'sarah@myapp.com', role: 'Admin',  status: 'Online',  joined: 'Feb 3, 2024',  initials: 'SK', roleColor: '#22C55E', roleColorBg: 'rgba(34,197,94,0.15)'    },
  { name: 'Mike Chen',   email: 'mike@myapp.com',  role: 'Member', status: 'Away',    joined: 'Mar 17, 2024', initials: 'MC', roleColor: '#3B82F6', roleColorBg: 'rgba(59,130,246,0.15)'   },
  { name: 'Lisa Park',   email: 'lisa@myapp.com',  role: 'Member', status: 'Offline', joined: 'Apr 2, 2024',  initials: 'LP', roleColor: '#3B82F6', roleColorBg: 'rgba(59,130,246,0.15)'   },
  { name: 'David Brown', email: 'david@myapp.com', role: 'Viewer', status: 'Offline', joined: 'Jun 8, 2024',  initials: 'DB', roleColor: '#9CA3AF', roleColorBg: 'rgba(156,163,175,0.1)'   },
];

const billingData = {
  plan: 'Pro',
  price: '$49/mo',
  renewsOn: 'May 28, 2026',
  usage: [
    { label: 'Team Seats', used: 5,     total: 10,     color: '#6366F1', unit: ''   },
    { label: 'Storage',    used: 23,    total: 50,     color: '#22C55E', unit: ' GB' },
    { label: 'API Calls',  used: 84320, total: 100000, color: '#F59E0B', unit: ''   },
  ],
  invoices: [
    { date: 'Apr 1, 2026', amount: '$49.00', status: 'paid', id: 'INV-2026-004' },
    { date: 'Mar 1, 2026', amount: '$49.00', status: 'paid', id: 'INV-2026-003' },
    { date: 'Feb 1, 2026', amount: '$49.00', status: 'paid', id: 'INV-2026-002' },
    { date: 'Jan 1, 2026', amount: '$49.00', status: 'paid', id: 'INV-2026-001' },
    { date: 'Dec 1, 2025', amount: '$49.00', status: 'paid', id: 'INV-2025-012' },
  ],
};

const apiKeys = [
  { name: 'Production API',    key: 'sk-prod-****-****-****-a3f2', created: 'Jan 15, 2026', lastUsed: '2 minutes ago', scopes: ['read', 'write'],          active: true  },
  { name: 'Analytics Reader',  key: 'sk-anlt-****-****-****-b7c4', created: 'Feb 28, 2026', lastUsed: '1 day ago',     scopes: ['read'],                    active: true  },
  { name: 'CI/CD Deploy Key',  key: 'sk-cicd-****-****-****-d9e1', created: 'Mar 5, 2026',  lastUsed: '3 hours ago',   scopes: ['write', 'deploy'],          active: true  },
  { name: 'Legacy Integration',key: 'sk-lgcy-****-****-****-f0a8', created: 'Jun 3, 2024',  lastUsed: '45 days ago',   scopes: ['read'],                    active: false },
];

// --- Section heading helper ---
function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: 600 }}>{title}</Typography>
      {subtitle && (
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>{subtitle}</Typography>
      )}
      <Divider sx={{ mt: 1.5 }} />
    </Box>
  );
}

// --- Profile Panel ---
function ProfilePanel() {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
        <SectionHeading title="Profile" subtitle="Your personal information and preferences" />
        <Stack direction="row" spacing={1} sx={{ flexShrink: 0, ml: 2 }}>
          <Button variant="outlined" size="small">Change Avatar</Button>
          <Button variant="contained" size="small">Edit Profile</Button>
        </Stack>
      </Stack>

      <Stack direction="row" spacing={3} alignItems="flex-start">
        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '1.5rem', flexShrink: 0 }}>
          {profileData.avatar}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Stack spacing={2}>
            <Stack direction="row" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Full Name</Typography>
                <Typography sx={{ fontWeight: 600 }}>{profileData.name}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Role</Typography>
                <Typography sx={{ fontWeight: 600 }}>{profileData.role}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Email</Typography>
                <Typography>{profileData.email}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Phone</Typography>
                <Typography>{profileData.phone}</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Location</Typography>
                <Typography>{profileData.location}</Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Timezone</Typography>
                <Typography>{profileData.timezone}</Typography>
              </Box>
            </Stack>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Bio</Typography>
              <Typography sx={{ color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.6 }}>{profileData.bio}</Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>Member Since</Typography>
              <Typography>{profileData.joined}</Typography>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}

// --- Security Panel ---
function SecurityPanel() {
  const [twoFactor, setTwoFactor] = useState(securityData.twoFactorEnabled);

  const sessionDeviceIcon = (device: string) => {
    if (device.toLowerCase().includes('iphone') || device.toLowerCase().includes('android')) {
      return <Smartphone size={14} />;
    }
    if (device.toLowerCase().includes('safari') || device.toLowerCase().includes('chrome') || device.toLowerCase().includes('firefox')) {
      return <Monitor size={14} />;
    }
    return <Globe size={14} />;
  };

  return (
    <Box>
      <SectionHeading title="Security" subtitle="Manage your password, 2FA, and active sessions" />

      {/* Password */}
      <Box sx={{ mb: 3, p: 2, borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.06)', bgcolor: 'rgba(255,255,255,0.02)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Password</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Last changed: {securityData.passwordLastChanged}</Typography>
          </Box>
          <Button variant="outlined" size="small">Change Password</Button>
        </Stack>
      </Box>

      {/* 2FA */}
      <Box sx={{ mb: 3, p: 2, borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.06)', bgcolor: 'rgba(255,255,255,0.02)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '0.875rem' }}>Two-Factor Authentication</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Add an extra layer of security to your account</Typography>
          </Box>
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Chip
              size="small"
              label={twoFactor ? 'Enabled' : 'Disabled'}
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 600,
                bgcolor: twoFactor ? 'rgba(34,197,94,0.15)' : 'rgba(156,163,175,0.1)',
                color: twoFactor ? '#22C55E' : '#9CA3AF',
              }}
            />
            <Switch checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} size="small" />
          </Stack>
        </Stack>
      </Box>

      {/* Active Sessions */}
      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 1.5 }}>Active Sessions</Typography>
      <TableContainer sx={{ mb: 3, borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.06)' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Device</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Last Active</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {securityData.activeSessions.map((s, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Box sx={{ color: 'text.secondary' }}>{sessionDeviceIcon(s.device)}</Box>
                    <Typography variant="caption" sx={{ fontWeight: 500 }}>{s.device}</Typography>
                    {s.current && (
                      <Chip size="small" label="Current" sx={{ height: 16, fontSize: '0.6rem', fontWeight: 600, bgcolor: 'rgba(99,102,241,0.15)', color: '#6366F1', '& .MuiChip-label': { px: 0.5 } }} />
                    )}
                  </Stack>
                </TableCell>
                <TableCell><Typography variant="caption" sx={{ color: 'text.secondary' }}>{s.location}</Typography></TableCell>
                <TableCell><Typography variant="caption" sx={{ color: 'text.secondary' }}>{s.lastActive}</Typography></TableCell>
                <TableCell align="right">
                  {!s.current && (
                    <Button size="small" variant="outlined" color="error" sx={{ fontSize: '0.7rem', py: 0.25, px: 1, minWidth: 'unset' }} startIcon={<LogOut size={12} />}>
                      Revoke
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Recent Logins */}
      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 1.5 }}>Recent Login Activity</Typography>
      <TableContainer sx={{ borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.06)' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {securityData.recentLogins.map((l, i) => (
              <TableRow key={i}>
                <TableCell><Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{l.time}</Typography></TableCell>
                <TableCell><Typography variant="caption" sx={{ fontFamily: 'monospace' }}>{l.ip}</Typography></TableCell>
                <TableCell><Typography variant="caption" sx={{ color: 'text.secondary' }}>{l.location}</Typography></TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={l.status === 'success' ? 'Success' : 'Failed'}
                    sx={{
                      height: 18,
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      bgcolor: l.status === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                      color: l.status === 'success' ? '#22C55E' : '#EF4444',
                      '& .MuiChip-label': { px: 0.75 },
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// --- Notifications Panel ---
type NotifState = Record<string, { email: boolean; push: boolean; inApp: boolean }>;

function NotificationsPanel() {
  const [prefs, setPrefs] = useState<NotifState>(() =>
    Object.fromEntries(notificationCategories.map((c) => [c.id, { email: c.email, push: c.push, inApp: c.inApp }]))
  );

  const toggle = (id: string, key: 'email' | 'push' | 'inApp') => {
    setPrefs((p) => ({ ...p, [id]: { ...p[id], [key]: !p[id][key] } }));
  };

  return (
    <Box>
      <SectionHeading title="Notifications" subtitle="Choose how and when you receive notifications" />
      <TableContainer sx={{ borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.06)' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>Description</TableCell>
              <TableCell align="center" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>Email</TableCell>
              <TableCell align="center" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>Push</TableCell>
              <TableCell align="center" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>In-App</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notificationCategories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{cat.label}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>{cat.desc}</Typography>
                </TableCell>
                <TableCell align="center">
                  <Switch size="small" checked={prefs[cat.id].email} onChange={() => toggle(cat.id, 'email')} />
                </TableCell>
                <TableCell align="center">
                  <Switch size="small" checked={prefs[cat.id].push} onChange={() => toggle(cat.id, 'push')} />
                </TableCell>
                <TableCell align="center">
                  <Switch size="small" checked={prefs[cat.id].inApp} onChange={() => toggle(cat.id, 'inApp')} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// --- Team Panel ---
const statusColors: Record<string, { color: string; bg: string }> = {
  Online:  { color: '#22C55E', bg: 'rgba(34,197,94,0.15)'  },
  Away:    { color: '#F59E0B', bg: 'rgba(245,158,11,0.15)' },
  Offline: { color: '#9CA3AF', bg: 'rgba(156,163,175,0.1)' },
};

function TeamPanel() {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
        <SectionHeading title="Team" subtitle="Manage team members and their roles" />
        <Button variant="outlined" size="small" startIcon={<Plus size={14} />} sx={{ flexShrink: 0, ml: 2 }}>
          Invite Member
        </Button>
      </Stack>
      <TableContainer sx={{ borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.06)' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Member</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Joined</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamMembers.map((m) => {
              const sc = statusColors[m.status] ?? statusColors['Offline'];
              return (
                <TableRow key={m.email}>
                  <TableCell>
                    <Stack direction="row" alignItems="center" spacing={1.5}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.7rem' }}>{m.initials}</Avatar>
                      <Box>
                        <Typography variant="caption" sx={{ fontWeight: 600, display: 'block', lineHeight: 1.2 }}>{m.name}</Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>{m.email}</Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={m.role} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600, bgcolor: m.roleColorBg, color: m.roleColor, '& .MuiChip-label': { px: 0.75 } }} />
                  </TableCell>
                  <TableCell>
                    <Chip size="small" label={m.status} sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600, bgcolor: sc.bg, color: sc.color, '& .MuiChip-label': { px: 0.75 } }} />
                  </TableCell>
                  <TableCell><Typography variant="caption" sx={{ color: 'text.secondary' }}>{m.joined}</Typography></TableCell>
                  <TableCell align="right">
                    <IconButton size="small" sx={{ p: 0.5, color: 'text.secondary', '&:hover': { color: '#EF4444' } }}>
                      <Trash2 size={14} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// --- Billing Panel ---
function BillingPanel() {
  return (
    <Box>
      <SectionHeading title="Billing" subtitle="Manage your subscription and payment history" />

      {/* Plan card */}
      <Box sx={{ mb: 3, p: 2.5, borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.06)', bgcolor: 'rgba(255,255,255,0.02)' }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 0.5 }}>
              <Typography sx={{ fontWeight: 700, fontSize: '1.1rem' }}>{billingData.plan} Plan</Typography>
              <Chip size="small" label="Active" sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600, bgcolor: 'rgba(34,197,94,0.15)', color: '#22C55E', '& .MuiChip-label': { px: 0.75 } }} />
            </Stack>
            <Typography sx={{ fontWeight: 700, fontSize: '1.5rem', color: 'primary.main' }}>{billingData.price}</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>Renews on {billingData.renewsOn}</Typography>
          </Box>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" size="small" color="error">Cancel Plan</Button>
            <Button variant="contained" size="small">Upgrade Plan</Button>
          </Stack>
        </Stack>
      </Box>

      {/* Usage */}
      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 1.5 }}>Usage</Typography>
      <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {billingData.usage.map((u) => (
          <Box key={u.label}>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.5 }}>
              <Typography variant="caption" sx={{ fontWeight: 500 }}>{u.label}</Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {u.used.toLocaleString()}{u.unit} / {u.total.toLocaleString()}{u.unit}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={(u.used / u.total) * 100}
              sx={{ height: 6, borderRadius: 3, '& .MuiLinearProgress-bar': { bgcolor: u.color } }}
            />
          </Box>
        ))}
      </Box>

      {/* Invoice history */}
      <Typography sx={{ fontWeight: 600, fontSize: '0.875rem', mb: 1.5 }}>Invoice History</Typography>
      <TableContainer sx={{ borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.06)' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Invoice ID</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {billingData.invoices.map((inv) => (
              <TableRow key={inv.id}>
                <TableCell><Typography variant="caption">{inv.date}</Typography></TableCell>
                <TableCell><Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>{inv.id}</Typography></TableCell>
                <TableCell><Typography variant="caption" sx={{ fontWeight: 600 }}>{inv.amount}</Typography></TableCell>
                <TableCell>
                  <Chip size="small" label="Paid" sx={{ height: 18, fontSize: '0.6rem', fontWeight: 600, bgcolor: 'rgba(34,197,94,0.1)', color: '#22C55E', '& .MuiChip-label': { px: 0.75 } }} />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Download invoice">
                    <IconButton size="small" sx={{ p: 0.25, color: 'text.secondary' }}>
                      <Download size={14} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// --- API Keys Panel ---
function ApiKeysPanel() {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
        <SectionHeading title="API Keys" subtitle="Manage your API credentials and access tokens" />
        <Button variant="contained" size="small" startIcon={<Plus size={14} />} sx={{ flexShrink: 0, ml: 2 }}>
          Create New Key
        </Button>
      </Stack>
      <TableContainer sx={{ borderRadius: 1.5, border: '1px solid rgba(255,255,255,0.06)' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Created</TableCell>
              <TableCell>Last Used</TableCell>
              <TableCell>Scopes</TableCell>
              <TableCell>Status</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {apiKeys.map((k) => (
              <TableRow key={k.name}>
                <TableCell>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>{k.name}</Typography>
                </TableCell>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary', fontSize: '0.72rem' }}>{k.key}</Typography>
                    <Tooltip title="Copy key">
                      <IconButton size="small" sx={{ p: 0.25, color: 'text.secondary' }}>
                        <Copy size={12} />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
                <TableCell><Typography variant="caption" sx={{ color: 'text.secondary' }}>{k.created}</Typography></TableCell>
                <TableCell><Typography variant="caption" sx={{ color: 'text.secondary' }}>{k.lastUsed}</Typography></TableCell>
                <TableCell>
                  <Stack direction="row" spacing={0.5} flexWrap="wrap">
                    {k.scopes.map((s) => (
                      <Chip key={s} size="small" label={s} sx={{ height: 18, fontSize: '0.6rem', fontWeight: 600, bgcolor: 'rgba(255,255,255,0.06)', color: 'text.secondary', '& .MuiChip-label': { px: 0.5 } }} />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell>
                  <Chip
                    size="small"
                    label={k.active ? 'Active' : 'Inactive'}
                    sx={{
                      height: 18,
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      bgcolor: k.active ? 'rgba(34,197,94,0.1)' : 'rgba(156,163,175,0.1)',
                      color: k.active ? '#22C55E' : '#9CA3AF',
                      '& .MuiChip-label': { px: 0.75 },
                    }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Revoke key">
                    <IconButton size="small" sx={{ p: 0.25, color: 'text.secondary', '&:hover': { color: '#EF4444' } }}>
                      <Trash2 size={14} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

// --- Main Component ---
export function SettingsContent() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Header row */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexShrink: 0 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Settings</Typography>
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>Manage your account preferences and team settings</Typography>
        </Box>
        <Button variant="contained" size="small" startIcon={<Save size={14} />}>Save Changes</Button>
      </Box>

      {/* Main card: tab rail + content panel */}
      <Card sx={{ flexGrow: 1, overflow: 'hidden', display: 'flex' }}>
        {/* Left tab rail */}
        <Tabs
          orientation="vertical"
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            borderRight: '1px solid rgba(255,255,255,0.06)',
            minWidth: 180,
            '& .MuiTab-root': {
              alignItems: 'flex-start',
              textAlign: 'left',
              minHeight: 52,
              px: 3,
              fontSize: '0.875rem',
            },
          }}
        >
          <Tab icon={<User size={16} />} iconPosition="start" label="Profile" />
          <Tab icon={<Shield size={16} />} iconPosition="start" label="Security" />
          <Tab icon={<Bell size={16} />} iconPosition="start" label="Notifications" />
          <Tab icon={<Users size={16} />} iconPosition="start" label="Team" />
          <Tab icon={<CreditCard size={16} />} iconPosition="start" label="Billing" />
          <Tab icon={<Key size={16} />} iconPosition="start" label="API Keys" />
        </Tabs>

        {/* Right content panel */}
        <Box sx={{ flexGrow: 1, overflow: 'auto', p: 3 }}>
          {activeTab === 0 && <ProfilePanel />}
          {activeTab === 1 && <SecurityPanel />}
          {activeTab === 2 && <NotificationsPanel />}
          {activeTab === 3 && <TeamPanel />}
          {activeTab === 4 && <BillingPanel />}
          {activeTab === 5 && <ApiKeysPanel />}
        </Box>
      </Card>
    </Box>
  );
}
