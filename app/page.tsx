"use client";

import { useEffect, useState } from "react";
import { OverviewCard } from "@/components/ui/overview-card";
import { DataTable } from "@/components/ui/data-table";
import {
  Users,
  UserCheck,
  FileText,
  AlertTriangle,
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const activityColumns = [
  { key: "activity", label: "Activity" },
  { key: "user", label: "User" },
  { key: "time", label: "Time" },
  { key: "status", label: "Status" },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    activeComplaints: 0,
    yuvaMembers: 0,
    openGrievances: 0,
    volunteers: 0,
    resolutionRate: 0,
    resolutionRateTrend: 0, // <-- Add this line
    avgResponseDays: 0,
  });
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);

      // Total users
      const { count: users } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      // Active complaints (Pending)
      const { count: activeComplaints } = await supabase
        .from("complaints")
        .select("*", { count: "exact", head: true })
        .eq("status", "Pending");

      // Yuva Shakthi members
      const { count: yuvaMembers } = await supabase
        .from("yuva_shakthi_members")
        .select("*", { count: "exact", head: true });

      // Open Mahila Shakti grievances
      const { count: openGrievances } = await supabase
        .from("mahila_shakti_grievances")
        .select("*", { count: "exact", head: true })
        .eq("status", "Under Review");

      // Volunteers
      const { count: volunteers } = await supabase
        .from("volunteers")
        .select("*", { count: "exact", head: true });

      // Resolution Rate (Resolved/All)
      const { count: resolved } = await supabase
        .from("complaints")
        .select("*", { count: "exact", head: true })
        .eq("status", "Resolved");
      const { count: allComplaints } = await supabase
        .from("complaints")
        .select("*", { count: "exact", head: true });

      const resolutionRate =
        allComplaints && allComplaints > 0
          ? ((resolved || 0) / allComplaints) * 100
          : 0;

      // Avg Response Days (if you have a response_time column, otherwise skip)
      // If not present, set to 0 or remove from UI
      let avgResponseDays = 0;

      // --- Calculate Resolution Rate Trend (Month over Month) ---
      const now = new Date();
      const startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const startOfLastMonth = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        1
      );
      const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);

      // This month
      const { count: resolvedThisMonth } = await supabase
        .from("complaints")
        .select("*", { count: "exact", head: true })
        .eq("status", "Resolved")
        .gte("submitted_at", startOfThisMonth.toISOString());

      const { count: allThisMonth } = await supabase
        .from("complaints")
        .select("*", { count: "exact", head: true })
        .gte("submitted_at", startOfThisMonth.toISOString());

      const resolutionRateThisMonth =
        allThisMonth && allThisMonth > 0
          ? ((resolvedThisMonth || 0) / allThisMonth) * 100
          : 0;

      // Last month
      const { count: resolvedLastMonth } = await supabase
        .from("complaints")
        .select("*", { count: "exact", head: true })
        .eq("status", "Resolved")
        .gte("submitted_at", startOfLastMonth.toISOString())
        .lte("submitted_at", endOfLastMonth.toISOString());

      const { count: allLastMonth } = await supabase
        .from("complaints")
        .select("*", { count: "exact", head: true })
        .gte("submitted_at", startOfLastMonth.toISOString())
        .lte("submitted_at", endOfLastMonth.toISOString());

      const resolutionRateLastMonth =
        allLastMonth && allLastMonth > 0
          ? ((resolvedLastMonth || 0) / allLastMonth) * 100
          : 0;

      const resolutionRateTrend = resolutionRateLastMonth
        ? resolutionRateThisMonth - resolutionRateLastMonth
        : 0;

      setStats({
        users: users || 0,
        activeComplaints: activeComplaints || 0,
        yuvaMembers: yuvaMembers || 0,
        openGrievances: openGrievances || 0,
        volunteers: volunteers || 0,
        resolutionRate: Number(resolutionRateThisMonth.toFixed(1)),
        resolutionRateTrend: Number(resolutionRateTrend.toFixed(1)),
        avgResponseDays: avgResponseDays,
      });

      // Recent Activities: Example using latest complaints
      const fetchRecents = async () => {
        // Fetch from complaints
        const { data: complaints } = await supabase
          .from("complaints")
          .select("full_name, status, submitted_at")
          .order("submitted_at", { ascending: false })
          .limit(5);

        // Fetch from mahila_shakti_grievances
        const { data: mahila } = await supabase
          .from("mahila_shakti_grievances")
          .select("fullname, status, submitted_at")
          .order("submitted_at", { ascending: false })
          .limit(5);

        // Fetch from social_media_grievances
        const { data: social } = await supabase
          .from("social_media_grievances")
          .select("fullname, status, submitted_at")
          .order("submitted_at", { ascending: false })
          .limit(5);

        // Map all to a common structure
        const allActivities = [
          ...(complaints || []).map((item: any) => ({
            activity: "Complaint",
            user: item.full_name,
            time: item.submitted_at
              ? new Date(item.submitted_at).toLocaleString()
              : "",
            status: (
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === "Resolved"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                }`}
              >
                {item.status}
              </span>
            ),
          })),
          ...(mahila || []).map((item: any) => ({
            activity: "Mahila Shakti Grievance",
            user: item.fullname,
            time: item.submitted_at
              ? new Date(item.submitted_at).toLocaleString()
              : "",
            status: (
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === "Action Taken"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                }`}
              >
                {item.status}
              </span>
            ),
          })),
          ...(social || []).map((item: any) => ({
            activity: "Social Media Grievance",
            user: item.fullname,
            time: item.submitted_at
              ? new Date(item.submitted_at).toLocaleString()
              : "",
            status: (
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  item.status === "Action Taken"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-yellow-100 text-yellow-800 border border-yellow-200"
                }`}
              >
                {item.status}
              </span>
            ),
          })),
        ];

        // Sort all activities by time (descending)
        allActivities.sort(
          (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
        );

        // Limit to 10 most recent
        setRecentActivities(allActivities.slice(0, 10));
      };

      fetchRecents();

      setLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-8 max-w-full">
      <div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 text-lg">
          Complete control system for managing users, complaints, and analytics
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <OverviewCard
          title="Total Users"
          value={stats.users}
          description="Registered users"
          icon={Users}
          trend={{ value: 12, isPositive: true }}
          color="yellow"
        />
        <OverviewCard
          title="Active Complaints"
          value={stats.activeComplaints}
          description="Pending resolution"
          icon={FileText}
          trend={{ value: -8, isPositive: false }}
          color="orange"
        />
        <OverviewCard
          title="Yuva Shakthi Members"
          value={stats.yuvaMembers}
          description="Active members"
          icon={UserCheck}
          trend={{ value: 18, isPositive: true }}
          color="purple"
        />
        <OverviewCard
          title="Open Grievances"
          value={stats.openGrievances}
          description="Require attention"
          icon={AlertTriangle}
          trend={{ value: 5, isPositive: false }}
          color="red"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-gray-900">
                {stats.resolutionRate}%
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Resolution Rate
              </p>
              <p className="text-xs text-yellow-600 font-medium mt-1">
                ↗ +2.1% from last month
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-gray-900">
                {stats.avgResponseDays}
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Avg Response Days
              </p>
              <p className="text-xs text-orange-600 font-medium mt-1">
                ↘ -0.3 days improved
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-3xl font-bold text-gray-900">
                {stats.volunteers}
              </p>
              <p className="text-sm text-gray-600 font-medium">
                Volunteers Active
              </p>
              <p className="text-xs text-purple-600 font-medium mt-1">
                ↗ +23 new this week
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <DataTable
        title="Recent Activities"
        columns={activityColumns}
        data={recentActivities}
        searchPlaceholder="Search activities..."
      />
    </div>
  );
}
