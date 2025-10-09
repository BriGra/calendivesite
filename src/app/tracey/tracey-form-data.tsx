'use client';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { formSubmit } from "@/app/api/action";

const TraceyFormData = () =>{
    const router = useRouter();
    const [processing, setProcessing] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [state, formAction] = useFormState(formSubmit, {
        error: '',
        success: false
    });

    useEffect(()=>{
        const getSubmitted = localStorage.getItem('submitted');
        if(getSubmitted === 'true'){
            setSubmitted(true);
        }
    }, []);

    
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setProcessing(true);
        const formData = new FormData(e.target as HTMLFormElement);
        formAction(formData);
    };

    useEffect(() => {
        const { error, success } = state;
        if (success) {
            localStorage.setItem('submitted', 'true');
            setProcessing(false);
            toast.success('Processed successfully',{
                position: 'top-center',
            });
            setTimeout(()=>{
                window.location.reload();
            }, 3000) 
        }

        if (error !== '') {
            toast.error(error, {
                position: 'top-center',
            }); 
            setProcessing(false);
        }
    }, [state, router]);
    return(
        <div className="bg-[#f2ebe1] font-monteserrat">
            {!submitted? (
                <div className="md:flex text-red-800 py-10 px-5 md:px-20 min-h-screen w-full ">
                    <div className="order-1 md:order-2 w-full md:w-[50%] ">
                        <div className="w-full text-center space-y-4 p-5 pl-15">
                            <h1 className="uppercase text-2xl tracking-widest text-red-800 font-bold">
                                 TRACEYS BIRTHDAY CELEBRATION - RSVP
                            </h1>
                            <div>
                                <p className="text-sm text-red-500 font-monteserrat font-semibold leading-[20px] ">
                                    We&apos;re thrilled to invite you to Tracey's unforgettable birthday bash and you are officially on the guest list! A two-day celebration at two incredible venues! Please fill out the form below to confirm your attendance.
                                </p>
                                <p className="text-red-600 text-sm font-monteserrat leading-[20px] font-bold mt-4">Important: This is an exclusive event, no plus ones allowed.</p>

                                <p className="text-lg text-red-600 font-bold font-monteserrat mt-5 ">
                                   Event Details: 
                                </p>
                                <p className="text-lg text-red-600 font-bold font-monteserrat mt-5">Day 1: MAKō - October 16th, 9PM</p>

                                <p className="text-lg text-red-600 font-bold font-monteserrat mt-5">Day 2: Mr. Panther - October 17th, 9PM</p>

                                {/* <p className="text-lg text-red-600 font-semibold font-monteserrat mt-5">Please select which event(s) you'll be attending:</p>

                                <p className="text-sm text-red-600 font-monteserrat mt-5">- I&apos;ll join the celebration at MAKō only.</p>

                                <p className="text-sm text-red-600 font-monteserrat mt-5">- I&apos;ll dine and party at Mr. Panther only.</p>

                                <p className="text-sm text-red-600 font-monteserrat mt-5">- I&apos;m all in for both nights!</p>

                                <p className="text-lg text-red-600 font-bold font-monteserrat mt-5">Your Details:</p>

                                <p className="text-sm text-red-600 font-semibold font-monteserrat mt-5">Full Name (required)</p>

                                <p className="text-sm text-red-600 font-semibold font-monteserrat mt-5">WhatsApp Phone Number (with correct country code)</p>  */}

                                <p className="text-lg text-red-600 font-bold font-monteserrat mt-5">RSVP DEADLINE:</p>
                                <p className="text-sm text-red-600 font-monteserrat mt-5">All guests must RSVP by October 14th, no later than noon. No RSVP, no entry—strictly enforced!</p>

                                <p className="text-sm text-red-600 font-monteserrat mt-5">We can&apos;t wait to celebrate with you. Choose your event preference and see you there!</p>
                            </div>
                        </div>
                    </div>

                    <div className="order-2 md:order-1 text-red-600 p-6 w-full md:w-[50%]">
                        <form onSubmit={handleSubmit} className="w-full rounded-xl block">
                            <div className="py-4">
                                <label className="block text-sm font-medium mb-3">
                                   Please select which event(s) you'll be attending:
                                </label>
                                <div className="">
                                    <label className="flex items-center mb-3">
                                        <input
                                            type="radio"
                                            name="eventOption"
                                            value="MAKō only"
                                            className="text-black mr-3"
                                        />
                                        <span> I&apos;ll join the celebration at MAKō only</span>
                                    </label>
                                    <label className="flex mb-3">
                                        <input
                                            type="radio"
                                            name="eventOption"
                                            value="Mr. Panther only"
                                            className="text-black mr-3"
                                        />
                                        <span>I&apos;ll dine and party at Mr. Panther only</span>
                                    </label>
                                    <label className="flex mb-3">
                                        <input
                                            type="radio"
                                            name="eventOption"
                                            value="both night"
                                            className="text-black mr-3"
                                        />
                                        <span>I&apos;m all in for both nights!</span>
                                    </label>
                                </div>
                            </div>

                            <div className="py-4">
                                <label htmlFor="name" className="block text-sm font-medium mb-3">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    placeholder="Enter your first and last name"
                                    className="w-full px-4 py-2 rounded border focus:outline-none focus:ring-2 focus:ring-white"
                                />
                            </div>

                            <div className="py-4">
                                <label htmlFor="phone" className="block text-sm font-medium mb-3">
                                    WhatsApp Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    required
                                    name="phone"
                                    placeholder="We&apos;ll use this to send your entry code via WhatsApp"
                                    className="w-full px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-white"
                                />
                            </div>

                            <button type="submit" className="w-full py-3 bg-red-800 text-white font-semibold rounded hover:bg-gray-200 transition" disabled={processing}>
                                {processing?(
                                    'Processing'
                                ):(
                                    'Confirm RSVP'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            ):(
                <div className="text-red-800 py-20 px-5 md:px-20 min-h-screen w-full ">
                    <p className="py-3">Thank you for RSVPing to Tracey's Birthday Soirée, we're excited to have you on the guest list!</p>

                    <p className="py-3">Please note the following:
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Your unique entry code will be sent to the WhatsApp number you provided.</li>
                            <li>If you indicated that you're bringing a plus one, please follow up to confirm their verification and approval.</li>
                            <li>Entry will only be granted with a valid code, so be sure to check your WhatsApp messages as the event date approaches.</li>
                        </ul>
                    </p>

                    <p className="py-3">We can't wait to celebrate with great music, good vibes, and unforgettable moments. Dress to impress and get ready for a night to remember.</p>

                    <p className="pt-3">See you soon!</p>
                </div>
            )}
            <div className="text-center">
                <p className="text-red-800">&copy; {new Date().getFullYear()} Calendive. All Rights Reserved</p>
            </div>
        </div>
    );
}
export default TraceyFormData;