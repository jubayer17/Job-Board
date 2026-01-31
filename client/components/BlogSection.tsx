import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const posts = [
  {
    id: 1,
    title: 'Top 10 Skills Employers in Bangladesh are Looking For',
    href: '#',
    description:
      'Discover the most in-demand skills in the current job market and how you can acquire them to stay ahead of the competition.',
    date: 'Mar 16, 2024',
    datetime: '2024-03-16',
    category: { title: 'Career Advice', href: '#' },
    author: {
      name: 'Rahim Ahmed',
      role: 'HR Specialist',
      imageUrl:
        'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'How to Write a CV That Gets You Hired',
    href: '#',
    description:
      'Learn the secrets of writing a compelling CV that catches the eye of recruiters and passes through Applicant Tracking Systems (ATS).',
    date: 'Mar 10, 2024',
    datetime: '2024-03-10',
    category: { title: 'Resume Tips', href: '#' },
    author: {
      name: 'Sarah Karim',
      role: 'Recruitment Consultant',
      imageUrl:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Navigating the Tech Job Market in Dhaka',
    href: '#',
    description:
      'An in-depth analysis of the growing tech industry in Dhaka, salary expectations, and opportunities for developers.',
    date: 'Feb 12, 2024',
    datetime: '2024-02-12',
    category: { title: 'Industry Insights', href: '#' },
    author: {
      name: 'Tanvir Hasan',
      role: 'Tech Lead',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function BlogSection() {
  return (
    <div className="bg-white py-24 sm:py-32 border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl uppercase">Career Insights</h2>
          <div className="h-1 w-20 bg-indigo-600 mx-auto mt-4 mb-4"></div>
          <p className="mt-2 text-lg leading-8 text-gray-600 font-light">
            Expert advice to help you navigate your career path.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.id} className="flex flex-col items-start justify-between group">
              <div className="relative w-full">
                <div className="aspect-[16/9] w-full bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] border border-gray-200"></div>
                <div className="absolute inset-0 ring-1 ring-inset ring-gray-900/10" />
              </div>
              <div className="max-w-xl">
                <div className="mt-8 flex items-center gap-x-4 text-xs">
                  <time dateTime={post.datetime} className="text-gray-500 font-medium uppercase tracking-wider">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 bg-gray-50 px-3 py-1.5 font-bold uppercase tracking-wide text-gray-600 hover:bg-gray-100 border border-gray-200"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-bold leading-6 text-gray-900 group-hover:text-indigo-600 transition-colors uppercase tracking-tight">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600 font-light">{post.description}</p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4">
                  <img src={post.author.imageUrl} alt="" className="h-10 w-10 bg-gray-100 grayscale" />
                  <div className="text-sm leading-6">
                    <p className="font-bold text-gray-900 uppercase tracking-wide">
                      <a href={post.href}>
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </a>
                    </p>
                    <p className="text-gray-500 text-xs uppercase tracking-wide">{post.author.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
