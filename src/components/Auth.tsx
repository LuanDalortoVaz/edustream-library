import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

const Auth = () => {
  const { user, signInWithGoogle, signInWithMicrosoft, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignIn = async (provider: 'google' | 'microsoft') => {
    try {
      if (provider === 'google') {
        await signInWithGoogle();
      } else {
        await signInWithMicrosoft();
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication Error",
        description: "Failed to sign in. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {!user ? (
        <>
          <Button
            onClick={() => handleSignIn('google')}
            className="w-full max-w-sm bg-white text-black hover:bg-gray-100"
          >
            Sign in with Google
          </Button>
          <Button
            onClick={() => handleSignIn('microsoft')}
            className="w-full max-w-sm bg-[#2F2F2F] text-white hover:bg-[#404040]"
          >
            Sign in with Microsoft
          </Button>
        </>
      ) : (
        <Button onClick={signOut} variant="outline">
          Sign Out
        </Button>
      )}
    </div>
  );
};

export default Auth;