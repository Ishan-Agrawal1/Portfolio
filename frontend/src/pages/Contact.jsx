import ContactForm from '../components/ContactForm.jsx';
import ContactIntro from '../components/sections/contact/ContactIntro.jsx';

export function Contact({ formData, loading, submitted, error, onInputChange, onSubmit }) {
  return (
    <div className="px-10 md:px-20 max-w-7xl mx-auto py-20">
      <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-20 py-20">
        <ContactIntro submitted={submitted} error={error} />
        <div className="lg:col-span-7">
          <ContactForm formData={formData} loading={loading} onInputChange={onInputChange} onSubmit={onSubmit} />
        </div>
      </section>
    </div>
  );
}

export default Contact;
