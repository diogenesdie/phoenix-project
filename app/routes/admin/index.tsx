import { getUser } from "~/session.server";
import { redirect, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import AdminHeader from "~/components/shared/AdminHeader";

export async function loader({ request }: LoaderArgs) {
    const user = await getUser(request);

    if (!user) return redirect("/admin/login?redirectTo=/admin");

    if (!user.admin) return redirect("/reports");

    return json({});

}

export default function Index() {
    return (
        <>
        <AdminHeader />
        <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
            
        </main>
        </>
    );
}