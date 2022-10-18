import { getUser } from "~/session.server";
import { redirect, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";

export async function loader({ request }: LoaderArgs) {
    const user = await getUser(request);

    if( !user ) return redirect("/admin/login?redirectTo=/admin");

    if( !user.admin ) return redirect("/reports");

    return json({});

}

export default function Index() {  
    return (
        <main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
            <div className="relative sm:pb-16 sm:pt-8">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                        <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                            <h1 className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8">
                                Admin Painel
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}