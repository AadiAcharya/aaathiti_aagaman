import { useState, useEffect } from "react";
import { hostAPI } from "../../services/api";
import { formatNPR } from "../../utils/currency";
import Table from "../ui/Table";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import StatCard from "../ui/StatCard";
import Tabs from "../ui/Tabs";
import EmptyState from "../ui/EmptyState";
import { CreditCard, Download, Receipt } from "lucide-react";

const TABS = [
  { id: "completed", label: "Completed" },
  { id: "upcoming", label: "Upcoming" },
  { id: "earning", label: "Earnings" },
];

const STATUS_TONE = { completed: "success", failed: "danger", pending: "warning" };
const TYPE_LABEL = { charge: "Charge", refund: "Refund", payout: "Payout" };

export default function TransactionHistory() {
  const [activeTab, setActiveTab] = useState("completed");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const { transactions: data, total: t } = await hostAPI.getTransactions();
        setTotal(t);
        const filtered = data.filter((tx) => {
          if (activeTab === "completed") return tx.status === "completed";
          if (activeTab === "upcoming") return tx.status === "pending";
          if (activeTab === "earning") return tx.type === "payout";
          return true;
        });
        setTransactions(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, [activeTab]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleDownload = () => {
    const rows = [
      ["ID", "Description", "Amount", "Type", "Status", "Date"],
      ...transactions.map((t) => [
        t._id,
        t.description || "-",
        formatNPR(t.amount),
        t.type,
        t.status,
        formatDate(t.createdAt),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const columns = [
    {
      key: "description",
      label: "Description",
      render: (t) => (
        <div>
          <p className="font-medium text-text-primary">
            {t.description || `${TYPE_LABEL[t.type] || t.type} Payment`}
          </p>
          {t.booking && (
            <p className="text-xs text-text-muted mt-0.5">
              {t.booking.nights} nights · {new Date(t.booking.checkIn).toLocaleDateString()} →{" "}
              {new Date(t.booking.checkOut).toLocaleDateString()}
            </p>
          )}
        </div>
      ),
    },
    {
      key: "createdAt",
      label: "Date",
      render: (t) => <span className="text-text-secondary">{formatDate(t.createdAt)}</span>,
    },
    {
      key: "status",
      label: "Status",
      render: (t) => <Badge tone={STATUS_TONE[t.status] || "default"}>{t.status}</Badge>,
    },
    {
      key: "amount",
      label: "Amount",
      render: (t) => (
        <span className={`font-semibold ${t.type === "refund" ? "text-danger" : "text-success"}`}>
          {t.type === "refund" ? "-" : "+"}
          {formatNPR(t.amount)}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-text-primary flex items-center gap-2">
            <CreditCard className="w-6 h-6" /> Transaction History
          </h1>
        </div>
        <Button
          variant="secondary"
          icon={Download}
          disabled={transactions.length === 0}
          onClick={handleDownload}
        >
          Download CSV
        </Button>
      </div>

      <Tabs variant="pill" tabs={TABS} active={activeTab} onChange={setActiveTab} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Transactions" value={total} />
        <StatCard label="Shown" value={transactions.length} />
        <StatCard
          label="Total Amount"
          value={formatNPR(transactions.reduce((s, t) => s + t.amount, 0))}
        />
      </div>

      {error && <div className="text-center py-16 text-danger text-sm">{error}</div>}

      {!error && (
        <Table
          columns={columns}
          data={transactions}
          loading={loading}
          emptyState={
            <EmptyState icon={Receipt} title={`No ${activeTab} transactions`} />
          }
        />
      )}
    </div>
  );
}
