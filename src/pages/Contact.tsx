
import React from "react";
import ContactForm from "@/components/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  return (
    <div>
      <section className="section pb-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <h1 className="font-playfair">Contact</h1>
            <p className="text-xl text-gray-700 mb-8">
              Let's discuss how we can work together to achieve your goals and elevate your performance.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div>
              <h2 className="text-xl font-playfair mb-6">Get in Touch</h2>
              <p className="mb-8">
                Whether you're interested in coaching, consulting, or speaking engagements, I'm here to discuss your needs and how we might work together.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-playfair mb-2 flex items-center gap-2">
                    <Mail className="w-5 h-5" />
                    Email
                  </h3>
                  <p className="text-gray-700">hello@krishnakumar.com</p>
                </div>
                <div>
                  <h3 className="text-lg font-playfair mb-2 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Location
                  </h3>
                  <p className="text-gray-700">Bengaluru, India</p>
                  <p className="text-gray-700 text-sm mt-1">(Global engagement)</p>
                </div>
                <div>
                  <h3 className="text-lg font-playfair mb-2 flex items-center gap-2">
                    <Phone className="w-5 h-5" />
                    Phone
                  </h3>
                  <p className="text-gray-700 mb-4">+91 9666342441</p>
                  {/* <a
                    href="#"
                    className="border border-black px-6 py-3 inline-block hover:bg-black hover:text-white transition-colors duration-300"
                  >
                    Schedule a Call
                  </a> */}
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="section border-t border-gray-200">
        <div className="container">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-xl font-playfair mb-4">For Speaking Inquiries</h2>
            <p className="text-gray-700">
              For speaking engagements, workshops, or media appearances, please include details about your event, audience, and specific topics of interest in your message.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
