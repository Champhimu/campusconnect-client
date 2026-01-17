import { GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';

const Logo = ({ className }) => {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-lg font-bold tracking-tight text-sidebar-primary',
        className
      )}
    >
      <GraduationCap className="h-6 w-6" />
      <span className="font-headline">CampusConnectAI</span>
    </div>
  );
};

export default Logo;
