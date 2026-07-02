import { useState, useEffect } from "react";
import { hostAPI } from "../../services/api";
import { useTheme } from "../../context/ThemeContext";
import { CreditCard, Download, DollarSign, Calendar } from "lucide-react";

export default function TransactionHistory() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab]         = useState("completed");
  const [transactions, setTransactions]   = useState([]);
  const [loading, setLoading]             = useState(true);
  const [error, setError]                 = useState(null);
  const [total, setTotal]                 = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        setError(null);
        const { transactions: data, total: t } = await hostAPI.getTransactions();
        setTotal(t);

        // Filter client-side by tab
        const filtered = data.filter((tx) => {
          if (activeTab === "completed") return tx.status === "completed";
          if (activeTab === "upcoming")  return tx.status === "pending";
          if (activeTab === "earning")   return tx.type   === "payout";
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
      day: "numeric", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });

  const handleDownload = () => {
    const rows = [
      ["ID", "Description", "Amount", "Type", "Status", "Date"],
      ...transactions.map((t) => [
        t._id, t.description || "-", `$${t.amount}`, t.type, t.status,
        formatDate(t.createdAt),
      ]),
    ];
    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href = url; a.download = "transactions.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const typeColor = (type) => {
    if (type === "charge")  return "text-green-600";
    if (type === "refund")  return "text-red-500";
    if (type === "payout")  return "text-blue-500";
    return theme === "dark" ? "text-text-primary" : "text-gray-900";
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <h1
            className={`text-2xl font-bold flex items-center gap-2 ${
              theme === "dark" ? "text-text-primary" : "text-gray-900"
            }`}
          >
            <CreditCard className="w-6 h-6" /> Transaction History
          </h1>

          {/* Tabs */}
          <div className="flex gap-2 flex-wrap">
            {["completed", "upcoming", "earning"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-bold rounded-lg transition ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : theme === "dark"
                      ? "bg-bg-secondary text-text-secondary hover:text-text-primary border border-text-muted/30"
                      : "bg-gray-100 text-gray-600 hover:text-gray-900 border border-gray-200"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Download */}
        <button
          onClick={handleDownload}
          disabled={transactions.length === 0}
          className="flex items-center gap-2 px-6 py-2 text-sm font-bold text-white bg-primary hover:bg-primary-hover rounded-lg transition disabled:opacity-50"
        >
          <Download className="w-4 h-4" /> Download CSV
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Transactions", value: total },
          { label: "Shown",              value: transactions.length },
          { label: "Total Amount",       value: `$${transactions.reduce((s, t) => s + t.amount, 0).toFixed(2)}` },
        ].map((s) => (
          <div
            key={s.label}
            className={`rounded-lg p-4 border border-primary/10 text-center ${
              theme === "dark" ? "bg-bg-secondary" : "bg-gray-50"
            }`}
          >
            <p
              className={`text-sm mb-1 ${
                theme === "dark" ? "text-text-secondary" : "text-gray-600"
              }`}
            >
              {s.label}
            </p>
            <p
              className={`text-2xl font-bold ${
                theme === "dark" ? "text-text-primary" : "text-gray-900"
              }`}
            >
              {s.value}
            </p>
          </div>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
        </div>
      )}

      {/* Error */}
      {error && <div className="text-center py-16 text-red-500">{error}</div>}

      {/* Empty */}
      {!loading && !error && transactions.length === 0 && (
        <div
          className={`text-center py-16 ${
            theme === "dark" ? "text-text-secondary" : "text-gray-600"
          }`}
        >
          <CreditCard className="w-9 h-9 mx-auto mb-4" />
          <p className="text-xl">No {activeTab} transactions</p>
        </div>
      )}

      {/* Transaction Cards */}
      {!loading && !error && transactions.length > 0 && (
        <div className="flex flex-col gap-4">
          {transactions.map((tx) => (
            <div
              key={tx._id}
              className={`flex items-center justify-between p-6 border rounded-xl hover:border-primary/50 hover:shadow-lg transition ${
                theme === "dark"
                  ? "bg-bg-secondary border-text-muted/20"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3
                    className={`text-lg font-bold flex items-center gap-2 ${
                      theme === "dark" ? "text-text-primary" : "text-gray-900"
                    }`}
                  >
                    <DollarSign className="w-5 h-5" />
                    {tx.description || `${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} Payment`}
                  </h3>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                    tx.status === "completed" ? "bg-green-100 text-green-700"
                    : tx.status === "failed"  ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-700"
                  }`}>
                    {tx.status}
                  </span>
                </div>
                <p
                  className={`text-sm inline-flex items-center gap-1.5 ${
                    theme === "dark" ? "text-text-muted" : "text-gray-500"
                  }`}
                >
                  <Calendar className="w-4 h-4" /> {formatDate(tx.createdAt)}
                </p>
                {tx.booking && (
                  <p
                    className={`text-xs mt-1 ${
                      theme === "dark" ? "text-text-muted" : "text-gray-500"
                    }`}
                  >
                    Booking: {tx.booking.nights} nights · {new Date(tx.booking.checkIn).toLocaleDateString()} → {new Date(tx.booking.checkOut).toLocaleDateString()}
                  </p>
                )}
              </div>
              <div className={`text-2xl font-bold ${typeColor(tx.type)}`}>
                {tx.type === "refund" ? "-" : "+"}${tx.amount.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}