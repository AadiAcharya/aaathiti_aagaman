import React, { useState } from "react";
import HostReservation from "./host/HostReservation";
import MessagesPage from "./host/MessagesPage";
import NotificationsPage from "./host/NotificationsPage";
import TransactionHistory from "./host/TransactionHistory";

export default function Host() {
  const [activeTab, setActiveTab] = useState("reservation");

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-bg-secondary to-bg-secondary/70 rounded-2xl overflow-hidden p-12 border border-primary/20">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h1 className="font-bold text-6xl text-text-primary mb-3">
                🏠 Host Dashboard
              </h1>
              <p className="text-xl text-text-secondary mb-2">
                Manage your reservations, messages, notifications, and
                transactions
              </p>
              <p className="text-sm text-text-muted">
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
            <div className="bg-bg-secondary rounded-xl p-6 border border-text-muted/20 hover:border-primary/50 transition">
              <div className="text-3xl mb-2">📋</div>
              <p className="text-text-secondary text-sm">Reservations</p>
              <p className="text-2xl font-bold text-text-primary">12</p>
            </div>
            <div className="bg-bg-secondary rounded-xl p-6 border border-text-muted/20 hover:border-primary/50 transition">
              <div className="text-3xl mb-2">💬</div>
              <p className="text-text-secondary text-sm">Messages</p>
              <p className="text-2xl font-bold text-text-primary">5</p>
            </div>
            <div className="bg-bg-secondary rounded-xl p-6 border border-text-muted/20 hover:border-primary/50 transition">
              <div className="text-3xl mb-2">🔔</div>
              <p className="text-text-secondary text-sm">Notifications</p>
              <p className="text-2xl font-bold text-text-primary">3</p>
            </div>
            <div className="bg-bg-secondary rounded-xl p-6 border border-text-muted/20 hover:border-primary/50 transition">
              <div className="text-3xl mb-2">💳</div>
              <p className="text-text-secondary text-sm">Total Earnings</p>
              <p className="text-2xl font-bold text-primary">$4,250</p>
            </div>
          </div>
        </div>
      </section>

      {/* Host Dashboard Section */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex gap-2 mb-8 border-b border-bg-secondary/50 overflow-x-auto">
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
                    ? "text-primary border-b-2 border-primary bg-bg-secondary/30"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary/20"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-bg-secondary/30 rounded-2xl p-8 border border-text-muted/10 backdrop-blur-sm">
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
