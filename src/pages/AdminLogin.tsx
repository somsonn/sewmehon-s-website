import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn, signUp, signOut, user, isAdmin, isLoading } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (!isLoading && user) {
      if (isAdmin) {
        navigate("/admin");
      } else {
        toast({
          title: "Access Denied",
          description: "You don't have admin privileges.",
          variant: "destructive",
        });
      }
    }
  }, [user, isAdmin, isLoading, navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    let error;
    if (isSignUp) {
      const res = await signUp(email, password);
      error = res.error;
      if (!error) {
        toast({
          title: "Account Created",
          description: "Please check your email for verification if required, or wait to be redirected.",
        });
      }
    } else {
      const res = await signIn(email, password);
      error = res.error;
    }

    if (error) {
      toast({
        title: isSignUp ? "Sign Up Failed" : "Login Failed",
        description: error.message,
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (user && !isAdmin) {
    return (
      <div className="min-h-screen bg-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md glass rounded-2xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-4 text-destructive">Access Denied</h1>
          <p className="mb-6 text-muted-foreground">
            You are logged in as <span className="font-semibold text-foreground">{user.email}</span>, 
            but this account does not have administrator privileges.
          </p>
          <div className="bg-muted p-2 rounded text-xs font-mono mb-4 select-all">
            User ID: {user.id}
          </div>
          <div className="space-y-4">
             <Button onClick={() => signOut()} variant="outline" className="w-full">
               Sign Out
             </Button>
             <Button onClick={() => navigate("/")} variant="ghost" className="w-full">
               Back to Home
             </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Portfolio */}
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate("/")}
        >
          <ArrowLeft size={18} />
          Back to Portfolio
        </Button>

        {/* Login Card */}
        <div className="glass rounded-2xl p-8">
            <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gradient">Admin</span> {isSignUp ? "Sign Up" : "Login"}
            </h1>
            <p className="text-muted-foreground">
              {isSignUp ? "Create an account to manage your portfolio" : "Sign in to manage your portfolio"}
            </p>
          </div>          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-muted/50 border-border"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-muted/50 border-border"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="hero"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                isSignUp ? "Signing up..." : "Signing in..."
              ) : (
                <>
                  <LogIn size={18} />
                  {isSignUp ? "Sign Up" : "Sign In"}
                </>
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground mt-6">
          <button 
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="underline hover:text-primary transition-colors"
          >
            {isSignUp 
              ? "Already have an account? Sign In" 
              : "Need an account? Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
