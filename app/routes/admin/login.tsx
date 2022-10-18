
import * as React from "react";
import { json, redirect } from "@remix-run/node";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { createUserSession, getUser } from "~/session.server";
import { Form, useActionData } from "@remix-run/react";
import { verifyLogin } from "~/models/user.server";
import { safeRedirect, validateEmail } from "~/utils";

export async function loader({ request }: LoaderArgs) {
    const user = await getUser(request);

    if( user && user.admin ) return redirect('/admin');

	if( user ) return redirect('/reports');
    
    return json({});

}

export async function action({ request }: ActionArgs) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const redirectTo = safeRedirect(formData.get("redirectTo"), "/admin");
	const remember = formData.get("remember");

	if (!validateEmail(email)) {
		return json(
			{ errors: { email: "Email is invalid", password: null } },
			{ status: 400 }
		);
	}

	if (typeof password !== "string" || password.length === 0) {
		return json(
			{ errors: { email: null, password: "Password is required" } },
			{ status: 400 }
		);
	}

	if (password.length < 8) {
		return json(
			{ errors: { email: null, password: "Password is too short" } },
			{ status: 400 }
		);
	}

	const user = await verifyLogin(email, password);

	if (!user) {
		return json(
			{ errors: { email: "Invalid email or password", password: null } },
			{ status: 400 }
		);
	} else if (!user.admin) {
		return json(
			{ errors: { email: "You are not an admin", password: null } },
			{ status: 401 }
		);
	}

	return createUserSession({
		request,
		userId: user.id,
		remember: remember === "on" ? true : false,
		redirectTo,
	});
}

export default function Index() {
	const actionData = useActionData<typeof action>();
	const emailRef = React.useRef<HTMLInputElement>(null);
	const passwordRef = React.useRef<HTMLInputElement>(null);

	React.useEffect(() => {
		if( actionData?.errors?.email ) {
			emailRef.current?.focus();
		} else if( actionData?.errors?.password ) {
			passwordRef.current?.focus();
		}
	}, [actionData]);

	return (
		<main className="relative min-h-screen bg-white sm:flex sm:items-center sm:justify-center">
			<div className="absolute inset-0 bg-gray-900 bg-opacity-75"></div>
			<div className="relative z-10 w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-xl sm:max-w-xl">
				<h1 className="text-2xl font-semibold text-center text-gray-700">Admin Login</h1>
				<Form method="post" className="mt-4">
					<div className="flex flex-col mt-4">
						<label className="text-sm font-semibold text-gray-600">Email</label>
						<InputText
							name="email"
							type="email"
							placeholder="Email"
							className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-200 border border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
						/>
						{actionData?.errors?.email && (
							<span className="text-sm text-red-600">{actionData.errors.email}</span>
						)}
					</div>
					<div className="flex flex-col mt-4">
						<label className="flex justify-between text-sm font-semibold text-gray-600">
							Password
						</label>
						<InputText
							name="password"
							type="password"
							placeholder="Password"
							className="w-full px-4 py-3 mt-2 text-gray-700 bg-gray-200 border border-gray-200 rounded-lg focus:border-blue-500 focus:bg-white focus:outline-none"
						/>
						{actionData?.errors?.password && (
							<span className="text-sm text-red-600">{actionData.errors.password}</span>
						)}
					</div>
					<div className="flex items-center mt-6">
						<input
							type="checkbox"
							name="remember"
							id="remember"
							className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
						/>
						<label htmlFor="remember" className="ml-2 text-sm text-gray-600">
							Remember Me
						</label>
					</div>
					<div className="flex items-center mt-6">
						<Button
							type="submit"
							label="Login"
							className="px-4 py-2 w-full text-white bg-blue-500 rounded hover:bg-blue-600"
						/>
					</div>
				</Form>
			</div>
		</main>
	);
}