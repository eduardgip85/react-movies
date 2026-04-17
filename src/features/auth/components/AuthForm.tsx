import { useState, type FormEvent } from "react";

type AuthFormProps = {
    title: string;
    buttonText: string;
    onSubmit: (email: string, password: string) => Promise<void>;
    footer?: React.ReactNode;
};

export default function AuthForm({
    title,
    buttonText,
    onSubmit,
    footer,
}: AuthFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await onSubmit(email, password);
    }

    return (
        <div className="mx-auto max-w-md rounded-2xl border border-white/10 bg-white/5 p-6">
        <h1 className="mb-6 text-3xl font-bold">{title}</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email" className="mb-2 block text-sm text-gray-300">
                Email
            </label>
            <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none"
            />
            </div>

            <div>
            <label htmlFor="password" className="mb-2 block text-sm text-gray-300">
                Password
            </label>
            <input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-black/30 px-4 py-3 outline-none"
            />
            </div>

            <button
            type="submit"
            className="rounded-lg bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-500"
            >
            {buttonText}
            </button>
        </form>

        {footer && <div className="mt-4 text-sm text-gray-400">{footer}</div>}
        </div>
    );
}