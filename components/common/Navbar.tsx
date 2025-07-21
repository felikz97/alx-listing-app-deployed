import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        router.push("/login");
    };

    return (
        <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
                <img src="/assets/logo.png" alt="Logo" className="inline-block mr-2" />ALXbnb
        </Link>

        <div className="space-x-4">
            <Link href="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            {isLoggedIn ? (
            <button onClick={handleLogout} className="text-red-500 hover:underline">
                Logout
            </button>
            ) : (
            <>
                <Link href="/login" className="text-blue-600">Sign In</Link>
                <Link href="/register" className="bg-blue-600 text-white px-4 py-1 rounded">
                Sign Up
                </Link>
            </>
            )}
            {isLoggedIn && (
            <Link href="/properties/create" className="text-green-600">
                Add Property
            </Link>
            )}
            
        </div>
        </nav>
    );
}
