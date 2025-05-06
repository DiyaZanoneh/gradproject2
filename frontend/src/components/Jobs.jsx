import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import Footer from './shared/Footer'

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job)
    const [filterJobs, setFilterJobs] = useState(allJobs)

    useEffect(() => {
        if (searchedQuery) {
            const filteredJobs = allJobs.filter((job) => {
                return (
                    job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location.toLowerCase().includes(searchedQuery.toLowerCase())
                )
            })
            setFilterJobs(filteredJobs)
        } else {
            setFilterJobs(allJobs)
        }
    }, [allJobs, searchedQuery])

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <Navbar />
            
            {/* FilterCard placed below navbar */}
            <div className="max-w-7xl mx-auto mt-6 px-4 md:px-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
                    <FilterCard />
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="max-w-7xl mx-auto mt-8 px-4 md:px-8">
                {filterJobs.length <= 0 ? (
                    <div className="text-center text-lg text-gray-600 dark:text-gray-300 py-8">
                        No jobs found based on the selected filters.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
                        {filterJobs.map((job) => (
                            <motion.div
                                key={job?._id}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -50 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Job job={job} />
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    )
}

export default Jobs
