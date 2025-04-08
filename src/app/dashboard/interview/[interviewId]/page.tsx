'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import UserMediaControl from '../_components/UserMediaControl';
import { Lightbulb } from 'lucide-react';

type Interview = {
    id: string;
    role: string;
    description: string;
    experience: string;
};

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const interviewId = searchParams.get('interviewId');
    const [interview, setInterview] = useState<Interview | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        async function fetchInterview() {
            setLoading(true);
            try {
                const response = await axios.get(`/api/interviews/${interviewId}`);
                if (!response.data) throw new Error('Interview not found');
                if (response.data && response.status === 200) {
                    setInterview(response.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
        fetchInterview();
    }, [interviewId]);





    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <main className="p-5 max-w-7xl mx-auto ">
            <h1 className="text-3xl font-bold mb-6">Interview Details</h1>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 '>
                <div className='flex flex-col justify-between rounded-lg shadow-sm bg-white p-5'>
                    <div className="flex flex-col gap-y-4">
                        <p><strong>Role:</strong>   {interview?.role || 'Backend Developer'}</p>
                        <p><strong>Description:</strong> {interview?.description || 'Nodejs, Database'}</p>
                        <p><strong>Experience:</strong> {interview?.experience || '1-2 years'}</p>
                    </div>

                    <div className="bg-yellow-100 text-yellow-800 border border-yellow-800 p-4 rounded-lg flex items-center">
                        <Lightbulb className="" />
                        <span>Follow the instructions carefully to complete the interview. Ensure your webcam and microphone are enabled for recording your answers.</span>
                    </div>

                </div>

                <div className="flex flex-col gap-y-5">
                    <UserMediaControl />
                    <Button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => router.push(`/dashboard/interview/${interviewId}/start-interview`)}
                    >
                        Start Interview
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default Page;