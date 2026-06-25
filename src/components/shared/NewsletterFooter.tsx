'use client';

import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export default function NewsletterFooter() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    agreedSMS: false,
    agreedPolicy: false
  });

  return (
    <section className="bg-white py-16 px-6 md:px-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        
        {/* Help & Info Column */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Help & Info</h3>
          <ul className="space-y-3 text-gray-600">
            {['Who We Are', 'Our Destination Management Companies', 'WE MAKE TRAVEL MATTER®', 'Unedited Reviews', 'Frequently Asked Questions', 'River Cruise Port Locations', 'Travel Updates', 'Travel Flexibility', 'Contact Us'].map((item) => (
              <li key={item}><a href="#" className="hover:text-red-600 transition-colors text-sm">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Travel Planning Column */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-6">Travel Planning</h3>
          <ul className="space-y-3 text-gray-600">
            {['Get Your Free Brochure', 'Booking Conditions', 'Trip Deposit Level', 'Flight Booking', 'Recommendations'].map((item) => (
              <li key={item}><a href="#" className="hover:text-red-600 transition-colors text-sm">{item}</a></li>
            ))}
          </ul>
        </div>

        {/* Lead Magnet / Sign Up Form Column */}
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Save up to €1,424*!</h3>
          <p className="text-sm text-gray-600 mb-4">
            Plus receive latest offers, travel inspiration, and discover how your travels will make a positive impact. Together, WE MAKE TRAVEL MATTER®. 
            <a href="#" className="text-red-600 hover:underline ml-1">Offer Terms</a>
          </p>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="First Name *" className="w-full p-3 border border-gray-300 rounded focus:border-red-600 outline-none text-sm" />
              <input type="text" placeholder="Last Name *" className="w-full p-3 border border-gray-300 rounded focus:border-red-600 outline-none text-sm" />
            </div>
            
            <div className="relative flex border border-gray-300 rounded overflow-hidden">
              <button type="button" className="px-3 bg-gray-100 border-r flex items-center gap-1 text-sm text-gray-700">
                <span className="text-xl">🇧🇩</span> <FaChevronDown className="text-[10px]" />
              </button>
              <input type="tel" placeholder="Phone number" className="w-full p-3 outline-none text-sm" />
            </div>

            <input type="email" placeholder="Email *" className="w-full p-3 border border-gray-300 rounded focus:border-red-600 outline-none text-sm" />

            <div className="space-y-3">
              <label className="flex items-start gap-2 text-xs text-gray-600">
                <input type="checkbox" className="mt-1" onChange={(e) => setFormData({...formData, agreedSMS: e.target.checked})} />
                I agree to receive SMS from Trafalgar Alerts (up to 2 msgs per month). Msg & data rates may apply. Reply STOP to opt out, HELP for help. See <a href="#" className="underline">Privacy Policy</a>.
              </label>
              
              <label className="flex items-start gap-2 text-xs text-gray-600">
                <input type="checkbox" className="mt-1" onChange={(e) => setFormData({...formData, agreedPolicy: e.target.checked})} />
                By checking this box, you accept our <a href="#" className="underline">privacy policy</a>.*
              </label>
            </div>

            <button type="submit" className="w-full bg-white border-2 border-red-600 text-red-600 font-bold py-3 uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 text-[11px] text-gray-500">
        <p>Trafalgar Tours Limited is a proud member of The Travel Corporation portfolio of brands. #SimplyTrafalgar</p>
        <p>Travel House, Rue du Manoir St Peter Port, Guernsey, GY1 2JH</p>
      </div>
    </section>
  );
}