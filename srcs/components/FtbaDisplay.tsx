
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface FtbaDisplayProps {
  content: {
    feel: {
      title: string;
      description: string;
      visualization: string;
      affirmations: string[];
    };
    think: {
      title: string;
      description: string;
      affirmations: string[];
    };
    believe: {
      title: string;
      description: string;
      coreBeliefs: string[];
      affirmations: string[];
    };
    act: {
      title: string;
      description: string;
      actionSteps: string[];
      affirmations: string[];
    };
  };
  age: string;
  category: string;
}

export const FtbaDisplay: React.FC<FtbaDisplayProps> = ({ content, age, category }) => {
  const sections = [
    {
      key: 'feel',
      title: 'FEEL',
      icon: '❤️',
      data: content.feel
    },
    {
      key: 'think',
      title: 'THINK',
      icon: '🧠',
      data: content.think
    },
    {
      key: 'believe',
      title: 'BELIEVE',
      icon: '💎',
      data: content.believe
    },
    {
      key: 'act',
      title: 'ACT',
      icon: '⚡',
      data: content.act
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      <div className="text-center fade-in">
        <Badge className="mb-6 bg-accent text-accent-foreground border-border px-8 py-3 rounded-full text-sm">
          Your Personalized Blueprint
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Your <span className="gradient-text">FTBA Transformation</span> Framework
        </h2>
        <p className="text-lg text-muted-foreground font-light leading-relaxed">
          Tailored specifically for your journey as a <strong className="text-foreground font-medium">{category}</strong> in the <strong className="text-foreground font-medium">{age}</strong> stage
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {sections.map((section, index) => (
          <Card key={section.key} className="elegant-card subtle-hover slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
            <CardHeader className="pb-6">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-foreground/10 to-foreground/5 rounded-2xl flex items-center justify-center text-2xl border border-border/20">
                  {section.icon}
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold text-foreground">{section.title}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1 font-medium">{section.data.title}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <p className="text-foreground leading-relaxed">
                {section.data.description}
              </p>

              <Separator className="bg-border/40" />

              {section.key === 'feel' && (
                <div>
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-base">
                    🎯 Visualization Practice
                  </h4>
                  <p className="text-sm text-muted-foreground bg-accent/30 p-6 rounded-xl border border-border/30 leading-relaxed">
                    {content.feel.visualization}
                  </p>
                </div>
              )}

              {section.key === 'believe' && (
                <div>
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-base">
                    🔥 Core Beliefs to Adopt
                  </h4>
                  <div className="space-y-3">
                    {content.believe.coreBeliefs.map((belief, idx) => (
                      <div key={idx} className="flex items-start gap-4 text-sm">
                        <span className="text-foreground mt-1 font-bold">✓</span>
                        <span className="text-muted-foreground font-medium leading-relaxed">{belief}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section.key === 'act' && (
                <div>
                  <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-base">
                    🚀 Immediate Action Steps
                  </h4>
                  <div className="space-y-4">
                    {content.act.actionSteps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-4 text-sm bg-accent/20 p-4 rounded-lg border border-border/30">
                        <span className="bg-foreground text-background w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-foreground font-medium leading-relaxed">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Power Affirmations for all sections */}
              <div>
                <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-base">
                  💫 Power Affirmations
                </h4>
                <div className="space-y-3">
                  {section.data.affirmations.map((affirmation, idx) => (
                    <div key={idx} className="flex items-start gap-4 text-sm bg-gradient-to-r from-accent/30 to-accent/20 p-4 rounded-lg border border-border/30">
                      <span className="text-foreground mt-1 text-base">✨</span>
                      <span className="text-foreground font-medium italic leading-relaxed">"{affirmation}"</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center fade-in-delayed">
        <Card className="elegant-card bg-gradient-to-r from-accent/40 to-accent/20 border-border/60">
          <CardContent className="py-12">
            <h3 className="text-3xl font-bold mb-6 gradient-text">
              Your Transformation Journey Starts Now
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
              Remember: Transformation happens in the daily practice of these principles. 
              Review your FTBA blueprint daily, visualize your success, and take consistent action. 
              Your future self is counting on the decisions you make today.
            </p>
            <div className="bg-accent/40 p-6 rounded-xl border border-border/40 max-w-xl mx-auto">
              <p className="text-sm text-foreground font-semibold mb-3">💡 Daily Practice Tip:</p>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                Read your affirmations aloud each morning with conviction and emotion. 
                Feel the truth of each statement as you speak it into existence.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
