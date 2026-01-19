import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from '../../components/ui/sidebar';
import { CompanySidebar } from './company-sidebar';

export default function CompanyLayout({children}) {
  return (
    <SidebarProvider>
      <CompanySidebar />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
