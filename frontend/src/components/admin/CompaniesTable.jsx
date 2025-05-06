import { useEffect, useState } from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filteredCompanies, setFilteredCompanies] = useState(companies);
    //const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    useEffect(() => {
        // Filter only by search text, no account-specific filtering
        const filtered = companies.filter((company) => {
            if (!searchCompanyByText) return true;
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilteredCompanies(filtered);
    }, [companies, searchCompanyByText]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCompanies?.map((company) => (
                <div
                    key={company._id}
                    className='p-6 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300'
                >
                    <div className='mb-4'>
                        <p className='text-sm text-gray-500'>
                            {daysAgoFunction(company?.createdAt) === 0 ? "Today" : `${daysAgoFunction(company?.createdAt)} days ago`}
                        </p>
                    </div>

                    <div className='flex items-center gap-3 mb-5'>
                        <Avatar className="w-12 h-12 border border-gray-200">
                            <AvatarImage src={company.logo} />
                        </Avatar>
                        <div>
                            <h1 className='font-medium text-lg text-gray-900'>{company.name}</h1>
                            <p className='text-sm text-gray-500'>{company.location || 'Location not specified'}</p>
                        </div>
                    </div>

                    <div className='mb-5'>
                        <p className='text-sm text-gray-600 line-clamp-3'>{company.description || 'No description available'}</p>
                    </div>

                    <div className='flex flex-wrap items-center gap-2 mb-6'>
                        <Badge className={'text-blue-700 bg-blue-50 font-medium px-3 py-1'}>
                            {company.website || 'No website'}
                        </Badge>
                        {company.jobPostings && (
                            <Badge className={'text-[#7209b7] bg-purple-50 font-medium px-3 py-1'}>
                                {company.jobPostings.length} Jobs
                            </Badge>
                        )}
                    </div>

                    <Button
                       
                        className="w-full bg-[#7209b7] hover:bg-[#5e078f] text-white py-2"
                    >
                        View Details
                    </Button>


                </div>
            ))}
        </div>
    )
}

export default CompaniesTable
