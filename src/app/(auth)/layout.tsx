export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">ValidateAI</h1>
          <p className="text-sm text-muted-foreground mt-1">AI-powered business idea validation</p>
        </div>
        {children}
      </div>
    </div>
  );
}
