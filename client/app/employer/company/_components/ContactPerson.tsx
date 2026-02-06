import { EnvelopeIcon, PhoneIcon, UserCircleIcon } from "@heroicons/react/24/outline";

interface ContactPersonProps {
    name: string;
    designation: string;
    email: string;
    mobile: string;
}

export default function ContactPerson({ name, designation, email, mobile }: ContactPersonProps) {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Person</h2>
            <div className="flex items-start gap-4">
                <div className="h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <UserCircleIcon className="h-7 w-7 text-indigo-600" />
                </div>
                <div className="flex-1 space-y-3">
                    <div>
                        <h3 className="text-base font-medium text-gray-900">{name}</h3>
                        <p className="text-sm text-indigo-600 font-medium">{designation}</p>
                    </div>
                    
                    <div className="space-y-2 pt-2 border-t border-gray-50">
                        <div className="flex items-center text-sm text-gray-600">
                            <EnvelopeIcon className="h-4 w-4 mr-2.5 text-gray-400" />
                            {email}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <PhoneIcon className="h-4 w-4 mr-2.5 text-gray-400" />
                            {mobile}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
