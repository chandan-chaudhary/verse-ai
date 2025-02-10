'use client'

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogOverlay } from '@/components/ui/dialog';
import { PlayIcon, PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const formDataSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  experience: z.string().nonempty({ message: "Experience is required" }),
  jobDescription: z.string().nonempty({ message: "Job description is required" }),
  role: z.string().nonempty({ message: "Role is required" }),
  language: z.string().nonempty({ message: "Language is required" }),
});

export default function InterviewPage() {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      name: "",
      email: "",
      experience: "",
      jobDescription: "",
      role: "",
      language: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formDataSchema>) => {
    console.log(values);
    
    setLoading(true);
    try {
      const response = await axios.post('/api/interview-prep', values);
      if (!response) throw new Error('Failed to submit the form');
      if (response.status === 200 && response.data) {
        console.log(response.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setIsOpen(false); // Close the dialog after submitting the form
    }
  };

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);

  const [inProgress, setInProgress] = useState<{ [key: string]: boolean }>({}); // Track progress per card

  const topics = [
    { id: 1, name: 'JavaScript', level: 'Easy', description: 'JavaScript is a versatile language used for web development. Preparing for a JavaScript interview can help you understand the fundamentals of programming and web technologies.' },
    { id: 2, name: 'Python', level: 'Easy', description: 'Python is a popular language for data science and web development. An interview in Python can help you grasp basic programming concepts and problem-solving skills.' },
    { id: 3, name: 'Java', level: 'Medium', description: 'Java is widely used in enterprise environments. Preparing for a Java interview can enhance your understanding of object-oriented programming and large-scale system design.' },
    { id: 4, name: 'C#', level: 'Medium', description: 'C# is commonly used for developing Windows applications. An interview in C# can help you learn about .NET framework and software development principles.' },
    { id: 5, name: 'Ruby', level: 'Medium', description: 'Ruby is known for its simplicity and productivity. Preparing for a Ruby interview can improve your skills in web development and scripting.' },
    { id: 6, name: 'TypeScript', level: 'Medium', description: 'TypeScript is a superset of JavaScript that adds static types. An interview in TypeScript can help you write more robust and maintainable code.' },
    { id: 7, name: 'Go', level: 'Hard', description: 'Go is a statically typed language designed for system programming. Preparing for a Go interview can enhance your understanding of concurrency and performance optimization.' },
    { id: 8, name: 'Rust', level: 'Hard', description: 'Rust is known for its memory safety and performance. An interview in Rust can help you learn about systems programming and safe concurrency.' },
    { id: 9, name: 'Kotlin', level: 'Medium', description: 'Kotlin is used for Android development and is fully interoperable with Java. Preparing for a Kotlin interview can improve your mobile development skills.' },
    { id: 10, name: 'Swift', level: 'Medium', description: 'Swift is the language for iOS and macOS development. An interview in Swift can help you learn about mobile app development and Apple’s ecosystem.' },
    { id: 11, name: 'PHP', level: 'Easy', description: 'PHP is widely used for server-side web development. Preparing for a PHP interview can help you understand web server scripting and backend development.' },
    { id: 12, name: 'Scala', level: 'Hard', description: 'Scala combines object-oriented and functional programming. An interview in Scala can help you learn about scalable and concurrent applications.' },
    { id: 13, name: 'Elixir', level: 'Hard', description: 'Elixir is known for its concurrency and fault tolerance. Preparing for an Elixir interview can enhance your skills in building scalable and maintainable applications.' },
    { id: 14, name: 'Next.js', level: 'Medium', description: 'Next.js is a React framework for server-side rendering. An interview in Next.js can help you learn about modern web development and performance optimization.' },
    { id: 15, name: 'NestJS', level: 'Medium', description: 'NestJS is a framework for building scalable server-side applications. Preparing for a NestJS interview can improve your skills in backend development and TypeScript.' },
    { id: 16, name: 'GraphQL', level: 'Medium', description: 'GraphQL is a query language for APIs. An interview in GraphQL can help you learn about efficient data fetching and API design.' },
    { id: 17, name: 'Docker', level: 'Medium', description: 'Docker is a platform for containerizing applications. Preparing for a Docker interview can enhance your understanding of containerization and DevOps practices.' },
    { id: 18, name: 'Kubernetes', level: 'Hard', description: 'Kubernetes is an orchestration platform for containerized applications. An interview in Kubernetes can help you learn about managing and scaling applications in production.' },
    { id: 19, name: 'Terraform', level: 'Hard', description: 'Terraform is an infrastructure as code tool. Preparing for a Terraform interview can improve your skills in automating infrastructure provisioning and management.' },
    { id: 20, name: 'AWS', level: 'Hard', description: 'AWS is a comprehensive cloud computing platform. An interview in AWS can help you learn about cloud services, architecture, and best practices.' },
  ];


  const handleStart = (topic: string) => {
    setInProgress((prevState) => ({ ...prevState, [topic]: true }));
    router.push(`/dashboard/interview/start-interview?topic=${topic}`);
  };

  return (
    <main className='w-full'>
      <div className='w-full flex items-center justify-center text-5xl font-mono py-5'>
        <h3>Mock Interview</h3>
      </div>
      <div className='grid grid-cols-3 gap-12 w-full'>
        <Card
          onClick={openDialog}
          className="cursor-pointer p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex items-center space-x-4"
        >
          <PlusIcon className="w-6 h-6" />
          <span className=" font-semibold">Add jobs cretria</span>
        </Card>
        {
          topics.map((topic) => (
            <Card
              key={topic.id}
              className="cursor-pointer p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col gap-y-4"
            >
              <div className='flex justify-between items-center w-full'>
                <div className='flex items-center gap-x-3'>
                  {inProgress[topic.name] ? (
                    <div className="w-6 h-6 animate-spin border-4 border-t-4 border-blue-500 border-solid rounded-full" /> // Loading spinner
                  ) : (
                    <PlayIcon className="w-6 h-6" />
                  )}
                  <span className="font-semibold">{topic.name}</span>
                </div>
                <span className={`text-sm px-2 rounded-full font-bold border-2 ${topic.level === 'Easy' ? 'bg-green-100 text-green-500  border-green-500' : topic.level === 'Medium' ? 'bg-yellow-100 text-yellow-500  border-yellow-500' : 'bg-red-100 text-red-500  border-red-500'}`}>
                  {topic.level}
                </span>
              </div>
              <p className="text-gray-700">{topic.description}</p>
              <Button
                onClick={() => handleStart(topic.name)}
                className="ml-auto"
              >
                {inProgress[topic.name] ? 'In Progress' : 'Start'}
              </Button>
            </Card>
          ))
        }
      </div>
      <div className="container mx-auto p-4">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogOverlay className="fixed inset-0 bg-black bg-opacity-30 z-50" />
          <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
            <DialogClose onClick={closeDialog} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
              {/* <XIcon className="w-6 h-6" /> */}
            </DialogClose>

            <h2 className="text-xl font-semibold text-center mb-4">Fill Out the Form</h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Role */}
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your role" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Experience */}
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your years of experience" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Language */}
                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Language</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={(value: string) => field.onChange(value)}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a language" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="javascript">JavaScript</SelectItem>
                            <SelectItem value="python">Python</SelectItem>
                            <SelectItem value="java">Java</SelectItem>
                            <SelectItem value="csharp">C#</SelectItem>
                            <SelectItem value="ruby">Ruby</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Job Description */}
                <FormField
                  control={form.control}
                  name="jobDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Write a brief job description" rows={4} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="text-center">
                  <Button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                    {loading ? 'Preparing for interview' : 'Submit'}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
