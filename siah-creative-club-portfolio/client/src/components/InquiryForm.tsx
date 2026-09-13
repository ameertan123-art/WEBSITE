import { useState } from "react";
import { ArrowUpRight, Check, LoaderCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

export default function InquiryForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const submitInquiry = trpc.contact.submitInquiry.useMutation({
    onSuccess: () => {
      setForm({ name: "", email: "", message: "" });
      setSubmitted(true);
    },
  });

  return (
    <form
      className="ref-inquiry-form"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(false);
        submitInquiry.mutate(form);
      }}
    >
      <div className="ref-inquiry-fields">
        <label>
          <span>Name</span>
          <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required minLength={2} placeholder="Your name" />
        </label>
        <label>
          <span>Email</span>
          <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required placeholder="you@example.com" />
        </label>
      </div>
      <label>
        <span>Briefly tell us about the project</span>
        <textarea value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} required minLength={10} rows={4} placeholder="What are you making?" />
      </label>
      <button type="submit" disabled={submitInquiry.isPending}>
        {submitInquiry.isPending ? <LoaderCircle size={15} className="ref-spinner" /> : submitted ? <Check size={15} /> : <ArrowUpRight size={15} />}
        {submitInquiry.isPending ? "Sending" : submitted ? "Message saved" : "Send inquiry"}
      </button>
      {submitted && <p className="ref-inquiry-success">Thanks — your message has been saved. We’ll be in touch.</p>}
    </form>
  );
}
