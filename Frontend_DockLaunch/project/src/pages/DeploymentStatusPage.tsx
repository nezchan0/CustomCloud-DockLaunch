import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, ExternalLink, Loader2, XCircle, CheckCircle2 } from 'lucide-react';
import { formatContainerId } from '../lib/utils';
import { deploymentService } from '../services/api';
import toast from 'react-hot-toast';
import ConfirmDialog from '../components/ui/ConfirmDialog';

interface DeploymentState {
  containerId: string;
  ngrokUrl: string;
  repoUrl: string;
}

const DeploymentStatusPage = () => {
  const { containerId } = useParams<{ containerId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [deploymentState, setDeploymentState] = useState<DeploymentState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  
  // Get deployment data from location state or fetch it
  useEffect(() => {
    const state = location.state as DeploymentState | null;
    
    if (state && state.containerId === containerId) {
      setDeploymentState(state);
      setIsLoading(false);
    } else {
      // Fetch deployment data
      deploymentService.getDeploymentStatus(containerId || 'unknown')
        .then(data => {
          setDeploymentState({
            containerId: containerId || 'unknown',
            ngrokUrl: data.ngrok_url,
            repoUrl: 'https://github.com/example/repo' // This would come from the API in a real app
          });
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [containerId, location.state]);
  
  const handleStopDeployment = async () => {
    if (!containerId) return;
    
    setIsStopping(true);
    
    try {
      await deploymentService.stopDeployment(containerId);
      toast.success('Deployment stopped successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to stop deployment');
    } finally {
      setIsStopping(false);
      setShowConfirmDialog(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-brand-primary mx-auto animate-spin mb-4" />
          <h2 className="text-2xl font-semibold">Loading deployment details...</h2>
        </div>
      </div>
    );
  }
  
  if (isError || !deploymentState) {
    return (
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-12 w-12 text-brand-error mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Deployment Not Found</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            We couldn't find the deployment you're looking for.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="btn-primary py-2 px-6"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center mb-8">
          <div className="bg-brand-success/10 text-brand-success py-2 px-6 rounded-full flex items-center">
            <CheckCircle2 className="h-5 w-5 mr-2" />
            <span className="font-medium">Deployment Active</span>
          </div>
        </div>
        
        <div className="card p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">
              Deployment Status
            </h1>
            <button
              onClick={() => setShowConfirmDialog(true)}
              className="btn-danger py-2 px-4 flex items-center"
              disabled={isStopping}
            >
              {isStopping ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Stopping...
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 mr-2" />
                  Stop Deployment
                </>
              )}
            </button>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Repository</span>
                <span className="font-medium truncate">{deploymentState.repoUrl}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Container ID</span>
                <span className="font-mono bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded text-sm inline-block">
                  {formatContainerId(deploymentState.containerId)}
                </span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Public URL</span>
                <motion.div
                  className="relative"
                  animate={{ boxShadow: ['0 0 0px rgba(34, 211, 238, 0)', '0 0 15px rgba(34, 211, 238, 0.5)', '0 0 0px rgba(34, 211, 238, 0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="flex bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded items-center group">
                    <span className="font-mono text-sm truncate flex-grow">
                      {deploymentState.ngrokUrl}
                    </span>
                    <a 
                      href={deploymentState.ngrokUrl} 
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="ml-2 p-1 text-slate-500 hover:text-brand-primary transition-colors"
                      aria-label="Open URL"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
              <h3 className="font-medium mb-2 flex items-center">
                <Container className="h-4 w-4 text-brand-primary mr-2" />
                Deployment Status
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Container Status</span>
                  <span className="text-sm font-medium text-brand-success flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Running
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Public URL</span>
                  <span className="text-sm font-medium text-brand-success flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    Active
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Resource Usage</span>
                  <span className="text-sm font-medium text-brand-success">Normal</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-4">
              <button
                onClick={() => navigate('/')}
                className="btn-outline py-2 px-4"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Stop Deployment"
        message="Are you sure you want to stop this deployment? This action cannot be undone."
        confirmLabel="Stop Deployment"
        cancelLabel="Cancel"
        onConfirm={handleStopDeployment}
        onCancel={() => setShowConfirmDialog(false)}
      />
    </div>
  );
};

export default DeploymentStatusPage;