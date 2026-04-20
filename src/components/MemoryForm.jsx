import { useState, useRef } from 'react';

const MemoryForm = ({ onMemoryAdded }) => {
  const [author, setAuthor] = useState('');
  const [relation, setRelation] = useState('');
  const [quote, setQuote] = useState('');
  const [image, setImage] = useState(null); // Stores the uploaded image
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  
  const fileInputRef = useRef(null);

  // Convert uploaded image to a Base64 string to send to the backend
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    // Format the author name nicely (e.g., "John Doe (Friend)")
    const finalAuthor = relation ? `${author} (${relation})` : author;

    try {
      const response = await fetch('/api/memories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: finalAuthor,
          quote: quote,
          image: image,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to share memory. Please try again.');
      }

      // Show success message
      setStatus({ type: 'success', message: 'Thank you. Your memory has been added to the sanctuary.' });
      
      // Clear the form
      setAuthor('');
      setRelation('');
      setQuote('');
      setImage(null);
      if (fileInputRef.current) fileInputRef.current.value = '';

      // Trigger the Memories.jsx page to refresh the feed
      if (onMemoryAdded) {
        onMemoryAdded();
      }

    } catch (err) {
      setStatus({ type: 'error', message: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl bg-surface-container-lowest p-12 rounded-xl shadow-[0_20px_40px_rgba(27,28,25,0.03)] mx-auto">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant ml-1">Your Name</label>
            <input 
              type="text" 
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="First & Last Name" 
              className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body focus:ring-1 focus:ring-tertiary-fixed-dim transition-all outline-none" 
            />
          </div>
          <div className="space-y-2">
            <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant ml-1">Relation (optional)</label>
            <input 
              type="text" 
              value={relation}
              onChange={(e) => setRelation(e.target.value)}
              placeholder="Friend, Family, etc." 
              className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body focus:ring-1 focus:ring-tertiary-fixed-dim transition-all outline-none" 
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant ml-1">Your Memory</label>
          <textarea 
            rows="6" 
            required
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="Share a story or a moment..." 
            className="w-full bg-surface-container-low border-none rounded-lg p-4 font-body focus:ring-1 focus:ring-tertiary-fixed-dim transition-all outline-none resize-none"
          ></textarea>
        </div>
        
        <div className="space-y-2">
          <label className="font-label text-[10px] uppercase tracking-[0.2em] text-on-surface-variant ml-1">Attach an Image</label>
          
          {/* Hidden file input */}
          <input 
            type="file" 
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            className="hidden" 
            id="imageUpload"
          />
          
          {/* Clickable UI that triggers the hidden input */}
          <label 
            htmlFor="imageUpload"
            className={`w-full border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors duration-500 ${image ? 'border-primary/50 bg-primary/5' : 'border-outline-variant/30 hover:bg-surface-container-low'}`}
          >
            <span className="material-symbols-outlined text-outline-variant">
              {image ? 'check_circle' : 'add_a_photo'}
            </span>
            <p className="font-label text-xs text-on-surface-variant/60 text-center">
              {image ? 'Image attached successfully! Click to change.' : 'Click to upload a photo'}
            </p>
          </label>
        </div>
        
        <div className="pt-4 text-center space-y-4">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`w-full premium-gradient text-white font-label text-sm uppercase tracking-[0.25em] py-5 rounded-full hover:shadow-[0_10px_20px_rgba(26,40,59,0.2)] transition-all duration-700 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Sharing...' : 'Share Your Memory'}
          </button>
          
          {/* Status Messages */}
          {status.message && (
            <p className={`font-body text-sm ${status.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
              {status.message}
            </p>
          )}
          
          <p className="mt-6 font-body text-xs italic text-on-surface-variant/70">Your memory becomes part of this living tribute</p>
        </div>
      </form>
    </div>
  );
};

export default MemoryForm;