 "use client";
 
 import React, { useState } from "react";
 
 type JobSummary = {
   id: string;
   title: string;
   company: string;
 };
 
 type UserSummary = {
   id?: string | null;
   name?: string | null;
   email?: string | null;
 };
 
 type Props = {
   job: JobSummary;
   user: UserSummary;
 };
 
 export default function ApplicationForm({ job, user }: Props) {
   const [message, setMessage] = useState("");
   const [submitting, setSubmitting] = useState(false);
   const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
 
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     setSubmitting(true);
     setStatus("idle");
     try {
       // This endpoint is a placeholder; wire up your actual API route here.
       await fetch("/api/applications", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({
           jobId: job.id,
           userId: user.id,
           message,
         }),
       });
       setStatus("success");
       setMessage("");
     } catch {
       setStatus("error");
     } finally {
       setSubmitting(false);
     }
   };
 
   return (
     <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6">
       <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply to {job.title}</h2>
       <p className="text-gray-600 mb-6">Company: {job.company}</p>
 
       <form onSubmit={handleSubmit} className="space-y-4">
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
           <input
             type="text"
             value={user.name ?? ""}
             disabled
             className="w-full rounded-md border-gray-300 bg-gray-50"
           />
         </div>
 
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
           <input
             type="email"
             value={user.email ?? ""}
             disabled
             className="w-full rounded-md border-gray-300 bg-gray-50"
           />
         </div>
 
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">Message to Employer</label>
           <textarea
             value={message}
             onChange={(e) => setMessage(e.target.value)}
             rows={5}
             className="w-full rounded-md border-gray-300"
             placeholder="Briefly describe why you're a good fit..."
             required
           />
         </div>
 
         <button
           type="submit"
           disabled={submitting}
           className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:opacity-60"
         >
           {submitting ? "Submitting..." : "Submit Application"}
         </button>
 
         {status === "success" && (
           <p className="text-sm text-green-600">Application submitted successfully.</p>
         )}
         {status === "error" && (
           <p className="text-sm text-red-600">Failed to submit application. Try again.</p>
         )}
       </form>
     </div>
   );
 }
