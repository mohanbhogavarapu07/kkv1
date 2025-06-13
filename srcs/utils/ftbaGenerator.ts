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
        description: 'Starting your career is an incredible achievement. Feel proud of your initiative and excited about the professional skills and relationships you are building. Every day at work is an investment in your future.',
        visualization: 'Imagine yourself five years from now, having mastered valuable skills and built meaningful professional relationships. Feel the confidence that comes from proving yourself capable and reliable in the working world.',
        affirmations: [
          'I feel proud of my professional growth and achievements',
          'I am excited about the skills I am developing every day',
          'I feel confident in my ability to excel in my career',
          'Every day at work, I feel myself becoming more valuable and skilled'
        ]
      },
      think: {
        title: 'Think Like a Future Executive',
        description: 'You are not just an employee - you are a professional in training. Approach every task as an opportunity to develop skills that will serve you throughout your entire career.',
        affirmations: [
          'I am building valuable skills with every task I complete',
          'I see opportunities where others see obstacles',
          'My work ethic and attitude set me apart from my peers',
          'I am creating my professional reputation with every interaction',
          'I think strategically about my career and my future'
        ]
      },
      believe: {
        title: 'Your Career is Your Canvas',
        description: 'Believe that your first job is the foundation for an incredible career. You have the power to shape your professional identity and create opportunities for advancement.',
        coreBeliefs: [
          'Every role teaches me something valuable for my future',
          'I have the ability to advance quickly through dedication and excellence',
          'My career is a journey of continuous growth and learning',
          'I attract opportunities by being excellent at what I do'
        ],
        affirmations: [
          'I believe in my ability to build an extraordinary career',
          'I am worthy of success and advancement in my field',
          'I believe every experience is preparing me for something greater',
          'I have unlimited potential for professional growth'
        ]
      },
      act: {
        title: 'Build Your Professional Foundation',
        description: 'Take strategic actions that will accelerate your career growth and establish you as a rising star in your field.',
        actionSteps: [
          'Exceed expectations in every task, no matter how small',
          'Seek feedback actively and implement it immediately',
          'Build relationships with colleagues and mentors',
          'Learn skills beyond your job description',
          'Document your achievements and impact regularly'
        ],
        affirmations: [
          'I consistently exceed expectations and deliver excellent results',
          'I actively seek growth opportunities and embrace challenges',
          'I build strong professional relationships wherever I go',
          'I take ownership of my career development and success'
        ]
      }
    },
    'job-seekers': {
      feel: {
        title: 'Transform Job Hunting into Opportunity Discovery',
        description: 'Feel excited about this phase of exploration and growth. Each application and interview is bringing you closer to your ideal opportunity and helping you clarify what you truly want.',
        visualization: 'Picture yourself walking into your dream job on your first day, feeling confident and excited about the contribution you will make. Feel the satisfaction of finding the perfect match for your skills and aspirations.',
        affirmations: [
          'I feel confident about my value and what I bring to employers',
          'I am excited about discovering the perfect opportunity for me',
          'I feel energized by the process of finding my ideal role',
          'Every rejection brings me closer to the right opportunity'
        ]
      },
      think: {
        title: 'Adopt the Mindset of a Strategic Career Builder',
        description: 'Think of job searching as market research for your career. You are not just looking for any job - you are finding the right platform to showcase your talents and grow.',
        affirmations: [
          'I am a valuable asset that the right employer is looking for',
          'Every interview is an opportunity to practice and improve',
          'I approach job searching with strategy and confidence',
          'My unique combination of skills makes me irreplaceable',
          'I am building relationships, not just applying for jobs'
        ]
      },
      believe: {
        title: 'Your Perfect Role is Seeking You Too',
        description: 'Believe that there is an employer out there who needs exactly what you offer. Your job search is a mutual discovery process where you are both finding the perfect match.',
        coreBeliefs: [
          'The right opportunity will recognize my value immediately',
          'My skills and experience are exactly what someone needs',
          'Job searching is helping me become clearer about my goals',
          'Every experience in this process is making me stronger'
        ],
        affirmations: [
          'I believe my perfect role is actively seeking me',
          'I am worthy of a position that values and develops my talents',
          'I believe in my ability to find meaningful work',
          'The right opportunity will appear at the perfect time'
        ]
      },
      act: {
        title: 'Execute Your Strategic Job Search',
        description: 'Take focused actions that position you as the ideal candidate and help you discover opportunities that align with your values and goals.',
        actionSteps: [
          'Research companies and roles that align with your values and goals',
          'Customize your resume and cover letter for each application',
          'Network actively and build relationships in your target industry',
          'Practice interviewing and refine your personal brand story',
          'Follow up professionally and maintain connections'
        ],
        affirmations: [
          'I take strategic action in my job search every day',
          'I present myself professionally and authentically',
          'I build valuable relationships throughout my search process',
          'I am persistent and professional in all my communications'
        ]
      }
    },
    'freelancers': {
      feel: {
        title: 'Embrace Your Creative Freedom',
        description: 'Feel the excitement of being your own boss and the satisfaction of choosing projects that align with your values. You have the freedom to create your ideal work life.',
        visualization: 'Picture yourself working on exciting projects with clients you love, setting your own schedule, and earning income that reflects your true value. Feel the pride of building something entirely your own.',
        affirmations: [
          'I feel empowered by my independence and freedom',
          'I am excited about the variety and creativity in my work',
          'I feel confident in my ability to deliver exceptional value',
          'Every project teaches me something new and valuable'
        ]
      },
      think: {
        title: 'Master the Freelancer Success Mindset',
        description: 'Think like a business owner who happens to be the primary service provider. You are not just selling your time - you are selling solutions and transformation.',
        affirmations: [
          'I think strategically about building my freelance business',
          'My skills and expertise are in high demand',
          'I attract clients who value quality and are willing to pay for it',
          'Every challenge makes me a more skilled and valuable freelancer',
          'I am building a sustainable and profitable business'
        ]
      },
      believe: {
        title: 'Your Skills Are Your Superpower',
        description: 'Believe that your unique combination of skills, experience, and creativity makes you irreplaceable. You have the power to choose your path and create your ideal lifestyle.',
        coreBeliefs: [
          'My skills and expertise are valuable and in demand',
          'I can build a thriving business around my talents',
          'Clients are willing to pay premium rates for exceptional work',
          'I have the freedom to design my ideal work life'
        ],
        affirmations: [
          'I believe in the value I bring to every project',
          'I am building a sustainable freelance business',
          'I believe I can earn excellent income through my skills',
          'My expertise opens doors to amazing opportunities'
        ]
      },
      act: {
        title: 'Build Your Freelance Empire',
        description: 'Take strategic actions to build a sustainable freelance business that provides both financial freedom and personal fulfillment.',
        actionSteps: [
          'Develop a strong portfolio that showcases your best work',
          'Build your thought leadership through content and speaking',
          'Create systems that scale your impact beyond one-on-one work',
          'Collect and share client success stories and testimonials',
          'Continuously develop your skills and expand your expertise'
        ],
        affirmations: [
          'I consistently deliver exceptional results for my clients',
          'I build my reputation as a trusted expert and thought leader',
          'I create systems that scale my impact and expertise',
          'I continuously invest in my own growth to better serve others'
        ]
      }
    },
    'career-changers': {
      feel: {
        title: 'Embrace the Courage of Transformation',
        description: 'Feel proud of your courage to pursue a path that truly aligns with your values and passions. This transition is an investment in your happiness and fulfillment.',
        visualization: 'See yourself thriving in your new career, using skills you are passionate about and making the impact you have always wanted. Feel the satisfaction of following your authentic path.',
        affirmations: [
          'I feel brave and excited about my career transformation',
          'I am proud of myself for pursuing what truly matters to me',
          'I feel energized by learning new skills and exploring new possibilities',
          'Every step of this journey is leading me to my ideal career'
        ]
      },
      think: {
        title: 'Think Like a Strategic Career Architect',
        description: 'Your previous experience is not a waste - it is a unique advantage. Think about how to leverage your existing skills while building new ones.',
        affirmations: [
          'My diverse experience gives me a unique perspective and advantage',
          'I can learn new skills while leveraging what I already know',
          'Career change is an investment in my long-term happiness',
          'My maturity and experience accelerate my learning',
          'I think strategically about building my new career path'
        ]
      },
      believe: {
        title: 'It is Never Too Late to Follow Your Dreams',
        description: 'Believe that your career change is perfectly timed. You have the wisdom, skills, and motivation to succeed in your new field.',
        coreBeliefs: [
          'I have the skills and determination to succeed in my new field',
          'My life experience is an asset in my career transition',
          'It is never too late to pursue work that fulfills me',
          'I can successfully transition to a career I am passionate about'
        ],
        affirmations: [
          'I believe this career change will transform my life for the better',
          'I have everything I need to succeed in my new field',
          'I believe in my ability to master new skills and concepts',
          'My career change is perfectly timed and aligned'
        ]
      },
      act: {
        title: 'Execute Your Career Transformation Plan',
        description: 'Take strategic actions to transition smoothly into your new career while leveraging your existing strengths and experience.',
        actionSteps: [
          'Identify transferable skills from your previous experience',
          'Build new skills through courses, certifications, or volunteer work',
          'Network with professionals in your target field',
          'Consider transitional roles that bridge your old and new careers',
          'Create a timeline and financial plan for your transition'
        ],
        affirmations: [
          'I take consistent action toward my new career every day',
          'I leverage my existing strengths while building new skills',
          'I network effectively and build relationships in my new field',
          'I plan my transition strategically and execute it confidently'
        ]
      }
    }
  },
  'young-adults': {
    'students': {
      feel: {
        title: 'Harness the Power of Focused Ambition',
        description: 'This is your time to be laser-focused on building the foundation for your dream life. Feel the intensity of your ambition and the satisfaction that comes from knowing you are investing in your future every single day.',
        visualization: 'See yourself graduating not just with a degree, but with the skills, network, and mindset of a future leader. Feel the pride of knowing you maximized every opportunity during these crucial years.',
        affirmations: [
          'I feel intensely motivated to achieve my ambitious goals',
          'I am passionate about creating an extraordinary future',
          'I feel energized by the challenges that will make me stronger',
          'Every day I feel more confident in my ability to succeed'
        ]
      },
      think: {
        title: 'Master the Mindset of Excellence',
        description: 'You are not just getting educated - you are preparing to compete at the highest levels. Think like someone who will shape industries and solve major problems.',
        affirmations: [
          'I am preparing for extraordinary success through deliberate practice',
          'Every skill I master now multiplies my future opportunities',
          'I attract mentors and opportunities through my commitment to excellence',
          'My education is my rocket fuel for changing the world',
          'I think like a leader and future industry innovator'
        ]
      },
      believe: {
        title: 'You Are Tomorrow\'s Industry Leader',
        description: 'Believe that you are not just preparing for a job - you are preparing to revolutionize your field. Your generation will solve problems that previous generations could not imagine.',
        coreBeliefs: [
          'I have the potential to become a leader in my chosen field',
          'My unique perspective and skills are exactly what the world needs',
          'I can learn anything and master any skill I choose to focus on',
          'My network and knowledge are my greatest professional assets'
        ],
        affirmations: [
          'I believe I am destined to become a leader in my field',
          'I have unique gifts that will revolutionize my industry',
          'I believe in my power to solve complex problems and create value',
          'I am becoming the expert the world needs and wants'
        ]
      },
      act: {
        title: 'Execute Your Strategic Advantage',
        description: 'Take actions that give you an unfair advantage over your peers and position you for extraordinary opportunities after graduation.',
        actionSteps: [
          'Build a portfolio of real-world projects in your field',
          'Seek internships and experiences with industry leaders',
          'Create content that demonstrates your expertise and passion',
          'Join professional organizations and attend industry events',
          'Develop a personal brand that showcases your unique value'
        ],
        affirmations: [
          'I take strategic action that gives me an unfair advantage',
          'I consistently build my expertise and demonstrate my value',
          'I actively create opportunities for my future success',
          'I position myself as a rising star in my chosen field'
        ]
      }
    },
    'entrepreneurs': {
      feel: {
        title: 'Channel Your Entrepreneurial Fire',
        description: 'Feel the burning desire to create something meaningful and the excitement of building your own path. You have the energy and creativity to solve problems that others do not even see.',
        visualization: 'Picture yourself leading a thriving business that creates value for thousands of people. Feel the satisfaction of building something from nothing and the impact you are making on the world.',
        affirmations: [
          'I feel the fire of entrepreneurship burning within me',
          'I am excited about the value I will create for others',
          'I feel unstoppable in pursuing my business vision',
          'Every setback fuels my determination to succeed even more'
        ]
      },
      think: {
        title: 'Adopt the Mindset of Value Creation',
        description: 'Think like someone who sees solutions everywhere. Every problem is an opportunity to create value, and every failure is valuable data for your next breakthrough.',
        affirmations: [
          'I see opportunities where others see problems',
          'Every setback teaches me what I need to know for massive success',
          'I have the creativity and persistence to build something amazing',
          'My business will create value for countless people',
          'I think like a problem-solver and value creator'
        ]
      },
      believe: {
        title: 'You Are Destined to Build Something Great',
        description: 'Believe that your entrepreneurial instincts are your superpower. You have what it takes to build a business that does not just succeed financially, but creates meaningful impact.',
        coreBeliefs: [
          'I have unique insights that can solve real problems',
          'Failure is just feedback that helps me build better solutions',
          'I can learn any skill necessary to make my vision reality',
          'My business will create freedom and impact for me and others'
        ],
        affirmations: [
          'I believe I am meant to build something extraordinary',
          'I have the vision and determination to create massive impact',
          'I believe in my ability to turn ideas into profitable reality',
          'I am destined to build a business that changes lives'
        ]
      },
      act: {
        title: 'Build Your Empire Step by Step',
        description: 'Take consistent action to validate your ideas, build your skills, and create momentum toward your entrepreneurial breakthrough.',
        actionSteps: [
          'Test your business idea with real customers before building',
          'Study successful entrepreneurs and model their strategies',
          'Build a minimum viable product and iterate based on feedback',
          'Network with other entrepreneurs and potential mentors',
          'Develop your financial literacy and business management skills'
        ],
        affirmations: [
          'I take consistent action to build my entrepreneurial empire',
          'I validate my ideas and adapt quickly based on market feedback',
          'I learn from successful entrepreneurs and apply their strategies',
          'Every day I take steps that bring my business vision to life'
        ]
      }
    },
    'freelancers': {
      feel: {
        title: 'Embrace Your Creative Freedom',
        description: 'Feel the excitement of being your own boss and the satisfaction of choosing projects that align with your values. You have the freedom to create your ideal work life.',
        visualization: 'Picture yourself working on exciting projects with clients you love, setting your own schedule, and earning income that reflects your true value. Feel the pride of building something entirely your own.',
        affirmations: [
          'I feel empowered by my independence and freedom',
          'I am excited about the variety and creativity in my work',
          'I feel confident in my ability to deliver exceptional value',
          'Every project teaches me something new and valuable'
        ]
      },
      think: {
        title: 'Master the Freelancer Success Mindset',
        description: 'Think like a business owner who happens to be the primary service provider. You are not just selling your time - you are selling solutions and transformation.',
        affirmations: [
          'I think strategically about building my freelance business',
          'My skills and expertise are in high demand',
          'I attract clients who value quality and are willing to pay for it',
          'Every challenge makes me a more skilled and valuable freelancer',
          'I am building a sustainable and profitable business'
        ]
      },
      believe: {
        title: 'Your Skills Are Your Superpower',
        description: 'Believe that your unique combination of skills, experience, and creativity makes you irreplaceable. You have the power to choose your path and create your ideal lifestyle.',
        coreBeliefs: [
          'My skills and expertise are valuable and in demand',
          'I can build a thriving business around my talents',
          'Clients are willing to pay premium rates for exceptional work',
          'I have the freedom to design my ideal work life'
        ],
        affirmations: [
          'I believe in the value I bring to every project',
          'I am building a sustainable freelance business',
          'I believe I can earn excellent income through my skills',
          'My expertise opens doors to amazing opportunities'
        ]
      },
      act: {
        title: 'Build Your Freelance Empire',
        description: 'Take strategic actions to build a sustainable freelance business that provides both financial freedom and personal fulfillment.',
        actionSteps: [
          'Develop a strong portfolio that showcases your best work',
          'Build your thought leadership through content and speaking',
          'Create systems that scale your impact beyond one-on-one work',
          'Collect and share client success stories and testimonials',
          'Continuously develop your skills and expand your expertise'
        ],
        affirmations: [
          'I consistently deliver exceptional results for my clients',
          'I build my reputation as a trusted expert and thought leader',
          'I create systems that scale my impact and expertise',
          'I continuously invest in my own growth to better serve others'
        ]
      }
    },
    'career-changers': {
      feel: {
        title: 'Embrace the Courage of Transformation',
        description: 'Feel proud of your courage to pursue a path that truly aligns with your values and passions. This transition is an investment in your happiness and fulfillment.',
        visualization: 'See yourself thriving in your new career, using skills you are passionate about and making the impact you have always wanted. Feel the satisfaction of following your authentic path.',
        affirmations: [
          'I feel brave and excited about my career transformation',
          'I am proud of myself for pursuing what truly matters to me',
          'I feel energized by learning new skills and exploring new possibilities',
          'Every step of this journey is leading me to my ideal career'
        ]
      },
      think: {
        title: 'Think Like a Strategic Career Architect',
        description: 'Your previous experience is not a waste - it is a unique advantage. Think about how to leverage your existing skills while building new ones.',
        affirmations: [
          'My diverse experience gives me a unique perspective and advantage',
          'I can learn new skills while leveraging what I already know',
          'Career change is an investment in my long-term happiness',
          'My maturity and experience accelerate my learning',
          'I think strategically about building my new career path'
        ]
      },
      believe: {
        title: 'It is Never Too Late to Follow Your Dreams',
        description: 'Believe that your career change is perfectly timed. You have the wisdom, skills, and motivation to succeed in your new field.',
        coreBeliefs: [
          'I have the skills and determination to succeed in my new field',
          'My life experience is an asset in my career transition',
          'It is never too late to pursue work that fulfills me',
          'I can successfully transition to a career I am passionate about'
        ],
        affirmations: [
          'I believe this career change will transform my life for the better',
          'I have everything I need to succeed in my new field',
          'I believe in my ability to master new skills and concepts',
          'My career change is perfectly timed and aligned'
        ]
      },
      act: {
        title: 'Execute Your Career Transformation Plan',
        description: 'Take strategic actions to transition smoothly into your new career while leveraging your existing strengths and experience.',
        actionSteps: [
          'Identify transferable skills from your previous experience',
          'Build new skills through courses, certifications, or volunteer work',
          'Network with professionals in your target field',
          'Consider transitional roles that bridge your old and new careers',
          'Create a timeline and financial plan for your transition'
        ],
        affirmations: [
          'I take consistent action toward my new career every day',
          'I leverage my existing strengths while building new skills',
          'I network effectively and build relationships in my new field',
          'I plan my transition strategically and execute it confidently'
        ]
      }
    }
  },
  'early-professionals': {
    'employees': {
      feel: {
        title: 'Embrace Your Professional Power',
        description: 'You have proven yourself capable and now it is time to accelerate. Feel the confidence that comes from experience and the excitement of reaching for leadership roles.',
        visualization: 'See yourself being promoted to positions of increasing responsibility and influence. Feel the respect of colleagues and the satisfaction of leading teams to achieve ambitious goals.',
        affirmations: [
          'I feel confident in my professional abilities and judgment',
          'I am ready to take on greater responsibilities and challenges',
          'I feel excited about my leadership potential and growth',
          'Every success builds my confidence to achieve even more'
        ]
      },
      think: {
        title: 'Think Like a Strategic Leader',
        description: 'Move beyond task completion to strategic thinking. Consider how your work fits into larger business objectives and how you can create exponential value.',
        affirmations: [
          'I think strategically about business challenges and opportunities',
          'My leadership potential is recognized and valued by others',
          'I create solutions that have lasting positive impact',
          'I am becoming the professional others look up to and learn from',
          'I think beyond my role to understand the bigger picture'
        ]
      },
      believe: {
        title: 'You Are Leadership Material',
        description: 'Believe that you have the skills, judgment, and character to lead others and drive meaningful results. You are ready for greater responsibility and impact.',
        coreBeliefs: [
          'I have the skills and vision to lead teams to extraordinary results',
          'My career trajectory is accelerating because of my commitment to excellence',
          'I can handle any professional challenge through skill and determination',
          'I am creating opportunities for myself through outstanding performance'
        ],
        affirmations: [
          'I believe I am ready to lead and inspire others',
          'I have the wisdom and skills to drive exceptional results',
          'I believe in my ability to create lasting positive change',
          'I am destined for senior leadership and greater impact'
        ]
      },
      act: {
        title: 'Accelerate Your Rise to Leadership',
        description: 'Take strategic actions that position you for rapid advancement and establish you as an indispensable leader in your organization.',
        actionSteps: [
          'Take on high-visibility projects that showcase your strategic thinking',
          'Mentor junior team members and build your leadership skills',
          'Develop expertise in areas critical to your company\'s success',
          'Build relationships with senior leaders and decision-makers',
          'Pursue advanced certifications or education in your field'
        ],
        affirmations: [
          'I actively position myself for leadership opportunities',
          'I mentor others and develop my leadership capabilities daily',
          'I build strategic relationships that accelerate my career',
          'I consistently deliver results that exceed expectations'
        ]
      }
    },
    'solopreneurs': {
      feel: {
        title: 'Own Your Independence and Impact',
        description: 'Feel the pride of building something entirely your own and the freedom that comes from controlling your destiny. You are creating value on your terms while building the lifestyle you want.',
        visualization: 'Picture yourself running a thriving solo business that gives you financial freedom and time flexibility. Feel the satisfaction of serving clients at the highest level while maintaining work-life balance.',
        affirmations: [
          'I feel proud of the independence I have created for myself',
          'I love the freedom and flexibility of my solo business',
          'I feel fulfilled creating value for my clients on my own terms',
          'Every day I feel more confident in my entrepreneurial abilities'
        ]
      },
      think: {
        title: 'Master the Efficiency Mindset',
        description: 'Think like someone who maximizes impact with minimal resources. Every hour and every decision should move you closer to your vision of success and freedom.',
        affirmations: [
          'I create maximum value with focused effort and smart strategies',
          'My expertise and personal brand attract ideal clients effortlessly',
          'I have the discipline and systems to scale my impact sustainably',
          'I am building both wealth and freedom through my solo business',
          'I think efficiently and execute with precision'
        ]
      },
      believe: {
        title: 'Your Expertise is Your Empire',
        description: 'Believe that your unique skills and knowledge can create significant wealth and impact. You do not need a large team - you need focus, systems, and relentless value creation.',
        coreBeliefs: [
          'My expertise and reputation are my most valuable assets',
          'I can create substantial income streams through focused specialization',
          'Solo entrepreneurship gives me the perfect blend of freedom and impact',
          'I attract opportunities by being exceptional at what I do'
        ],
        affirmations: [
          'I believe my expertise can create unlimited income potential',
          'I am building a business that perfectly aligns with my values',
          'I believe in my ability to scale my impact while maintaining freedom',
          'My unique skills and knowledge are extremely valuable'
        ]
      },
      act: {
        title: 'Scale Your Solo Success',
        description: 'Implement systems and strategies that allow you to increase impact and income without sacrificing the freedom that drew you to solo entrepreneurship.',
        actionSteps: [
          'Develop premium service offerings that command higher rates',
          'Create systems and templates that increase your efficiency',
          'Build a strong personal brand through content and networking',
          'Establish multiple income streams from your core expertise',
          'Set boundaries that protect your time and maintain work-life balance'
        ],
        affirmations: [
          'I systematically scale my business while maintaining my freedom',
          'I command premium rates for my expertise and value',
          'I build systems that allow me to work smarter, not harder',
          'I maintain perfect balance between success and personal fulfillment'
        ]
      }
    },
    'remote-workers': {
      feel: {
        title: 'Master the Art of Remote Excellence',
        description: 'Feel empowered by your ability to work effectively from anywhere while maintaining strong professional relationships. You are pioneering the future of work.',
        visualization: 'Picture yourself thriving in your ideal work environment, delivering exceptional results while enjoying the flexibility and freedom that remote work provides.',
        affirmations: [
          'I feel confident and productive in my remote work environment',
          'I love the flexibility and freedom that remote work provides',
          'I feel connected and valued by my team despite the distance',
          'I am proud of my ability to excel in a remote setting'
        ]
      },
      think: {
        title: 'Think Like a Digital Native Professional',
        description: 'Master the mindset of someone who can create impact and build relationships regardless of physical location. You are part of the new workforce revolution.',
        affirmations: [
          'I excel at remote communication and collaboration',
          'I am disciplined and focused in my work environment',
          'I build strong relationships through digital channels',
          'I leverage technology to maximize my productivity and impact',
          'I think creatively about solving remote work challenges'
        ]
      },
      believe: {
        title: 'You Are the Future of Work',
        description: 'Believe that remote work is not just a temporary arrangement - it is the future of professional life, and you are mastering the skills that will be most valuable.',
        coreBeliefs: [
          'I can be just as effective remotely as in a traditional office',
          'Remote work allows me to optimize my productivity and well-being',
          'I am building skills that are increasingly valuable in the modern workplace',
          'I can maintain strong professional relationships from anywhere'
        ],
        affirmations: [
          'I believe I am a pioneer of the future of work',
          'I excel at remote work and am setting an example for others',
          'I believe remote work enhances my productivity and life quality',
          'I am building a career that gives me ultimate flexibility'
        ]
      },
      act: {
        title: 'Optimize Your Remote Work Success',
        description: 'Take actions that maximize your effectiveness, maintain strong relationships, and position you as a remote work leader.',
        actionSteps: [
          'Create a dedicated workspace that optimizes focus and productivity',
          'Develop strong communication routines with your team',
          'Set clear boundaries between work and personal time',
          'Invest in the technology and tools that enhance your performance',
          'Build your personal brand as a remote work expert'
        ],
        affirmations: [
          'I optimize my environment for maximum productivity and focus',
          'I communicate clearly and build strong virtual relationships',
          'I maintain excellent work-life balance in my remote setup',
          'I continuously improve my remote work skills and systems'
        ]
      }
    },
    'small-business-owners': {
      feel: {
        title: 'Embrace Your Role as a Community Builder',
        description: 'Feel the pride of building something that serves your community while creating opportunities for others. You are not just running a business - you are creating impact.',
        visualization: 'See your business thriving and positively impacting your community. Feel the satisfaction of providing excellent products or services while building a sustainable enterprise.',
        affirmations: [
          'I feel proud of the positive impact my business creates',
          'I am excited about growing my business sustainably',
          'I feel confident in my ability to lead and make decisions',
          'Every day I feel more skilled as a business owner'
        ]
      },
      think: {
        title: 'Think Like a Strategic Business Leader',
        description: 'Balance the day-to-day operations with long-term vision. Think about systems, growth, and sustainable impact rather than just immediate needs.',
        affirmations: [
          'I think strategically about my business growth and sustainability',
          'I build systems that allow my business to run efficiently',
          'I balance short-term needs with long-term vision',
          'I make decisions that benefit my customers, team, and community',
          'I think like an owner, not just an operator'
        ]
      },
      believe: {
        title: 'Your Business is Your Legacy',
        description: 'Believe that your small business has the power to create meaningful change in your community while providing you with financial freedom and personal fulfillment.',
        coreBeliefs: [
          'My business creates real value for my customers and community',
          'I have the skills and determination to build a successful enterprise',
          'Small businesses are the backbone of thriving communities',
          'I can build a business that aligns with my values and goals'
        ],
        affirmations: [
          'I believe my business will create lasting positive impact',
          'I have what it takes to build a thriving, sustainable business',
          'I believe in the value my business brings to the market',
          'My business success creates opportunities for others'
        ]
      },
      act: {
        title: 'Build Your Business Empire',
        description: 'Take strategic actions to grow your business sustainably while maintaining the values and vision that inspired you to start.',
        actionSteps: [
          'Focus on delivering exceptional value to your customers',
          'Build systems and processes that ensure consistent quality',
          'Invest in your team and create a positive workplace culture',
          'Develop strong relationships with suppliers and partners',
          'Plan for sustainable growth and financial stability'
        ],
        affirmations: [
          'I consistently deliver exceptional value to my customers',
          'I build strong systems and processes for sustainable growth',
          'I invest in my team and create a positive work environment',
          'I make strategic decisions that ensure long-term success'
        ]
      }
    },
    'coaches-consultants': {
      feel: {
        title: 'Embrace Your Role as a Transformation Catalyst',
        description: 'Feel the deep satisfaction of helping others achieve breakthrough results. You have the unique privilege of witnessing and facilitating profound positive change in people\'s lives.',
        visualization: 'Picture yourself as a trusted advisor helping clients overcome their biggest challenges and achieve their most important goals. Feel the energy and fulfillment that comes from making a meaningful difference.',
        affirmations: [
          'I feel deeply fulfilled helping others transform their lives',
          'I am energized by the positive impact I create for my clients',
          'I feel confident in my ability to facilitate breakthrough results',
          'Every client success fills me with pride and purpose'
        ]
      },
      think: {
        title: 'Think Like a Strategic Advisor',
        description: 'You are not just providing advice - you are strategically guiding transformation. Think about the long-term impact of your work and how to create lasting change.',
        affirmations: [
          'I think strategically about creating lasting transformation for clients',
          'My expertise and insights create exponential value for others',
          'I see patterns and solutions that help clients breakthrough limitations',
          'I balance compassion with strategic thinking to drive results',
          'I think like a trusted advisor who creates lasting positive change'
        ]
      },
      believe: {
        title: 'Your Expertise Creates Transformation',
        description: 'Believe that your knowledge, experience, and insights can create profound positive change. You have the power to help others achieve results they could not reach alone.',
        coreBeliefs: [
          'My expertise and experience create tremendous value for others',
          'I can help clients achieve breakthrough results in their most important areas',
          'People are willing to invest in transformation and lasting change',
          'My work creates ripple effects of positive impact beyond my direct clients'
        ],
        affirmations: [
          'I believe in my power to facilitate profound positive transformation',
          'I have unique insights that can help others achieve breakthrough results',
          'I believe my work creates lasting value that extends far beyond our sessions',
          'I am meant to help others unlock their full potential'
        ]
      },
      act: {
        title: 'Build Your Transformation Practice',
        description: 'Take actions that establish you as a trusted expert while systematically helping clients achieve meaningful, lasting results.',
        actionSteps: [
          'Develop signature methodologies that consistently produce results',
          'Build your reputation through client success stories and testimonials',
          'Create valuable content that demonstrates your expertise',
          'Establish premium pricing that reflects the transformation you provide',
          'Continuously develop your skills and expand your impact'
        ],
        affirmations: [
          'I consistently deliver transformational results for my clients',
          'I build my reputation as a trusted expert and thought leader',
          'I create systematic approaches that ensure client success',
          'I continuously invest in my development to better serve others'
        ]
      }
    }
  },
  'mid-life': {
    'entrepreneurs': {
      feel: {
        title: 'Harness Your Peak Performance Power',
        description: 'You are at the perfect intersection of experience, network, and ambition. Feel the confidence that comes from years of learning and the excitement of building something truly significant.',
        visualization: 'See yourself leading a business that creates massive value and positive impact. Feel the pride of building something that will outlast you and the satisfaction of mentoring the next generation of leaders.',
        affirmations: [
          'I feel powerful and confident in my ability to build something significant',
          'I am energized by the opportunity to create lasting impact',
          'I feel grateful for my experience and excited about what is ahead',
          'Every challenge I have overcome has prepared me for this moment'
        ]
      },
      think: {
        title: 'Think with Seasoned Strategic Vision',
        description: 'You have the wisdom to see patterns others miss and the experience to execute at the highest level. Think like someone who builds businesses that transform industries.',
        affirmations: [
          'My experience and network give me an unfair advantage in business',
          'I can see opportunities and solutions that younger entrepreneurs miss',
          'I have the wisdom to build sustainable, impactful businesses',
          'My leadership creates extraordinary results and develops others',
          'I think with the wisdom of experience and the energy of ambition'
        ]
      },
      believe: {
        title: 'This is Your Legacy-Building Phase',
        description: 'Believe that your best work is ahead of you. You have the perfect combination of experience, resources, and motivation to create something truly extraordinary.',
        coreBeliefs: [
          'I am in my prime for creating businesses that matter',
          'My experience is my competitive advantage in the marketplace',
          'I can build companies that create lasting positive impact',
          'My success opens doors and creates opportunities for others'
        ],
        affirmations: [
          'I believe this is my time to build something truly extraordinary',
          'I have everything I need to create my most important work',
          'I believe my experience and wisdom are invaluable assets',
          'I am meant to leave a legacy of positive impact and success'
        ]
      },
      act: {
        title: 'Build Your Legacy Business',
        description: 'Take actions that leverage your full capabilities to create a business that not only succeeds financially but also creates meaningful impact.',
        actionSteps: [
          'Focus on ventures that align with your values and create positive impact',
          'Leverage your network and reputation to accelerate growth',
          'Mentor and develop the next generation of entrepreneurs',
          'Build systems and culture that can scale beyond your direct involvement',
          'Balance aggressive growth with sustainable business practices'
        ],
        affirmations: [
          'I take action that builds a lasting legacy of positive impact',
          'I leverage my full experience and network to create success',
          'I mentor others while building my most important business',
          'Every decision I make contributes to my meaningful legacy'
        ]
      }
    },
    'parents': {
      feel: {
        title: 'Embrace Your Role as a Life Architect',
        description: 'Feel the profound responsibility and joy of shaping the next generation. You are not just raising children - you are developing future leaders who will change the world.',
        visualization: 'Picture your children as successful, confident adults who contribute positively to the world. Feel the pride of knowing that your guidance and example set them up for extraordinary lives.',
        affirmations: [
          'I feel deeply fulfilled by my role in shaping the next generation',
          'I am proud of the positive influence I have on my children',
          'I feel confident in my ability to guide my children to success',
          'Every day I feel the joy and responsibility of being a parent'
        ]
      },
      think: {
        title: 'Think Like a Generational Legacy Builder',
        description: 'Every interaction with your children is an opportunity to instill values, confidence, and capabilities that will serve them for a lifetime. Think long-term about the impact of your parenting.',
        affirmations: [
          'I am raising children who will make a positive difference in the world',
          'My example teaches my children that anything is possible',
          'I balance being supportive with helping them develop independence',
          'Every day I help my children build confidence and character',
          'I think strategically about the legacy I am creating through my children'
        ]
      },
      believe: {
        title: 'Your Parenting is Your Greatest Achievement',
        description: 'Believe that raising confident, capable, caring children is the most important work you will ever do. Your influence extends far beyond your immediate family.',
        coreBeliefs: [
          'I have the wisdom and love needed to raise extraordinary children',
          'My children have unlimited potential that I can help them discover',
          'The values I teach today will echo through generations',
          'I can balance being a great parent with pursuing my own growth'
        ],
        affirmations: [
          'I believe I am exactly the parent my children need',
          'I have the wisdom to guide my children to their full potential',
          'I believe my parenting will create a positive generational impact',
          'I am raising future leaders who will change the world for the better'
        ]
      },
      act: {
        title: 'Intentionally Shape the Next Generation',
        description: 'Take deliberate actions that help your children develop the mindset, skills, and character they need to thrive in an uncertain world.',
        actionSteps: [
          'Model the behavior and mindset you want to see in your children',
          'Create regular opportunities for meaningful conversations and connection',
          'Expose your children to diverse experiences that broaden their perspective',
          'Teach them practical life skills and emotional intelligence',
          'Balance structure and freedom to help them develop independence'
        ],
        affirmations: [
          'I consistently model the values and behavior I want to see',
          'I create meaningful connections and learning opportunities daily',
          'I actively develop my children\'s confidence and capabilities',
          'I balance guidance with independence to help them thrive'
        ]
      }
    },
    'stay-at-home-parents': {
      feel: {
        title: 'Honor Your Full-Time Dedication to Family',
        description: 'Feel proud of choosing to dedicate yourself fully to your children\'s development. You are making one of the most important investments possible - in the next generation.',
        visualization: 'See the profound impact of your daily presence and guidance in your children\'s lives. Feel the satisfaction of being there for every milestone and learning moment.',
        affirmations: [
          'I feel proud of my choice to dedicate myself to my children',
          'I am making one of the most important contributions to society',
          'I feel fulfilled by the daily impact I have on my family',
          'Every moment I invest in my children creates lasting value'
        ]
      },
      think: {
        title: 'Think Like a Child Development Expert',
        description: 'You are not just watching children - you are actively shaping minds, character, and futures. Think about the strategic importance of your role.',
        affirmations: [
          'I am my children\'s first and most important teacher',
          'Every interaction is an opportunity to build their confidence and skills',
          'I create a foundation of love and learning that will last their lifetime',
          'My presence and attention are giving my children an invaluable advantage',
          'I think intentionally about how to maximize my positive impact'
        ]
      },
      believe: {
        title: 'Your Work is Invaluable and Irreplaceable',
        description: 'Believe that choosing to be a full-time parent is a valuable career choice that creates immeasurable impact on your family and society.',
        coreBeliefs: [
          'My full-time presence is giving my children the best possible start',
          'I am contributing to society by raising confident, capable children',
          'The investment I am making now will pay dividends for generations',
          'I can pursue personal growth while being an excellent parent'
        ],
        affirmations: [
          'I believe my role as a stay-at-home parent is invaluable',
          'I am making the most important investment possible in my children',
          'I believe in the long-term impact of my daily dedication',
          'My choice to be present for my children is creating lasting value'
        ]
      },
      act: {
        title: 'Maximize Your Impact as a Full-Time Parent',
        description: 'Take intentional actions that make the most of your time with your children while maintaining your own growth and well-being.',
        actionSteps: [
          'Create structured learning and play activities that develop skills',
          'Build a supportive community with other parents',
          'Maintain your own interests and continue personal development',
          'Document and celebrate your children\'s growth and milestones',
          'Take care of your physical and mental health consistently'
        ],
        affirmations: [
          'I create enriching experiences that develop my children\'s potential',
          'I build supportive relationships with other parents and families',
          'I maintain my own growth while investing in my children',
          'I take excellent care of myself so I can give my best to my family'
        ]
      }
    }
  },
  'legacy-builders': {
    'retirees': {
      feel: {
        title: 'Embrace Your Wisdom and Freedom',
        description: 'Feel the satisfaction of a life well-lived and the excitement of having time to pursue what truly matters to you. This is your season of wisdom, contribution, and personal fulfillment.',
        visualization: 'See yourself using your experience and wisdom to make a meaningful difference in others\' lives. Feel the joy of having time for relationships, passions, and purposes that bring deep fulfillment.',
        affirmations: [
          'I feel grateful for the wisdom and experience I have gained',
          'I am excited about this new chapter of freedom and possibility',
          'I feel fulfilled knowing I can focus on what truly matters',
          'Every day I feel blessed to share my knowledge and experience'
        ]
      },
      think: {
        title: 'Think Like a Wise Contributor',
        description: 'Your years of experience have given you unique insights and perspectives. Think about how you can share your wisdom and continue growing in ways that bring meaning.',
        affirmations: [
          'My experience and wisdom are valuable gifts I can share with others',
          'I have the freedom to focus on what brings me joy and purpose',
          'Every day is an opportunity to learn, grow, and contribute',
          'My legacy is built through the lives I touch and the wisdom I share',
          'I think about the meaningful impact I can still create'
        ]
      },
      believe: {
        title: 'Your Best Contributions May Still Be Ahead',
        description: 'Believe that retirement is not the end of your impact - it is the beginning of a new chapter where you can contribute in ways that are truly meaningful to you.',
        coreBeliefs: [
          'I have valuable knowledge and experience that can benefit others',
          'This phase of life offers unique opportunities for growth and contribution',
          'I can continue learning and pursuing new interests with passion',
          'My legacy is measured by the positive impact I have on others'
        ],
        affirmations: [
          'I believe my most meaningful contributions may still be ahead',
          'I have valuable wisdom that can positively impact others',
          'I believe this chapter of life offers unlimited possibilities',
          'I am meant to leave a lasting legacy of wisdom and kindness'
        ]
      },
      act: {
        title: 'Create Your Legacy of Wisdom',
        description: 'Take actions that allow you to share your wisdom, pursue your passions, and create meaningful connections while maintaining your health and vitality.',
        actionSteps: [
          'Mentor young people in your area of expertise',
          'Pursue learning opportunities in areas that genuinely interest you',
          'Volunteer for causes that align with your values',
          'Document and share your life experiences and lessons learned',
          'Maintain your physical and mental health through regular exercise and social connection'
        ],
        affirmations: [
          'I actively share my wisdom and mentor the next generation',
          'I pursue new learning and experiences with curiosity and passion',
          'I contribute to causes that align with my deepest values',
          'I maintain my health and vitality to maximize my years of impact'
        ]
      }
    }
  }
};

export function generateFtbaContent(ageGroup: string, category: string): FtbaContent {
  console.log(`Generating FTBA content for ${ageGroup} ${category}`);
  
  // Get specific content or fallback to a default
  const ageData = ftbaDatabase[ageGroup];
  if (!ageData) {
    console.warn(`No data found for age group: ${ageGroup}`);
    return getDefaultContent();
  }
  
  const content = ageData[category];
  if (!content) {
    console.warn(`No data found for category: ${category} in age group: ${ageGroup}`);
    return getDefaultContent();
  }
  
  return content;
}

function getDefaultContent(): FtbaContent {
  return {
    feel: {
      title: 'Connect with Your Inner Power',
      description: 'Feel the strength that comes from knowing you have unlimited potential to grow and achieve your goals.',
      visualization: 'Imagine yourself living your ideal life. Feel the emotions of that success and let them motivate you today.',
      affirmations: [
        'I feel powerful and capable of achieving my dreams',
        'I am excited about the possibilities that lie ahead',
        'I feel confident in my ability to overcome any challenge'
      ]
    },
    think: {
      title: 'Adopt Empowering Thoughts',
      description: 'Replace limiting beliefs with thoughts that support your growth and success.',
      affirmations: [
        'I have the power to create positive change in my life',
        'Every challenge is an opportunity to grow stronger',
        'I am capable of achieving my goals through consistent action',
        'I think positively and attract positive outcomes'
      ]
    },
    believe: {
      title: 'Embrace Your Potential',
      description: 'Believe in your ability to learn, grow, and create the life you desire.',
      coreBeliefs: [
        'I have unique gifts and talents to offer the world',
        'I can learn and master any skill I choose to focus on',
        'My consistent efforts will compound into extraordinary results'
      ],
      affirmations: [
        'I believe in my unlimited potential for growth and success',
        'I am worthy of achieving all my dreams and goals',
        'I believe I can create the life I truly desire'
      ]
    },
    act: {
      title: 'Take Aligned Action',
      description: 'Take daily actions that move you closer to your vision and goals.',
      actionSteps: [
        'Set clear, specific goals and review them daily',
        'Take at least one action each day toward your most important goal',
        'Learn continuously and apply new knowledge immediately'
      ],
      affirmations: [
        'I take consistent action toward my goals every day',
        'Every action I take moves me closer to my dreams',
        'I am disciplined and focused on achieving my vision'
      ]
    }
  };
}
