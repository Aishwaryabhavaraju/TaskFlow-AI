import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  Building2,
  ChevronRight,
  CreditCard,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  LogOut,
  Monitor,
  Moon,
  Palette,
  Plus,
  Save,
  Search,
  Settings,
  ShieldCheck,
  Sun,
  Trash2,
  User,
  Users,
} from "lucide-react";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/layout/PageHeader";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";

const sections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: Building2 },
  { id: "project", label: "Project", icon: BriefcaseBusiness },
  { id: "team", label: "Team", icon: Users },
  { id: "roles", label: "Roles", icon: ShieldCheck },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "api-keys", label: "API Keys", icon: KeyRound },
  { id: "audit", label: "Audit Logs", icon: Activity },
  { id: "security", label: "Security", icon: LockKeyhole },
];

const roleRows = [
  {
    role: "Owner",
    scope: "Full access",
    permissions: ["Billing", "Members", "Security", "Data export"],
  },
  {
    role: "Admin",
    scope: "Workspace operations",
    permissions: ["Projects", "Members", "Automations"],
  },
  {
    role: "Manager",
    scope: "Project delivery",
    permissions: ["Tasks", "Reports", "Invites"],
  },
  {
    role: "Member",
    scope: "Assigned work",
    permissions: ["Tasks", "Comments", "Files"],
  },
  {
    role: "Viewer",
    scope: "Read-only",
    permissions: ["Dashboards", "Reports"],
  },
];

const initialMembers = [
  {
    name: "Ananda Kamala",
    email: "ananda@taskflow.ai",
    role: "Owner",
    status: "Active",
  },
  {
    name: "Maya Chen",
    email: "maya@taskflow.ai",
    role: "Admin",
    status: "Active",
  },
  {
    name: "Jordan Lee",
    email: "jordan@taskflow.ai",
    role: "Manager",
    status: "Pending",
  },
];

const auditRows = [
  {
    event: "Workspace settings updated",
    actor: "Ananda Kamala",
    time: "Today, 09:42",
    detail: "Changed default task privacy to team visible",
  },
  {
    event: "API key rotated",
    actor: "Maya Chen",
    time: "Yesterday, 17:18",
    detail: "OpenAI production key was replaced",
  },
  {
    event: "Role changed",
    actor: "Ananda Kamala",
    time: "Jul 6, 2026, 11:08",
    detail: "Jordan Lee moved from Member to Manager",
  },
  {
    event: "Billing plan reviewed",
    actor: "System",
    time: "Jul 5, 2026, 08:00",
    detail: "Next renewal estimate generated",
  },
];

const providerKeys = [
  {
    provider: "OpenAI",
    model: "GPT models",
    key: "sk-live-************3XQ9",
    status: "Connected",
  },
  {
    provider: "Anthropic",
    model: "Claude models",
    key: "Not configured",
    status: "Available",
  },
  {
    provider: "Google AI",
    model: "Gemini models",
    key: "Not configured",
    status: "Available",
  },
];

function SectionCard({ id, title, description, icon: Icon, children }) {
  return (
    <section
      id={id}
      className="rounded-lg border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="flex gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-yellow-400 text-black">
            <Icon size={20} />
          </div>

          <div>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-1 max-w-2xl text-sm text-zinc-500">
              {description}
            </p>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}

function TextField({ label, value, onChange, type = "text", placeholder }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-yellow-500 dark:border-zinc-700 dark:bg-zinc-950"
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-yellow-500 dark:border-zinc-700 dark:bg-zinc-950"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleRow({ icon: Icon, title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
      <div className="flex gap-3">
        <Icon className="mt-0.5 text-zinc-500" size={18} />
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="mt-1 text-sm text-zinc-500">{description}</p>
        </div>
      </div>

      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-yellow-400" : "bg-zinc-300 dark:bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition ${
            checked ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function ActionButton({
  children,
  icon: Icon,
  variant = "primary",
  onClick,
}) {
  const styles =
    variant === "secondary"
      ? "border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-800"
      : variant === "danger"
        ? "bg-red-500 text-white hover:bg-red-600"
        : "bg-yellow-400 text-black hover:bg-yellow-300";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition ${styles}`}
    >
      <Icon size={16} />
      {children}
    </button>
  );
}

function StatusBadge({ children, tone = "neutral" }) {
  const tones = {
    success:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
    warning:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
    neutral:
      "border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-300",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export default function SettingsAdministration() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeSection, setActiveSection] = useState("profile");
  const [showKeys, setShowKeys] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [profile, setProfile] = useState({
    firstName: user?.firstName || "Ananda",
    lastName: user?.lastName || "Kamala",
    email: user?.email || "ananda@taskflow.ai",
    title: "Product Lead",
    timezone: "Asia/Calcutta",
  });
  const [workspace, setWorkspace] = useState({
    name: "My Workspace",
    slug: "my-workspace",
    defaultRole: "Member",
    visibility: "Private",
  });
  const [project, setProject] = useState({
    defaultStatus: "Planning",
    defaultPriority: "Medium",
    taskPrefix: "TF",
    archiveAfter: "90 days",
  });
  const [settings, setSettings] = useState({
    emailDigest: true,
    taskAlerts: true,
    aiSuggestions: true,
    memberInvites: true,
    twoFactor: true,
    sessionAlerts: true,
    ssoEnforced: false,
  });

  const filteredMembers = useMemo(() => {
    const query = memberSearch.trim().toLowerCase();

    if (!query) {
      return initialMembers;
    }

    return initialMembers.filter((member) =>
      [member.name, member.email, member.role]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [memberSearch]);

  const updateProfile = (key, value) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const updateWorkspace = (key, value) => {
    setWorkspace((current) => ({ ...current, [key]: value }));
  };

  const updateProject = (key, value) => {
    setProject((current) => ({ ...current, [key]: value }));
  };

  const updateSetting = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Settings & Administration"
        description="Manage users, workspaces, projects, billing, provider keys, logs, and security from one place."
      >
        <ActionButton icon={Save}>Save changes</ActionButton>
      </PageHeader>

      <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
        <aside className="xl:sticky xl:top-20 xl:self-start">
          <nav className="rounded-lg border border-zinc-200 bg-white p-2 dark:border-zinc-800 dark:bg-zinc-900">
            {sections.map((section) => {
              const Icon = section.icon;
              const selected = activeSection === section.id;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    selected
                      ? "bg-yellow-400 font-semibold text-black"
                      : "text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon size={17} />
                  {section.label}
                </a>
              );
            })}
          </nav>
        </aside>

        <div className="space-y-6">
          <SectionCard
            id="profile"
            title="Profile Settings"
            description="Keep your identity, contact details, timezone, and notification preferences current."
            icon={User}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="First name"
                value={profile.firstName}
                onChange={(value) => updateProfile("firstName", value)}
              />
              <TextField
                label="Last name"
                value={profile.lastName}
                onChange={(value) => updateProfile("lastName", value)}
              />
              <TextField
                label="Email"
                type="email"
                value={profile.email}
                onChange={(value) => updateProfile("email", value)}
              />
              <TextField
                label="Job title"
                value={profile.title}
                onChange={(value) => updateProfile("title", value)}
              />
              <SelectField
                label="Timezone"
                value={profile.timezone}
                onChange={(value) => updateProfile("timezone", value)}
                options={["Asia/Calcutta", "UTC", "America/New_York", "Europe/London"]}
              />
            </div>
          </SectionCard>

          <SectionCard
            id="workspace"
            title="Workspace Settings"
            description="Control workspace identity, member defaults, visibility, and operational notifications."
            icon={Building2}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Workspace name"
                value={workspace.name}
                onChange={(value) => updateWorkspace("name", value)}
              />
              <TextField
                label="Workspace slug"
                value={workspace.slug}
                onChange={(value) => updateWorkspace("slug", value)}
              />
              <SelectField
                label="Default member role"
                value={workspace.defaultRole}
                onChange={(value) => updateWorkspace("defaultRole", value)}
                options={["Viewer", "Member", "Manager", "Admin"]}
              />
              <SelectField
                label="Visibility"
                value={workspace.visibility}
                onChange={(value) => updateWorkspace("visibility", value)}
                options={["Private", "Team visible", "Organization visible"]}
              />
            </div>

            <div className="mt-5">
              <Link
                to="/workspaces"
                className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-600 hover:text-yellow-500"
              >
                Open workspace directory
                <ChevronRight size={16} />
              </Link>
            </div>
          </SectionCard>

          <SectionCard
            id="project"
            title="Project Settings"
            description="Set project defaults that keep newly created work consistent across teams."
            icon={BriefcaseBusiness}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                label="Default project status"
                value={project.defaultStatus}
                onChange={(value) => updateProject("defaultStatus", value)}
                options={["Planning", "Active", "On hold", "Completed"]}
              />
              <SelectField
                label="Default priority"
                value={project.defaultPriority}
                onChange={(value) => updateProject("defaultPriority", value)}
                options={["Low", "Medium", "High", "Critical"]}
              />
              <TextField
                label="Task prefix"
                value={project.taskPrefix}
                onChange={(value) => updateProject("taskPrefix", value)}
              />
              <SelectField
                label="Auto-archive completed projects"
                value={project.archiveAfter}
                onChange={(value) => updateProject("archiveAfter", value)}
                options={["30 days", "60 days", "90 days", "Never"]}
              />
            </div>
          </SectionCard>

          <SectionCard
            id="team"
            title="Team Management"
            description="Invite teammates, review statuses, and adjust roles before access becomes a problem."
            icon={Users}
          >
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <label className="relative block md:w-80">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                  size={16}
                />
                <input
                  value={memberSearch}
                  onChange={(event) => setMemberSearch(event.target.value)}
                  placeholder="Search members"
                  className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-yellow-500 dark:border-zinc-700 dark:bg-zinc-950"
                />
              </label>
              <ActionButton icon={Plus}>Invite member</ActionButton>
            </div>

            <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
              {filteredMembers.map((member) => (
                <div
                  key={member.email}
                  className="grid gap-3 border-b border-zinc-200 p-4 last:border-b-0 dark:border-zinc-800 md:grid-cols-[1fr_120px_110px_auto] md:items-center"
                >
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-zinc-500">{member.email}</p>
                  </div>
                  <span className="text-sm">{member.role}</span>
                  <StatusBadge tone={member.status === "Active" ? "success" : "warning"}>
                    {member.status}
                  </StatusBadge>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    <Settings size={15} />
                    Manage
                  </button>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            id="roles"
            title="Roles & Permissions"
            description="Review what each access level can do across the workspace."
            icon={ShieldCheck}
          >
            <div className="grid gap-4">
              {roleRows.map((row) => (
                <div
                  key={row.role}
                  className="grid gap-4 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 lg:grid-cols-[180px_1fr]"
                >
                  <div>
                    <h3 className="font-semibold">{row.role}</h3>
                    <p className="text-sm text-zinc-500">{row.scope}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {row.permissions.map((permission) => (
                      <StatusBadge key={permission}>{permission}</StatusBadge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            id="billing"
            title="Billing & Subscription"
            description="UI for plan review, seat usage, renewal timing, and invoice access."
            icon={CreditCard}
          >
            <div className="grid gap-4 lg:grid-cols-3">
              <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <p className="text-sm text-zinc-500">Current plan</p>
                <h3 className="mt-1 text-2xl font-bold">Team Pro</h3>
                <p className="mt-2 text-sm text-zinc-500">Renews Aug 8, 2026</p>
              </div>
              <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <p className="text-sm text-zinc-500">Seats</p>
                <h3 className="mt-1 text-2xl font-bold">18 / 25</h3>
                <p className="mt-2 text-sm text-zinc-500">7 seats available</p>
              </div>
              <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <p className="text-sm text-zinc-500">Monthly estimate</p>
                <h3 className="mt-1 text-2xl font-bold">$540</h3>
                <p className="mt-2 text-sm text-zinc-500">Includes AI usage</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <ActionButton icon={CreditCard}>Manage plan</ActionButton>
              <ActionButton icon={BadgeCheck} variant="secondary">
                View invoices
              </ActionButton>
            </div>
          </SectionCard>

          <SectionCard
            id="appearance"
            title="Appearance Settings"
            description="Choose the interface mode and adjust product update preferences."
            icon={Palette}
          >
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { value: "light", label: "Light", icon: Sun },
                { value: "dark", label: "Dark", icon: Moon },
                { value: "system", label: "System", icon: Monitor },
              ].map((option) => {
                const Icon = option.icon;
                const selected = theme === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTheme(option.value)}
                    className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold transition ${
                      selected
                        ? "border-yellow-500 bg-yellow-50 text-zinc-950 dark:bg-yellow-900/20 dark:text-white"
                        : "border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <Icon size={18} />
                    {option.label}
                  </button>
                );
              })}
            </div>
            <div className="mt-5 grid gap-3">
              <ToggleRow
                icon={Bell}
                title="Product update banner"
                description="Show relevant launch notes in the dashboard header."
                checked={settings.emailDigest}
                onChange={(value) => updateSetting("emailDigest", value)}
              />
            </div>
          </SectionCard>

          <SectionCard
            id="api-keys"
            title="API Keys"
            description="Configure AI provider keys used by workspace automations and task suggestions."
            icon={KeyRound}
          >
            <div className="mb-4 flex justify-end">
              <ActionButton
                icon={showKeys ? EyeOff : Eye}
                variant="secondary"
                onClick={() => setShowKeys((current) => !current)}
              >
                {showKeys ? "Hide keys" : "Reveal keys"}
              </ActionButton>
            </div>
            <div className="grid gap-3">
              {providerKeys.map((provider) => (
                <div
                  key={provider.provider}
                  className="grid gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 md:grid-cols-[1fr_1fr_120px_auto] md:items-center"
                >
                  <div>
                    <h3 className="font-medium">{provider.provider}</h3>
                    <p className="text-sm text-zinc-500">{provider.model}</p>
                  </div>
                  <code className="rounded-lg bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-950">
                    {showKeys ? provider.key.replaceAll("*", "A") : provider.key}
                  </code>
                  <StatusBadge tone={provider.status === "Connected" ? "success" : "neutral"}>
                    {provider.status}
                  </StatusBadge>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-zinc-200 p-2 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                      aria-label={`Rotate ${provider.provider} key`}
                    >
                      <KeyRound size={16} />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950"
                      aria-label={`Delete ${provider.provider} key`}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            id="audit"
            title="Audit Logs"
            description="Track sensitive account, billing, provider, and permission changes."
            icon={Activity}
          >
            <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
              {auditRows.map((row) => (
                <div
                  key={`${row.event}-${row.time}`}
                  className="grid gap-2 border-b border-zinc-200 p-4 last:border-b-0 dark:border-zinc-800 lg:grid-cols-[1fr_170px_170px]"
                >
                  <div>
                    <h3 className="font-medium">{row.event}</h3>
                    <p className="text-sm text-zinc-500">{row.detail}</p>
                  </div>
                  <span className="text-sm text-zinc-600 dark:text-zinc-300">
                    {row.actor}
                  </span>
                  <span className="text-sm text-zinc-500">{row.time}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard
            id="security"
            title="Account Security"
            description="Strengthen account access with two-factor authentication, session alerts, and SSO controls."
            icon={LockKeyhole}
          >
            <div className="grid gap-3">
              <ToggleRow
                icon={ShieldCheck}
                title="Two-factor authentication"
                description="Require a second verification step for sign-in."
                checked={settings.twoFactor}
                onChange={(value) => updateSetting("twoFactor", value)}
              />
              <ToggleRow
                icon={Bell}
                title="New session alerts"
                description="Email admins when a new browser or device signs in."
                checked={settings.sessionAlerts}
                onChange={(value) => updateSetting("sessionAlerts", value)}
              />
              <ToggleRow
                icon={BadgeCheck}
                title="Enforce SSO"
                description="Require organization members to authenticate through SSO."
                checked={settings.ssoEnforced}
                onChange={(value) => updateSetting("ssoEnforced", value)}
              />
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <ActionButton icon={LogOut} variant="secondary">
                Sign out all sessions
              </ActionButton>
              <ActionButton icon={Trash2} variant="danger">
                Delete account
              </ActionButton>
            </div>
          </SectionCard>
        </div>
      </div>
    </DashboardLayout>
  );
}
