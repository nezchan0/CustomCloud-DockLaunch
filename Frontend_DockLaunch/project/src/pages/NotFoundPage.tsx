import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-6 flex justify-center">
          <motion.div 
            className="relative"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            <Container className="h-20 w-20 text-brand-primary opacity-30" />
            <AlertTriangle className="h-10 w-10 text-brand-warning absolute bottom-0 right-0" />
          </motion.div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-slate-600 dark:text-slate-400 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/" className="btn-primary py-2 px-6">
          Go to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;