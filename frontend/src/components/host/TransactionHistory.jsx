import { useState, useEffect } from "react";
import { hostAPI } from "../../services/api";

export default function TransactionHistory() {
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
    return "text-text-primary";
  };

  return (
    <div className="min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <h1 className="text-3xl font-bold text-text-primary">💳 Transaction History</h1>

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap">
              {["completed", "upcoming", "earning"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition ${
                    activeTab === tab
                      ? "bg-primary text-white"
                      : "bg-bg-secondary text-text-secondary hover:text-text-primary border border-text-muted/30"
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
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            📥 Download CSV
          </button>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total Transactions", value: total },
            { label: "Shown",              value: transactions.length },
            { label: "Total Amount",       value: `$${transactions.reduce((s, t) => s + t.amount, 0).toFixed(2)}` },
          ].map((s) => (
            <div key={s.label} className="bg-bg-secondary rounded-lg p-4 border border-primary/10 text-center">
              <p className="text-text-secondary text-sm mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-text-primary">{s.value}</p>
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
          <div className="text-center py-16 text-text-secondary">
            <p className="text-4xl mb-4">💳</p>
            <p className="text-xl">No {activeTab} transactions</p>
          </div>
        )}

        {/* Transaction Cards */}
        {!loading && !error && transactions.length > 0 && (
          <div className="flex flex-col gap-4">
            {transactions.map((tx) => (
              <div
                key={tx._id}
                className="flex items-center justify-between p-6 bg-bg-secondary border border-text-muted/20 rounded-xl hover:border-primary/50 hover:shadow-lg transition"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-text-primary">
                      💰 {tx.description || `${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)} Payment`}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold capitalize ${
                      tx.status === "completed" ? "bg-green-100 text-green-700"
                      : tx.status === "failed"  ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted">📅 {formatDate(tx.createdAt)}</p>
                  {tx.booking && (
                    <p className="text-xs text-text-muted mt-1">
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
      </main>
    </div>
  );
}