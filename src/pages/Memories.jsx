import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MemoryCard from '../components/MemoryCard';
import MemoryForm from '../components/MemoryForm';

const Memories = () => {
  // State to hold the memories from the database
  const [memories, setMemories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch memories from your Flask backend
  const fetchMemories = async () => {
    try {
      const response = await fetch('/api/memories');
      if (!response.ok) {
        throw new Error('Failed to fetch memories');
      }
      const data = await response.json();
      setMemories(data);
      setIsLoading(false);
    } catch (err) {
      console.error("Error loading memories:", err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  // Run the fetch function when the page loads
  useEffect(() => {
    fetchMemories();
  }, []);

  return (
    <>
      <Navbar />
      <header className="pt-52 pb-32 px-6 text-center max-w-4xl mx-auto">
        <h1 className="font-headline text-5xl md:text-7xl mb-6 text-primary italic leading-tight">Shared Memories</h1>
        <p className="font-body text-xl text-on-surface-variant leading-relaxed tracking-wide">
          Stories and moments from those who remember Bonnie
        </p>
        <div className="mt-12 flex justify-center">
          <span className="material-symbols-outlined text-tertiary-fixed-dim text-4xl">auto_awesome</span>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 pb-40">
        {/* Handle Loading and Error States */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
             <div className="animate-pulse text-on-surface-variant font-body text-xl tracking-wide">Loading memories...</div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-body">
            Unable to load memories right now. Please try again later.
          </div>
        ) : memories.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant font-body">
            No memories have been shared yet. Be the first to share one below.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
            {memories.map((memory, index) => {
              // Dynamically recreate your original staggered layout
              let customClasses = "";
              if (index % 3 === 1) customClasses = "mt-20";
              if (index % 3 === 2) customClasses = "lg:-mt-32";
              
              // Alternate image aspect ratios to keep it visually interesting
              const imageAspect = index % 2 === 0 ? "aspect-[4/5]" : "aspect-square";

              return (
                <MemoryCard 
                  key={memory.id}
                  isTextOnly={memory.isTextOnly}
                  image={memory.image}
                  quote={memory.quote}
                  author={memory.author}
                  date={memory.createdAt} // Matching the key from your models.py
                  imageAspect={imageAspect}
                  customClasses={customClasses}
                />
              );
            })}
          </div>
        )}
      </main>

      <section className="bg-surface-container-low py-32 text-center px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-headline text-4xl mb-4 text-primary">Share Your Memory</h2>
          <p className="font-body text-on-surface-variant tracking-wide">To keep him remembered, we need your memories</p>
          <div className="w-16 h-[1px] bg-outline-variant mx-auto mt-12 opacity-40"></div>
        </div>
      </section>

      <section className="py-32 px-6 flex justify-center bg-surface">
        {/* Pass the fetchMemories function to the form so it can refresh the list after a new submission */}
        <MemoryForm onMemoryAdded={fetchMemories} />
      </section>

      <footer className="w-full py-24 bg-stone-100">
        <div className="flex flex-col items-center gap-8 px-8 max-w-7xl mx-auto">
          <div className="font-headline italic text-stone-900 text-xl">Eternal Sanctuary</div>
          <div className="flex gap-12 text-stone-400 font-body text-xs uppercase tracking-widest">
            <a href="#" className="hover:text-amber-700 transition-colors">Privacy</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Accessibility</a>
            <a href="#" className="hover:text-amber-700 transition-colors">Contact</a>
          </div>
          <p className="font-body text-xs uppercase tracking-widest text-stone-500 text-center opacity-50">
            © 2024 In Loving Memory. A Digital Sanctuary for Reflection.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Memories;