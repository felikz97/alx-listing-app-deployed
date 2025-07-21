import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function CreateProperty() {
    const router = useRouter();
    const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    location: "",
    image: null,
    });

    const [error, setError] = useState<string | null>(null);

    // 🔐 Redirect if not logged in
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
        router.push("/login");
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, image: e.target.files?.[0] || null }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
        const token = localStorage.getItem("access_token");
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value) payload.append(key, value as string | Blob);
        });

        await axios.post(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/properties/`,
            payload,
            {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            }
        );

        alert("Property created!");
        router.push("/");
        } catch (err: any) {
        console.error(err);
        setError("Failed to create property.");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Add New Property</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <input name="name" placeholder="Property name" required onChange={handleChange} className="w-full border p-2" />
            <textarea name="description" placeholder="Description" required onChange={handleChange} className="w-full border p-2" />
            <input type="number" name="price" placeholder="Price" required onChange={handleChange} className="w-full border p-2" />
            <input name="location" placeholder="Location" required onChange={handleChange} className="w-full border p-2" />
            <input type="file" name="image" accept="image/*" onChange={handleImageChange} />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
            {error && <p className="text-red-600">{error}</p>}
        </form>
        </div>
    );
}
