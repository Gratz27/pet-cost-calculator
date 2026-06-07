"use client";

export default function ContactForm() {
  return (
    <div className="card p-6">
      <h2 className="text-base font-bold text-[#1B2B1B] mb-4">Send a Message</h2>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Your name" className="input-field" />
        <input type="email" placeholder="Your email" className="input-field" />
        <select className="input-field">
          <option value="">Topic — select one</option>
          <option value="data">Data correction</option>
          <option value="feedback">General feedback</option>
          <option value="partnership">Partnership enquiry</option>
          <option value="other">Other</option>
        </select>
        <textarea placeholder="Your message..." rows={4} className="input-field resize-none" />
        <button type="submit" className="btn-primary w-full">Send Message</button>
      </form>
    </div>
  );
}
