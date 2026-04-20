import { Link } from 'react-router-dom';

const Navbar = ({ isGateway = false }) => {
  if (isGateway) {
    return (
      <nav className="fixed top-0 w-full z-50 flex justify-center items-center px-8 py-10 pointer-events-none">
        <h1 className="text-2xl font-headline italic text-primary tracking-wide">Bonnie's Legacy</h1>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-4 md:px-12 bg-stone-50/60 backdrop-blur-xl dark:bg-stone-900/60 shadow-[0_20px_40px_rgba(27,28,25,0.05)]">
      <div className="font-headline italic text-2xl text-stone-900 dark:text-stone-50">
        Bonnie's Legacy
      </div>
      <div className="hidden md:flex items-center gap-8">
        <Link to="/home" className="text-stone-900 dark:text-stone-50 font-semibold border-b-2 border-stone-800/20 pb-1 font-body text-sm tracking-wide">Home</Link>
        <Link to="/memories" className="text-stone-500 hover:text-stone-900 transition-colors duration-300 font-body text-sm tracking-wide">Memories</Link>
      </div>
      <button className="premium-gradient text-on-primary px-6 py-2.5 rounded-xl font-body text-sm font-medium hover:scale-95 duration-200 ease-in-out shadow-xl shadow-primary/10">
        Thank you for visiting!
      </button>
    </nav>
  );
};

export default Navbar;