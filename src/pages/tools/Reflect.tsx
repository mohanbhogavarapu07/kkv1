// import React, { useState } from 'react';
// // --- Utility: cn (class merge) ---
// import { clsx } from 'clsx';
// import { twMerge } from 'tailwind-merge';
// function cn(...inputs) {
//   return twMerge(clsx(inputs));
// }

// // --- UI Primitives ---
// const Card = React.forwardRef(({ className, ...props }, ref) => (
//   <div ref={ref} className={cn("rounded-lg border bg-card text-card-foreground shadow-sm", className)} {...props} />
// ));
// Card.displayName = "Card";
// const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
//   <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
// ));
// CardHeader.displayName = "CardHeader";
// const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
//   <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
// ));
// CardTitle.displayName = "CardTitle";
// const CardContent = React.forwardRef(({ className, ...props }, ref) => (
//   <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
// ));
// CardContent.displayName = "CardContent";

// const Badge = ({ className, variant, ...props }) => (
//   <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", className)} {...props} />
// );

// const Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
//   <div
//     ref={ref}
//     aria-orientation={orientation}
//     role="separator"
//     aria-hidden={decorative}
//     className={cn(
//       "shrink-0 bg-border",
//       orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
//       className
//     )}
//     {...props}
//   />
// ));
// Separator.displayName = "Separator";

// // --- Select UI ---
// import * as SelectPrimitive from '@radix-ui/react-select';
// import { Check, ChevronDown, ChevronUp } from 'lucide-react';
// const Select = SelectPrimitive.Root;
// const SelectValue = SelectPrimitive.Value;
// const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
//   <SelectPrimitive.Trigger ref={ref} className={cn("flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className)} {...props}>
//     {children}
//     <SelectPrimitive.Icon asChild>
//       <ChevronDown className="h-4 w-4 opacity-50" />
//     </SelectPrimitive.Icon>
//   </SelectPrimitive.Trigger>
// ));
// SelectTrigger.displayName = 'SelectTrigger';
// const SelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
//   <SelectPrimitive.Portal>
//     <SelectPrimitive.Content ref={ref} className={cn("relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md", className)} position={position} {...props}>
//       <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
//     </SelectPrimitive.Content>
//   </SelectPrimitive.Portal>
// ));
// SelectContent.displayName = 'SelectContent';
// const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
//   <SelectPrimitive.Item ref={ref} className={cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className)} {...props}>
//     <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
//       <SelectPrimitive.ItemIndicator>
//         <Check className="h-4 w-4" />
//       </SelectPrimitive.ItemIndicator>
//     </span>
//     <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
//   </SelectPrimitive.Item>
// ));
// SelectItem.displayName = 'SelectItem';

// // --- Button ---
// const Button = React.forwardRef(({ className, ...props }, ref) => (
//   <button ref={ref} className={cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", className)} {...props} />
// ));
// Button.displayName = "Button";

// // --- FTBA Content Generator ---
// const ftbaDatabase: Record<string, Record<string, FtbaContent>> = {
//   'teens': {
//     'students': {
//       feel: {
//         title: 'Connect with Your Unlimited Potential',
//         description: 'At this pivotal moment in your life, you have the power to shape your entire future. Feel the excitement of endless possibilities and the strength that comes from knowing you can become anyone you choose to be.',
//         visualization: 'Close your eyes and see yourself 10 years from now, living your dream life. Feel the pride of your achievements and the gratitude for starting your journey today. Let this feeling of excitement and possibility fill every cell of your body.',
//         affirmations: [
//           'I am unstoppable when I set my mind to something',
//           'My potential is limitless and my future is bright',
//           'I feel excited about all the amazing possibilities ahead of me',
//           'Every day I grow stronger, smarter, and more confident'
//         ]
//       },
//       think: {
//         title: 'Adopt the Growth Mindset of Champions',
//         description: 'Your brain is like a muscle that grows stronger with every challenge. Replace limiting thoughts with empowering beliefs about your capacity to learn, grow, and achieve extraordinary things.',
//         affirmations: [
//           'Every challenge is making me stronger and smarter',
//           'I am building the foundation for an extraordinary life',
//           'My potential is unlimited, and I choose to unlock it daily',
//           'I learn from every experience and use it to grow',
//           'I think like a champion and act like a winner'
//         ]
//       },
//       believe: {
//         title: 'Embrace Your Destiny as a Future Leader',
//         description: 'You are not just a student - you are a future leader, innovator, and change-maker. The world needs what you have to offer, and you have everything it takes to make a massive impact.',
//         coreBeliefs: [
//           'I am capable of achieving anything I set my mind to',
//           'My education is my superpower for changing the world',
//           'Every day I invest in learning, I invest in my future success',
//           'I have unique talents that the world needs'
//         ],
//         affirmations: [
//           'I believe in my ability to create an extraordinary life',
//           'I am destined for greatness and I claim it now',
//           'I have everything within me to succeed beyond my wildest dreams',
//           'I believe I can achieve anything I truly desire'
//         ]
//       },
//       act: {
//         title: 'Take Daily Action Toward Your Vision',
//         description: 'Success is built through consistent daily actions. Start building habits now that will compound into extraordinary results over time.',
//         actionSteps: [
//           'Write down your 5-year vision and read it every morning',
//           'Study with purpose - ask yourself how each lesson connects to your goals',
//           'Network with people who inspire you and share your ambitions',
//           'Develop one new skill each month that aligns with your vision',
//           'Take care of your body and mind through exercise and mindfulness'
//         ],
//         affirmations: [
//           'I take massive action toward my dreams every single day',
//           'Every action I take moves me closer to my goals',
//           'I am consistent, disciplined, and focused on my success',
//           'I turn my dreams into reality through persistent action'
//         ]
//       }
//     },
//     'employees': {
//       feel: {
//         title: 'Embrace Your Professional Journey',
//         description: 'Starting your career is an incredible achievement. Feel proud of your initiative and excited about the professional skills and relationships you\'re building. Every day at work is an investment in your future.',
//         visualization: 'Imagine yourself five years from now, having mastered valuable skills and built meaningful professional relationships. Feel the confidence that comes from proving yourself capable and reliable in the working world.',
//         affirmations: [
//           'I feel proud of my professional growth and achievements',
//           'I am excited about the skills I am developing every day',
//           'I feel confident in my ability to excel in my career',
//           'Every day at work, I feel myself becoming more valuable and skilled'
//         ]
//       },
//       think: {
//         title: 'Think Like a Future Executive',
//         description: 'You\'re not just an employee - you\'re a professional in training. Approach every task as an opportunity to develop skills that will serve you throughout your entire career.',
//         affirmations: [
//           'I am building valuable skills with every task I complete',
//           'I see opportunities where others see obstacles',
//           'My work ethic and attitude set me apart from my peers',
//           'I am creating my professional reputation with every interaction',
//           'I think strategically about my career and my future'
//         ]
//       },
//       believe: {
//         title: 'Your Career is Your Canvas',
//         description: 'Believe that your first job is the foundation for an incredible career. You have the power to shape your professional identity and create opportunities for advancement.',
//         coreBeliefs: [
//           'Every role teaches me something valuable for my future',
//           'I have the ability to advance quickly through dedication and excellence',
//           'My career is a journey of continuous growth and learning',
//           'I attract opportunities by being excellent at what I do'
//         ],
//         affirmations: [
//           'I believe in my ability to build an extraordinary career',
//           'I am worthy of success and advancement in my field',
//           'I believe every experience is preparing me for something greater',
//           'I have unlimited potential for professional growth'
//         ]
//       },
//       act: {
//         title: 'Build Your Professional Foundation',
//         description: 'Take strategic actions that will accelerate your career growth and establish you as a rising star in your field.',
//         actionSteps: [
//           'Exceed expectations in every task, no matter how small',
//           'Seek feedback actively and implement it immediately',
//           'Build relationships with colleagues and mentors',
//           'Learn skills beyond your job description',
//           'Document your achievements and impact regularly'
//         ],
//         affirmations: [
//           'I consistently exceed expectations and deliver excellent results',
//           'I actively seek growth opportunities and embrace challenges',
//           'I build strong professional relationships wherever I go',
//           'I take ownership of my career development and success'
//         ]
//       }
//     }
//   },
//   'young-adults': {
//     'students': {
//       feel: {
//         title: 'Harness the Power of Focused Ambition',
//         description: 'This is your time to be laser-focused on building the foundation for your dream life. Feel the intensity of your ambition and the satisfaction that comes from knowing you\'re investing in your future every single day.',
//         visualization: 'See yourself graduating not just with a degree, but with the skills, network, and mindset of a future leader. Feel the pride of knowing you maximized every opportunity during these crucial years.',
//         affirmations: [
//           'I feel intensely motivated to achieve my ambitious goals',
//           'I am passionate about creating an extraordinary future',
//           'I feel energized by the challenges that will make me stronger',
//           'Every day I feel more confident in my ability to succeed'
//         ]
//       },
//       think: {
//         title: 'Master the Mindset of Excellence',
//         description: 'You\'re not just getting educated - you\'re preparing to compete at the highest levels. Think like someone who will shape industries and solve major problems.',
//         affirmations: [
//           'I am preparing for extraordinary success through deliberate practice',
//           'Every skill I master now multiplies my future opportunities',
//           'I attract mentors and opportunities through my commitment to excellence',
//           'My education is my rocket fuel for changing the world',
//           'I think like a leader and future industry innovator'
//         ]
//       },
//       believe: {
//         title: 'You Are Tomorrow\'s Industry Leader',
//         description: 'Believe that you\'re not just preparing for a job - you\'re preparing to revolutionize your field. Your generation will solve problems that previous generations couldn\'t imagine.',
//         coreBeliefs: [
//           'I have the potential to become a leader in my chosen field',
//           'My unique perspective and skills are exactly what the world needs',
//           'I can learn anything and master any skill I choose to focus on',
//           'My network and knowledge are my greatest professional assets'
//         ],
//         affirmations: [
//           'I believe I am destined to become a leader in my field',
//           'I have unique gifts that will revolutionize my industry',
//           'I believe in my power to solve complex problems and create value',
//           'I am becoming the expert the world needs and wants'
//         ]
//       },
//       act: {
//         title: 'Execute Your Strategic Advantage',
//         description: 'Take actions that give you an unfair advantage over your peers and position you for extraordinary opportunities after graduation.',
//         actionSteps: [
//           'Build a portfolio of real-world projects in your field',
//           'Seek internships and experiences with industry leaders',
//           'Create content that demonstrates your expertise and passion',
//           'Join professional organizations and attend industry events',
//           'Develop a personal brand that showcases your unique value'
//         ],
//         affirmations: [
//           'I take strategic action that gives me an unfair advantage',
//           'I consistently build my expertise and demonstrate my value',
//           'I actively create opportunities for my future success',
//           'I position myself as a rising star in my chosen field'
//         ]
//       }
//     },
//     // ... (rest of ftbaDatabase copied from ftbaGenerator.ts)
//   },
//   'early-professionals': {
//     'employees': {
//       feel: {
//         title: 'Embrace Your Professional Power',
//         description: 'You\'ve proven yourself capable and now it\'s time to accelerate. Feel the confidence that comes from experience and the excitement of reaching for leadership roles.',
//         visualization: 'See yourself being promoted to positions of increasing responsibility and influence. Feel the respect of colleagues and the satisfaction of leading teams to achieve ambitious goals.',
//         affirmations: [
//           'I feel confident in my professional abilities and judgment',
//           'I am ready to take on greater responsibilities and challenges',
//           'I feel excited about my leadership potential and growth',
//           'Every success builds my confidence to achieve even more'
//         ]
//       },
//       think: {
//         title: 'Think Like a Strategic Leader',
//         description: 'Move beyond task completion to strategic thinking. Consider how your work fits into larger business objectives and how you can create exponential value.',
//         affirmations: [
//           'I think strategically about business challenges and opportunities',
//           'My leadership potential is recognized and valued by others',
//           'I create solutions that have lasting positive impact',
//           'I am becoming the professional others look up to and learn from',
//           'I think beyond my role to understand the bigger picture'
//         ]
//       },
//       believe: {
//         title: 'You Are Leadership Material',
//         description: 'Believe that you have the skills, judgment, and character to lead others and drive meaningful results. You\'re ready for greater responsibility and impact.',
//         coreBeliefs: [
//           'I have the skills and vision to lead teams to extraordinary results',
//           'My career trajectory is accelerating because of my commitment to excellence',
//           'I can handle any professional challenge through skill and determination',
//           'I am creating opportunities for myself through outstanding performance'
//         ],
//         affirmations: [
//           'I believe I am ready to lead and inspire others',
//           'I have the wisdom and skills to drive exceptional results',
//           'I believe in my ability to create lasting positive change',
//           'I am destined for senior leadership and greater impact'
//         ]
//       },
//       act: {
//         title: 'Accelerate Your Rise to Leadership',
//         description: 'Take strategic actions that position you for rapid advancement and establish you as an indispensable leader in your organization.',
//         actionSteps: [
//           'Take on high-visibility projects that showcase your strategic thinking',
//           'Mentor junior team members and build your leadership skills',
//           'Develop expertise in areas critical to your company\'s success',
//           'Build relationships with senior leaders and decision-makers',
//           'Pursue advanced certifications or education in your field'
//         ],
//         affirmations: [
//           'I actively position myself for leadership opportunities',
//           'I mentor others and develop my leadership capabilities daily',
//           'I build strategic relationships that accelerate my career',
//           'I consistently deliver results that exceed expectations'
//         ]
//       }
//     },
//     'solopreneurs': {
//       feel: {
//         title: 'Own Your Independence and Impact',
//         description: 'Feel the pride of building something entirely your own and the freedom that comes from controlling your destiny. You\'re creating value on your terms while building the lifestyle you want.',
//         visualization: 'Picture yourself running a thriving solo business that gives you financial freedom and time flexibility. Feel the satisfaction of serving clients at the highest level while maintaining work-life balance.',
//         affirmations: [
//           'I feel proud of the independence I have created for myself',
//           'I love the freedom and flexibility of my solo business',
//           'I feel fulfilled creating value for my clients on my own terms',
//           'Every day I feel more confident in my entrepreneurial abilities'
//         ]
//       },
//       think: {
//         title: 'Master the Efficiency Mindset',
//         description: 'Think like someone who maximizes impact with minimal resources. Every hour and every decision should move you closer to your vision of success and freedom.',
//         affirmations: [
//           'I create maximum value with focused effort and smart strategies',
//           'My expertise and personal brand attract ideal clients effortlessly',
//           'I have the discipline and systems to scale my impact sustainably',
//           'I am building both wealth and freedom through my solo business',
//           'I think efficiently and execute with precision'
//         ]
//       },
//       believe: {
//         title: 'Your Expertise is Your Empire',
//         description: 'Believe that your unique skills and knowledge can create significant wealth and impact. You don\'t need a large team - you need focus, systems, and relentless value creation.',
//         coreBeliefs: [
//           'My expertise and reputation are my most valuable assets',
//           'I can create substantial income streams through focused specialization',
//           'Solo entrepreneurship gives me the perfect blend of freedom and impact',
//           'I attract opportunities by being exceptional at what I do'
//         ],
//         affirmations: [
//           'I believe my expertise can create unlimited income potential',
//           'I am building a business that perfectly aligns with my values',
//           'I believe in my ability to scale my impact while maintaining freedom',
//           'My unique skills and knowledge are extremely valuable'
//         ]
//       },
//       act: {
//         title: 'Scale Your Solo Success',
//         description: 'Implement systems and strategies that allow you to increase impact and income without sacrificing the freedom that drew you to solo entrepreneurship.',
//         actionSteps: [
//           'Develop premium service offerings that command higher rates',
//           'Create systems and templates that increase your efficiency',
//           'Build a strong personal brand through content and networking',
//           'Establish multiple income streams from your core expertise',
//           'Set boundaries that protect your time and maintain work-life balance'
//         ],
//         affirmations: [
//           'I systematically scale my business while maintaining my freedom',
//           'I command premium rates for my expertise and value',
//           'I build systems that allow me to work smarter, not harder',
//           'I maintain perfect balance between success and personal fulfillment'
//         ]
//       }
//     }
//   },
//   'mid-life': {
//     'entrepreneurs': {
//       feel: {
//         title: 'Harness Your Peak Performance Power',
//         description: 'You\'re at the perfect intersection of experience, network, and ambition. Feel the confidence that comes from years of learning and the excitement of building something truly significant.',
//         visualization: 'See yourself leading a business that creates massive value and positive impact. Feel the pride of building something that will outlast you and the satisfaction of mentoring the next generation of leaders.',
//         affirmations: [
//           'I feel powerful and confident in my ability to build something significant',
//           'I am energized by the opportunity to create lasting impact',
//           'I feel grateful for my experience and excited about what\'s ahead',
//           'Every challenge I\'ve overcome has prepared me for this moment'
//         ]
//       },
//       think: {
//         title: 'Think with Seasoned Strategic Vision',
//         description: 'You have the wisdom to see patterns others miss and the experience to execute at the highest level. Think like someone who builds businesses that transform industries.',
//         affirmations: [
//           'My experience and network give me an unfair advantage in business',
//           'I can see opportunities and solutions that younger entrepreneurs miss',
//           'I have the wisdom to build sustainable, impactful businesses',
//           'My leadership creates extraordinary results and develops others',
//           'I think with the wisdom of experience and the energy of ambition'
//         ]
//       },
//       believe: {
//         title: 'This is Your Legacy-Building Phase',
//         description: 'Believe that your best work is ahead of you. You have the perfect combination of experience, resources, and motivation to create something truly extraordinary.',
//         coreBeliefs: [
//           'I am in my prime for creating businesses that matter',
//           'My experience is my competitive advantage in the marketplace',
//           'I can build companies that create lasting positive impact',
//           'My success opens doors and creates opportunities for others'
//         ],
//         affirmations: [
//           'I believe this is my time to build something truly extraordinary',
//           'I have everything I need to create my most important work',
//           'I believe my experience and wisdom are invaluable assets',
//           'I am meant to leave a legacy of positive impact and success'
//         ]
//       },
//       act: {
//         title: 'Build Your Legacy Business',
//         description: 'Take actions that leverage your full capabilities to create a business that not only succeeds financially but also creates meaningful impact.',
//         actionSteps: [
//           'Focus on ventures that align with your values and create positive impact',
//           'Leverage your network and reputation to accelerate growth',
//           'Mentor and develop the next generation of entrepreneurs',
//           'Build systems and culture that can scale beyond your direct involvement',
//           'Balance aggressive growth with sustainable business practices'
//         ],
//         affirmations: [
//           'I take action that builds a lasting legacy of positive impact',
//           'I leverage my full experience and network to create success',
//           'I mentor others while building my most important business',
//           'Every decision I make contributes to my meaningful legacy'
//         ]
//       }
//     },
//     'parents': {
//       feel: {
//         title: 'Embrace Your Role as a Life Architect',
//         description: 'Feel the profound responsibility and joy of shaping the next generation. You\'re not just raising children - you\'re developing future leaders who will change the world.',
//         visualization: 'Picture your children as successful, confident adults who contribute positively to the world. Feel the pride of knowing that your guidance and example set them up for extraordinary lives.',
//         affirmations: [
//           'I feel deeply fulfilled by my role in shaping the next generation',
//           'I am proud of the positive influence I have on my children',
//           'I feel confident in my ability to guide my children to success',
//           'Every day I feel the joy and responsibility of being a parent'
//         ]
//       },
//       think: {
//         title: 'Think Like a Generational Legacy Builder',
//         description: 'Every interaction with your children is an opportunity to instill values, confidence, and capabilities that will serve them for a lifetime. Think long-term about the impact of your parenting.',
//         affirmations: [
//           'I am raising children who will make a positive difference in the world',
//           'My example teaches my children that anything is possible',
//           'I balance being supportive with helping them develop independence',
//           'Every day I help my children build confidence and character',
//           'I think strategically about the legacy I\'m creating through my children'
//         ]
//       },
//       believe: {
//         title: 'Your Parenting is Your Greatest Achievement',
//         description: 'Believe that raising confident, capable, caring children is the most important work you\'ll ever do. Your influence extends far beyond your immediate family.',
//         coreBeliefs: [
//           'I have the wisdom and love needed to raise extraordinary children',
//           'My children have unlimited potential that I can help them discover',
//           'The values I teach today will echo through generations',
//           'I can balance being a great parent with pursuing my own growth'
//         ],
//         affirmations: [
//           'I believe I am exactly the parent my children need',
//           'I have the wisdom to guide my children to their full potential',
//           'I believe my parenting will create a positive generational impact',
//           'I am raising future leaders who will change the world for the better'
//         ]
//       },
//       act: {
//         title: 'Intentionally Shape the Next Generation',
//         description: 'Take deliberate actions that help your children develop the mindset, skills, and character they need to thrive in an uncertain world.',
//         actionSteps: [
//           'Model the behavior and mindset you want to see in your children',
//           'Create regular opportunities for meaningful conversations and connection',
//           'Expose your children to diverse experiences that broaden their perspective',
//           'Teach them practical life skills and emotional intelligence',
//           'Balance structure and freedom to help them develop independence'
//         ],
//         affirmations: [
//           'I consistently model the values and behavior I want to see',
//           'I create meaningful connections and learning opportunities daily',
//           'I actively develop my children\'s confidence and capabilities',
//           'I balance guidance with independence to help them thrive'
//         ]
//       }
//     }
//   },
//   'legacy-builders': {
//     'retirees': {
//       feel: {
//         title: 'Embrace Your Wisdom and Freedom',
//         description: 'Feel the satisfaction of a life well-lived and the excitement of having time to pursue what truly matters to you. This is your season of wisdom, contribution, and personal fulfillment.',
//         visualization: 'See yourself using your experience and wisdom to make a meaningful difference in others\' lives. Feel the joy of having time for relationships, passions, and purposes that bring deep fulfillment.',
//         affirmations: [
//           'I feel grateful for the wisdom and experience I have gained',
//           'I am excited about this new chapter of freedom and possibility',
//           'I feel fulfilled knowing I can focus on what truly matters',
//           'Every day I feel blessed to share my knowledge and experience'
//         ]
//       },
//       think: {
//         title: 'Think Like a Wise Contributor',
//         description: 'Your years of experience have given you unique insights and perspectives. Think about how you can share your wisdom and continue growing in ways that bring meaning.',
//         affirmations: [
//           'My experience and wisdom are valuable gifts I can share with others',
//           'I have the freedom to focus on what brings me joy and purpose',
//           'Every day is an opportunity to learn, grow, and contribute',
//           'My legacy is built through the lives I touch and the wisdom I share',
//           'I think about the meaningful impact I can still create'
//         ]
//       },
//       believe: {
//         title: 'Your Best Contributions May Still Be Ahead',
//         description: 'Believe that retirement is not the end of your impact - it\'s the beginning of a new chapter where you can contribute in ways that are truly meaningful to you.',
//         coreBeliefs: [
//           'I have valuable knowledge and experience that can benefit others',
//           'This phase of life offers unique opportunities for growth and contribution',
//           'I can continue learning and pursuing new interests with passion',
//           'My legacy is measured by the positive impact I have on others'
//         ],
//         affirmations: [
//           'I believe my most meaningful contributions may still be ahead',
//           'I have valuable wisdom that can positively impact others',
//           'I believe this chapter of life offers unlimited possibilities',
//           'I am meant to leave a lasting legacy of wisdom and kindness'
//         ]
//       },
//       act: {
//         title: 'Create Your Legacy of Wisdom',
//         description: 'Take actions that allow you to share your wisdom, pursue your passions, and create meaningful connections while maintaining your health and vitality.',
//         actionSteps: [
//           'Mentor young people in your area of expertise',
//           'Pursue learning opportunities in areas that genuinely interest you',
//           'Volunteer for causes that align with your values',
//           'Document and share your life experiences and lessons learned',
//           'Maintain your physical and mental health through regular exercise and social connection'
//         ],
//         affirmations: [
//           'I actively share my wisdom and mentor the next generation',
//           'I pursue new learning and experiences with curiosity and passion',
//           'I contribute to causes that align with my deepest values',
//           'I maintain my health and vitality to maximize my years of impact'
//         ]
//       }
//     }
//   }
// };

// // --- FtbaDisplay Component ---
// interface FtbaDisplayProps {
//   content: {
//     feel: {
//       title: string;
//       description: string;
//       visualization: string;
//       affirmations: string[];
//     };
//     think: {
//       title: string;
//       description: string;
//       affirmations: string[];
//     };
//     believe: {
//       title: string;
//       description: string;
//       coreBeliefs: string[];
//       affirmations: string[];
//     };
//     act: {
//       title: string;
//       description: string;
//       actionSteps: string[];
//       affirmations: string[];
//     };
//   };
//   age: string;
//   category: string;
// }

// const FtbaDisplay: React.FC<FtbaDisplayProps> = ({ content, age, category }) => {
//   const sections = [
//     {
//       key: 'feel',
//       title: 'FEEL',
//       icon: '❤️',
//       data: content.feel
//     },
//     {
//       key: 'think',
//       title: 'THINK',
//       icon: '🧠',
//       data: content.think
//     },
//     {
//       key: 'believe',
//       title: 'BELIEVE',
//       icon: '💎',
//       data: content.believe
//     },
//     {
//       key: 'act',
//       title: 'ACT',
//       icon: '⚡',
//       data: content.act
//     }
//   ];

//   return (
//     <div className="max-w-6xl mx-auto space-y-16">
//       <div className="text-center fade-in">
//         <Badge className="mb-6 bg-accent text-accent-foreground border-border px-8 py-3 rounded-full text-sm">
//           Your Personalized Blueprint
//         </Badge>
//         <h2 className="text-4xl md:text-5xl font-bold mb-6">
//           Your <span className="gradient-text">FTBA Transformation</span> Framework
//         </h2>
//         <p className="text-lg text-muted-foreground font-light leading-relaxed">
//           Tailored specifically for your journey as a <strong className="text-foreground font-medium">{category}</strong> in the <strong className="text-foreground font-medium">{age}</strong> stage
//         </p>
//       </div>

//       <div className="grid gap-8 md:grid-cols-2">
//         {sections.map((section, index) => (
//           <Card key={section.key} className="elegant-card subtle-hover slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
//             <CardHeader className="pb-6">
//               <div className="flex items-center gap-6 mb-6">
//                 <div className="w-16 h-16 bg-gradient-to-br from-foreground/10 to-foreground/5 rounded-2xl flex items-center justify-center text-2xl border border-border/20">
//                   {section.icon}
//                 </div>
//                 <div>
//                   <CardTitle className="text-2xl font-bold text-foreground">{section.title}</CardTitle>
//                   <p className="text-sm text-muted-foreground mt-1 font-medium">{section.data.title}</p>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-8">
//               <p className="text-foreground leading-relaxed">
//                 {section.data.description}
//               </p>

//               <Separator className="bg-border/40" />

//               {section.key === 'feel' && (
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-base">
//                     🎯 Visualization Practice
//                   </h4>
//                   <p className="text-sm text-muted-foreground bg-accent/30 p-6 rounded-xl border border-border/30 leading-relaxed">
//                     {content.feel.visualization}
//                   </p>
//                 </div>
//               )}

//               {section.key === 'believe' && (
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-base">
//                     🔥 Core Beliefs to Adopt
//                   </h4>
//                   <div className="space-y-3">
//                     {content.believe.coreBeliefs.map((belief, idx) => (
//                       <div key={idx} className="flex items-start gap-4 text-sm">
//                         <span className="text-foreground mt-1 font-bold">✓</span>
//                         <span className="text-muted-foreground font-medium leading-relaxed">{belief}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {section.key === 'act' && (
//                 <div>
//                   <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-base">
//                     🚀 Immediate Action Steps
//                   </h4>
//                   <div className="space-y-4">
//                     {content.act.actionSteps.map((step, idx) => (
//                       <div key={idx} className="flex items-start gap-4 text-sm bg-accent/20 p-4 rounded-lg border border-border/30">
//                         <span className="bg-foreground text-background w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
//                           {idx + 1}
//                         </span>
//                         <span className="text-foreground font-medium leading-relaxed">{step}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {/* Power Affirmations for all sections */}
//               <div>
//                 <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-base">
//                   💫 Power Affirmations
//                 </h4>
//                 <div className="space-y-3">
//                   {section.data.affirmations.map((affirmation, idx) => (
//                     <div key={idx} className="flex items-start gap-4 text-sm bg-gradient-to-r from-accent/30 to-accent/20 p-4 rounded-lg border border-border/30">
//                       <span className="text-foreground mt-1 text-base">✨</span>
//                       <span className="text-foreground font-medium italic leading-relaxed">"{affirmation}"</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="mt-16 text-center fade-in-delayed">
//         <Card className="elegant-card bg-gradient-to-r from-accent/40 to-accent/20 border-border/60">
//           <CardContent className="py-12">
//             <h3 className="text-3xl font-bold mb-6 gradient-text">
//               Your Transformation Journey Starts Now
//             </h3>
//             <p className="text-muted-foreground max-w-2xl mx-auto mb-8 font-light leading-relaxed">
//               Remember: Transformation happens in the daily practice of these principles. 
//               Review your FTBA blueprint daily, visualize your success, and take consistent action. 
//               Your future self is counting on the decisions you make today.
//             </p>
//             <div className="bg-accent/40 p-6 rounded-xl border border-border/40 max-w-xl mx-auto">
//               <p className="text-sm text-foreground font-semibold mb-3">💡 Daily Practice Tip:</p>
//               <p className="text-sm text-muted-foreground font-light leading-relaxed">
//                 Read your affirmations aloud each morning with conviction and emotion. 
//                 Feel the truth of each statement as you speak it into existence.
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// // --- Main FTBA Page (from Index.tsx) ---
// const Ftba = () => {
//   const [selectedAge, setSelectedAge] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [ftbaContent, setFtbaContent] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const ageCategories = [
//     { value: 'teens', label: '13–18 (Teens/Students)', description: 'Building foundation & discovering potential' },
//     { value: 'young-adults', label: '19–25 (Young Adults)', description: 'College & career starters' },
//     { value: 'early-professionals', label: '26–35 (Early Professionals)', description: 'Startups & rapid growth phase' },
//     { value: 'mid-life', label: '36–50 (Mid-life Growth Seekers)', description: 'Peak performance & leadership' },
//     { value: 'legacy-builders', label: '51+ (Legacy Builders)', description: 'Senior professionals & wisdom sharers' }
//   ];

//   const lifeCategories = [
//     { value: 'students', label: 'Students', icon: '🎓' },
//     { value: 'employees', label: 'Employees', icon: '💼' },
//     { value: 'entrepreneurs', label: 'Entrepreneurs', icon: '🚀' },
//     { value: 'solopreneurs', label: 'Solopreneurs', icon: '⚡' },
//     { value: 'creatives', label: 'Creatives', icon: '🎨' },
//     { value: 'parents', label: 'Parents', icon: '👨‍👩‍👧‍👦' },
//     { value: 'retirees', label: 'Retirees', icon: '🌅' }
//   ];

//   const handleGenerateFtba = async () => {
//     if (!selectedAge || !selectedCategory) return;
    
//     setIsGenerating(true);
//     // Simulate processing time for dramatic effect
//     await new Promise(resolve => setTimeout(resolve, 1500));
    
//     const content = generateFtbaContent(selectedAge, selectedCategory);
//     setFtbaContent(content);
//     setIsGenerating(false);
//   };

//   function generateFtbaContent(ageGroup, category) {
//     const ageData = ftbaDatabase[ageGroup];
//     if (!ageData) return ftbaDatabase['teens']['students']; // Fallback
//     const content = ageData[category];
//     if (!content) return ftbaDatabase[ageGroup][Object.keys(ageData)[0]]; // Fallback to first in category
//     return content;
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       {/* Hero Section */}
//       <section className="section-spacing mb-32">
//         <div className="container mx-auto container-padding">
//           <div className="text-center max-w-5xl mx-auto space-y-8">
//             <div className="fade-in">
//               <Badge className="mb-6 bg-accent text-accent-foreground border-border text-sm font-medium px-6 py-3 rounded-full">
//                 Revolutionary Mindset Transformation
//               </Badge>
//               <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tight">
//                 <span className="gradient-text">FTBA</span>
//                 <br />
//                 <span className="text-foreground/90">Methodology</span>
//               </h1>
//               <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-4xl mx-auto font-light">
//                 Transform your life through the power of <strong className="text-foreground font-medium">Feel</strong>, <strong className="text-foreground font-medium">Think</strong>, <strong className="text-foreground font-medium">Believe</strong>, and <strong className="text-foreground font-medium">Act</strong>
//               </p>
//             </div>
            
//             <div className="fade-in-delayed">
//               <div className="flex flex-wrap justify-center gap-12 text-sm text-muted-foreground">
//                 <div className="flex items-center gap-3">
//                   <div className="w-1.5 h-1.5 bg-primary rounded-full" />
//                   <span>AI-Powered Personalization</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-1.5 h-1.5 bg-primary rounded-full" />
//                   <span>Psychology-Based Framework</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <div className="w-1.5 h-1.5 bg-primary rounded-full" />
//                   <span>Instant Transformation Blueprint</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* FTBA Explanation */}
//       <section className="section-spacing bg-accent/30 mb-32">
//         <div className="container mx-auto container-padding">
//           <div className="max-w-6xl mx-auto">
//             <div className="text-center mb-20 slide-up">
//               <h2 className="text-4xl font-bold mb-8 text-foreground">
//                 The Science Behind <span className="gradient-text">Transformation</span>
//               </h2>
//               <p className="text-lg text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
//                 FTBA isn't just another self-help method. It's a scientifically-backed framework that rewires your mind from the inside out, creating lasting change through precise psychological triggers.
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16">
//               {[
//                 { letter: 'F', title: 'FEEL', description: 'Connect with your deepest emotions and desires. Emotional alignment is the foundation of all transformation.', color: 'from-foreground/20 to-foreground/10' },
//                 { letter: 'T', title: 'THINK', description: 'Rewire your mental patterns with empowering thoughts. Your mindset determines your reality.', color: 'from-foreground/20 to-foreground/10' },
//                 { letter: 'B', title: 'BELIEVE', description: 'Adopt unshakeable beliefs that support your vision. Belief is the bridge between thoughts and reality.', color: 'from-foreground/20 to-foreground/10' },
//                 { letter: 'A', title: 'ACT', description: 'Take aligned action that manifests your vision. Consistent action creates extraordinary results.', color: 'from-foreground/20 to-foreground/10' }
//               ].map((item, index) => (
//                 <Card key={item.letter} className={`elegant-card subtle-hover slide-up`} style={{ animationDelay: `${index * 0.1}s` }}>
//                   <CardHeader className="text-center pb-6">
//                     <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-foreground text-2xl font-bold border border-border/20`}>
//                       {item.letter}
//                     </div>
//                     <CardTitle className="text-xl font-bold text-foreground">{item.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent className="text-center">
//                     <p className="text-muted-foreground text-sm leading-relaxed">
//                       {item.description}
//                     </p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Personalization Engine */}
//       <section className="section-spacing">
//         <div className="container mx-auto container-padding">
//           <div className="max-w-4xl mx-auto">
//             <Card className="elegant-card border-2 border-border/60 shadow-xl shadow-foreground/5">
//               <CardHeader className="text-center pb-8">
//                 <CardTitle className="text-4xl font-bold mb-6">
//                   Your Personalized <span className="gradient-text">FTBA Blueprint</span>
//                 </CardTitle>
//                 <p className="text-muted-foreground text-lg font-light leading-relaxed">
//                   Get a custom-tailored transformation framework designed specifically for your life stage and goals.
//                 </p>
//               </CardHeader>
//               <CardContent className="space-y-10">
//                 <div className="grid md:grid-cols-2 gap-16">
//                   <div className="space-y-4">
//                     <label className="text-sm font-medium text-foreground tracking-wide">Select Your Life Stage</label>
//                     <Select value={selectedAge} onValueChange={setSelectedAge}>
//                       <SelectTrigger className="h-14 bg-background border-border hover:border-foreground/30 transition-colors text-left">
//                         <SelectValue placeholder="Choose your age group..." />
//                       </SelectTrigger>
//                       <SelectContent className="bg-card border-border shadow-lg">
//                         {ageCategories.map((age) => (
//                           <SelectItem key={age.value} value={age.value} className="hover:bg-accent">
//                             <div className="py-2">
//                               <div className="font-medium text-foreground">{age.label}</div>
//                               <div className="text-xs text-muted-foreground mt-1">{age.description}</div>
//                             </div>
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   <div className="space-y-4">
//                     <label className="text-sm font-medium text-foreground tracking-wide">Select Your Category</label>
//                     <Select value={selectedCategory} onValueChange={setSelectedCategory}>
//                       <SelectTrigger className="h-14 bg-background border-border hover:border-foreground/30 transition-colors text-left">
//                         <SelectValue placeholder="Choose your role..." />
//                       </SelectTrigger>
//                       <SelectContent className="bg-card border-border shadow-lg">
//                         {lifeCategories.map((category) => (
//                           <SelectItem key={category.value} value={category.value} className="hover:bg-accent">
//                             <div className="flex items-center gap-3 py-2">
//                               <span className="text-lg">{category.icon}</span>
//                               <span className="font-medium text-foreground">{category.label}</span>
//                             </div>
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                   </div>
//                 </div>

//                 <Separator className="bg-border/60" />

//                 <div className="text-center">
//                   <Button 
//                     onClick={handleGenerateFtba}
//                     disabled={!selectedAge || !selectedCategory || isGenerating}
//                     className="h-16 px-12 text-lg font-medium bg-foreground hover:bg-foreground/90 text-background transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
//                   >
//                     {isGenerating ? (
//                       <div className="flex items-center gap-3">
//                         <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
//                         Generating Your Blueprint...
//                       </div>
//                     ) : (
//                       'Generate My FTBA Blueprint'
//                     )}
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </div>
//         </div>
//       </section>

//       {/* FTBA Results */}
//       {ftbaContent && (
//         <section className="section-spacing bg-accent/20 mb-32">
//           <div className="container mx-auto container-padding">
//             <FtbaDisplay content={ftbaContent} age={selectedAge} category={selectedCategory} />
//           </div>
//         </section>
//       )}

//       {/* Call to Action */}
//       <section className="section-spacing">
//         <div className="container mx-auto container-padding">
//           <div className="text-center max-w-4xl mx-auto space-y-8">
//             <h3 className="text-4xl font-bold mb-8">
//               Ready to <span className="gradient-text">Transform Your Life</span>?
//             </h3>
//             <p className="text-lg text-muted-foreground mb-12 font-light leading-relaxed">
//               Your personalized FTBA blueprint is just the beginning. The power to change your life lies in your commitment to consistent action.
//             </p>
//             <div className="flex flex-wrap justify-center gap-6">
//               <Badge variant="outline" className="px-6 py-3 border-border text-foreground text-sm">
//                 Psychology-Backed
//               </Badge>
//               <Badge variant="outline" className="px-6 py-3 border-border text-foreground text-sm">
//                 Instantly Actionable
//               </Badge>
//               <Badge variant="outline" className="px-6 py-3 border-border text-foreground text-sm">
//                 Scientifically Proven
//               </Badge>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default Ftba;

import React, { useState } from 'react';

// Types
interface FtbaContent {
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
}

// Database
const ftbaDatabase: Record<string, Record<string, FtbaContent>> = {
  'teens': {
    'students': {
      feel: {
        title: 'Connect with Your Unlimited Potential',
        description: 'At this pivotal moment in your life, you have the power to shape your entire future. Feel the excitement of endless possibilities and the strength that comes from knowing you can become anyone you choose to be.',
        visualization: 'Close your eyes and see yourself 10 years from now, living your dream life. Feel the pride of your achievements and the gratitude for starting your journey today. Let this feeling of excitement and possibility fill every cell of your body.',
        affirmations: [
          'I am unstoppable when I set my mind to something',
          'My potential is limitless and my future is bright',
          'I feel excited about all the amazing possibilities ahead of me',
          'Every day I grow stronger, smarter, and more confident'
        ]
      },
      think: {
        title: 'Adopt the Growth Mindset of Champions',
        description: 'Your brain is like a muscle that grows stronger with every challenge. Replace limiting thoughts with empowering beliefs about your capacity to learn, grow, and achieve extraordinary things.',
        affirmations: [
          'Every challenge is making me stronger and smarter',
          'I am building the foundation for an extraordinary life',
          'My potential is unlimited, and I choose to unlock it daily',
          'I learn from every experience and use it to grow',
          'I think like a champion and act like a winner'
        ]
      },
      believe: {
        title: 'Embrace Your Destiny as a Future Leader',
        description: 'You are not just a student - you are a future leader, innovator, and change-maker. The world needs what you have to offer, and you have everything it takes to make a massive impact.',
        coreBeliefs: [
          'I am capable of achieving anything I set my mind to',
          'My education is my superpower for changing the world',
          'Every day I invest in learning, I invest in my future success',
          'I have unique talents that the world needs'
        ],
        affirmations: [
          'I believe in my ability to create an extraordinary life',
          'I am destined for greatness and I claim it now',
          'I have everything within me to succeed beyond my wildest dreams',
          'I believe I can achieve anything I truly desire'
        ]
      },
      act: {
        title: 'Take Daily Action Toward Your Vision',
        description: 'Success is built through consistent daily actions. Start building habits now that will compound into extraordinary results over time.',
        actionSteps: [
          'Write down your 5-year vision and read it every morning',
          'Study with purpose - ask yourself how each lesson connects to your goals',
          'Network with people who inspire you and share your ambitions',
          'Develop one new skill each month that aligns with your vision',
          'Take care of your body and mind through exercise and mindfulness'
        ],
        affirmations: [
          'I take massive action toward my dreams every single day',
          'Every action I take moves me closer to my goals',
          'I am consistent, disciplined, and focused on my success',
          'I turn my dreams into reality through persistent action'
        ]
      }
    },
    'employees': {
      feel: {
        title: 'Embrace Your Professional Journey',
        description: 'Starting your career is an incredible achievement. Feel proud of your initiative and excited about the professional skills and relationships you\'re building.',
        visualization: 'Imagine yourself five years from now, having mastered valuable skills and built meaningful professional relationships.',
        affirmations: [
          'I feel proud of my professional growth',
          'I am excited about developing new skills',
          'I feel confident in my abilities',
          'Every day I become more valuable'
        ]
      },
      think: {
        title: 'Think Like a Future Executive',
        description: 'You\'re not just an employee - you\'re a professional in training. Approach every task as an opportunity to develop skills.',
        affirmations: [
          'I am building valuable skills daily',
          'I see opportunities everywhere',
          'My work ethic sets me apart',
          'I think strategically about my future'
        ]
      },
      believe: {
        title: 'Your Career is Your Canvas',
        description: 'Believe that your first job is the foundation for an incredible career. You have the power to shape your professional identity.',
        coreBeliefs: [
          'Every role teaches me something valuable',
          'I can advance through dedication',
          'My career is a journey of growth',
          'I attract opportunities through excellence'
        ],
        affirmations: [
          'I believe in my career potential',
          'I am worthy of success',
          'Every experience prepares me',
          'I have unlimited growth potential'
        ]
      },
      act: {
        title: 'Build Your Professional Foundation',
        description: 'Take strategic actions that will accelerate your career growth and establish you as a rising star.',
        actionSteps: [
          'Exceed expectations in every task',
          'Seek and implement feedback',
          'Build relationships with mentors',
          'Learn beyond your job description',
          'Document your achievements'
        ],
        affirmations: [
          'I consistently exceed expectations',
          'I actively seek growth',
          'I build strong relationships',
          'I take ownership of my success'
        ]
      }
    }
  },
  'young-adults': {
    'students': {
      feel: {
        title: 'Harness Your Focused Ambition',
        description: 'This is your time to build the foundation for your dream life. Feel the intensity of your ambition.',
        visualization: 'See yourself graduating with the skills, network, and mindset of a future leader.',
        affirmations: [
          'I feel motivated to achieve my goals',
          'I am passionate about my future',
          'I feel energized by challenges',
          'I grow more confident daily'
        ]
      },
      think: {
        title: 'Master the Mindset of Excellence',
        description: 'You\'re preparing to compete at the highest levels. Think like someone who will shape industries.',
        affirmations: [
          'I prepare for extraordinary success',
          'Every skill multiplies my opportunities',
          'I attract mentors through excellence',
          'I think like a future leader'
        ]
      },
      believe: {
        title: 'You Are Tomorrow\'s Leader',
        description: 'Believe that you\'re preparing to revolutionize your field. Your generation will solve new problems.',
        coreBeliefs: [
          'I can become a field leader',
          'My skills are what the world needs',
          'I can master any skill',
          'My network is my greatest asset'
        ],
        affirmations: [
          'I am destined for leadership',
          'I have unique gifts to share',
          'I can solve complex problems',
          'I am becoming an expert'
        ]
      },
      act: {
        title: 'Execute Your Strategic Advantage',
        description: 'Take actions that give you an advantage and position you for extraordinary opportunities.',
        actionSteps: [
          'Build a project portfolio',
          'Seek industry leader experiences',
          'Create expert content',
          'Join professional organizations',
          'Develop your personal brand'
        ],
        affirmations: [
          'I take strategic action',
          'I build my expertise',
          'I create opportunities',
          'I position myself for success'
        ]
      }
    },
    'entrepreneurs': {
      feel: {
        title: 'Channel Your Entrepreneurial Fire',
        description: 'Feel the desire to create something meaningful. You have the energy to solve problems others don\'t see.',
        visualization: 'Picture yourself leading a thriving business that creates value for thousands.',
        affirmations: [
          'I feel entrepreneurial fire within',
          'I am excited to create value',
          'I feel unstoppable',
          'Setbacks fuel my determination'
        ]
      },
      think: {
        title: 'Adopt the Value Creation Mindset',
        description: 'Think like someone who sees solutions everywhere. Every problem is an opportunity.',
        affirmations: [
          'I see opportunities in problems',
          'Setbacks teach me valuable lessons',
          'I have creative persistence',
          'I think like a problem-solver'
        ]
      },
      believe: {
        title: 'You Are Destined for Greatness',
        description: 'Believe that your entrepreneurial instincts are your superpower. You can build something meaningful.',
        coreBeliefs: [
          'I have unique problem-solving insights',
          'Failure is valuable feedback',
          'I can learn any necessary skill',
          'My business will create impact'
        ],
        affirmations: [
          'I am meant to build something great',
          'I have vision and determination',
          'I can turn ideas into reality',
          'I am destined for success'
        ]
      },
      act: {
        title: 'Build Your Empire Step by Step',
        description: 'Take consistent action to validate your ideas and create momentum toward your breakthrough.',
        actionSteps: [
          'Test ideas with real customers',
          'Study successful entrepreneurs',
          'Build and iterate your product',
          'Network with mentors',
          'Develop business skills'
        ],
        affirmations: [
          'I take consistent action',
          'I learn from every experience',
          'I build strong relationships',
          'I create value for others'
        ]
      }
    }
  },
  'early-professionals': {
    'employees': {
      feel: {
        title: 'Embrace Your Professional Power',
        description: 'You\'re in your prime career-building years. Feel the excitement of rapid growth.',
        visualization: 'See yourself as a respected professional, leading projects and mentoring others.',
        affirmations: [
          'I feel confident in my abilities',
          'I am excited about growth',
          'I feel valued and respected',
          'Challenges make me stronger'
        ]
      },
      think: {
        title: 'Think Like a Future Leader',
        description: 'Your mindset is your greatest asset. Think strategically about your career path.',
        affirmations: [
          'I think strategically',
          'I see growth opportunities',
          'I approach challenges positively',
          'I think like a leader'
        ]
      },
      believe: {
        title: 'You Are a Rising Star',
        description: 'Believe in your potential to become a leader. Your experience and perspective are valuable.',
        coreBeliefs: [
          'I have unique value to offer',
          'My growth is unlimited',
          'I can master any skill',
          'I am becoming a leader'
        ],
        affirmations: [
          'I believe in my success',
          'I am worthy of advancement',
          'I can create positive change',
          'I am becoming my best self'
        ]
      },
      act: {
        title: 'Take Strategic Career Actions',
        description: 'Make deliberate choices that accelerate your career growth.',
        actionSteps: [
          'Seek leadership opportunities',
          'Build your professional network',
          'Develop emerging expertise',
          'Find and become a mentor',
          'Create a career plan'
        ],
        affirmations: [
          'I take strategic action',
          'I deliver exceptional results',
          'I build valuable relationships',
          'I am proactive about growth'
        ]
      }
    }
  },
  'mid-life': {
    'entrepreneurs': {
      feel: {
        title: 'Embrace Your Season of Impact',
        description: 'This is your time to leverage your experience. Feel the power of your wisdom.',
        visualization: 'See yourself as a seasoned entrepreneur, creating value and mentoring others.',
        affirmations: [
          'I feel confident in my impact',
          'I am excited to create value',
          'I feel grateful for my wisdom',
          'I embrace new opportunities'
        ]
      },
      think: {
        title: 'Think Like a Visionary Leader',
        description: 'Your experience gives you unique insights. Think strategically about impact.',
        affirmations: [
          'I think strategically',
          'I see innovation opportunities',
          'I approach challenges wisely',
          'I think like a leader'
        ]
      },
      believe: {
        title: 'You Are a Business Visionary',
        description: 'Believe in your ability to create something extraordinary. Your experience is valuable.',
        coreBeliefs: [
          'I have wisdom to build something great',
          'My experience gives me insights',
          'I can create lasting impact',
          'I am becoming a leader'
        ],
        affirmations: [
          'I believe in my impact',
          'I am worthy of success',
          'I can create positive change',
          'I am becoming a leader'
        ]
      },
      act: {
        title: 'Take Strategic Business Actions',
        description: 'Make deliberate choices that grow your business and create impact.',
        actionSteps: [
          'Develop a growth plan',
          'Build and delegate to a team',
          'Create growth systems',
          'Mentor others',
          'Invest in innovation'
        ],
        affirmations: [
          'I take strategic action',
          'I create value consistently',
          'I build strong relationships',
          'I am proactive about growth'
        ]
      }
    }
  },
  'legacy-builders': {
    'retirees': {
      feel: {
        title: 'Embrace Your Season of Wisdom',
        description: 'This is your time to share wisdom and create impact. Feel the satisfaction of your achievements.',
        visualization: 'See yourself as a respected mentor, sharing wisdom and creating positive change.',
        affirmations: [
          'I feel proud of my achievements',
          'I am excited to share wisdom',
          'I feel grateful for my experiences',
          'I embrace new opportunities'
        ]
      },
      think: {
        title: 'Think Like a Wisdom Keeper',
        description: 'Your life experience gives you unique insights. Think about sharing wisdom.',
        affirmations: [
          'I think strategically',
          'I see sharing opportunities',
          'I approach life with gratitude',
          'I think like a mentor'
        ]
      },
      believe: {
        title: 'You Are a Wisdom Keeper',
        description: 'Believe in your ability to create impact. Your life experience is valuable.',
        coreBeliefs: [
          'I have wisdom to share',
          'My experience gives insights',
          'I can create lasting impact',
          'I am becoming a respected elder'
        ],
        affirmations: [
          'I believe in my impact',
          'I am worthy of respect',
          'I can create positive change',
          'I am becoming a mentor'
        ]
      },
      act: {
        title: 'Take Strategic Legacy Actions',
        description: 'Make deliberate choices that create impact and share your wisdom.',
        actionSteps: [
          'Share wisdom through mentoring',
          'Document life experiences',
          'Create intergenerational connections',
          'Volunteer your expertise',
          'Build a positive legacy'
        ],
        affirmations: [
          'I take strategic action',
          'I share wisdom consistently',
          'I build meaningful relationships',
          'I am proactive about legacy'
        ]
      }
    }
  }
};

// Helper Functions
function getDefaultContent(): FtbaContent {
  return {
    feel: {
      title: 'Connect with Your Inner Power',
      description: 'Begin your transformation by connecting with your deepest emotions and desires.',
      visualization: 'Visualize yourself achieving your goals and living your dream life.',
      affirmations: [
        'I am capable of achieving anything I set my mind to',
        'I feel confident and powerful in my abilities',
        'I am worthy of success and happiness'
      ]
    },
    think: {
      title: 'Master Your Mindset',
      description: 'Transform your thoughts to create the reality you desire.',
      affirmations: [
        'I think positively and constructively',
        'I am in control of my thoughts and emotions',
        'I choose thoughts that empower me'
      ]
    },
    believe: {
      title: 'Build Unshakeable Beliefs',
      description: 'Develop core beliefs that support your vision and goals.',
      coreBeliefs: [
        'I am capable of achieving my goals',
        'I deserve success and happiness',
        'I can overcome any obstacle'
      ],
      affirmations: [
        'I believe in my ability to succeed',
        'I trust in my journey and my growth',
        'I am becoming the best version of myself'
      ]
    },
    act: {
      title: 'Take Inspired Action',
      description: 'Transform your vision into reality through consistent action.',
      actionSteps: [
        'Set clear, achievable goals',
        'Create a daily action plan',
        'Take consistent steps toward your goals'
      ],
      affirmations: [
        'I take action toward my goals every day',
        'I am committed to my success',
        'I make progress through consistent action'
      ]
    }
  };
}

function generateFtbaContent(ageGroup: string, category: string): FtbaContent {
  const ageContent = ftbaDatabase[ageGroup];
  if (!ageContent) return getDefaultContent();
  
  const categoryContent = ageContent[category];
  if (!categoryContent) return getDefaultContent();
  
  return categoryContent;
}

// UI Components
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-card border border-border rounded-lg shadow-lg ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <h3 className={`text-xl font-bold text-foreground ${className}`}>
    {children}
  </h3>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

const Badge: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${className}`}>
    {children}
  </span>
);

const Separator: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={h-px w-full bg-border ${className}} />
);

const Button: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}> = ({ children, onClick, disabled = false, className = '' }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={px-4 py-2 rounded-lg font-medium transition-colors ${className}}
  >
    {children}
  </button>
);

const Select: React.FC<{
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
}> = ({ value, onValueChange, children }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className="w-full p-2 rounded-lg border border-border bg-background"
  >
    {children}
  </select>
);

const SelectTrigger: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={w-full p-2 rounded-lg border border-border bg-background ${className}}>
    {children}
  </div>
);

const SelectValue: React.FC<{ placeholder: string }> = ({ placeholder }) => (
  <div className="text-muted-foreground">{placeholder}</div>
);

const SelectContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg ${className}}>
    {children}
  </div>
);

const SelectItem: React.FC<{ 
  value: string; 
  children: React.ReactNode;
  className?: string;
}> = ({ value, children, className = '' }) => (
  <div className={p-2 hover:bg-accent cursor-pointer ${className}}>
    {children}
  </div>
);

// Main Components
const FtbaDisplay: React.FC<{ content: FtbaContent; age: string; category: string }> = ({ content, age, category }) => {
  const sections = [
    {
      key: 'feel',
      title: 'FEEL',
      icon: '❤',
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
          <Card key={section.key} className="elegant-card subtle-hover slide-up" style={{ animationDelay: ${index * 0.15}s }}>
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

// Main App Component
const FtbaApp: React.FC = () => {
  const [selectedAge, setSelectedAge] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [ftbaContent, setFtbaContent] = useState<FtbaContent | null>(null);
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
    { value: 'creatives', label: 'Creatives', icon: '🎨' },
    { value: 'parents', label: 'Parents', icon: '👨‍👩‍👧‍👦' },
    { value: 'retirees', label: 'Retirees', icon: '🌅' }
  ];

  const handleGenerateFtba = async () => {
    if (!selectedAge || !selectedCategory) return;
    
    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const content = generateFtbaContent(selectedAge, selectedCategory);
    setFtbaContent(content);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-background">
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
                <Card key={item.letter} className={elegant-card subtle-hover slide-up} style={{ animationDelay: ${index * 0.1}s }}>
                  <CardHeader className="text-center pb-6">
                    <div className={w-20 h-20 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-foreground text-2xl font-bold border border-border/20}>
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

      {ftbaContent && (
        <section className="section-spacing bg-accent/20">
          <div className="container mx-auto container-padding">
            <FtbaDisplay content={ftbaContent} age={selectedAge} category={selectedCategory} />
          </div>
        </section>
      )}

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

export default FtbaApp;