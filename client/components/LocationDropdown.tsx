"use client"

import React, { useEffect, useState, useMemo } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { logger } from "@/lib/logger";

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
    className?: string;
    triggerClassName?: string;
    showLabels?: boolean;
}

export default function LocationDropdown({
    value,
    onChange,
    error,
    className = "grid grid-cols-1 md:grid-cols-3 gap-4",
    triggerClassName = "w-full rounded-none h-11 border-gray-300 focus:ring-indigo-500 focus:border-indigo-500",
    showLabels = true
}: LocationDropdownProps) {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [retryCount, setRetryCount] = useState(0);

    // Internal state for cascading dropdowns
    const [selectedDivision, setSelectedDivision] = useState<string>("");
    const [selectedDistrict, setSelectedDistrict] = useState<string>("");

    // Fetch locations on mount
    useEffect(() => {
        let isMounted = true;
        let attempts = 0;
        const maxAttempts = 3;

        const fetchLocations = async () => {
            setLoading(true);
            setFetchError(null);

            while (attempts < maxAttempts) {
                try {
                    // Use env variable or fallback to localhost
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://job-board-backend-iota.vercel.app";
                    const res = await fetch(`${apiUrl}/api/locations`);

                    if (!res.ok) {
                        throw new Error(`Failed to fetch: ${res.statusText}`);
                    }

                    const data = await res.json();

                    if (isMounted) {
                        if (Array.isArray(data)) {
                            setLocations(data);
                            setFetchError(null);
                        } else {
                            logger.error("API returned weird data:", { data });
                            setLocations([]);
                            setFetchError("Invalid data received from server.");
                        }
                        setLoading(false);
                        return; // Success, exit loop
                    }
                } catch (err) {
                    attempts++;
                    logger.error(`Location fetch attempt ${attempts} failed:`, { error: err });
                    if (attempts >= maxAttempts && isMounted) {
                        setFetchError("Could not load locations. Please check your connection.");
                        setLoading(false);
                    } else {
                        // Exponential backoff: 1s, 2s, 4s...
                        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempts - 1)));
                    }
                }
            }
        };

        fetchLocations();

        return () => { isMounted = false; };
    }, [retryCount]);

    const handleRetry = () => {
        setRetryCount(prev => prev + 1);
    };

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
        return (
            <div className="flex flex-col items-start gap-2">
                <div className="text-sm text-red-500">{fetchError}</div>
                <button
                    onClick={handleRetry}
                    className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 underline"
                >
                    Retry
                </button>
            </div>
        );
    }

    if (locations.length === 0) {
        return <div className="text-sm text-yellow-600">No locations available. Please contact admin.</div>;
    }

    return (
        <div className={className}>
            {/* Division Select */}
            <div className="w-full flex-1">
                {showLabels && <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Division</label>}
                <Select value={selectedDivision} onValueChange={handleDivisionChange}>
                    <SelectTrigger className={triggerClassName}>
                        <SelectValue placeholder="Division" />
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
            <div className="w-full flex-1">
                {showLabels && <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">District</label>}
                <Select
                    value={selectedDistrict}
                    onValueChange={handleDistrictChange}
                    disabled={!selectedDivision}
                >
                    <SelectTrigger className={`${triggerClassName} ${!selectedDivision ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <SelectValue placeholder="District" />
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
            <div className="w-full flex-1">
                {showLabels && <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Area</label>}
                <Select
                    value={value || ""}
                    onValueChange={handleAreaChange}
                    disabled={!selectedDistrict}
                >
                    <SelectTrigger className={`${triggerClassName} ${error ? "border-red-500" : ""} ${!selectedDistrict ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        <SelectValue placeholder="Area" />
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
