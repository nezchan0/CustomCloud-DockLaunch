import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Cloud, Code, Database, Server, CheckCircle2 } from 'lucide-react';

const FloatingBackground = () => {
  const [items, setItems] = useState<Array<{
    id: number;
    icon: string;
    x: number;
    y: number;
    delay: number;
    duration: number;
    size: number;
  }>>([]);
  
  useEffect(() => {
    // Generate random floating items
    const icons = ['container', 'cloud', 'code', 'database', 'server', 'check'];
    const newItems = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 4 + Math.random() * 6,
      size: 16 + Math.floor(Math.random() * 24),
    }));
    
    setItems(newItems);
  }, []);

  const renderIcon = (icon: string, size: number) => {
    switch (icon) {
      case 'container':
        return <Container size={size} />;
      case 'cloud':
        return <Cloud size={size} />;
      case 'code':
        return <Code size={size} />;
      case 'database':
        return <Database size={size} />;
      case 'server':
        return <Server size={size} />;
      case 'check':
        return <CheckCircle2 size={size} />;
      default:
        return <Container size={size} />;
    }
  };

  return (
    <div className="floating-container">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="floating-item text-slate-200/10"
          initial={{ x: `${item.x}%`, y: `${item.y}%` }}
          animate={{
            y: [`${item.y}%`, `${item.y - 10}%`, `${item.y}%`],
          }}
          transition={{
            duration: item.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
          style={{ left: `${item.x}%`, top: `${item.y}%` }}
        >
          {renderIcon(item.icon, item.size)}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingBackground;