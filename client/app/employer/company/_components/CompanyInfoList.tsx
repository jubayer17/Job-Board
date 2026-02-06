import { 
    CalendarDaysIcon, 
    IdentificationIcon, 
    MapPinIcon, 
    BriefcaseIcon 
} from "@heroicons/react/24/outline";

interface CompanyInfoListProps {
    industryType?: string;
    yearOfEstablishment?: string;
    tradeLicense?: string;
    address?: string;
}

export default function CompanyInfoList({ 
    industryType, 
    yearOfEstablishment, 
    tradeLicense, 
    address 
}: CompanyInfoListProps) {
    const items = [
        { 
            label: "Industry", 
            value: industryType, 
            icon: BriefcaseIcon 
        },
        { 
            label: "Established", 
            value: yearOfEstablishment, 
            icon: CalendarDaysIcon 
        },
        { 
            label: "Location", 
            value: address, 
            icon: MapPinIcon 
        },
        { 
            label: "Trade License", 
            value: tradeLicense, 
            icon: IdentificationIcon 
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                        <div className="p-2 bg-gray-50 rounded-md">
                            <item.icon className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{item.label}</p>
                            <p className="text-sm text-gray-900 font-medium mt-0.5">
                                {item.value || "Not specified"}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
