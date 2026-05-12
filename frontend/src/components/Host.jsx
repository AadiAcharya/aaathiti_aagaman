import React, { useState } from "react";
import HostReservation from "./host/HostReservation";
import MessagesPage from "./host/MessagesPage";
import NotificationsPage from "./host/NotificationsPage";
import TransactionHistory from "./host/TransactionHistory";
import { useTheme } from "../context/ThemeContext";

export default function Host() {
  const [activeTab, setActiveTab] = useState("reservation");
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900 text-slate-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Header Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div
            className={`relative rounded-2xl overflow-hidden p-12 border ${
              theme === "dark"
                ? "bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/20"
                : "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-200"
            }`}
          >
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div
                className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl ${
                  theme === "dark" ? "bg-blue-600" : "bg-blue-400"
                }`}
              ></div>
            </div>
            <div className="relative z-10">
              <h1 className="font-bold text-6xl mb-3">🏠 Host Dashboard</h1>
              <p
                className={`text-xl mb-2 ${
                  theme === "dark" ? "text-slate-300" : "text-gray-700"
                }`}
              >
                Manage your reservations, messages, notifications, and
                transactions
              </p>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-slate-400" : "text-gray-500"
                }`}
              >
                Welcome back! Everything you need to manage your hosting is
                right here
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Overview (Optional) */}
      <section className="py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              className={`rounded-xl p-6 transition ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700 hover:border-blue-500/50"
                  : "bg-white border border-gray-200 hover:border-blue-500/50"
              }`}
            >
              <div className="text-3xl mb-2">📋</div>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Reservations
              </p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div
              className={`rounded-xl p-6 transition ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700 hover:border-blue-500/50"
                  : "bg-white border border-gray-200 hover:border-blue-500/50"
              }`}
            >
              <div className="text-3xl mb-2">💬</div>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Messages
              </p>
              <p className="text-2xl font-bold">5</p>
            </div>
            <div
              className={`rounded-xl p-6 transition ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700 hover:border-blue-500/50"
                  : "bg-white border border-gray-200 hover:border-blue-500/50"
              }`}
            >
              <div className="text-3xl mb-2">🔔</div>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Notifications
              </p>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div
              className={`rounded-xl p-6 transition ${
                theme === "dark"
                  ? "bg-slate-800 border border-slate-700 hover:border-blue-500/50"
                  : "bg-white border border-gray-200 hover:border-blue-500/50"
              }`}
            >
              <div className="text-3xl mb-2">💳</div>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Total Earnings
              </p>
              <p
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-blue-400" : "text-blue-600"
                }`}
              >
                $4,250
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Host Dashboard Section */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div
            className={`flex gap-2 mb-8 overflow-x-auto ${
              theme === "dark" ? "border-b border-slate-700" : "border-b"
            }`}
          >
            {[
              { id: "reservation", label: "📋 Reservations", icon: "📋" },
              { id: "messages", label: "💬 Messages", icon: "💬" },
              { id: "notifications", label: "🔔 Notifications", icon: "🔔" },
              { id: "transactions", label: "💳 Transactions", icon: "💳" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 font-semibold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? theme === "dark"
                      ? "text-blue-400 border-b-2 border-blue-400 bg-slate-800/30"
                      : "text-blue-600 border-b-2 border-blue-600 bg-gray-100/30"
                    : theme === "dark"
                      ? "text-slate-400 hover:text-white hover:bg-slate-800/20"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div
            className={`rounded-2xl p-8 border backdrop-blur-sm ${
              theme === "dark"
                ? "bg-slate-800/30 border-slate-700"
                : "bg-white/30 border-gray-200"
            }`}
          >
            <div className="animate-fadeIn">
              {activeTab === "reservation" && <HostReservation />}
              {activeTab === "messages" && <MessagesPage />}
              {activeTab === "notifications" && <NotificationsPage />}
              {activeTab === "transactions" && <TransactionHistory />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
