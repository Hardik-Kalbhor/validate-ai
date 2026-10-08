import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Search, Cpu, TrendingUp, Scale, Globe, Brain } from 'lucide-react';

const features = [
  { icon: Search, label: 'Competitor Analysis', desc: 'Live market grounding — real competitors, offerings, pricing & positioning.' },
  { icon: Cpu, label: 'Tech Feasibility', desc: 'Honest architecture, tech stack, timeline & technical complexity assessment.' },
  { icon: TrendingUp, label: 'Financial Modeling', desc: 'TAM/SAM/SOM, 3-year revenue projections & Business Model Canvas grounded in real unit economics.' },
  { icon: Scale, label: 'Legal & Regulatory', desc: 'India compliance check: DPDP Act, sector licenses (RBI, FSSAI, SEBI), GST, entity type & blockers.' },
  { icon: Globe, label: 'Global Precedents', desc: 'Cross-border benchmarks, proven international playbooks & localization opportunities.' },
  { icon: Brain, label: 'Synthesis & Verdict', desc: 'Actionable verdict, multi-dimension scores, top risks, opportunities & next steps.' },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b px-6 py-4 flex items-center justify-between">
        <span className="font-bold text-lg">ValidateAI</span>
        <div className="flex gap-3">
          <Button variant="ghost" asChild><Link href="/login">Log in</Link></Button>
          <Button asChild><Link href="/signup">Get Started Free</Link></Button>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <Badge variant="secondary" className="mb-6">Powered by Gemini 3.8 Flash</Badge>
        <h1 className="text-5xl font-bold tracking-tight mb-6">
          Validate your business idea<br />with AI — in minutes
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          6 specialized AI agents analyze your idea from every angle — competitors, tech, financials, legal compliance, global precedents, and synthesis.
          Built for high-growth ventures.
        </p>
        <Button size="lg" asChild>
          <Link href="/signup">Start Validating Free <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="border rounded-xl p-6 bg-card">
            <Icon className="h-6 w-6 text-primary mb-3" />
            <h3 className="font-semibold mb-1">{label}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
