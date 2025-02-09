'use client'

import { useState } from "react";
import UserMediaControl from "../_components/UserMediaControl";
export default function InterviewPage() {
    // Mock questions
    const questions = [
        "What is your greatest strength?",
        "Tell me about a time you faced a challenge at work.",
        "Why do you want to work at our company?",
        "Describe your experience with team projects.",
        "How do you handle tight deadlines?",
        "What are your career goals for the next five years?",
    ];

    // State to track the current question index
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Handler to jump to a specific question
    const jumpToQuestion = (index: number) => {
        setCurrentQuestion(index);
    };

    return (
        <main className="grid grid-cols-2 gap-5 bg-zinc-900 text-black">
            <div className="flex flex-col items-center space-y-6 p-6">
                {/* Question Navigation */}
                <div className="flex flex-wrap gap-2">
                    {questions.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => jumpToQuestion(index)}
                            className={`px-4 py-2 rounded-lg border ${currentQuestion === index
                                ? "bg-blue-500 text-white"
                                : "bg-gray-200 hover:bg-gray-300"
                                }`}
                        >
                            Q{index + 1}
                        </button>
                    ))}
                </div>

                {/* Display Current Question */}
                <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-4">
                        Question {currentQuestion + 1}
                    </h2>
                    <p className="text-gray-700">{questions[currentQuestion]}</p>
                </div>
            </div>
            <UserMediaControl />
        </main>
    );
};

