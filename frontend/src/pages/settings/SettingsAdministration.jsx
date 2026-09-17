import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
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
import useWorkspace from "../../hooks/useWorkspace";
import toast from "react-hot-toast";
import { loadUser } from "../../redux/slices/authSlice";
import useLogout from "../../hooks/useLogout";
import * as userService from "../../services/userService";

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

const defaultProviderKeys = [
  {
    provider: "OpenAI",
    model: "GPT models",
    key: "",
    status: "Available",
  },
  {
    provider: "Anthropic",
    model: "Claude models",
    key: "",
    status: "Available",
  },
  {
    provider: "Google AI",
    model: "Gemini models",
    key: "",
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
        value={value || ""}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm outline-none transition focus:border-yellow-500 dark:border-zinc-700 dark:bg-zinc-950 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 placeholder:italic"
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
  const dispatch = useDispatch();
  const { user } = useAuth();
  const logout = useLogout();
  const { theme, setTheme } = useTheme();
  const { currentWorkspace, saveSettings, fetchMembers } = useWorkspace();
  const [activeSection, setActiveSection] = useState("profile");
  const [showKeys, setShowKeys] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");
  const [isInviting, setIsInviting] = useState(false);

  const [userApiKeys, setUserApiKeys] = useState([]);
  const [members, setMembers] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [showAddKeyModal, setShowAddKeyModal] = useState(false);
  const [newKeyProvider, setNewKeyProvider] = useState("OpenAI");
  const [newKeyValue, setNewKeyValue] = useState("");

  const [profile, setProfile] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    title: user?.jobTitle || "",
    timezone: user?.timezone || "Asia/Calcutta",
  });
  const [workspace, setWorkspace] = useState({
    name: currentWorkspace?.name || "",
    slug: currentWorkspace?.slug || "",
    defaultRole: currentWorkspace?.defaultRole || "Member",
    visibility: currentWorkspace?.visibility || "Private",
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

  useEffect(() => {
    // Initialize profile form values once the authenticated user loads.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setProfile((current) => ({
      ...current,
      firstName: user?.firstName || current.firstName,
      lastName: user?.lastName || current.lastName,
      email: user?.email || current.email,
      title: user?.jobTitle || current.title,
      timezone: user?.timezone || current.timezone,
    }));
  }, [user]);

  useEffect(() => {
    const fetchApiKeys = async () => {
      try {
        const keys = await userService.getApiKeys();
        if (Array.isArray(keys)) setUserApiKeys(keys);
      } catch {
        // Ignored
      }
    };
    if (user) fetchApiKeys();
  }, [user]);

  const handleDeleteAccount = async () => {
    try {
      setIsDeletingAccount(true);
      await userService.deactivateAccount();
      toast.success("Account deleted successfully");
      await logout();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete account");
    } finally {
      setIsDeletingAccount(false);
      setShowDeleteModal(false);
    }
  };

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!inviteEmail) {
      toast.error("Please enter an email address");
      return;
    }
    try {
      setIsInviting(true);
      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail("");
      setShowInviteModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send invitation");
    } finally {
      setIsInviting(false);
    }
  };

  const handleSaveApiKey = async (e) => {
    e.preventDefault();
    if (!newKeyValue) {
      toast.error("Please enter the API key string");
      return;
    }
    try {
      const keys = await userService.saveApiKey({
        provider: newKeyProvider,
        key: newKeyValue,
      });
      setUserApiKeys(keys);
      toast.success(`${newKeyProvider} API key saved successfully`);
      setNewKeyValue("");
      setShowAddKeyModal(false);
    } catch (err) {
      toast.error("Failed to save API key");
    }
  };

  const handleDeleteApiKey = async (provider) => {
    try {
      const keys = await userService.deleteApiKey(provider);
      setUserApiKeys(keys);
      toast.success(`API key for ${provider} removed`);
    } catch (err) {
      toast.error("Failed to remove API key");
    }
  };

  const handleSaveSettings = async () => {
    try {
      if (user) {
        await userService.updateProfile({
          firstName: profile.firstName,
          lastName: profile.lastName,
          email: profile.email,
          jobTitle: profile.title,
          timezone: profile.timezone,
        });

        dispatch(loadUser());
      }

      if (currentWorkspace?._id) {
        await saveSettings(currentWorkspace._id, {
          name: workspace.name,
          slug: workspace.slug,
          defaultRole: workspace.defaultRole,
          visibility: workspace.visibility,
          profile,
          workspace,
          project,
          settings,
        });
      }

      toast.success("Settings saved successfully.");
    } catch {
      toast.error("Unable to save settings. Please try again.");
    }
  };

  useEffect(() => {
    if (currentWorkspace?._id) {
      setWorkspace({
        name: currentWorkspace.name || "",
        slug: currentWorkspace.slug || "",
        defaultRole: currentWorkspace.defaultRole || "Member",
        visibility: currentWorkspace.visibility || "Private",
      });

      const loadWorkspaceMembers = async () => {
        try {
          const list = await fetchMembers(currentWorkspace._id);
          if (Array.isArray(list) && list.length > 0) {
            setMembers(
              list.map((m) => ({
                name: m.user ? `${m.user.firstName || ""} ${m.user.lastName || ""}`.trim() || m.user.email : m.name || "Member",
                email: m.user?.email || m.email || "",
                role: m.role || "Member",
                status: "Active",
              }))
            );
          } else if (user) {
            setMembers([
              {
                name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "Member",
                email: user.email || "",
                role: "Owner",
                status: "Active",
              },
            ]);
          }
        } catch {
          if (user) {
            setMembers([
              {
                name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "Member",
                email: user.email || "",
                role: "Owner",
                status: "Active",
              },
            ]);
          }
        }
      };

      loadWorkspaceMembers();
    } else if (user) {
      setMembers([
        {
          name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email || "Member",
          email: user.email || "",
          role: "Owner",
          status: "Active",
        },
      ]);
    }
  }, [currentWorkspace, user]);

  const filteredMembers = useMemo(() => {
    const query = memberSearch.trim().toLowerCase();

    if (!query) {
      return members;
    }

    return members.filter((member) =>
      [member.name, member.email, member.role]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [members, memberSearch]);

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
    toast.success("Security setting updated successfully");
  };

  return (
    <DashboardLayout>
      <PageHeader
        title="Settings & Administration"
        description="Manage users, workspaces, projects, billing, provider keys, logs, and security from one place."
      >
        <ActionButton icon={Save} onClick={handleSaveSettings}>
          Save changes
        </ActionButton>
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
                placeholder="e.g. John"
                value={profile.firstName}
                onChange={(value) => updateProfile("firstName", value)}
              />
              <TextField
                label="Last name"
                placeholder="e.g. Doe"
                value={profile.lastName}
                onChange={(value) => updateProfile("lastName", value)}
              />
              <TextField
                label="Email"
                type="email"
                placeholder="e.g. john.doe@example.com"
                value={profile.email}
                onChange={(value) => updateProfile("email", value)}
              />
              <TextField
                label="Job title"
                placeholder="e.g. Product Lead"
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
                placeholder="e.g. My Workspace"
                value={workspace.name}
                onChange={(value) => updateWorkspace("name", value)}
              />
              <TextField
                label="Workspace slug"
                placeholder="e.g. my-workspace"
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

            <div className="mt-5 flex items-center justify-between">
              <Link
                to="/workspaces"
                className="inline-flex items-center gap-2 text-sm font-semibold text-yellow-600 hover:text-yellow-500"
              >
                Open workspace directory
                <ChevronRight size={16} />
              </Link>
              <ActionButton icon={Save} onClick={handleSaveSettings}>
                Save Workspace Settings
              </ActionButton>
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
                placeholder="e.g. TASK"
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
              <ActionButton icon={Plus} onClick={() => setShowInviteModal(true)}>
                Invite member
              </ActionButton>
            </div>

            <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
              {filteredMembers.length === 0 ? (
                <div className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  No team members found.
                </div>
              ) : (
                filteredMembers.map((member) => (
                  <div
                    key={member.email || member.name}
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
                ))
              )}
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
                <h3 className="mt-1 text-2xl font-bold">{currentWorkspace?.plan || "Standard Plan"}</h3>
                <p className="mt-2 text-sm text-zinc-500">Active Workspace Subscription</p>
              </div>
              <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <p className="text-sm text-zinc-500">Seats</p>
                <h3 className="mt-1 text-2xl font-bold">{members.length || 1} Active Seat(s)</h3>
                <p className="mt-2 text-sm text-zinc-500">Based on workspace members</p>
              </div>
              <div className="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
                <p className="text-sm text-zinc-500">Monthly estimate</p>
                <h3 className="mt-1 text-2xl font-bold">$0</h3>
                <p className="mt-2 text-sm text-zinc-500">Standard Tier Active</p>
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
            <div className="mb-4 flex justify-between items-center">
              <ActionButton
                icon={Plus}
                variant="primary"
                onClick={() => setShowAddKeyModal(true)}
              >
                Add API Key
              </ActionButton>
              <ActionButton
                icon={showKeys ? EyeOff : Eye}
                variant="secondary"
                onClick={() => setShowKeys((current) => !current)}
              >
                {showKeys ? "Hide keys" : "Reveal keys"}
              </ActionButton>
            </div>
            <div className="grid gap-3">
              {(userApiKeys.length > 0 ? userApiKeys : defaultProviderKeys).map((provider) => (
                <div
                  key={provider.provider || provider._id}
                  className="grid gap-3 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800 md:grid-cols-[1fr_1fr_120px_auto] md:items-center"
                >
                  <div>
                    <h3 className="font-medium">{provider.provider}</h3>
                    <p className="text-sm text-zinc-500">{provider.model || "Default model"}</p>
                  </div>
                  <code className="rounded-lg bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-950 overflow-hidden text-ellipsis">
                    {showKeys ? (provider.key || "Not configured") : (provider.key ? provider.key.replaceAll(/[A-Za-z0-9]/g, "*") : "Not configured")}
                  </code>
                  <StatusBadge tone={provider.key ? "success" : "neutral"}>
                    {provider.key ? "Connected" : "Available"}
                  </StatusBadge>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleDeleteApiKey(provider.provider)}
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
              {auditLogs.length === 0 ? (
                <div className="p-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
                  No audit logs recorded yet.
                </div>
              ) : (
                auditLogs.map((row) => (
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
                ))
              )}
            </div>
          </SectionCard>

          <SectionCard
            id="security"
            title="Account Security"
            description="Strengthen account access with two-factor authentication, session alerts, and SSO controls."
            icon={LockKeyhole}
          >
            <div className="mb-5 flex items-center justify-between rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 font-bold text-white shadow-sm">
                  ✓
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-900 dark:text-emerald-300">Security Protection: Active</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400">Account passkeys, session tracking, and 2FA protection enabled.</p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                100% Score
              </span>
            </div>

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
              <ActionButton icon={LogOut} variant="secondary" onClick={logout}>
                Sign out all sessions
              </ActionButton>
              <ActionButton icon={Trash2} variant="danger" onClick={() => setShowDeleteModal(true)}>
                Delete account
              </ActionButton>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-zinc-900 border dark:border-zinc-800 shadow-2xl">
            <h3 className="text-xl font-bold text-red-600">Delete Account</h3>
            <p className="mt-2 text-sm text-zinc-500">
              Are you sure you want to delete your account? This action will deactivate your profile and remove access. This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isDeletingAccount}
                onClick={handleDeleteAccount}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeletingAccount ? "Deleting..." : "Yes, Delete My Account"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-zinc-900 border dark:border-zinc-800 shadow-2xl">
            <h3 className="text-xl font-bold">Invite Member</h3>
            <p className="mt-1 text-sm text-zinc-500">Send an invitation link to a teammate by email.</p>
            <form onSubmit={handleSendInvite} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="mt-1 w-full rounded-lg border p-2 text-sm dark:bg-zinc-950 dark:border-zinc-800"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Role</label>
                <select
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value)}
                  className="mt-1 w-full rounded-lg border p-2 text-sm dark:bg-zinc-950 dark:border-zinc-800"
                >
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowInviteModal(false)}
                  className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isInviting}
                  className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300 disabled:opacity-50"
                >
                  {isInviting ? "Sending..." : "Send Invitation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add API Key Modal */}
      {showAddKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 dark:bg-zinc-900 border dark:border-zinc-800 shadow-2xl">
            <h3 className="text-xl font-bold">Add API Key</h3>
            <p className="mt-1 text-sm text-zinc-500">Save a personal API key for AI features.</p>
            <form onSubmit={handleSaveApiKey} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium">Provider</label>
                <select
                  value={newKeyProvider}
                  onChange={(e) => setNewKeyProvider(e.target.value)}
                  className="mt-1 w-full rounded-lg border p-2 text-sm dark:bg-zinc-950 dark:border-zinc-800"
                >
                  <option value="OpenAI">OpenAI</option>
                  <option value="Anthropic">Anthropic</option>
                  <option value="Google AI">Google AI</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">API Key</label>
                <input
                  type="password"
                  required
                  placeholder="sk-..."
                  value={newKeyValue}
                  onChange={(e) => setNewKeyValue(e.target.value)}
                  className="mt-1 w-full rounded-lg border p-2 text-sm dark:bg-zinc-950 dark:border-zinc-800"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddKeyModal(false)}
                  className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-semibold text-black hover:bg-yellow-300"
                >
                  Save API Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
