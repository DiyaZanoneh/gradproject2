import { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // State for full company info
    const [companyName, setCompanyName] = useState('');
    const [description, setDescription] = useState('');
    const [website, setWebsite] = useState('');
    const [location, setLocation] = useState('');
    const [logo, setLogo] = useState(null);

    const registerNewCompany = async () => {
        try {
            const formData = new FormData();
            formData.append('companyName', companyName);
            formData.append('description', description);
            formData.append('website', website);
            formData.append('location', location);
            if (logo) {
                formData.append('file', logo);
            }

            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res.data.company._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to register company.");
        }
    }

    return (
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
                <h1 className='font-bold text-2xl'>Register Your Company</h1>
                <p className='text-gray-500'>Fill out your company information. You can update this later.</p>
            </div>

            <div className='space-y-4'>
                <div>
                    <Label>Company Name</Label>
                    <Input
                        type="text"
                        placeholder="Microsoft"
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Description</Label>
                    <Input
                        type="text"
                        placeholder="We build tech for the future"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Website</Label>
                    <Input
                        type="text"
                        placeholder="https://example.com"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Location</Label>
                    <Input
                        type="text"
                        placeholder="New York, USA"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                </div>
                <div>
                    <Label>Logo</Label>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setLogo(e.target.files[0])}
                    />
                </div>

                <div className='flex items-center gap-2 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate
