// SurveyComponent.js

import React, { useState, useEffect } from 'react';

const SurveyComponent = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        position: '',
        relevantExperience: '',
        portfolioUrl: '',
        managementExperience: '',
        additionalSkills: {
            JavaScript: false,
            CSS: false,
            Python: false,
        },
        interviewTime: ''
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        validateForm();
    }, [formData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFormData({
                ...formData,
                additionalSkills: {
                    ...formData.additionalSkills,
                    [name]: checked,
                },
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.fullName) newErrors.fullName = 'Full Name is required';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Valid Email is required';
        if (!formData.phoneNumber || isNaN(formData.phoneNumber)) newErrors.phoneNumber = 'Valid Phone Number is required';
        if ((formData.position === 'Developer' || formData.position === 'Designer') && (!formData.relevantExperience || isNaN(formData.relevantExperience) || formData.relevantExperience <= 0)) {
            newErrors.relevantExperience = 'Relevant Experience is required and must be greater than 0';
        }
        if (formData.position === 'Designer' && (!formData.portfolioUrl || !/^https?:\/\/.*\..*/.test(formData.portfolioUrl))) {
            newErrors.portfolioUrl = 'Valid Portfolio URL is required';
        }
        if (formData.position === 'Manager' && !formData.managementExperience) {
            newErrors.managementExperience = 'Management Experience is required';
        }
        if (!Object.values(formData.additionalSkills).includes(true)) {
            newErrors.additionalSkills = 'At least one additional skill must be selected';
        }
        if (!formData.interviewTime) {
            newErrors.interviewTime = 'Preferred Interview Time is required';
        }
        setErrors(newErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateForm();
        if (Object.keys(errors).length === 0) {
            alert(JSON.stringify(formData, null, 2));
        }
    };

    return (
        <div className='mt-4 p-3'>
            <form className="max-w-lg mx-auto p-4 border  text-white border-gray-300 rounded-lg" onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-100">Full Name:</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 mt-2 border bg-gray-900 border-gray-100 text-gray-100 rounded" />
                {errors.fullName && <p className="text-red-500">{errors.fullName}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-100">Email:</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 mt-2 border bg-gray-900 border-gray-100 text-gray-100 rounded" />
                {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-100">Phone Number:</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 mt-2 bg-gray-900 border border-gray-100 text-gray-100 rounded" />
                {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-100">Applying for Position:</label>
                <select name="position" value={formData.position} onChange={handleChange} className="w-full p-2 border border-gray-100 mt-2 bg-gray-900 text-gray-100 rounded">
                    <option value="">Select</option>
                    <option value="Developer">Developer</option>
                    <option value="Designer">Designer</option>
                    <option value="Manager">Manager</option>
                </select>
            </div>
            {(formData.position === 'Developer' || formData.position === 'Designer') && (
                <div className="mb-4">
                    <label className="block text-gray-100">Relevant Experience (years):</label>
                    <input type="text" name="relevantExperience" value={formData.relevantExperience} onChange={handleChange} className="w-full mt-2 bg-gray-900 p-2 border border-gray-100 text-gray-100 rounded" />
                    {errors.relevantExperience && <p className="text-red-500">{errors.relevantExperience}</p>}
                </div>
            )}
            {formData.position === 'Designer' && (
                <div className="mb-4">
                    <label className="block text-gray-100">Portfolio URL:</label>
                    <input type="text" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} className="w-full p-2 border mt-2 bg-gray-900 border-gray-100 text-gray-100 rounded" />
                    {errors.portfolioUrl && <p className="text-red-500">{errors.portfolioUrl}</p>}
                </div>
            )}
            {formData.position === 'Manager' && (
                <div className="mb-4">
                    <label className="block text-gray-100">Management Experience:</label>
                    <textarea name="managementExperience" value={formData.managementExperience} onChange={handleChange} className="w-full p-2 border m-2 bg-gray-900 border-gray-100 text-gray-100 rounded" />
                    {errors.managementExperience && <p className="text-red-500">{errors.managementExperience}</p>}
                </div>
            )}
            <div className="mb-4">
                <label className="block text-gray-100">Additional Skills:</label>
                <div className="flex flex-wrap gap-2">
                    <label className="flex items-center">
                        <input type="checkbox" name="JavaScript" checked={formData.additionalSkills.JavaScript} onChange={handleChange} className="mr-2" />
                        JavaScript
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" name="CSS" checked={formData.additionalSkills.CSS} onChange={handleChange} className="mr-2" />
                        CSS
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" name="Python" checked={formData.additionalSkills.Python} onChange={handleChange} className="mr-2" />
                        Python
                    </label>
                </div>
                {errors.additionalSkills && <p className="text-red-500">{errors.additionalSkills}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-100">Preferred Interview Time:</label>
                <input type="datetime-local" name="interviewTime" value={formData.interviewTime} onChange={handleChange} className="w-full p-2 mt-2 bg-gray-900 border-gray-100 text-gray-100 rounded" />
                {errors.interviewTime && <p className="text-red-500">{errors.interviewTime}</p>}
            </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700">Submit</button>
        </form>
        </div>
    );
};

export default SurveyComponent;
