"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BD_DIVISIONS, Division, District, Upazila } from "@/lib/data/bd-locations";
import {
    ArrowLeftIcon,
    CheckIcon,
    MapPinIcon,
    BuildingOffice2Icon,
    MapPinIcon as SubLocationIcon,
} from "@heroicons/react/24/outline";

type Level = 1 | 2 | 3;

type SelectedLocation = {
    division: string;
    district: string;
    upazila: string;
};

type Props = {
    value?: SelectedLocation | null;
    onChange?: (value: SelectedLocation | null) => void;
};

const PRIMARY = "#2c3e50";
const PRIMARY_HOVER = "#34495e";

export const BangladeshLocationSelector = React.memo(function BangladeshLocationSelector({
    value,
    onChange,
}: Props) {
    const [level, setLevel] = useState<Level>(1);
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [districts, setDistricts] = useState<District[]>([]);
    const [upazilas, setUpazilas] = useState<Upazila[]>([]);

    const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<District | null>(null);
    const [selectedUpazila, setSelectedUpazila] = useState<Upazila | null>(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        const loadDivisions = async () => {
            setLoading(true);
            setError(null);
            try {
                await new Promise((resolve) => setTimeout(resolve, 200));
                if (!isMounted) return;
                setDivisions(BD_DIVISIONS);
            } catch {
                if (!isMounted) return;
                setError("Failed to load divisions");
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        loadDivisions();
        return () => {
            isMounted = false;
        };
    }, []);

    const breadcrumb = useMemo(() => {
        const parts = [];
        if (selectedDivision) parts.push(selectedDivision.name);
        if (selectedDistrict) parts.push(selectedDistrict.name);
        if (selectedUpazila) parts.push(selectedUpazila.name);
        return parts.join(" / ");
    }, [selectedDivision, selectedDistrict, selectedUpazila]);

    const handleSelectDivision = useCallback((division: Division) => {
        setSelectedDivision(division);
        setSelectedDistrict(null);
        setSelectedUpazila(null);
        setDistricts(division.districts);
        setUpazilas([]);
        setLevel(2);
    }, []);

    const handleSelectDistrict = useCallback((district: District) => {
        setSelectedDistrict(district);
        setSelectedUpazila(null);
        setUpazilas(district.upazilas);
        setLevel(3);
    }, []);

    const handleSelectUpazila = useCallback(
        (upazila: Upazila) => {
            setSelectedUpazila(upazila);
            const result: SelectedLocation = {
                division: selectedDivision?.name || "",
                district: selectedDistrict?.name || "",
                upazila: upazila.name,
            };
            onChange?.(result);
        },
        [onChange, selectedDivision, selectedDistrict]
    );

    const handleReset = useCallback(() => {
        setSelectedDivision(null);
        setSelectedDistrict(null);
        setSelectedUpazila(null);
        setDistricts([]);
        setUpazilas([]);
        setLevel(1);
        onChange?.(null);
    }, [onChange]);

    const goBack = useCallback(() => {
        if (level === 3) {
            setLevel(2);
            setSelectedUpazila(null);
        } else if (level === 2) {
            setLevel(1);
            setSelectedDistrict(null);
            setDistricts([]);
        }
    }, [level]);

    const renderList = () => {
        if (loading && level === 1) {
            return (
                <div className="space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="h-10 bg-gray-100 animate-pulse rounded-none" />
                    ))}
                </div>
            );
        }

        if (error) {
            return (
                <div className="p-4 bg-red-50 border border-red-100 text-sm text-red-700">
                    {error}
                </div>
            );
        }

        if (level === 1) {
            return (
                <ul role="listbox" aria-label="Divisions" className="space-y-2">
                    {divisions.map((d) => (
                        <li key={d.name}>
                            <button
                                type="button"
                                onClick={() => handleSelectDivision(d)}
                                className="group w-full flex items-center justify-between px-3 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-800 hover:bg-[#34495e] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c3e50] transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                <span className="flex items-center gap-2">
                                    <MapPinIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-100" />
                                    {d.name}
                                </span>
                                {selectedDivision?.name === d.name && (
                                    <CheckIcon className="h-5 w-5 text-emerald-500" />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            );
        }

        if (level === 2 && selectedDivision) {
            return (
                <ul role="listbox" aria-label="Districts" className="space-y-2">
                    {districts.map((dist) => (
                        <li key={dist.name}>
                            <button
                                type="button"
                                onClick={() => handleSelectDistrict(dist)}
                                className="group w-full flex items-center justify-between px-3 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-800 hover:bg-[#34495e] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c3e50] transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                <span className="flex items-center gap-2">
                                    <BuildingOffice2Icon className="h-5 w-5 text-gray-400 group-hover:text-gray-100" />
                                    {dist.name}
                                </span>
                                {selectedDistrict?.name === dist.name && (
                                    <CheckIcon className="h-5 w-5 text-emerald-500" />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            );
        }

        if (level === 3 && selectedDistrict) {
            return (
                <ul role="listbox" aria-label="Upazilas" className="space-y-2">
                    {upazilas.map((u) => (
                        <li key={u.name}>
                            <button
                                type="button"
                                onClick={() => handleSelectUpazila(u)}
                                className="group w-full flex items-center justify-between px-3 py-2 border border-gray-200 bg-white text-sm font-medium text-gray-800 hover:bg-[#34495e] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c3e50] transition-all duration-200 transform hover:scale-[1.02]"
                            >
                                <span className="flex items-center gap-2">
                                    <SubLocationIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-100" />
                                    {u.name}
                                </span>
                                {selectedUpazila?.name === u.name && (
                                    <CheckIcon className="h-5 w-5 text-emerald-500" />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            );
        }

        return null;
    };

    return (
        <div
            className="w-full max-w-xl border border-gray-200 bg-white shadow-md px-4 py-5 space-y-4"
            aria-label="Bangladesh location selector"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-500">
                        Location
                    </h2>
                    <p className="text-sm text-gray-700 mt-1">
                        Select division, district, and upazila.
                    </p>
                </div>
                {selectedDivision && (
                    <button
                        type="button"
                        onClick={handleReset}
                        className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-gray-900"
                    >
                        Reset
                    </button>
                )}
            </div>

            <div className="flex items-center justify-between text-xs font-medium text-gray-500">
                <div className="flex items-center gap-2">
                    {(level === 2 || level === 3) && (
                        <button
                            type="button"
                            onClick={goBack}
                            className="inline-flex items-center justify-center h-7 w-7 border border-gray-200 hover:bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2c3e50]"
                            aria-label="Go back"
                        >
                            <ArrowLeftIcon className="h-4 w-4" />
                        </button>
                    )}
                    <span className="uppercase tracking-[0.16em] text-gray-500">
                        {breadcrumb || "Select a division"}
                    </span>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">
                    Step {level} of 3
                </span>
            </div>

            <div className="overflow-hidden">
                {renderList()}
            </div>

            {selectedDivision && selectedDistrict && selectedUpazila && (
                <div
                    className="mt-4 border border-gray-200 bg-gray-50 px-3 py-3 flex items-center justify-between text-sm text-gray-800"
                    aria-live="polite"
                >
                    <div>
                        <div className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
                            Selected Location
                        </div>
                        <div className="font-semibold">
                            {selectedUpazila.name}, {selectedDistrict.name}, {selectedDivision.name}
                        </div>
                    </div>
                    <CheckIcon className="h-5 w-5 text-emerald-500" />
                </div>
            )}
        </div>
    );
});

export type { SelectedLocation };

