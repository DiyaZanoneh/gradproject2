import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { ChevronDown, ChevronUp } from 'lucide-react';

const filterData = [
    {
        filterType: "Location",
        array: ["Amman", "Irbid", "Zarqa", "Aqaba", "Madaba", "Salt"]
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer",
            "Backend Developer",
            "FullStack Developer",
            "Mobile App Developer",
            "DevOps Engineer",
            "UI/UX Designer",
            "Data Analyst",
            "Machine Learning Engineer"
        ]
    },
    {
        filterType: "Salary (JOD)",
        array: ["< 500 JOD", "500 - 1000 JOD", "1000 - 1500 JOD", "1500+ JOD"]
    },
];

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [openSections, setOpenSections] = useState({});
    const dispatch = useDispatch();

    const toggleSection = (index) => {
        setOpenSections((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const changeHandler = (value) => {
        setSelectedValue(value);
    };

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue]);

    return (
        <div className="w-full px-4 py-6">
            <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">🔍 Filter Jobs</h1>
            <RadioGroup value={selectedValue} onValueChange={changeHandler} className="flex flex-wrap gap-4">
                {filterData.map((data, index) => {
                    const isOpen = openSections[index];
                    return (
                        <div
                            key={index}
                            className={`w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md transition-all duration-300 overflow-hidden ${
                                isOpen ? 'p-5' : 'p-3'
                            }`}
                        >
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleSection(index)}
                            >
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                    {data.filterType}
                                </h2>
                                {isOpen ? <ChevronUp className="text-gray-600" /> : <ChevronDown className="text-gray-600" />}
                            </div>

                            {isOpen && (
                                <div className="grid gap-3 mt-4 max-h-64 overflow-y-auto pr-1">
                                    {data.array.map((item, idx) => {
                                        const itemId = `id${index}-${idx}`;
                                        return (
                                            <div
                                                key={itemId}
                                                className="flex items-center space-x-3 p-2 rounded-lg transition-all cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
                                            >
                                                <RadioGroupItem value={item} id={itemId} />
                                                <Label
                                                    htmlFor={itemId}
                                                    className="text-gray-700 dark:text-gray-300 cursor-pointer"
                                                >
                                                    {item}
                                                </Label>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </RadioGroup>
        </div>
    );
};

export default FilterCard;
