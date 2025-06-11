import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); 

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (type: 'scroll' | 'link', pathOrId: string) => {
    setIsMenuOpen(false);
    if (type === 'scroll') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const element = document.getElementById(pathOrId);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      } else {
        const element = document.getElementById(pathOrId);
        if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (type === 'link') {
      navigate(pathOrId);
      window.scrollTo(0, 0);
    }
  };

  const menuItems = [
    { label: 'Beranda', type: 'scroll' as const, pathOrId: 'home' },
    { label: 'Profil Sekolah', type: 'scroll' as const, pathOrId: 'profile' },
    { label: 'Guru', type: 'scroll' as const, pathOrId: 'teachers' },
    { label: 'Pengumuman', type: 'link' as const, pathOrId: '/pengumuman' },
    { label: 'Cek Kemajuan Siswa', type: 'link' as const, pathOrId: '/progres-siswa' }, 
    { label: 'Blog Siswa', type: 'link' as const, pathOrId: '/blog' }, 
    { label: 'SPMB', type: 'scroll' as const, pathOrId: 'spmb' },
    { label: 'Review', type: 'scroll' as const, pathOrId: 'reviews' },
    { label: 'Kontak', type: 'scroll' as const, pathOrId: 'contact' },
  ];
  
  const isTransparent = location.pathname === '/' && !isScrolled && !isMenuOpen;

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
      isTransparent
        ? 'bg-transparent' 
        : 'bg-white/95 backdrop-blur-lg shadow-lg'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" onClick={() => handleNavigation('link', '/')} className={`text-xl sm:text-2xl font-bold transition-colors duration-300 ${
            isTransparent ? 'text-white' : 'text-gray-900'
          }`}>
            SDN Tunas Harapan
          </Link>
          
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.type, item.pathOrId)}
                className={`transition-colors duration-300 font-medium pb-1 border-b-2
                  ${isTransparent ? 'text-gray-200 hover:text-white border-transparent hover:border-white/70' 
                                 : 'text-gray-600 hover:text-blue-600 border-transparent hover:border-blue-600/70'}
                  ${(item.type === 'link' && location.pathname === item.pathOrId) ? (isTransparent ? 'text-white border-white/70' : 'text-blue-600 border-blue-600/70') : ''}
                `}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className={`md:hidden transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-gray-700'}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg absolute top-full left-0 right-0 mx-0 rounded-b-lg shadow-lg p-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.type, item.pathOrId)}
                  className={`block w-full text-left py-3 px-3 rounded-md text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 font-medium
                    ${(item.type === 'link' && location.pathname === item.pathOrId) ? 'bg-blue-100 text-blue-700' : ''}
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
