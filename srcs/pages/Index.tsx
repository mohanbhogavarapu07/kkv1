import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Separator } from '../components/ui/separator';
import { Badge } from '../components/ui/badge';
import { FtbaDisplay } from '../components/FtbaDisplay';
import { generateFtbaContent } from '../utils/ftbaGenerator';

const Index = () => {
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [ftbaContent, setFtbaContent] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const ageCategories = [
    { value: 'teens', label: '13–18 (Teens/Students)', description: 'Building foundation & discovering potential' },
    { value: 'young-adults', label: '19–25 (Young Adults)', description: 'College & career starters' },
    { value: 'early-professionals', label: '26–35 (Early Professionals)', description: 'Startups & rapid growth phase' },
    { value: 'mid-life', label: '36–50 (Mid-life Growth Seekers)', description: 'Peak performance & leadership' },
    { value: 'legacy-builders', label: '51+ (Legacy Builders)', description: 'Senior professionals & wisdom sharers' }
  ];

  const lifeCategories = [
    { value: 'students', label: 'Students', icon: '🎓' },
    { value: 'employees', label: 'Employees', icon: '💼' },
    { value: 'entrepreneurs', label: 'Entrepreneurs', icon: '🚀' },
    { value: 'solopreneurs', label: 'Solopreneurs', icon: '⚡' },
    { value: 'freelancers', label: 'Freelancers', icon: '💻' },
    { value: 'small-business-owners', label: 'Small Business Owners', icon: '🏪' },
    { value: 'remote-workers', label: 'Remote Workers', icon: '🌐' },
    { value: 'coaches-consultants', label: 'Coaches & Consultants', icon: '🎯' },
    { value: 'creatives', label: 'Creatives', icon: '🎨' },
    { value: 'parents', label: 'Parents', icon: '👨‍👩‍👧‍👦' },
    { value: 'stay-at-home-parents', label: 'Stay-at-home Parents', icon: '🏠' },
    { value: 'career-changers', label: 'Career Changers', icon: '🔄' },
    { value: 'job-seekers', label: 'Job Seekers', icon: '🔍' },
    { value: 'retirees', label: 'Retirees', icon: '🌅' }
  ];

  const handleGenerateFtba = async () => {
    if (!selectedAge || !selectedCategory) return;
    
    setIsGenerating(true);
    // Simulate processing time for dramatic effect
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const content = generateFtbaContent(selectedAge, selectedCategory);
    setFtbaContent(content);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="section-spacing">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-5xl mx-auto space-y-8">
            <div className="fade-in">
              <Badge className="mb-6 bg-accent text-accent-foreground border-border text-sm font-medium px-6 py-3 rounded-full">
                Revolutionary Mindset Transformation
              </Badge>
              <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tight">
                <span className="gradient-text">FTBA</span>
                <br />
                <span className="text-foreground/90">Methodology</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto font-light">
                Transform your life through the power of <strong className="text-foreground font-medium">Feel</strong>, <strong className="text-foreground font-medium">Think</strong>, <strong className="text-foreground font-medium">Believe</strong>, and <strong className="text-foreground font-medium">Act</strong>
              </p>
            </div>
            
            <div className="fade-in-delayed">
              <div className="flex flex-wrap justify-center gap-12 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>AI-Powered Personalization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Psychology-Based Framework</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Instant Transformation Blueprint</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FTBA Explanation */}
      <section className="section-spacing bg-accent/30">
        <div className="container mx-auto container-padding">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20 slide-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
                The Science Behind <span className="gradient-text">Transformation</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
                FTBA isn't just another self-help method. It's a scientifically-backed framework that rewires your mind from the inside out, creating lasting change through precise psychological triggers.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { letter: 'F', title: 'FEEL', description: 'Connect with your deepest emotions and desires. Emotional alignment is the foundation of all transformation.', color: 'from-foreground/20 to-foreground/10' },
                { letter: 'T', title: 'THINK', description: 'Rewire your mental patterns with empowering thoughts. Your mindset determines your reality.', color: 'from-foreground/20 to-foreground/10' },
                { letter: 'B', title: 'BELIEVE', description: 'Adopt unshakeable beliefs that support your vision. Belief is the bridge between thoughts and reality.', color: 'from-foreground/20 to-foreground/10' },
                { letter: 'A', title: 'ACT', description: 'Take aligned action that manifests your vision. Consistent action creates extraordinary results.', color: 'from-foreground/20 to-foreground/10' }
              ].map((item, index) => (
                <Card key={item.letter} className={`elegant-card subtle-hover slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader className="text-center pb-6">
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-foreground text-2xl font-bold border border-border/20`}>
                      {item.letter}
                    </div>
                    <CardTitle className="text-xl font-bold text-foreground">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personalization Engine */}
      <section className="section-spacing">
        <div className="container mx-auto container-padding">
          <div className="max-w-4xl mx-auto">
            <Card className="elegant-card border-2 border-border/60 shadow-xl shadow-foreground/5">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-4xl font-bold mb-6">
                  Your Personalized <span className="gradient-text">FTBA Blueprint</span>
                </CardTitle>
                <p className="text-muted-foreground text-lg font-light leading-relaxed">
                  Get a custom-tailored transformation framework designed specifically for your life stage and goals.
                </p>
              </CardHeader>
              <CardContent className="space-y-10">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground tracking-wide">Select Your Life Stage</label>
                    <Select value={selectedAge} onValueChange={setSelectedAge}>
                      <SelectTrigger className="h-14 bg-background border-border hover:border-foreground/30 transition-colors text-left">
                        <SelectValue placeholder="Choose your age group..." />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border shadow-lg">
                        {ageCategories.map((age) => (
                          <SelectItem key={age.value} value={age.value} className="hover:bg-accent">
                            <div className="py-2">
                              <div className="font-medium text-foreground">{age.label}</div>
                              <div className="text-xs text-muted-foreground mt-1">{age.description}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-foreground tracking-wide">Select Your Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="h-14 bg-background border-border hover:border-foreground/30 transition-colors text-left">
                        <SelectValue placeholder="Choose your role..." />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-border shadow-lg">
                        {lifeCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value} className="hover:bg-accent">
                            <div className="flex items-center gap-3 py-2">
                              <span className="text-lg">{category.icon}</span>
                              <span className="font-medium text-foreground">{category.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator className="bg-border/60" />

                <div className="text-center">
                  <Button 
                    onClick={handleGenerateFtba}
                    disabled={!selectedAge || !selectedCategory || isGenerating}
                    className="h-16 px-12 text-lg font-medium bg-foreground hover:bg-foreground/90 text-background transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
                  >
                    {isGenerating ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        Generating Your Blueprint...
                      </div>
                    ) : (
                      'Generate My FTBA Blueprint'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FTBA Results */}
      {ftbaContent && (
        <section className="section-spacing bg-accent/20">
          <div className="container mx-auto container-padding">
            <FtbaDisplay content={ftbaContent} age={selectedAge} category={selectedCategory} />
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="section-spacing">
        <div className="container mx-auto container-padding">
          <div className="text-center max-w-4xl mx-auto space-y-8">
            <h3 className="text-4xl font-bold mb-8">
              Ready to <span className="gradient-text">Transform Your Life</span>?
            </h3>
            <p className="text-lg text-muted-foreground mb-12 font-light leading-relaxed">
              Your personalized FTBA blueprint is just the beginning. The power to change your life lies in your commitment to consistent action.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Badge variant="outline" className="px-6 py-3 border-border text-foreground text-sm">
                Psychology-Backed
              </Badge>
              <Badge variant="outline" className="px-6 py-3 border-border text-foreground text-sm">
                Instantly Actionable
              </Badge>
              <Badge variant="outline" className="px-6 py-3 border-border text-foreground text-sm">
                Scientifically Proven
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
