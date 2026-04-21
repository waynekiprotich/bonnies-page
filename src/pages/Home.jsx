import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import lavender from "../assets/bonnie-home.jpeg";

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-24">
        <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tertiary-fixed/30 text-tertiary text-xs font-bold tracking-widest uppercase">
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              Celebrating Uncle Bonnie
            </div>
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-on-surface leading-[1.1] tracking-tight">
              In Loving Memory <br/> <span className="italic text-primary-container">of Bonnie</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
                A space dedicated to the warmth, laughter, and lasting legacy of our beloved Bonnie. 
                We invite you to wander through these shared stories and portraits that capture her joyful spirit and the light she brought to every moment.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link to="/memories" className="premium-gradient text-on-primary px-8 py-4 rounded-xl font-body font-semibold text-lg hover:scale-95 transition-transform duration-200 flex items-center gap-3 group">
                View & Share Memories
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">&rarr;</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative z-10 p-4 bg-white rounded-xl shadow-[0_40px_80px_rgba(27,28,25,0.08)] transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <div className="aspect-[4/5] overflow-hidden rounded-lg border-8 border-tertiary-fixed/10">
                <img
                    src={lavender}
                    alt="Lavender"
                    className="w-full h-full object-cover"
                />
              </div> 
              <div className="mt-6 text-center pb-2">
                <p className="font-headline italic text-xl text-stone-800">Bonniface Kipruto Bitok </p>
                <p className="font-body text-xs text-stone-400 tracking-[0.2em] mt-1 uppercase">forever in our hearts</p>
              </div>
            </div>
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-tertiary-fixed/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-primary-fixed/20 rounded-full blur-3xl"></div>
          </div>
        </section>

        <section className="mt-40 bg-surface-container-low py-32">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
            <span className="material-symbols-outlined text-6xl text-tertiary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
            <blockquote className="font-headline text-3xl md:text-5xl text-on-surface leading-tight italic">
              "Created the page to honor Uncle Bonnie ,coolest uncle actually , the page is to honor him with the memories he made with us "
            </blockquote>
            <div className="pt-4">
              <div className="h-px w-24 bg-outline-variant/30 mx-auto mb-6"></div>
              <cite className="font-body text-sm tracking-[0.3em] uppercase text-on-surface-variant not-italic">In Loving Memory of Uncle Bonnie</cite>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;