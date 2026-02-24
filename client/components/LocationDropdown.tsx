"use client"

import React, { useEffect, useState, useMemo } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Location {
    id: string;
    name: string;   // Area
    city?: string;  // District
    state?: string; // Division
    country: string;
}

interface LocationDropdownProps {
    value?: string;
    onChange: (value: string, locationObject?: Location) => void;
    error?: string;
}

export default function LocationDropdown({ value, onChange, error }: LocationDropdownProps) {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    // Internal state for cascading dropdowns
    const [selectedDivision, setSelectedDivision] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");

    // Fetch locations on mount
    useEffect(() => {
        const fetchLocations = async () => {
            try {
                // Use env variable or fallback to hosted backend
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://job-board-backend-iota.vercel.app";
                const res = await fetch(`${apiUrl}/api/locations`);

                if (!res.ok) {
                    throw new Error(`Failed to fetch: ${res.statusText}`);
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    setLocations(data);
                } else {
                    console.error("API returned weird data:", data);
                    setLocations([]);
                }
            } catch (err) {
                console.error("Location fetch error:", err);
                setFetchError("Could not load locations. Please try refreshing.");
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    // Sync internal state when external value changes (e.g. edit mode or initial load)
    useEffect(() => {
        if (value && locations.length > 0) {
            const loc = locations.find(l => l.id === value);
            if (loc) {
                if (loc.state) setSelectedDivision(loc.state);
                if (loc.city) setSelectedDistrict(loc.city);
            }
        }
    }, [value, locations]);

    // Derived lists for dropdowns
    const divisions = useMemo(() => {
        const uniqueDivisions = new Set(locations.map(l => l.state).filter(Boolean));
        return Array.from(uniqueDivisions).sort();
    }, [locations]);

    const districts = useMemo(() => {
        if (!selectedDivision) return [];
        const uniqueDistricts = new Set(
            locations
                .filter(l => l.state === selectedDivision)
                .map(l => l.city)
                .filter(Boolean)
        );
        return Array.from(uniqueDistricts).sort();
    }, [locations, selectedDivision]);

    const areas = useMemo(() => {
        if (!selectedDivision || !selectedDistrict) return [];
        return locations
            .filter(l => l.state === selectedDivision && l.city === selectedDistrict)
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [locations, selectedDivision, selectedDistrict]);

    // Handlers
    const handleDivisionChange = (div: string) => {
        setSelectedDivision(div);
        setSelectedDistrict(""); // Reset district
        onChange("", undefined); // Reset final value
    };

    const handleDistrictChange = (dist: string) => {
        setSelectedDistrict(dist);
        onChange("", undefined); // Reset final value
    };

    const handleAreaChange = (areaId: string) => {
        const loc = locations.find(l => l.id === areaId);
        onChange(areaId, loc);
    };

    if (loading) {
        return <div className="text-sm text-gray-500 animate-pulse">Loading locations...</div>;
    }

    if (fetchError) {
        return <div className="text-sm text-red-500">{fetchError}</div>;
    }

    if (locations.length === 0) {
        return <div className="text-sm text-yellow-600">No locations available. Please contact admin.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Division Select */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Division</label>
                <Select value={selectedDivision} onValueChange={handleDivisionChange}>
                    <SelectTrigger className="w-full rounded-none h-11 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500">
                        <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                        {divisions.map((div) => (
                            <SelectItem key={div as string} value={div as string}>
                                {div}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* District Select */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">District</label>
                <Select
                    value={selectedDistrict}
                    onValueChange={handleDistrictChange}
                    disabled={!selectedDivision}
                >
                    <SelectTrigger className="w-full rounded-none h-11 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100">
                        <SelectValue placeholder="Select District" />
                    </SelectTrigger>
                    <SelectContent>
                        {districts.map((dist) => (
                            <SelectItem key={dist as string} value={dist as string}>
                                {dist}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Area Select (Final Value) */}
            <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Area</label>
                <Select
                    value={value || ""}
                    onValueChange={handleAreaChange}
                    disabled={!selectedDistrict}
                >
                    <SelectTrigger className={`w-full rounded-none h-11 ${error ? "border-red-500" : "border-gray-300"} focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100`}>
                        <SelectValue placeholder="Select Area" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                        {areas.length === 0 && (
                            <div className="p-2 text-sm text-gray-500 text-center">No areas found</div>
                        )}
                        {areas.map((loc) => (
                            <SelectItem key={loc.id} value={loc.id}>
                                {loc.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
            </div>
        </div>
    );
}
