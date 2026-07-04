import {
  Home,
  Grid,
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  Monitor,
  RotateCw,
  Share,
  Plus,
  Copy,
  Compass,
  Layers,
  ListTodo,
  Sparkles,
} from "lucide-react";

// Static preview of the host dashboard — used only as hero decoration on the
// homepage, not wired to real data.
const STATS = [
  { label: "Active Listings", value: "18", hint: "Properties live" },
  { label: "Cities Covered", value: "9", hint: "Across Nepal" },
  { label: "Pending", value: "5", hint: "Awaiting confirmation" },
  { label: "Monthly Reach", value: "24.8K", hint: "Profile views" },
];

const TYPES = [
  { label: "Single Rooms", count: "7 listed" },
  { label: "Double Rooms", count: "6 listed" },
  { label: "Suites", count: "5 listed" },
];

const BOOKINGS = [
  { guest: "Sita Rai", room: "Sunrise Suite, Pokhara", date: "Jul 12", status: "Confirmed" },
  { guest: "Amit Gurung", room: "Lakeview Double", date: "Jul 14", status: "Confirmed" },
  { guest: "Priya Shrestha", room: "Thamel Studio", date: "Jul 15", status: "Pending" },
  { guest: "Karan Thapa", room: "Hillside Cottage", date: "Jul 18", status: "Confirmed" },
  { guest: "Nisha Koirala", room: "Riverside Room", date: "Jul 20", status: "Pending" },
];

const STATUS_COLOR = {
  Confirmed: "#28c840",
  Pending: "#febc2e",
};

export default function DashboardMockup() {
  return (
    <div className="rounded-t-2xl overflow-hidden bg-[#1a1a1c] shadow-[0_-20px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 text-left">
      {/* Title bar */}
      <div className="flex items-center gap-3 bg-[#242427] border-b border-white/5 px-4 py-2.5">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
          <span className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
        </div>
        <PanelLeft className="w-3.5 h-3.5 text-white/40 shrink-0" />
        <ChevronLeft className="w-3.5 h-3.5 text-white/25 shrink-0" />
        <ChevronRight className="w-3.5 h-3.5 text-white/25 shrink-0" />
        <div className="flex-1 flex items-center justify-center gap-1.5 bg-[#1a1a1c] rounded-md px-6 py-1 text-[10px] text-white/60">
          <Monitor className="w-3 h-3" />
          aatithiaagaman.app/host
        </div>
        <RotateCw className="w-3.5 h-3.5 text-white/40 shrink-0" />
        <Share className="w-3.5 h-3.5 text-white/40 shrink-0" />
        <Plus className="w-3.5 h-3.5 text-white/40 shrink-0" />
        <Copy className="w-3.5 h-3.5 text-white/40 shrink-0" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-[22%] border-r border-white/5 bg-[#1e1e21] px-3 py-3.5">
          <div className="flex items-center justify-between mb-4">
            <Home className="w-4 h-4 text-white/70" />
            <Grid className="w-3.5 h-3.5 text-white/30" />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-4 h-4 rounded bg-primary flex items-center justify-center text-[8px] font-bold text-white">
              AA
            </span>
            <span className="text-[10px] text-white/80">Aatithi Aagaman</span>
          </div>
          <div className="space-y-2 mb-5">
            {[
              { icon: Compass, label: "Explore" },
              { icon: Layers, label: "Listings" },
              { icon: ListTodo, label: "Bookings" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-[10px] text-white/60">
                <Icon className="w-3.5 h-3.5" />
                {label}
              </div>
            ))}
          </div>
          <p className="text-[9px] uppercase tracking-wider text-white/25 mb-2">
            Recent
          </p>
          <div className="space-y-1.5">
            {["Sunrise Suite", "Lakeview Double", "Thamel Studio"].map((r) => (
              <div key={r} className="flex items-center gap-1.5 text-[9px] text-white/50">
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: "rgba(40,200,64,0.7)" }}
                />
                {r}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-sm">
                AA
              </div>
              <div>
                <p className="text-sm font-medium text-white">Aatithi Aagaman</p>
                <p className="text-[10px] text-white/45">Host Dashboard</p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/80">
              <Sparkles className="w-3 h-3" />
              Add Property
            </button>
          </div>

          <div className="grid grid-cols-4 divide-x divide-white/5 rounded-xl bg-white/[0.03] ring-1 ring-white/5 mb-4">
            {STATS.map((s) => (
              <div key={s.label} className="px-3 py-3">
                <p className="text-xl font-medium text-white">{s.value}</p>
                <p className="text-[8px] tracking-wider text-white/35 uppercase mt-1">
                  {s.label}
                </p>
                <p className="text-[9px] text-white/30">{s.hint}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-4">
            {TYPES.map((t) => (
              <div
                key={t.label}
                className="rounded-lg bg-white/[0.03] ring-1 ring-white/5 px-3 py-2.5"
              >
                <p className="text-[11px] text-white/80">{t.label}</p>
                <p className="text-[9px] text-white/40 mt-0.5">{t.count}</p>
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-white/[0.03] ring-1 ring-white/5 overflow-hidden">
            <div className="grid grid-cols-4 gap-2 px-3 py-2 text-[8px] uppercase tracking-wider text-white/30 border-b border-white/5">
              <span>Guest</span>
              <span>Room</span>
              <span>Date</span>
              <span>Status</span>
            </div>
            {BOOKINGS.map((b) => (
              <div
                key={b.guest}
                className="grid grid-cols-4 gap-2 px-3 py-2 text-[10px] text-white/70 border-b border-white/5 last:border-b-0"
              >
                <span className="truncate">{b.guest}</span>
                <span className="truncate text-white/50">{b.room}</span>
                <span className="text-white/50">{b.date}</span>
                <span style={{ color: STATUS_COLOR[b.status] }}>{b.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
