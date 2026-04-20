import { useState } from 'react';

const MemoryForm = ({ onMemoryAdded }) => {
  const [formData, setFormData] = useState({
    author: '',
    quote: '',
    image: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  // 1. Convert Image File to Base64 String
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB Client-side check
        alert("Photo is too large. Please use a smaller image (under 4MB).");
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
        // Refresh the list in Memories.jsx
        if (onMemoryAdded) onMemoryAdded();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to share');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-body text-sm uppercase tracking-widest text-stone-500 mb-2">Your Name</label>
          <input
            required
            type="text"
            className="w-full p-4 bg-stone-50 border-none rounded-lg focus:ring-2 focus:ring-amber-200 outline-none transition-all"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="How should we address you?"
          />
        </div>

        <div>
          <label className="block font-body text-sm uppercase tracking-widest text-stone-500 mb-2">A Memory or Message</label>
          <textarea
            required
            rows="4"
            className="w-full p-4 bg-stone-50 border-none rounded-lg focus:ring-2 focus:ring-amber-200 outline-none transition-all"
            value={formData.quote}
            onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
            placeholder="Share a story about Bonnie..."
          ></textarea>
        </div>

        <div>
          <label className="block font-body text-sm uppercase tracking-widest text-stone-500 mb-2">Share a Photo (Optional)</label>
          <input
            type="file"
            accept="image/*"
            className="w-full text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
            onChange={handleFileChange}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-full font-body font-bold uppercase tracking-widest transition-all ${
            isSubmitting ? 'bg-stone-200 text-stone-400' : 'bg-stone-900 text-white hover:bg-amber-900'
          }`}
        >
          {isSubmitting ? 'Sharing...' : 'Share Memory'}
        </button>

        {status === 'success' && <p className="text-green-600 text-center font-body">Memory added to the sanctuary.</p>}
        {status === 'error' && <p className="text-red-600 text-center font-body">Failed to share. Try a smaller photo.</p>}
      </form>
    </div>
  );
};

export default MemoryForm;