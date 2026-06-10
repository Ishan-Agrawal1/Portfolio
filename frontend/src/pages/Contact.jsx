import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import ContactForm from '../components/ContactForm.jsx';
import Alert from '../components/Alert.jsx';

export function Contact({ formData, loading, submitted, error, onInputChange, onSubmit }) {
  return (
    <div className="px-10 md:px-20 max-w-7xl mx-auto py-20">
      <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-20 py-20">
        <div className="lg:col-span-5 space-y-12">
          <h2 className="font-serif text-7xl text-white mb-10 leading-[0.9]">
            Let's  <br />
            Connect
          </h2>
          <p className="font-sans text-gray-400 text-lg leading-relaxed max-w-md">
           Whether it’s a project, collaboration, or just a conversation about technology, feel free to reach out. I’m always open to connecting with people who share similar interests and ideas.
          </p>

          <div className="bg-[#e9c176]/10 border border-[#e9c176]/30 px-6 py-4 rounded-lg">
            <p className="font-sans text-lg leading-relaxed text-[#e9c176] font-medium">
              Currently open to opportunities
            </p>
          </div>

          <div className="space-y-10 pt-10">
            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 bg-[#141414] border border-white/10 flex items-center justify-center rounded-lg group-hover:border-[#e9c176] transition-colors">
                <Mail size={20} className="text-[#e9c176]" />
              </div>
              <div>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Email Address</p>
                <a
                  href="mailto:agrawalishan47@gmail.com"
                  className="text-xl font-serif text-white hover:text-[#e9c176] transition-colors"
                >
                  agrawalishan47@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-6 group">
              <div className="w-12 h-12 bg-[#141414] border border-white/10 flex items-center justify-center rounded-lg group-hover:border-[#e9c176] transition-colors">
                <MapPin size={20} className="text-[#e9c176]" />
              </div>
              <div>
                <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Current Location</p>
                <p className="text-xl font-serif text-white">Neemuch (M.P.), India</p>
              </div>
            </div>
          </div>

          {submitted && (
            <Alert
              type="success"
              title="Form submitted successfully!"
              message="Will contact you ASAP"
              isVisible={submitted}
            />
          )}

          {error && (
            <Alert
              type="error"
              title="Submission Failed"
              message={error}
              isVisible={true}
            />
          )}
        </div>

        <div className="lg:col-span-7">
          <ContactForm formData={formData} loading={loading} onInputChange={onInputChange} onSubmit={onSubmit} />
        </div>
      </section>
    </div>
  );
}

export default Contact;
