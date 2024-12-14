'use client'

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { PlayIcon, PlusIcon, XIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';



export default function InterView() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',            // User's name
    email: '',           // User's email
    experience: '',      // Years of experience
    jobDescription: '',  // Job description
    role: '',            // User's role
    languages: '',       // List of selected programming languages
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Submitted:', formData);
    setIsOpen(false); // Close the dialog after submitting the form
  };

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const [inProgress, setInProgress] = useState<{ [key: string]: boolean }>({}); // Track progress per card

  const handleStart = (topic: string) => {
    setInProgress((prevState) => ({ ...prevState, [topic]: true }));

    // Simulate a delay to represent starting the preparation (e.g., API call)
    setTimeout(() => {
      router.push('/dashboard/section/interview/start-interview')
      setInProgress((prevState) => ({ ...prevState, [topic]: false }));
    }, 3000); // 3 seconds to simulate progress
  };

  const topics = [
    { id: 1, name: 'JavaScript Interview Questions' },
    { id: 2, name: 'ReactJS Basics' },
    { id: 3, name: 'Node.js Fundamentals' },
    { id: 4, name: 'System Design' },
    { id: 5, name: 'Data Structures and Algorithms' },
  ];
  return (
    <main className=''>
      <div className='w-full flex items-center justify-center text-5xl font-mono py-5'>
        <h3>Mock Interview</h3>
      </div>
      <div className="p-4">
        {/* CARD TO FILL INTERVIEW PROCESS */}
        <div className='grid grid-cols-3 gap-12'>
          <Card
            onClick={openDialog}
            className="cursor-pointer p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex items-center space-x-4 hover:bg-zinc-800"
          >
            <PlusIcon className="w-6 h-6 text-white" />
            <span className="text-white font-semibold">Add jobs cretria</span>
          </Card>
          {topics.map((topic) => (
            <Card
              key={topic.id}
              className="cursor-pointer p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-y-4 items-center space-x-4"
            >
              <div className=' flex items-center gap-x-3'>
                {inProgress[topic.name] ? (
                  <div className="w-6 h-6 animate-spin border-4 border-t-4 border-blue-500 border-solid rounded-full" /> // Loading spinner
                ) : (
                  <PlayIcon className="w-6 h-6 text-white" />
                )}
                <span className="text-white font-semibold">{topic.name}</span>
              </div>
              <Button
                // onClick={() => handleStart(topic.name)}
                onClick={() => handleStart(topic.name)}
                className="ml-auto"
              >
                {inProgress[topic.name] ? 'In Progress' : 'Start'}
              </Button>
            </Card>
          ))}
        </div>

        {/* FORM SECTION */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30 z-50" />

          <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
            <DialogClose onClick={closeDialog} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              <XIcon className="w-6 h-6" />
            </DialogClose>

            <h2 className="text-xl font-semibold text-center mb-4">Fill Out the Form</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Email */}
              <div>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Experience */}
              <div>
                <Input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  placeholder="Enter your years of experience"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Job Description */}
              <div>
                <textarea
                  name="jobDescription"
                  value={formData.jobDescription}
                  onChange={handleChange}
                  placeholder="Write a brief job description"
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Role */}
              <div>
                <Input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Enter your role"
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>

              {/* Languages */}
              <div>
                <select
                  name="languages"
                  value={formData.languages}
                  onChange={handleChange}
                  multiple
                  className="w-full px-4 py-2 border rounded-lg"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="csharp">C#</option>
                  <option value="ruby">Ruby</option>
                </select>
                <p className="text-sm text-gray-500 mt-1">Hold CTRL (or CMD on Mac) to select multiple languages.</p>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Submit
                </Button>
              </div>
            </form>

          </DialogContent>
        </Dialog>


      </div>
    </main>
  );
};
