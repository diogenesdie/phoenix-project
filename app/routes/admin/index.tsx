import { getUser } from "~/session.server";
import { redirect, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import AdminHeader from "~/components/shared/AdminHeader";
import { useState } from "react";
import Board from "../../components/kaban/Board";

export async function loader({ request }: LoaderArgs) {
    const user = await getUser(request);

    if (!user) return redirect("/admin/login?redirectTo=/admin");

    if (!user.admin) return redirect("/reports");

    return json({});

}

export default function Index() {
    const [state, setState] = useState({
        currentTab: 0
    });

    const onChooseTab = (tab: number) => {  
        setState((prevState: any) => ({...prevState,
            currentTab: tab
        }))
    }

    return (
        <>
        <AdminHeader onChooseTab={onChooseTab} />
        <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
            <Board />
        </main>
        </>
    );
}