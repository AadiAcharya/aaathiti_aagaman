import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";
import { adminAPI, messageAPI } from "../../services/api";
import { formatNPR } from "../../utils/currency";
import {
  ShieldCheck,
  Users,
  Building2,
  Calendar,
  DollarSign,
  Search,
  UserCheck,
  UserX,
  Ban,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Flag,
  CheckCircle,
  XCircle,
  Send,
} from "lucide-react";

const LIMIT = 10;

export default function AdminDashboard() {
  const { theme } = useTheme();
  const { user: currentAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState("users");

  const [stats, setStats] = useState(null);

  // Users tab state
  const [users, setUsers] = useState([]);
  const [usersTotal, setUsersTotal] = useState(0);
  const [usersPage, setUsersPage] = useState(1);
  const [roleFilter, setRoleFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [usersLoading, setUsersLoading] = useState(true);
  const [actioningId, setActioningId] = useState(null);

  // Bookings tab state
  const [bookings, setBookings] = useState([]);
  const [bookingsTotal, setBookingsTotal] = useState(0);
  const [bookingsPage, setBookingsPage] = useState(1);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  // Reports tab state
  const [reports, setReports] = useState([]);
  const [reportsTotal, setReportsTotal] = useState(0);
  const [reportsPage, setReportsPage] = useState(1);
  const [reportStatusFilter, setReportStatusFilter] = useState("open");
  const [reportsLoading, setReportsLoading] = useState(true);
  const [reportActioningId, setReportActioningId] = useState(null);
  const [replyDrafts, setReplyDrafts] = useState({});
  const [replySendingId, setReplySendingId] = useState(null);
  const [replySentId, setReplySentId] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    adminAPI.getStats().then((res) => setStats(res.stats)).catch(() => {});
  }, []);

  const fetchUsers = useCallback(async () => {
    try {
      setUsersLoading(true);
      const params = { page: usersPage, limit: LIMIT };
      if (roleFilter !== "all") params.role = roleFilter;
      if (search.trim()) params.search = search.trim();
      const res = await adminAPI.getUsers(params);
      setUsers(res.users);
      setUsersTotal(res.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setUsersLoading(false);
    }
  }, [usersPage, roleFilter, search]);

  useEffect(() => {
    if (activeTab === "users") fetchUsers();
  }, [activeTab, fetchUsers]);

  useEffect(() => {
    if (activeTab !== "bookings") return;
    const fetchBookings = async () => {
      try {
        setBookingsLoading(true);
        const res = await adminAPI.getBookings({ page: bookingsPage, limit: LIMIT });
        setBookings(res.bookings);
        setBookingsTotal(res.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setBookingsLoading(false);
      }
    };
    fetchBookings();
  }, [activeTab, bookingsPage]);

  useEffect(() => {
    if (activeTab !== "reports") return;
    const fetchReports = async () => {
      try {
        setReportsLoading(true);
        const params = { page: reportsPage, limit: LIMIT };
        if (reportStatusFilter !== "all") params.status = reportStatusFilter;
        const res = await adminAPI.getReports(params);
        setReports(res.reports);
        setReportsTotal(res.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setReportsLoading(false);
      }
    };
    fetchReports();
  }, [activeTab, reportsPage, reportStatusFilter]);

  const runReportAction = async (id, status) => {
    try {
      setReportActioningId(id);
      setError("");
      const res = await adminAPI.updateReport(id, { status });
      setReports((prev) =>
        reportStatusFilter === "all"
          ? prev.map((r) => (r._id === id ? res.report : r))
          : prev.filter((r) => r._id !== id),
      );
      if (reportStatusFilter !== "all") setReportsTotal((t) => t - 1);
    } catch (err) {
      setError(err.message || "Action failed");
    } finally {
      setReportActioningId(null);
    }
  };

  const sendReportReply = async (report) => {
    const content = (replyDrafts[report._id] || "").trim();
    if (!content || !report.reporter?._id) return;
    try {
      setReplySendingId(report._id);
      setError("");
      await messageAPI.send({ recipientId: report.reporter._id, content });
      setReplyDrafts((prev) => ({ ...prev, [report._id]: "" }));
      setReplySentId(report._id);
      setTimeout(() => setReplySentId((id) => (id === report._id ? null : id)), 3000);
    } catch (err) {
      setError(err.message || "Failed to send reply");
    } finally {
      setReplySendingId(null);
    }
  };

  const runAction = async (id, body, confirmMsg) => {
    if (confirmMsg && !window.confirm(confirmMsg)) return;
    try {
      setActioningId(id);
      setError("");
      if (body === "DELETE") {
        await adminAPI.deleteUser(id);
        setUsers((prev) => prev.filter((u) => u._id !== id));
        setUsersTotal((t) => t - 1);
      } else {
        const res = await adminAPI.updateUser(id, body);
        setUsers((prev) => prev.map((u) => (u._id === id ? res.user : u)));
      }
    } catch (err) {
      setError(err.message || "Action failed");
    } finally {
      setActioningId(null);
    }
  };

  const RoleBadge = ({ role }) => (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
        role === "admin"
          ? "bg-purple-100 text-purple-700"
          : role === "host"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-700"
      }`}
    >
      {role}
    </span>
  );

  const usersPages = Math.max(1, Math.ceil(usersTotal / LIMIT));
  const bookingsPages = Math.max(1, Math.ceil(bookingsTotal / LIMIT));
  const reportsPages = Math.max(1, Math.ceil(reportsTotal / LIMIT));

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-slate-900 text-slate-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative rounded-2xl overflow-hidden p-12 border ${
              theme === "dark"
                ? "bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/20"
                : "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-200"
            }`}
          >
            <h1 className="font-bold text-4xl md:text-5xl mb-3">
              <span className="inline-flex items-center gap-3">
                <ShieldCheck className="w-10 h-10 md:w-12 md:h-12 text-purple-500" />
                Admin Panel
              </span>
            </h1>
            <p className={theme === "dark" ? "text-slate-300" : "text-gray-700"}>
              Manage users, hosts, and bookings across the platform.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      {stats && (
        <section className="px-6 md:px-12 -mt-4 mb-8">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Users, label: "Total Users", value: stats.totalUsers },
              { icon: Building2, label: "Total Rooms", value: stats.totalRooms },
              { icon: Calendar, label: "Total Bookings", value: stats.totalBookings },
              { icon: DollarSign, label: "Total Revenue", value: formatNPR(stats.totalRevenue) },
            ].map((s) => (
              <div
                key={s.label}
                className={`rounded-xl p-5 border ${
                  theme === "dark"
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <s.icon className="w-6 h-6 text-purple-500 mb-2" />
                <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                  {s.label}
                </p>
                <p className="text-xl font-bold">{s.value}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-6 md:px-12 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Tabs */}
          <div
            className={`flex gap-2 mb-6 ${theme === "dark" ? "border-b border-slate-700" : "border-b"}`}
          >
            {["users", "bookings", "reports"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-6 font-semibold capitalize transition ${
                  activeTab === tab
                    ? theme === "dark"
                      ? "text-purple-400 border-b-2 border-purple-400"
                      : "text-purple-600 border-b-2 border-purple-600"
                    : theme === "dark"
                      ? "text-slate-400 hover:text-white"
                      : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error}
            </div>
          )}

          {activeTab === "users" && (
            <div
              className={`rounded-2xl border overflow-hidden ${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
              }`}
            >
              {/* Filters */}
              <div className="p-4 flex flex-wrap gap-3 border-b border-slate-700/20">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setUsersPage(1);
                    }}
                    placeholder="Search by name or email..."
                    className={`w-full pl-9 pr-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                      theme === "dark"
                        ? "bg-slate-900 border-slate-700 text-slate-100"
                        : "bg-gray-50 border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
                <select
                  value={roleFilter}
                  onChange={(e) => {
                    setRoleFilter(e.target.value);
                    setUsersPage(1);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                    theme === "dark"
                      ? "bg-slate-900 border-slate-700 text-slate-100"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="all">All Roles</option>
                  <option value="user">Users</option>
                  <option value="host">Hosts</option>
                  <option value="admin">Admins</option>
                </select>
              </div>

              {usersLoading ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500" />
                </div>
              ) : users.length === 0 ? (
                <div className={`text-center py-16 ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                  No users found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={theme === "dark" ? "bg-slate-900/50" : "bg-gray-50"}>
                      <tr>
                        {["Name", "Email", "Role", "Status", "Joined", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-sm font-bold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((u) => {
                        const isSelf = u._id === currentAdmin?._id;
                        const isAdminRow = u.role === "admin";
                        const locked = isSelf || isAdminRow;
                        return (
                          <tr
                            key={u._id}
                            className={`border-t ${
                              theme === "dark" ? "border-slate-700" : "border-gray-100"
                            }`}
                          >
                            <td className="px-4 py-3 font-semibold">{u.name}</td>
                            <td
                              className={`px-4 py-3 text-sm ${
                                theme === "dark" ? "text-slate-400" : "text-gray-600"
                              }`}
                            >
                              {u.email}
                            </td>
                            <td className="px-4 py-3">
                              <RoleBadge role={u.role} />
                            </td>
                            <td className="px-4 py-3">
                              {u.isBanned ? (
                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                                  Banned
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                                  Active
                                </span>
                              )}
                            </td>
                            <td
                              className={`px-4 py-3 text-sm ${
                                theme === "dark" ? "text-slate-400" : "text-gray-600"
                              }`}
                            >
                              {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-3">
                              {locked ? (
                                <span className="text-xs text-gray-400 italic">
                                  {isSelf ? "You" : "Protected"}
                                </span>
                              ) : (
                                <div className="flex flex-wrap gap-2">
                                  {u.role === "user" && (
                                    <button
                                      onClick={() =>
                                        runAction(u._id, { role: "host" })
                                      }
                                      disabled={actioningId === u._id}
                                      title="Promote to host"
                                      className="p-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 disabled:opacity-50"
                                    >
                                      <UserCheck className="w-4 h-4" />
                                    </button>
                                  )}
                                  {u.role === "host" && (
                                    <button
                                      onClick={() =>
                                        runAction(u._id, { role: "user" })
                                      }
                                      disabled={actioningId === u._id}
                                      title="Revoke host status"
                                      className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                                    >
                                      <UserX className="w-4 h-4" />
                                    </button>
                                  )}
                                  {u.isBanned ? (
                                    <button
                                      onClick={() =>
                                        runAction(u._id, { isBanned: false, banReason: "" })
                                      }
                                      disabled={actioningId === u._id}
                                      title="Unban this account"
                                      className="p-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
                                    >
                                      <ShieldCheck className="w-4 h-4" />
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        const reason = window.prompt(
                                          "Reason for banning this account (optional):",
                                          "",
                                        );
                                        if (reason === null) return;
                                        runAction(u._id, { isBanned: true, banReason: reason });
                                      }}
                                      disabled={actioningId === u._id}
                                      title="Ban this account"
                                      className="p-1.5 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 disabled:opacity-50"
                                    >
                                      <Ban className="w-4 h-4" />
                                    </button>
                                  )}
                                  <button
                                    onClick={() =>
                                      runAction(
                                        u._id,
                                        "DELETE",
                                        `Permanently delete ${u.name}'s account? This cannot be undone.`,
                                      )
                                    }
                                    disabled={actioningId === u._id}
                                    title="Delete account"
                                    className="p-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 disabled:opacity-50"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Pagination */}
              <div className="flex items-center justify-between p-4 border-t border-slate-700/20 text-sm">
                <span className={theme === "dark" ? "text-slate-400" : "text-gray-500"}>
                  Page {usersPage} of {usersPages} · {usersTotal} users
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUsersPage((p) => Math.max(1, p - 1))}
                    disabled={usersPage <= 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setUsersPage((p) => Math.min(usersPages, p + 1))}
                    disabled={usersPage >= usersPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-40"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div
              className={`rounded-2xl border overflow-hidden ${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
              }`}
            >
              {bookingsLoading ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500" />
                </div>
              ) : bookings.length === 0 ? (
                <div className={`text-center py-16 ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                  No bookings found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className={theme === "dark" ? "bg-slate-900/50" : "bg-gray-50"}>
                      <tr>
                        {["Guest", "Room", "Check In", "Check Out", "Status", "Total"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-sm font-bold">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((b) => (
                        <tr
                          key={b._id}
                          className={`border-t ${theme === "dark" ? "border-slate-700" : "border-gray-100"}`}
                        >
                          <td className="px-4 py-3 font-semibold">{b.user?.name || "-"}</td>
                          <td className={`px-4 py-3 text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                            {b.room?.title || "-"}
                          </td>
                          <td className={`px-4 py-3 text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                            {new Date(b.checkIn).toLocaleDateString()}
                          </td>
                          <td className={`px-4 py-3 text-sm ${theme === "dark" ? "text-slate-400" : "text-gray-600"}`}>
                            {new Date(b.checkOut).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                                b.status === "confirmed"
                                  ? "bg-green-100 text-green-700"
                                  : b.status === "cancelled"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {b.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-semibold">{formatNPR(b.grandTotal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="flex items-center justify-between p-4 border-t border-slate-700/20 text-sm">
                <span className={theme === "dark" ? "text-slate-400" : "text-gray-500"}>
                  Page {bookingsPage} of {bookingsPages} · {bookingsTotal} bookings
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setBookingsPage((p) => Math.max(1, p - 1))}
                    disabled={bookingsPage <= 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setBookingsPage((p) => Math.min(bookingsPages, p + 1))}
                    disabled={bookingsPage >= bookingsPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-40"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div
              className={`rounded-2xl border overflow-hidden ${
                theme === "dark" ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
              }`}
            >
              <div className="p-4 flex flex-wrap gap-3 border-b border-slate-700/20">
                <select
                  value={reportStatusFilter}
                  onChange={(e) => {
                    setReportStatusFilter(e.target.value);
                    setReportsPage(1);
                  }}
                  className={`px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                    theme === "dark"
                      ? "bg-slate-900 border-slate-700 text-slate-100"
                      : "bg-gray-50 border-gray-300 text-gray-900"
                  }`}
                >
                  <option value="open">Open</option>
                  <option value="resolved">Resolved</option>
                  <option value="dismissed">Dismissed</option>
                  <option value="all">All</option>
                </select>
              </div>

              {reportsLoading ? (
                <div className="flex justify-center py-16">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500" />
                </div>
              ) : reports.length === 0 ? (
                <div className={`text-center py-16 ${theme === "dark" ? "text-slate-400" : "text-gray-500"}`}>
                  No reports found
                </div>
              ) : (
                <div className="divide-y divide-slate-700/20">
                  {reports.map((r) => (
                    <div key={r._id} className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Flag className="w-4 h-4 text-purple-500" />
                            <span className="font-semibold">{r.subject}</span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                                r.status === "open"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : r.status === "resolved"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {r.status}
                            </span>
                          </div>
                          <p
                            className={`text-sm mb-2 ${
                              theme === "dark" ? "text-slate-300" : "text-gray-700"
                            }`}
                          >
                            {r.message}
                          </p>
                          <p
                            className={`text-xs ${
                              theme === "dark" ? "text-slate-400" : "text-gray-500"
                            }`}
                          >
                            From {r.reporter?.name || "Unknown"} ({r.reporter?.email})
                            {r.reportedUser && ` · About ${r.reportedUser.name}`}
                            {r.room && ` · Room: ${r.room.title}`}
                            {" · "}
                            {new Date(r.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        {r.status === "open" && (
                          <div className="flex gap-2 shrink-0">
                            <button
                              onClick={() => runReportAction(r._id, "resolved")}
                              disabled={reportActioningId === r._id}
                              title="Mark resolved"
                              className="p-1.5 rounded-lg bg-green-100 text-green-700 hover:bg-green-200 disabled:opacity-50"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => runReportAction(r._id, "dismissed")}
                              disabled={reportActioningId === r._id}
                              title="Dismiss"
                              className="p-1.5 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      {/* Reply - sends a real message to the reporter, visible in their Messages inbox */}
                      <div className="mt-3 flex items-center gap-2">
                        <input
                          type="text"
                          value={replyDrafts[r._id] || ""}
                          onChange={(e) =>
                            setReplyDrafts((prev) => ({ ...prev, [r._id]: e.target.value }))
                          }
                          onKeyDown={(e) => {
                            if (e.key === "Enter") sendReportReply(r);
                          }}
                          placeholder={`Reply to ${r.reporter?.name || "reporter"}...`}
                          className={`flex-1 px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                            theme === "dark"
                              ? "bg-slate-900 border-slate-700 text-slate-100"
                              : "bg-gray-50 border-gray-300 text-gray-900"
                          }`}
                        />
                        <button
                          onClick={() => sendReportReply(r)}
                          disabled={
                            replySendingId === r._id || !(replyDrafts[r._id] || "").trim()
                          }
                          className="p-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white disabled:opacity-50 shrink-0"
                          title="Send reply"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                        {replySentId === r._id && (
                          <span className="text-xs text-green-500 font-semibold shrink-0">
                            Sent
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center justify-between p-4 border-t border-slate-700/20 text-sm">
                <span className={theme === "dark" ? "text-slate-400" : "text-gray-500"}>
                  Page {reportsPage} of {reportsPages} · {reportsTotal} reports
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setReportsPage((p) => Math.max(1, p - 1))}
                    disabled={reportsPage <= 1}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-40"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setReportsPage((p) => Math.min(reportsPages, p + 1))}
                    disabled={reportsPage >= reportsPages}
                    className="p-2 rounded-lg border border-gray-300 disabled:opacity-40"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
