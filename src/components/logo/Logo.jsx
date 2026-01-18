import { GraduationCap } from 'lucide-react';

const Logo = ({ className }) => {
  return (
    <div
      className={`flex items-center gap-2 text-lg font-bold tracking-tight text-sidebar-primary`}
    >
      <GraduationCap className="h-6 w-6" />
      <span className="font-headline">CampusConnectAI</span>
    </div>
  );
};

export default Logo;
