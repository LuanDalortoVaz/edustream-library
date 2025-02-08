
import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from './AuthContext';

type UserRole = 'student' | 'teacher' | 'admin' | 'parent' | 'guest';

interface Permission {
  id: string;
  name: string;
  description: string | null;
}

interface RoleContextType {
  userRoles: UserRole[];
  permissions: Permission[];
  loading: boolean;
  checkPermission: (permissionName: string) => boolean;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserRoles() {
      if (!user) {
        setUserRoles([]);
        setPermissions([]);
        setLoading(false);
        return;
      }

      try {
        // Fetch user roles
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (roleError) throw roleError;

        const roles = roleData.map(r => r.role) as UserRole[];
        setUserRoles(roles);

        // Fetch permissions for these roles
        const { data: permData, error: permError } = await supabase
          .from('permissions')
          .select(`
            id,
            name,
            description,
            role_permissions!inner(role)
          `)
          .in('role_permissions.role', roles);

        if (permError) throw permError;

        setPermissions(permData);
      } catch (error) {
        console.error('Error loading roles:', error);
      } finally {
        setLoading(false);
      }
    }

    loadUserRoles();
  }, [user]);

  const checkPermission = (permissionName: string): boolean => {
    return permissions.some(p => p.name === permissionName);
  };

  return (
    <RoleContext.Provider value={{ userRoles, permissions, loading, checkPermission }}>
      {children}
    </RoleContext.Provider>
  );
}

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};
