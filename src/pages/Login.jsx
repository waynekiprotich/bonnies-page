import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import lavender from "../assets/bonnie.jpeg";

const Login = () => {
  const navigate = useNavigate();

  const handleEnter = (e) => {
    e.preventDefault();
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isGateway={true} />
      
      <main className="flex-grow flex items-center justify-center px-6">
        <div className="max-w-xl w-full flex flex-col items-center text-center space-y-12">
          
        <div className="relative">
            <div className="soft-pulse scale-125"></div>
             <div className="w-24 h-24 rounded-full overflow-hidden border shadow-sm">
              <img
                src={lavender}
                alt="Lavender"
                className="w-full h-full object-cover"
               />
            </div>
        </div>

          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-headline text-primary">In Loving Memory of Bonnie</h2>
            <p className="text-on-surface-variant font-body text-lg leading-relaxed max-w-md mx-auto">
              Please share your name below.
            </p>
          </div>

          <form onSubmit={handleEnter} className="w-full max-w-sm space-y-6">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Enter name here"
                className="w-full px-6 py-5 bg-surface-container-lowest rounded-xl border-none text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-outline-variant/30 transition-all duration-300 text-center font-body"
                required
              />
            </div>
            <button type="submit" className="premium-gradient w-full py-5 rounded-xl text-on-primary font-body font-semibold tracking-wide shadow-xl shadow-primary/10 hover:opacity-95 active:scale-[0.98] transition-all">
              Enter Gallery 
            </button>
          </form>
        </div>
      </main>

      <footer className="fixed bottom-0 w-full flex flex-col items-center gap-4 pb-12 pointer-events-none">
        <div className="flex flex-col items-center space-y-2">
          <p className="font-body text-on-surface-variant/60 text-sm tracking-wide">In memory of Bonnie</p>
        </div>
        <p className="font-label text-[10px] tracking-[0.2em] uppercase text-on-surface-variant/30 mt-2">
          © 2024 Bonnie's Legacy. A Digital Sanctuary.
        </p>
      </footer>
    </div>
  );
};

export default Login;