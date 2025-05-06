import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className='p-6 rounded-lg bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300'>
            <div className='flex items-center justify-between mb-4'>
                <p className='text-sm text-gray-500'>
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="ghost" className="rounded-full p-2" size="icon">
                    <Bookmark className="w-4 h-4 text-gray-500 hover:text-[#7209b7]" />
                </Button>
            </div>

            <div className='flex items-center gap-3 mb-5'>
                <Avatar className="w-12 h-12 border border-gray-200">
                    <AvatarImage src={job?.company?.logo} />
                </Avatar>
                <div>
                    <h1 className='font-medium text-lg text-gray-900'>{job?.company?.name}</h1>
                    <p className='text-sm text-gray-500'>{job?.location || 'Jordan'}</p>
                </div>
            </div>

            <div className='mb-5'>
                <h1 className='font-bold text-xl mb-2 text-gray-900'>{job?.title}</h1>
                <p className='text-sm text-gray-600 line-clamp-3'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap items-center gap-2 mb-6'>
                <Badge className={'text-blue-700 bg-blue-50 font-medium px-3 py-1'}>
                    {job?.position} Positions
                </Badge>
                <Badge className={'text-[#F83002] bg-red-50 font-medium px-3 py-1'}>
                    {job?.jobType}
                </Badge>
                <Badge className={'text-[#7209b7] bg-purple-50 font-medium px-3 py-1'}>
                    {job?.salary}LPA
                </Badge>
            </div>

            <Button
                onClick={() => navigate(`/description/${job?._id}`)}
                className="w-full bg-[#7209b7] hover:bg-[#5e078f] text-white py-2"
            >
                View Details
            </Button>
        </div>
    )
}

export default Job