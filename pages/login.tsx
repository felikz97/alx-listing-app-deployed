import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function LoginPage() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/token/`, credentials);
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        router.push("/booking"); // redirect after login
        } catch (err) {
        setError("Invalid username or password");
        }
    };

    return (
        <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold">Login</h2>
        <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
        />
        <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
        />
        <button type="submit">Login</button>
        {error && <p className="text-red-500">{error}</p>}
        </form>
    );
    }
