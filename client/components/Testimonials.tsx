import React from 'react'
import { StarIcon } from '@heroicons/react/24/solid'

const testimonials = [
    {
        id: 1,
        content: "I found my dream job at Pathao within 3 days of creating my profile here. The process was seamless and the filters helped me find exactly what I was looking for.",
        author: "Rahim Uddin",
        role: "Software Engineer",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: 2,
        content: "As an HR manager, this platform has been a game-changer for our recruitment. We get high-quality applications and the dashboard makes managing candidates a breeze.",
        author: "Sarah Khan",
        role: "HR Manager, bKash",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: 3,
        content: "The best job portal in Bangladesh hands down. I love the clean interface and the daily job alerts that keep me updated on new opportunities in the banking sector.",
        author: "Tanvir Ahmed",
        role: "Financial Analyst",
        image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
]

export default function Testimonials() {
    return (
        <section className="py-24 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-end">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl uppercase">
                            Success Stories
                        </h2>
                        <div className="h-1 w-20 bg-indigo-600 mt-4"></div>
                    </div>
                    <div className="flex lg:justify-end gap-4 items-center">
                        <div className="text-right">
                            <div className="flex items-center justify-end gap-1 mb-1">
                                <span className="font-bold text-gray-900 text-xl">4.9/5</span>
                                <div className="flex text-indigo-600">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon key={i} className="h-4 w-4" />
                                    ))}
                                </div>
                            </div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Based on 2,000+ reviews</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="relative flex flex-col bg-gray-50 p-8 border border-gray-100 hover:border-gray-900 transition-colors duration-300">
                            <div className="mb-6">
                                <svg className="h-8 w-8 text-indigo-600 opacity-20" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.552-7.104 6.624-9.024L25.864 4z" />
                                </svg>
                            </div>
                            
                            <blockquote className="flex-1 text-gray-700 text-lg leading-relaxed mb-8 font-light italic">
                                "{testimonial.content}"
                            </blockquote>

                            <div className="flex items-center gap-4 pt-6 border-t border-gray-200 mt-auto">
                                <img
                                    className="h-10 w-10 grayscale"
                                    src={testimonial.image}
                                    alt=""
                                />
                                <div>
                                    <div className="font-bold text-gray-900 text-sm uppercase tracking-wide">{testimonial.author}</div>
                                    <div className="text-gray-500 text-xs uppercase tracking-wide mt-0.5">{testimonial.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
