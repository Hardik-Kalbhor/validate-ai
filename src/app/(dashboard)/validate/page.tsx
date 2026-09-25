import { IdeaForm } from '@/components/validation/IdeaForm';

export default function ValidatePage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Validate a Business Idea</h1>
        <p className="text-muted-foreground mt-1">
          4 AI agents will analyze your idea in parallel — results appear live as each agent completes.
        </p>
      </div>
      <IdeaForm />
    </div>
  );
}
