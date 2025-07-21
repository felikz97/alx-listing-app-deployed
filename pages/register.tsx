import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
        await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/`, formData);
        setSuccess(true);
        router.push("/login"); // redirect to login after success
        } catch (err: any) {
        if (axios.isAxiosError(err) && err.response) {
            setError(err.response.data.detail || "Registration failed");
        } else {
            setError("An unexpected error occurred");
        }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
        <h2 className="text-xl font-semibold mb-4">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            />
            <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            />
            <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            />
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Register
            </button>
            {success && <p className="text-green-600">Registration successful! Redirecting...</p>}
            {error && <p className="text-red-600">{error}</p>}
        </form>
        </div>
    );
}
