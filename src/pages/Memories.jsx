import { useState } from 'react';

const MemoryForm = ({ onMemoryAdded }) => {
  const [formData, setFormData] = useState({
    author: '',
    quote: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  // Convert image to Base64 to store in your Supabase 'image_url' column
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB Limit check
        alert("Photo is too large for the sanctuary. Please use a smaller image.");
        e.target.value = null;
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch('/api/memories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ author: '', quote: '', image: '' });
        if (onMemoryAdded) onMemoryAdded(); // Refresh the list in Memories.jsx
      } else {
        throw new Error('Failed to share');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-surface p-8 rounded-3xl border border-outline-variant/20 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block font-body text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-3">Your Name</label>
          <input
            required
            type="text"
            className="w-full p-4 bg-surface-container-low border-b border-outline-variant focus:border-primary outline-none transition-all font-body text-primary"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="E.g. Wayne"
          />
        </div>

        <div>
          <label className="block font-body text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-3">A Story for Bonnie</label>
          <textarea
            required
            rows="4"
            className="w-full p-4 bg-surface-container-low border-b border-outline-variant focus:border-primary outline-none transition-all font-body text-primary resize-none"
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            placeholder="Share a moment you cherish..."
          ></textarea>
        </div>

        <div>
          <label className="block font-body text-xs uppercase tracking-[0.2em] text-on-surface-variant mb-3">Add a Photo</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm font-body text-on-surface-variant file:mr-4 file:py-2 file:px-6 file:rounded-full file:border-0 file:text-xs file:font-bold file:uppercase file:tracking-widest file:bg-tertiary-fixed-dim file:text-on-tertiary-fixed cursor-pointer"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-5 rounded-full font-headline text-lg italic transition-all duration-500 ${
            isSubmitting ? 'bg-outline-variant text-surface cursor-wait' : 'bg-primary text-on-primary hover:scale-[1.02] active:scale-95 shadow-lg shadow-primary/10'
          }`}
        >
          {isSubmitting ? 'Adding to the Sanctuary...' : 'Share Memory'}
        </button>

        {status === 'success' && <p className="text-primary font-body text-center animate-fade-in text-sm">Thank you. The memory has been preserved.</p>}
        {status === 'error' && <p className="text-error font-body text-center text-sm">Connection failed. Please try a smaller photo.</p>}
      </form>
    </div>
  );
};

export default MemoryForm;