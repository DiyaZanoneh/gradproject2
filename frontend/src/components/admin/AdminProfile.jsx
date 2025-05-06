import { useState } from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import CompanySetup from "./CompanySetup";
import CompanyCreate from "./CompanyCreate";
import PostJob from "./PostJob";
import Applicants from "./Applicants"; // NEW
import AdminJobs from "./AdminJobs";   // NEW
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs';
import { useSelector } from 'react-redux';
import { Avatar, AvatarImage } from '../ui/avatar';

const AdminProfile = () => {
    const [activeTab, setActiveTab] = useState("setup");

    const renderComponent = () => {
        switch (activeTab) {
            case "setup":
                return <CompanySetup />;
            case "create":
                return <CompanyCreate />;
            case "post":
                return <PostJob />;
            case "applicants":
                return <Applicants />;
            case "adminJobs":
                return <AdminJobs />;
            default:
                return null;
        }
    };

    useGetAppliedJobs();
    const { user } = useSelector((store) => store.auth);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Profile Header */}
            <div className="relative bg-blue-600 h-48">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500 opacity-60"></div>
                <div className="absolute bottom-0 left-8 pb-4">
                    <div className="flex items-center gap-6">
                        <Avatar className="h-32 w-32 ring-4 ring-white">
                            <AvatarImage
                                src={user?.profile?.profilePhoto}
                                alt="profile"
                            />
                        </Avatar>
                        <div className="text-white">
                            <h1 className="text-4xl font-semibold">{user?.fullname}</h1>
                            <p className="text-lg mt-2">{user?.profile?.bio}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tab Menu */}
            <div className="bg-gray-100 border-b border-gray-200 py-3 px-4 flex justify-center gap-4 flex-wrap">
                {[
                    { key: "setup", label: "Setup Company" },
                    { key: "create", label: "Create Company" },
                    { key: "post", label: "Post Job" },
                    { key: "applicants", label: "Applicants" },
                    { key: "adminJobs", label: "AdminJobs" },
                ].map(({ key, label }) => (
                    <button
                        key={key}
                        className={`px-4 py-2 rounded ${activeTab === key
                            ? "bg-blue-600 text-white"
                            : "bg-white text-gray-700 border"
                            }`}
                        onClick={() => setActiveTab(key)}
                    >
                        {label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div className="flex-grow p-6 bg-gray-50">{renderComponent()}</div>

            <Footer />
        </div>
    );
};

export default AdminProfile;
