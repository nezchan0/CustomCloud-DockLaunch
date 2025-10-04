import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, Loader2, Container } from 'lucide-react';

interface DeployFormProps {
  onDeploy: (repoUrl: string) => Promise<void>;
  isDeploying: boolean;
}

const DeployForm = ({ onDeploy, isDeploying }: DeployFormProps) => {
  const [repoUrl, setRepoUrl] = useState('');
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!repoUrl.trim()) return;
    await onDeploy(repoUrl.trim());
  };

  return (
    <motion.div
      className="card p-6 md:p-8 max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5,
        ease: "easeOut"
      }}
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Deploy from GitHub Repository</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <GitBranch className="h-5 w-5 text-slate-400" />
          </div>
          <input
  type="text"
  placeholder="https://github.com/username/repository"
  value={repoUrl}
  onChange={(e) => setRepoUrl(e.target.value)}
  disabled={isDeploying}
  className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300
             placeholder-gray-400 text-black font-bold
             focus:border-brand-primary focus:ring-1 focus:ring-brand-primary
             disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
  required
/>

        </div>
        
        <div className="flex justify-center">
          <motion.button
            type="submit"
            disabled={isDeploying || !repoUrl.trim()}
            className="btn-primary py-3 px-8 rounded-lg text-lg w-full sm:w-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isDeploying ? (
              <span className="flex items-center justify-center">
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Deploying...
              </span>
            ) : (
              <span className="flex items-center justify-center">
                <Container className="h-5 w-5 mr-2" />
                Deploy Container
              </span>
            )}
          </motion.button>
        </div>
      </form>
      
      <p className="text-sm text-slate-500 mt-4 text-center">
        Repository must contain a valid Dockerfile in the root directory
      </p>
    </motion.div>
  );
};

export default DeployForm;