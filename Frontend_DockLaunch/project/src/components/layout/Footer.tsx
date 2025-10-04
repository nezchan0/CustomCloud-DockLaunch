import { Container, Cloud, Github, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-200 py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <Container className="h-6 w-6 text-brand-primary" />
                <Cloud className="h-3 w-3 text-brand-accent absolute -top-1 -right-1" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
                CustomCloud: DockLaunch
              </span>
            </div>
            <p className="text-slate-400 mb-4 max-w-md">
              Instantly deploy containerized applications from any public GitHub repository.
              Seamless, fast, and efficient cloud deployment at your fingertips.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-brand-accent transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-slate-400 hover:text-brand-accent transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-brand-accent transition-colors">Features</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-accent transition-colors">Pricing</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-accent transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-accent transition-colors">Changelog</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-brand-accent transition-colors">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-accent transition-colors">Blog</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-accent transition-colors">Careers</a></li>
              <li><a href="#" className="text-slate-400 hover:text-brand-accent transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} CustomCloud. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;