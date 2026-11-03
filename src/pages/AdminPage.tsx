import React, { useState, useEffect } from 'react';
import {
  Lead,
  EstimateRequest,
  ServiceItem,
  GalleryProject,
  ReviewItem,
  FAQItem,
  ServiceArea,
  WebsiteSettings,
  AdminUser,
} from '../types';
import {
  getSettings,
  updateSettings,
  getLeads,
  updateLead,
  addLeadNote,
  deleteLead,
  getEstimates,
  updateEstimate,
  deleteEstimate,
  getServices,
  saveService,
  deleteService,
  getProjects,
  saveProject,
  deleteProject,
  getReviews,
  moderateReview,
  deleteReview,
  getFAQs,
  saveFAQ,
  deleteFAQ,
  getServiceAreas,
  saveServiceArea,
  deleteServiceArea,
  getAdminUser,
  loginAdmin,
  isAdminAuthenticated,
  logoutAdmin,
  changeAdminPassword,
  updateAdminProfile,
  resetToDemoData,
} from '../services/db';
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  Wrench,
  Image as ImageIcon,
  Star,
  HelpCircle,
  MapPin,
  Settings,
  KeyRound,
  LogOut,
  Search,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  XCircle,
  Eye,
  Phone,
  Mail,
  Shield,
  RotateCcw,
  Upload,
  AlertTriangle,
} from 'lucide-react';

interface AdminPageProps {
  navigate: (route: string) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ navigate }) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isAdminAuthenticated());
  const [loginEmail, setLoginEmail] = useState('admin@summitproroofing.com');
  const [loginPassword, setLoginPassword] = useState('SummitRoof2026!');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetMessage, setResetMessage] = useState('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'leads' | 'estimates' | 'services' | 'gallery' | 'reviews' | 'faqs' | 'areas' | 'settings' | 'security'
  >('overview');

  // Loaded DB data
  const [settings, setSettingsState] = useState<WebsiteSettings>(getSettings());
  const [leads, setLeads] = useState<Lead[]>(getLeads());
  const [estimates, setEstimates] = useState<EstimateRequest[]>(getEstimates());
  const [services, setServices] = useState<ServiceItem[]>(getServices());
  const [projects, setProjects] = useState<GalleryProject[]>(getProjects());
  const [reviews, setReviews] = useState<ReviewItem[]>(getReviews(false));
  const [faqs, setFaqs] = useState<FAQItem[]>(getFAQs());
  const [serviceAreas, setServiceAreas] = useState<ServiceArea[]>(getServiceAreas());
  const [adminUser, setAdminUserState] = useState<AdminUser>(getAdminUser());

  // Search & Filters
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('All');
  const [estimateStatusFilter, setEstimateStatusFilter] = useState<string>('All');

  // Lead Details Modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [newNoteText, setNewNoteText] = useState('');

  // Estimate Details Modal
  const [selectedEstimate, setSelectedEstimate] = useState<EstimateRequest | null>(null);

  // Edit / Add Item Modals
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [editingProject, setEditingProject] = useState<GalleryProject | null>(null);
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [editingArea, setEditingArea] = useState<ServiceArea | null>(null);

  // Password Change State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdMessage, setPwdMessage] = useState<{ text: string; error: boolean } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Refresh helper
  const reloadData = () => {
    setSettingsState(getSettings());
    setLeads(getLeads());
    setEstimates(getEstimates());
    setServices(getServices());
    setProjects(getProjects());
    setReviews(getReviews(false));
    setFaqs(getFAQs());
    setServiceAreas(getServiceAreas());
    setAdminUserState(getAdminUser());
  };

  useEffect(() => {
    setIsAuthenticated(isAdminAuthenticated());
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError('');

    try {
      const res = await loginAdmin(loginEmail, loginPassword);
      if (res.success) {
        setIsAuthenticated(true);
        reloadData();
      } else {
        setLoginError(res.error || 'Authentication failed.');
      }
    } catch {
      setLoginError('Error during login verification.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwdMessage(null);

    const res = await changeAdminPassword(currentPassword, newPassword, confirmPassword);
    if (res.success) {
      setPwdMessage({ text: 'Password successfully updated and securely hashed!', error: false });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setPwdMessage({ text: res.error || 'Failed to update password.', error: true });
    }
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-950 text-white">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-amber-500 rounded-xl text-slate-950 font-black text-xl flex items-center justify-center mx-auto shadow-md">
              SP
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Summit Pro Roofing Admin
            </h2>
            <p className="text-xs text-slate-400">
              Authorized personnel only. Password verified with PBKDF2 salt & hash.
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/80 border border-red-800 rounded-xl text-xs text-red-200">
              {loginError}
            </div>
          )}

          {resetMessage && (
            <div className="p-3 bg-emerald-950/80 border border-emerald-800 rounded-xl text-xs text-emerald-200">
              {resetMessage}
            </div>
          )}

          {showForgotPassword ? (
            <div className="space-y-4 text-xs">
              <h3 className="font-bold text-sm text-amber-400">Secure Password Reset Workflow</h3>
              <p className="text-slate-300">
                To reset master access, please verify your authorized administrator email:
              </p>
              <input
                type="email"
                defaultValue={loginEmail}
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs"
              />
              <button
                type="button"
                onClick={() => {
                  setResetMessage('A one-time emergency password reset link has been dispatched to admin@summitproroofing.com.');
                  setShowForgotPassword(false);
                }}
                className="w-full py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl hover:bg-amber-400"
              >
                Send Reset Link
              </button>
              <button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="w-full text-center text-slate-400 hover:text-white"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Admin Email</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-[11px] text-amber-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <span className="text-amber-400 font-bold block">Demo Credentials:</span>
                <div>Email: <code className="text-slate-300">admin@summitproroofing.com</code></div>
                <div>Password: <code className="text-slate-300">SummitRoof2026!</code></div>
              </div>

              <button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-amber-400 transition-colors shadow-lg"
              >
                {isLoggingIn ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>

              <button
                type="button"
                onClick={() => navigate('home')}
                className="w-full text-center text-xs text-slate-500 hover:text-slate-300"
              >
                ← Return to Public Website
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // AUTHENTICATED DASHBOARD
  // ----------------------------------------------------
  // Metric Calculations
  const totalLeads = leads.length;
  const newLeads = leads.filter((l) => l.status === 'New').length;
  const pendingEstimates = estimates.filter((e) => e.status === 'New' || e.status === 'Inspection Scheduled').length;
  const approvedLeads = leads.filter((l) => l.status === 'Won').length;
  const totalProjects = projects.length;
  const totalReviews = reviews.length;
  const totalServices = services.length;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Bar */}
      <div className="bg-slate-950 text-white border-b border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-sm">
            SP
          </div>
          <div>
            <div className="font-extrabold text-sm text-white">Summit Pro Roofing · Admin</div>
            <div className="text-[10px] text-slate-400">{adminUser.name} ({adminUser.email})</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('home')}
            className="px-3 py-1.5 bg-slate-900 border border-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold"
          >
            View Live Site
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-red-950 text-red-200 border border-red-800 hover:bg-red-900 rounded-lg text-xs font-semibold flex items-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 px-4 py-2.5 bg-slate-900 text-white border border-amber-500 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="flex-1 flex flex-col md:flex-row">
        {/* Sidebar Nav */}
        <div className="w-full md:w-64 bg-slate-900 text-slate-300 p-4 space-y-1.5 shrink-0 border-r border-slate-800">
          {[
            { id: 'overview' as const, label: 'Dashboard Overview', icon: LayoutDashboard },
            { id: 'leads' as const, label: `Leads (${newLeads} New)`, icon: Users },
            { id: 'estimates' as const, label: `Estimates (${pendingEstimates})`, icon: FileSpreadsheet },
            { id: 'services' as const, label: `Services (${totalServices})`, icon: Wrench },
            { id: 'gallery' as const, label: `Project Gallery (${totalProjects})`, icon: ImageIcon },
            { id: 'reviews' as const, label: `Reviews (${totalReviews})`, icon: Star },
            { id: 'faqs' as const, label: 'FAQ Manager', icon: HelpCircle },
            { id: 'areas' as const, label: 'Service Areas', icon: MapPin },
            { id: 'settings' as const, label: 'Website Settings & SEO', icon: Settings },
            { id: 'security' as const, label: 'Security & Password', icon: KeyRound },
          ].map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors text-left ${
                  active
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}

          <div className="pt-6 border-t border-slate-800 mt-6 space-y-2">
            <button
              onClick={async () => {
                await resetToDemoData();
                reloadData();
                showToast('Demo database reset to initial Austin content.');
              }}
              className="w-full flex items-center gap-2 px-3 py-2 bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-lg text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
              <span>Reset Demo Data</span>
            </button>
          </div>
        </div>

        {/* Main Panel Content Area */}
        <div className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto overflow-y-auto w-full">
          {/* ======================================================= */}
          {/* TAB 1: OVERVIEW                                         */}
          {/* ======================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Dashboard Metrics</h1>
                <p className="text-xs text-slate-500">
                  Real-time operational lead capture and estimate pipeline status.
                </p>
              </div>

              {/* 7 Dashboard Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {[
                  { label: 'Total Leads', val: totalLeads, color: 'border-blue-500' },
                  { label: 'New Leads', val: newLeads, color: 'border-red-500' },
                  { label: 'Pending Est.', val: pendingEstimates, color: 'border-amber-500' },
                  { label: 'Won Leads', val: approvedLeads, color: 'border-emerald-500' },
                  { label: 'Projects', val: totalProjects, color: 'border-indigo-500' },
                  { label: 'Reviews', val: totalReviews, color: 'border-purple-500' },
                  { label: 'Services', val: totalServices, color: 'border-cyan-500' },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`bg-white p-4 rounded-xl border border-slate-200 shadow-sm border-t-4 ${stat.color}`}
                  >
                    <div className="text-[11px] font-bold text-slate-500 truncate">{stat.label}</div>
                    <div className="text-2xl font-black text-slate-900 mt-1 font-mono">{stat.val}</div>
                  </div>
                ))}
              </div>

              {/* Recent Estimates Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900">
                    Recent Free Estimate Requests
                  </h3>
                  <button
                    onClick={() => setActiveTab('estimates')}
                    className="text-xs text-amber-600 font-bold hover:underline"
                  >
                    View All ({estimates.length}) →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {estimates.slice(0, 4).map((est) => (
                    <div
                      key={est.id}
                      onClick={() => setSelectedEstimate(est)}
                      className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg cursor-pointer text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{est.name} ({est.phone})</div>
                        <div className="text-slate-500">
                          {est.serviceNeeded} · {est.address}, {est.city}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                          {est.status}
                        </span>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {new Date(est.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Inbound Leads */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-900">
                    Recent Inbound Contacts & Form Submissions
                  </h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-amber-600 font-bold hover:underline"
                  >
                    Manage Leads →
                  </button>
                </div>

                <div className="divide-y divide-slate-100">
                  {leads.slice(0, 4).map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg cursor-pointer text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{lead.name} · {lead.phone}</div>
                        <div className="text-slate-500 truncate max-w-md">{lead.service} - {lead.message}</div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {lead.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 2: LEAD MANAGEMENT                                  */}
          {/* ======================================================= */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Lead Management</h1>
                  <p className="text-xs text-slate-500">Track and update customer inquiries and inspection requests.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search name, phone..."
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      className="pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                    />
                  </div>
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Estimate Scheduled">Estimate Scheduled</option>
                    <option value="Estimate Sent">Estimate Sent</option>
                    <option value="Won">Won</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Service</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {leads
                      .filter((l) => {
                        const matchesFilter = leadStatusFilter === 'All' || l.status === leadStatusFilter;
                        const matchesSearch =
                          l.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
                          l.phone.includes(leadSearch);
                        return matchesFilter && matchesSearch;
                      })
                      .map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{lead.name}</div>
                            <div className="text-slate-500">{lead.phone} · {lead.email}</div>
                          </td>
                          <td className="p-3 font-semibold text-slate-700">{lead.service}</td>
                          <td className="p-3">
                            <select
                              value={lead.status}
                              onChange={(e) => {
                                updateLead(lead.id, { status: e.target.value as any });
                                reloadData();
                              }}
                              className="px-2 py-1 rounded bg-slate-100 border border-slate-300 font-bold text-[11px]"
                            >
                              <option value="New">New</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Estimate Scheduled">Estimate Scheduled</option>
                              <option value="Estimate Sent">Estimate Sent</option>
                              <option value="Won">Won</option>
                              <option value="Lost">Lost</option>
                            </select>
                          </td>
                          <td className="p-3 text-slate-500 font-mono text-[11px]">
                            {new Date(lead.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => setSelectedLead(lead)}
                              className="px-2 py-1 bg-amber-50 text-amber-800 rounded font-bold hover:bg-amber-100"
                            >
                              Details & Notes
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete lead from ${lead.name}?`)) {
                                  deleteLead(lead.id);
                                  reloadData();
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-red-600"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 3: ESTIMATE MANAGEMENT                              */}
          {/* ======================================================= */}
          {activeTab === 'estimates' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Estimate Requests</h1>
                  <p className="text-xs text-slate-500">Manage 7-step inspection proposals and customer photos.</p>
                </div>
                <div>
                  <select
                    value={estimateStatusFilter}
                    onChange={(e) => setEstimateStatusFilter(e.target.value)}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Inspection Scheduled">Inspection Scheduled</option>
                    <option value="Estimate Sent">Estimate Sent</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Homeowner</th>
                      <th className="p-3">Property</th>
                      <th className="p-3">Work Needed</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Estimate ($)</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {estimates
                      .filter((e) => estimateStatusFilter === 'All' || e.status === estimateStatusFilter)
                      .map((est) => (
                        <tr key={est.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{est.name}</div>
                            <div className="text-slate-500">{est.phone} · {est.email}</div>
                          </td>
                          <td className="p-3">
                            <div>{est.address}, {est.city} {est.zip}</div>
                            <span className="text-[10px] text-slate-400 font-semibold">{est.propertyType}</span>
                          </td>
                          <td className="p-3 font-semibold text-slate-700">{est.serviceNeeded}</td>
                          <td className="p-3">
                            <select
                              value={est.status}
                              onChange={(e) => {
                                updateEstimate(est.id, { status: e.target.value as any });
                                reloadData();
                              }}
                              className="px-2 py-1 rounded bg-slate-100 border border-slate-300 font-bold text-[11px]"
                            >
                              <option value="New">New</option>
                              <option value="Inspection Scheduled">Inspection Scheduled</option>
                              <option value="Estimate Sent">Estimate Sent</option>
                              <option value="Approved">Approved</option>
                              <option value="Declined">Declined</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </td>
                          <td className="p-3 font-mono font-bold text-slate-900">
                            {est.estimateAmount ? `$${est.estimateAmount.toLocaleString()}` : '—'}
                          </td>
                          <td className="p-3 text-right space-x-2">
                            <button
                              onClick={() => setSelectedEstimate(est)}
                              className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded font-bold hover:bg-amber-100"
                            >
                              Review & Bid
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Delete this estimate request?')) {
                                  deleteEstimate(est.id);
                                  reloadData();
                                }
                              }}
                              className="p-1 text-slate-400 hover:text-red-600"
                            >
                              <Trash2 className="w-3.5 h-3.5 inline" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 4: SERVICES MANAGEMENT                              */}
          {/* ======================================================= */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Services Management</h1>
                  <p className="text-xs text-slate-500">Configure offerings, pricing ranges, and descriptions.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingService({
                      id: `srv-${Date.now()}`,
                      slug: 'new-service',
                      name: 'New Custom Roofing Service',
                      shortDesc: 'Brief summary of the roofing service.',
                      fullDesc: 'Comprehensive description of roofing technical scope.',
                      features: ['Certified installation', 'Warranty protection'],
                      priceRange: '$500 – $2,500',
                      image: '/src/assets/images/hero_summit_roofing_1791780518538.jpg',
                      active: true,
                      category: 'residential',
                    })
                  }
                  className="px-3.5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Service</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {services.map((svc) => (
                  <div key={svc.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900">{svc.name}</h3>
                        <div className="text-[11px] text-slate-400">/{svc.slug} · {svc.category}</div>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          svc.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {svc.active ? 'Active' : 'Disabled'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2">{svc.shortDesc}</p>
                    <div className="text-xs font-bold text-amber-700">{svc.priceRange}</div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setEditingService(svc)}
                        className="text-xs font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Details</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete service "${svc.name}"?`)) {
                            deleteService(svc.id);
                            reloadData();
                          }
                        }}
                        className="text-xs text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 5: GALLERY MANAGEMENT                               */}
          {/* ======================================================= */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Project Gallery Management</h1>
                  <p className="text-xs text-slate-500">Manage Before & After showcases, titles, and locations.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingProject({
                      id: `proj-${Date.now()}`,
                      title: 'New Roof Project Title',
                      location: 'Austin, TX',
                      category: 'Roof Replacement',
                      beforeImage: '/src/assets/images/storm_damage_inspection_1791780571369.jpg',
                      afterImage: '/src/assets/images/hero_summit_roofing_1791780518538.jpg',
                      completionDate: 'April 2026',
                      description: 'Project details and materials used.',
                    })
                  }
                  className="px-3.5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Showcase</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-4 space-y-3">
                    <div className="grid grid-cols-2 gap-2 aspect-[16/9]">
                      <div className="relative">
                        <img src={proj.beforeImage} alt="Before" className="w-full h-full object-cover rounded-lg" />
                        <span className="absolute bottom-1 left-1 bg-red-600 text-white text-[9px] px-1 rounded font-bold uppercase">Before</span>
                      </div>
                      <div className="relative">
                        <img src={proj.afterImage} alt="After" className="w-full h-full object-cover rounded-lg" />
                        <span className="absolute bottom-1 left-1 bg-emerald-600 text-white text-[9px] px-1 rounded font-bold uppercase">After</span>
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-amber-700 font-bold uppercase">{proj.category} · {proj.location}</div>
                      <h4 className="font-bold text-sm text-slate-900">{proj.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">{proj.description}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setEditingProject(proj)}
                        className="text-xs font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit Showcase</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete project?')) {
                            deleteProject(proj.id);
                            reloadData();
                          }
                        }}
                        className="text-xs text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 6: REVIEW MODERATION                                */}
          {/* ======================================================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Review Moderation</h1>
                <p className="text-xs text-slate-500">
                  Approve, reject, or edit customer testimonials. Unapproved reviews do not appear publicly.
                </p>
              </div>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className={`bg-white p-5 rounded-2xl border shadow-sm flex flex-col sm:flex-row justify-between gap-4 ${
                      rev.approved ? 'border-slate-200' : 'border-amber-300 bg-amber-50/20'
                    }`}
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="flex text-amber-400">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-amber-400" />
                          ))}
                        </div>
                        <span className="font-bold text-sm text-slate-900">{rev.author}</span>
                        <span className="text-xs text-slate-400">({rev.location})</span>
                        {rev.isSample && (
                          <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                            Demo Sample
                          </span>
                        )}
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            rev.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-200 text-amber-900'
                          }`}
                        >
                          {rev.approved ? 'Approved' : 'Pending Moderation'}
                        </span>
                      </div>

                      <p className="text-xs text-slate-700 italic">"{rev.reviewText}"</p>
                      <div className="text-[11px] text-slate-400">{rev.serviceType} · Submitted {rev.date}</div>
                    </div>

                    <div className="flex sm:flex-col justify-end gap-2 shrink-0">
                      <button
                        onClick={() => {
                          moderateReview(rev.id, { approved: !rev.approved });
                          reloadData();
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          rev.approved
                            ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            : 'bg-emerald-600 text-white hover:bg-emerald-500'
                        }`}
                      >
                        {rev.approved ? 'Hide Review' : 'Approve Review'}
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('Delete review permanently?')) {
                            deleteReview(rev.id);
                            reloadData();
                          }
                        }}
                        className="px-3 py-1.5 bg-red-50 text-red-600 rounded-lg text-xs font-bold hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 7: FAQ MANAGER                                      */}
          {/* ======================================================= */}
          {activeTab === 'faqs' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">FAQ Management</h1>
                  <p className="text-xs text-slate-500">Add, edit, or reorder questions on the website.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingFaq({
                      id: `faq-${Date.now()}`,
                      question: 'New Question Title?',
                      answer: 'Clear detailed answer for Austin homeowners.',
                      category: 'General',
                      order: faqs.length + 1,
                    })
                  }
                  className="px-3.5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add FAQ</span>
                </button>
              </div>

              <div className="space-y-3">
                {faqs.map((faq) => (
                  <div key={faq.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                        <span className="font-mono text-xs text-amber-700">#{faq.order}</span>
                        <span>{faq.question}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingFaq(faq)}
                          className="p-1 text-slate-500 hover:text-amber-600"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete FAQ?')) {
                              deleteFAQ(faq.id);
                              reloadData();
                            }
                          }}
                          className="p-1 text-slate-400 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600">{faq.answer}</p>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">{faq.category}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 8: SERVICE AREAS                                    */}
          {/* ======================================================= */}
          {activeTab === 'areas' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-black text-slate-900">Service Area Management</h1>
                  <p className="text-xs text-slate-500">Edit city landing pages, SEO descriptions, and ZIP codes.</p>
                </div>
                <button
                  onClick={() =>
                    setEditingArea({
                      id: `area-${Date.now()}`,
                      name: 'Lakeway',
                      slug: 'lakeway',
                      zipCodes: ['78734', '78738'],
                      headline: 'Lakeway, TX Luxury Roof Specialists',
                      description: 'Serving Lake Travis luxury and tile roofs.',
                      landmarks: ['Lake Travis', 'Flintrock Falls'],
                      phone: '(512) 555-0148',
                      active: true,
                    })
                  }
                  className="px-3.5 py-2 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add City</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {serviceAreas.map((area) => (
                  <div key={area.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-base text-slate-900">{area.name}, TX</h4>
                        <div className="text-[11px] text-slate-400">/{area.slug}</div>
                      </div>
                      <button
                        onClick={() => {
                          saveServiceArea({ ...area, active: !area.active });
                          reloadData();
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          area.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {area.active ? 'Active' : 'Disabled'}
                      </button>
                    </div>

                    <p className="text-xs text-slate-600">{area.description}</p>
                    <div className="text-[11px] font-mono text-slate-500">
                      ZIPs: {area.zipCodes.join(', ')}
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setEditingArea(area)}
                        className="text-xs font-bold text-slate-700 hover:text-amber-600 flex items-center gap-1"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit City</span>
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Delete area ${area.name}?`)) {
                            deleteServiceArea(area.id);
                            reloadData();
                          }
                        }}
                        className="text-xs text-slate-400 hover:text-red-600"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 9: WEBSITE SETTINGS & SEO                           */}
          {/* ======================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Website & SEO Settings</h1>
                <p className="text-xs text-slate-500">
                  Update company contact details, address, licensing, and search engine metadata.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-2">
                  Company Identity & Phone Numbers
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company Name</label>
                    <input
                      type="text"
                      value={settings.companyName}
                      onChange={(e) => setSettingsState({ ...settings, companyName: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tagline</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => setSettingsState({ ...settings, tagline: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Office Phone Number</label>
                    <input
                      type="text"
                      value={settings.phone}
                      onChange={(e) => setSettingsState({ ...settings, phone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">24/7 Emergency Phone</label>
                    <input
                      type="text"
                      value={settings.emergencyPhone}
                      onChange={(e) => setSettingsState({ ...settings, emergencyPhone: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettingsState({ ...settings, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Business Hours</label>
                    <input
                      type="text"
                      value={settings.businessHours}
                      onChange={(e) => setSettingsState({ ...settings, businessHours: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">Physical Address</label>
                    <input
                      type="text"
                      value={settings.address}
                      onChange={(e) => setSettingsState({ ...settings, address: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Texas License Number</label>
                    <input
                      type="text"
                      value={settings.licenseNumber}
                      onChange={(e) => setSettingsState({ ...settings, licenseNumber: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Insurance Policy Description</label>
                    <input
                      type="text"
                      value={settings.insuranceCoverage}
                      onChange={(e) => setSettingsState({ ...settings, insuranceCoverage: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-2 pt-4">
                  SEO & Social Graph Settings
                </h3>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Meta Title</label>
                    <input
                      type="text"
                      value={settings.seo?.metaTitle || ''}
                      onChange={(e) =>
                        setSettingsState({
                          ...settings,
                          seo: { ...settings.seo, metaTitle: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Meta Description</label>
                    <textarea
                      rows={3}
                      value={settings.seo?.metaDescription || ''}
                      onChange={(e) =>
                        setSettingsState({
                          ...settings,
                          seo: { ...settings.seo, metaDescription: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Keywords</label>
                    <input
                      type="text"
                      value={settings.seo?.keywords || ''}
                      onChange={(e) =>
                        setSettingsState({
                          ...settings,
                          seo: { ...settings.seo, keywords: e.target.value },
                        })
                      }
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>

                {/* Demo Mode Toggle */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">Demo Mode Status</div>
                    <div className="text-xs text-slate-500">
                      When enabled, disclaimers clarify that reviews are sample representations.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSettingsState({ ...settings, isDemoMode: !settings.isDemoMode })}
                    className={`px-4 py-2 rounded-xl text-xs font-bold ${
                      settings.isDemoMode
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {settings.isDemoMode ? 'Demo Mode: ON' : 'Production Mode'}
                  </button>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => {
                      updateSettings(settings);
                      showToast('Website settings saved successfully!');
                    }}
                    className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800"
                  >
                    Save All Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ======================================================= */}
          {/* TAB 10: SECURITY, PASSWORD CHANGE & PROFILE             */}
          {/* ======================================================= */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div>
                <h1 className="text-2xl font-black text-slate-900">Security & Credentials</h1>
                <p className="text-xs text-slate-500">
                  Update admin profile and change password with PBKDF2 cryptographic hashing.
                </p>
              </div>

              {/* Profile Card */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">Admin Profile</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Administrator Name</label>
                    <input
                      type="text"
                      value={adminUser.name}
                      onChange={(e) => setAdminUserState({ ...adminUser, name: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Administrator Email</label>
                    <input
                      type="email"
                      value={adminUser.email}
                      onChange={(e) => setAdminUserState({ ...adminUser, email: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                </div>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      updateAdminProfile(adminUser.name, adminUser.email);
                      showToast('Profile updated successfully.');
                    }}
                    className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg"
                  >
                    Save Profile
                  </button>
                </div>
              </div>

              {/* Section 29: Password Change */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
                <h3 className="font-extrabold text-base text-slate-900">Change Admin Password</h3>
                <p className="text-xs text-slate-500">
                  Passwords are encrypted with 100,000 iterations of PBKDF2/SHA-256 and unique cryptographic salt.
                </p>

                {pwdMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs font-medium ${
                      pwdMessage.error
                        ? 'bg-red-50 text-red-700 border border-red-200'
                        : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    }`}
                  >
                    {pwdMessage.text}
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4 text-xs max-w-md">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Current Password *</label>
                    <input
                      type="password"
                      required
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">New Password *</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="At least 8 chars, uppercase, lowercase & number"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Confirm New Password *</label>
                    <input
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repeat new password"
                      className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow"
                  >
                    Update & Hash New Password
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ======================================================= */}
      {/* MODAL: LEAD DETAILS & NOTES                             */}
      {/* ======================================================= */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-black text-lg text-slate-900">{selectedLead.name}</h3>
                <div className="text-xs text-slate-500">Ref: {selectedLead.id}</div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-1 text-slate-400 hover:text-slate-800">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl">
              <div>
                <strong className="block text-slate-500">Phone:</strong>
                <a href={`tel:${selectedLead.phone}`} className="font-bold text-amber-700">
                  {selectedLead.phone}
                </a>
              </div>
              <div>
                <strong className="block text-slate-500">Email:</strong>
                <span>{selectedLead.email || 'None provided'}</span>
              </div>
              <div>
                <strong className="block text-slate-500">Service:</strong>
                <span className="font-bold">{selectedLead.service}</span>
              </div>
              <div>
                <strong className="block text-slate-500">Status:</strong>
                <span className="font-bold text-slate-900">{selectedLead.status}</span>
              </div>
            </div>

            <div className="text-xs space-y-1">
              <strong className="block text-slate-700">Message / Request:</strong>
              <div className="p-3 bg-white border border-slate-200 rounded-xl text-slate-700">
                {selectedLead.message}
              </div>
            </div>

            {/* Notes Section */}
            <div className="space-y-2 pt-2 border-t">
              <div className="font-bold text-xs text-slate-900">Internal Follow-Up Notes:</div>
              <div className="space-y-1.5 max-h-32 overflow-y-auto">
                {selectedLead.notes.length === 0 ? (
                  <div className="text-[11px] text-slate-400 italic">No notes added yet.</div>
                ) : (
                  selectedLead.notes.map((note) => (
                    <div key={note.id} className="p-2 bg-slate-50 rounded-lg text-[11px] border">
                      <div className="text-slate-400 text-[10px]">{note.date} by {note.author}</div>
                      <div className="text-slate-800 font-medium">{note.text}</div>
                    </div>
                  ))
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <input
                  type="text"
                  placeholder="Add note (e.g. called customer, left quote)..."
                  value={newNoteText}
                  onChange={(e) => setNewNoteText(e.target.value)}
                  className="flex-1 px-3 py-1.5 border rounded-lg text-xs"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (newNoteText.trim()) {
                      const updated = addLeadNote(selectedLead.id, newNoteText);
                      if (updated) setSelectedLead({ ...updated });
                      setNewNoteText('');
                      reloadData();
                    }
                  }}
                  className="px-3 py-1.5 bg-slate-900 text-white font-bold text-xs rounded-lg"
                >
                  Add
                </button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* MODAL: ESTIMATE DETAILS & BID                           */}
      {/* ======================================================= */}
      {selectedEstimate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="relative w-full max-w-xl bg-white rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-black text-lg text-slate-900">{selectedEstimate.name}</h3>
                <div className="text-xs text-slate-500">
                  {selectedEstimate.propertyType} Estimate · Ref: {selectedEstimate.id}
                </div>
              </div>
              <button onClick={() => setSelectedEstimate(null)} className="p-1 text-slate-400 hover:text-slate-800">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl">
              <div>
                <strong className="block text-slate-500">Address:</strong>
                <span>{selectedEstimate.address}, {selectedEstimate.city} TX {selectedEstimate.zip}</span>
              </div>
              <div>
                <strong className="block text-slate-500">Contact:</strong>
                <span>{selectedEstimate.phone} ({selectedEstimate.contactMethod})</span>
              </div>
              <div>
                <strong className="block text-slate-500">Service:</strong>
                <span className="font-bold text-slate-900">{selectedEstimate.serviceNeeded}</span>
              </div>
              <div>
                <strong className="block text-slate-500">Target Inspection Date:</strong>
                <span className="font-mono">{selectedEstimate.preferredDate}</span>
              </div>
            </div>

            {/* Uploaded Customer Photos */}
            {selectedEstimate.photos && selectedEstimate.photos.length > 0 && (
              <div className="space-y-2">
                <strong className="block text-xs text-slate-700">Uploaded Customer Photos:</strong>
                <div className="grid grid-cols-3 gap-2">
                  {selectedEstimate.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo}
                      alt="Customer upload"
                      className="w-full aspect-square object-cover rounded-xl border border-slate-200"
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Bid Amount & Internal Notes */}
            <div className="space-y-3 pt-2 border-t">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={selectedEstimate.status}
                    onChange={(e) => {
                      const updated = updateEstimate(selectedEstimate.id, { status: e.target.value as any });
                      if (updated) setSelectedEstimate({ ...updated });
                      reloadData();
                    }}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option value="New">New</option>
                    <option value="Inspection Scheduled">Inspection Scheduled</option>
                    <option value="Estimate Sent">Estimate Sent</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Estimate Amount ($)</label>
                  <input
                    type="number"
                    value={selectedEstimate.estimateAmount || ''}
                    onChange={(e) => {
                      const amount = Number(e.target.value);
                      const updated = updateEstimate(selectedEstimate.id, { estimateAmount: amount });
                      if (updated) setSelectedEstimate({ ...updated });
                      reloadData();
                    }}
                    placeholder="e.g. 12500"
                    className="w-full px-3 py-2 border rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Internal Notes & Scope</label>
                <textarea
                  rows={3}
                  value={selectedEstimate.internalNotes || ''}
                  onChange={(e) => {
                    const updated = updateEstimate(selectedEstimate.id, { internalNotes: e.target.value });
                    if (updated) setSelectedEstimate({ ...updated });
                    reloadData();
                  }}
                  placeholder="Plywood condition, pitch, shingle type recommendations..."
                  className="w-full px-3 py-2 border rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedEstimate(null)}
                className="px-5 py-2 bg-slate-900 text-white font-bold text-xs rounded-lg"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* MODAL: EDIT / ADD SERVICE                               */}
      {/* ======================================================= */}
      {editingService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-xs">
            <h3 className="font-black text-lg text-slate-900">Edit Roofing Service</h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Service Name</label>
              <input
                type="text"
                value={editingService.name}
                onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">URL Slug</label>
              <input
                type="text"
                value={editingService.slug}
                onChange={(e) => setEditingService({ ...editingService, slug: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Price Range Text</label>
              <input
                type="text"
                value={editingService.priceRange}
                onChange={(e) => setEditingService({ ...editingService, priceRange: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Short Description</label>
              <textarea
                rows={2}
                value={editingService.shortDesc}
                onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Detailed Description</label>
              <textarea
                rows={4}
                value={editingService.fullDesc}
                onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="activeSvc"
                checked={editingService.active}
                onChange={(e) => setEditingService({ ...editingService, active: e.target.checked })}
              />
              <label htmlFor="activeSvc" className="font-bold text-slate-700">Service Active on Website</label>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingService(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  saveService(editingService);
                  setEditingService(null);
                  reloadData();
                }}
                className="px-5 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg"
              >
                Save Service
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* MODAL: EDIT / ADD GALLERY PROJECT                       */}
      {/* ======================================================= */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-xs">
            <h3 className="font-black text-lg text-slate-900">Edit Project Showcase</h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Project Title</label>
              <input
                type="text"
                value={editingProject.title}
                onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editingProject.location}
                  onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={editingProject.category}
                  onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="Roof Repair">Roof Repair</option>
                  <option value="Roof Replacement">Roof Replacement</option>
                  <option value="Shingle Roofing">Shingle Roofing</option>
                  <option value="Metal Roofing">Metal Roofing</option>
                  <option value="Storm Damage">Storm Damage</option>
                  <option value="Commercial Roofing">Commercial Roofing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Completion Date</label>
              <input
                type="text"
                value={editingProject.completionDate}
                onChange={(e) => setEditingProject({ ...editingProject, completionDate: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Project Description</label>
              <textarea
                rows={3}
                value={editingProject.description}
                onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  saveProject(editingProject);
                  setEditingProject(null);
                  reloadData();
                }}
                className="px-5 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg"
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* MODAL: EDIT / ADD FAQ                                   */}
      {/* ======================================================= */}
      {editingFaq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-xs">
            <h3 className="font-black text-lg text-slate-900">Edit FAQ Question</h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Question</label>
              <input
                type="text"
                value={editingFaq.question}
                onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category</label>
                <input
                  type="text"
                  value={editingFaq.category}
                  onChange={(e) => setEditingFaq({ ...editingFaq, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Sort Order</label>
                <input
                  type="number"
                  value={editingFaq.order}
                  onChange={(e) => setEditingFaq({ ...editingFaq, order: Number(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Answer</label>
              <textarea
                rows={4}
                value={editingFaq.answer}
                onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingFaq(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  saveFAQ(editingFaq);
                  setEditingFaq(null);
                  reloadData();
                }}
                className="px-5 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg"
              >
                Save FAQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================= */}
      {/* MODAL: EDIT / ADD SERVICE AREA                          */}
      {/* ======================================================= */}
      {editingArea && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto text-xs">
            <h3 className="font-black text-lg text-slate-900">Edit Service Area</h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">City Name</label>
              <input
                type="text"
                value={editingArea.name}
                onChange={(e) => setEditingArea({ ...editingArea, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">URL Slug</label>
              <input
                type="text"
                value={editingArea.slug}
                onChange={(e) => setEditingArea({ ...editingArea, slug: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Local SEO Headline</label>
              <input
                type="text"
                value={editingArea.headline}
                onChange={(e) => setEditingArea({ ...editingArea, headline: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Local Description</label>
              <textarea
                rows={3}
                value={editingArea.description}
                onChange={(e) => setEditingArea({ ...editingArea, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">ZIP Codes (comma-separated)</label>
              <input
                type="text"
                value={editingArea.zipCodes.join(', ')}
                onChange={(e) =>
                  setEditingArea({
                    ...editingArea,
                    zipCodes: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                  })
                }
                className="w-full px-3 py-2 border rounded-lg font-mono"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditingArea(null)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  saveServiceArea(editingArea);
                  setEditingArea(null);
                  reloadData();
                }}
                className="px-5 py-2 bg-amber-500 text-slate-950 font-bold rounded-lg"
              >
                Save Area
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
