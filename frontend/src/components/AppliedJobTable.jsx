import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const statusStyles = {
    rejected: 'bg-red-100 text-red-600 border border-red-300',
    pending: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
    accepted: 'bg-green-100 text-green-600 border border-green-300'
}

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job)

    return (
        <div className="bg-white shadow-md rounded-2xl p-6">
            <Table>
                <TableCaption className="text-sm text-gray-500 py-2">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="text-gray-700 font-semibold">Date</TableHead>
                        <TableHead className="text-gray-700 font-semibold">Job Role</TableHead>
                        <TableHead className="text-gray-700 font-semibold">Company</TableHead>
                        <TableHead className="text-gray-700 font-semibold text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allAppliedJobs.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan="4" className="text-center py-4 text-gray-500">
                                You have not applied to any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => {
                            const status = appliedJob?.status || 'pending'
                            return (
                                <TableRow
                                    key={appliedJob._id}
                                    className="hover:bg-gray-50 transition-all duration-150"
                                >
                                    <TableCell>{appliedJob?.createdAt?.split("T")[0]}</TableCell>
                                    <TableCell>{appliedJob.job?.title}</TableCell>
                                    <TableCell>{appliedJob.job?.company?.name}</TableCell>
                                    <TableCell className="text-right">
                                        <Badge className={`${statusStyles[status] || statusStyles.pending} px-3 py-1 rounded-full text-sm`}>
                                            {status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable
