import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "wouter";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();

  if (user) {
    setLocation("/");
    return null;
  }

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Welcome to SkillPath</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <AuthForm
                  mode="login"
                  onSubmit={(data) => loginMutation.mutate(data)}
                  isPending={loginMutation.isPending}
                />
              </TabsContent>
              
              <TabsContent value="register">
                <AuthForm
                  mode="register"
                  onSubmit={(data) => registerMutation.mutate(data)}
                  isPending={registerMutation.isPending}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex-1 bg-primary hidden lg:block">
        <div className="h-full flex items-center justify-center p-8">
          <div className="max-w-md text-primary-foreground">
            <h1 className="text-4xl font-bold mb-4">Master New Skills</h1>
            <p className="text-lg opacity-90">
              Join our platform to access curated learning paths and resources for tech skills.
              Track your progress and grow your career.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function AuthForm({ mode, onSubmit, isPending }: {
  mode: "login" | "register";
  onSubmit: (data: any) => void;
  isPending: boolean;
}) {
  const form = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Loading..." : mode === "login" ? "Login" : "Register"}
        </Button>
      </form>
    </Form>
  );
}
