import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, ExternalLink, Database, Server, Globe, Clock, Shield, GitBranch, CheckCircle } from 'lucide-react';
import { isValidGitHubUrl } from '../lib/utils';
import { deploymentService } from '../services/api';
import DeployForm from '../components/deploy/DeployForm';
import FeatureCard from '../components/ui/FeatureCard';
import toast from 'react-hot-toast';

const HomePage = () => {
  const navigate = useNavigate();
  const [isDeploying, setIsDeploying] = useState(false);
  
  const handleDeploy = async (repoUrl: string) => {
    if (!isValidGitHubUrl(repoUrl)) {
      toast.error('Please enter a valid GitHub repository URL');
      return;
    }
    
    setIsDeploying(true);
    
    try {
      const result = await deploymentService.deployRepository(repoUrl);
      
      toast.success('Deployment initiated successfully!');
      // Navigate to the deployment status page
      navigate(`/deployment/${result.container_id}`, { 
        state: { 
          containerId: result.container_id,
          ngrokUrl: result.ngrok_url,
          repoUrl
        } 
      });
    } catch (error) {
      toast.error('Failed to deploy. Please try again.');
    } finally {
      setIsDeploying(false);
    }
  };

  const features = [
    {
      icon: <GitBranch className="h-10 w-10 text-brand-primary" />,
      title: 'Git Integration',
      description: 'Deploy directly from any public GitHub repository with a Dockerfile.'
    },
    {
      icon: <Container className="h-10 w-10 text-brand-secondary" />,
      title: 'Container Management',
      description: 'Automated container deployment with zero configuration needed.'
    },
    {
      icon: <Globe className="h-10 w-10 text-brand-accent" />,
      title: 'Instant Public URL',
      description: 'Every deployment receives a public Ngrok URL to access your application.'
    },
    {
      icon: <Clock className="h-10 w-10 text-brand-success" />,
      title: 'Rapid Setup',
      description: 'Go from repository to live application in under 60 seconds.'
    },
    {
      icon: <Shield className="h-10 w-10 text-brand-warning" />,
      title: 'Secure Deployment',
      description: 'All deployments run in isolated containers for maximum security.'
    },
    {
      icon: <Database className="h-10 w-10 text-brand-primary" />,
      title: 'Resource Control',
      description: 'Easily manage and scale your application resources as needed.'
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 lg:py-40 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                Deploy Applications in Seconds
              </h1>
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-8 leading-relaxed">
                CustomCloud: DockLaunch lets you instantly deploy any GitHub repository with a Dockerfile.
                No configuration needed. Get a public URL immediately.
              </p>
              <a
href="https://github.com/phyrnna05"
target="_blank"
className="inline-block px-6 py-2 mb-4 text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md hover:from-blue-600 hover:to-purple-700 transition duration-200"
>
Link to Sample GitHub Projects →
</a>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-12"
            >
              <DeployForm onDeploy={handleDeploy} isDeploying={isDeploying} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 text-sm text-slate-600 dark:text-slate-400"
            >
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-brand-success mr-2" />
                <span>Zero Configuration</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-brand-success mr-2" />
                <span>Instant Public URL</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-brand-success mr-2" />
                <span>Secure Isolation</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Why Choose <span className="text-brand-primary">CustomCloud</span>
            </motion.h2>
            <motion.p 
              className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Simplify your deployment workflow with our powerful features
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Ready to Launch Your Containers?
            </motion.h2>
            <motion.p 
              className="text-lg text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Get started in seconds. No credit card required.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a 
                href="#top" 
                className="btn bg-white text-brand-primary hover:bg-white/90 py-3 px-8 rounded-md text-lg font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Deploy Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;