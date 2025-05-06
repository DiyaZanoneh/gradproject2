import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const { singleCompany } = useSelector(store => store.company);

    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        // ✅ Basic validation
        if (!input.name || !input.description || !input.website || !input.location) {
            toast.error("Please fill all required fields");
            return;
        }

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Update failed");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (singleCompany && singleCompany._id) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                website: singleCompany.website || "",
                location: singleCompany.location || "",
                file: null // ✅ Do not pre-fill file input
            });
        }
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gray-50">
            <div className='max-w-4xl mx-auto py-10 px-4'>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                        <div className="flex items-center gap-4">
                            <Button
                                onClick={() => navigate("/admin/companies")}
                                variant="ghost"
                                size="icon"
                                className="text-gray-500 hover:bg-gray-100"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Button>
                            <h1 className='text-2xl font-bold text-gray-800'>Company Profile</h1>
                        </div>
                    </div>

                    <form onSubmit={submitHandler} className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-gray-700">Company Name</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-300 focus-visible:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-700">Website</Label>
                                <Input
                                    type="text"
                                    name="website"
                                    value={input.website}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-300 focus-visible:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-700">Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="bg-gray-50 border-gray-300 focus-visible:ring-blue-500"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-gray-700">Logo</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={changeFileHandler}
                                    className="bg-gray-50 border-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                                {/* ✅ Image Preview */}
                                {input.file && (
                                    <img
                                        src={URL.createObjectURL(input.file)}
                                        alt="Logo preview"
                                        className="h-20 w-auto mt-2 rounded border border-gray-200"
                                    />
                                )}
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <Label className="text-gray-700">Description</Label>
                                <textarea
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    rows={4}
                                    className="flex w-full rounded-md border border-gray-300 bg-gray-50 px-3 py-2 text-sm ring-offset-white placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            {loading ? (
                                <Button disabled className="w-full md:w-auto">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                                    Saving Changes...
                                </Button>
                            ) : (
                                <Button type="submit" className="w-full md:w-auto bg-blue-600 hover:bg-blue-700">
                                    Save Changes
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CompanySetup
