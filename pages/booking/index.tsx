import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function BookingForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authorized, setAuthorized] = useState(false);

  // Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.replace("/login");
    } else {
      setAuthorized(true);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("access_token");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bookings/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      alert("Booking confirmed!");
    } catch (error) {
      console.error(error);
      setError("Failed to submit booking.");
    } finally {
      setLoading(false);
    }
  };

  if (!authorized) return <p>Redirecting to login...</p>;

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-semibold">Booking Form</h2>

      {Object.keys(formData).map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.replace(/([A-Z])/g, " $1")}
          value={formData[field as keyof typeof formData]}
          onChange={handleChange}
          required
          className="w-full border px-2 py-1 rounded"
        />
      ))}

      <button type="submit" disabled={loading} className="bg-blue-600 text-white px-4 py-2 rounded">
        {loading ? "Processing..." : "Confirm & Pay"}
      </button>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
