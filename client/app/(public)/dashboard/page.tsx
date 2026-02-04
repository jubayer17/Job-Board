import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getUserApplications } from "@/lib/services/application";
import DashboardClient from "./dashboard-client";

export default async function DashboardPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user || !session?.user?.id) {
        redirect("/auth/sign-in");
    }

    const applications = await getUserApplications(session.user.id);

    return <DashboardClient applications={applications} />;
}
