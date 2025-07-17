// components/property/PropertyDetail.tsx
import React from "react";

interface PropertyDetailProps {
    property: {
        name: string;
        image: string;
        address: {
        city: string;
        state: string;
        country: string;
        };
        rating: number;
        category: string[];
        price: number;
        offers: {
        bed: string;
        shower: string;
        occupants: string;
        };
        discount?: string;
    };
}

const PropertyDetail: React.FC<{ property: PropertyDetailProps["property"] }> = ({ property }) => {
    return (
        <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
        <p className="text-gray-600 mb-4">
            {property.address.city}, {property.address.state}, {property.address.country}
        </p>

        <img
            src={property.image}
            alt={property.name}
            className="w-full h-96 object-cover rounded-lg mb-6"
        />

        <div className="space-y-2 text-gray-800">
            <p><strong>Rating:</strong> {property.rating}</p>
            <p><strong>Price per night:</strong> ${property.price}</p>
            <p><strong>Categories:</strong> {property.category.join(", ")}</p>
            <p><strong>Offers:</strong> {property.offers.bed} beds, {property.offers.shower} showers, {property.offers.occupants} guests</p>
            {property.discount && <p><strong>Discount:</strong> {property.discount}%</p>}
        </div>
        </div>
    );
    };

export default PropertyDetail;
