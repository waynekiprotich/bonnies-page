const MemoryCard = ({ 
  image, 
  quote, 
  author, 
  date, 
  imageAspect = "aspect-[4/5]", 
  isTextOnly = false, 
  customClasses = "" 
}) => {
  
  if (isTextOnly || !image) {
    return (
      <div className={`bg-surface-container-highest rounded-xl p-10 hover:-translate-y-2 transition-all duration-700 flex flex-col gap-6 shadow-[0_20px_40px_rgba(27,28,25,0.02)] ${customClasses}`}>
        <div className="space-y-6">
          <span className="material-symbols-outlined text-tertiary-fixed-dim">format_quote</span>
          <p className="font-headline text-2xl leading-relaxed text-primary">"{quote}"</p>
          <div className="pt-4">
            <p className="font-label text-xs uppercase tracking-widest text-primary font-bold">{author}</p>
            <p className="font-label text-xs text-on-surface-variant opacity-60">{date}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-surface-container-low rounded-xl p-10 hover:-translate-y-2 transition-all duration-700 flex flex-col gap-6 shadow-[0_20px_40px_rgba(27,28,25,0.03)] group ${customClasses}`}>
      <div className="overflow-hidden rounded-lg">
        <img 
          src={image} 
          alt={`Memory shared by ${author}`} 
          className={`w-full ${imageAspect} object-cover group-hover:scale-105 transition-transform duration-1000 grayscale-[30%]`} 
          loading="lazy"
        />
      </div>
      <div className="space-y-4">
        <p className="font-headline text-xl leading-relaxed text-on-surface italic">"{quote}"</p>
        <div className="pt-6">
          <p className="font-label text-xs uppercase tracking-widest text-primary font-bold">{author}</p>
          <p className="font-label text-xs text-on-surface-variant opacity-60">{date}</p>
        </div>
      </div>
    </div>
  );
};

export default MemoryCard;