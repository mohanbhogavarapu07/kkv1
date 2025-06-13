import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

// UI Components
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)}>
    {children}
  </div>
);

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={cn("flex flex-col space-y-1.5 p-6", className)}>
    {children}
  </div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={cn("text-2xl font-semibold leading-none tracking-tight", className)}>
    {children}
  </h3>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={cn("p-6 pt-0", className)}>
    {children}
  </div>
);

const Badge: React.FC<{ 
  children: React.ReactNode; 
  className?: string;
  variant?: 'default' | 'outline';
}> = ({ children, className = '', variant = 'default' }) => (
  <div className={cn(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    variant === 'outline' ? "border-border text-foreground" : "bg-accent text-accent-foreground",
    className
  )}>
    {children}
  </div>
);

const Affirmations = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-spacing mb-32">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            <div className="fade-in">
              <Badge className="mb-6 bg-accent text-accent-foreground border-border text-sm font-medium px-6 py-3 rounded-full">
                Daily Affirmations
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tight">
                <span className="gradient-text">Powerful</span>
                <br />
                <span className="text-foreground/90">Affirmations</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto font-light">
                Transform your mindset with daily positive affirmations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <Card className="elegant-card border-2 border-border/60 shadow-xl shadow-foreground/5">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-4xl font-bold mb-6">
                  Your Daily <span className="gradient-text">Affirmations</span>
                </CardTitle>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  Start your day with these powerful affirmations to set a positive tone for your entire day.
                </p>
              </CardHeader>
              <CardContent>
                {/* Add your affirmations content here */}
                <div className="space-y-6">
                  <p className="text-center text-muted-foreground">
                    Coming soon...
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Affirmations; 