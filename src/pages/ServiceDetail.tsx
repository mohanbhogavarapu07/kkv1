
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ServiceDetail = () => {
  const { slug } = useParams();

  // Sample service data - this would typically come from an API
  const services = {
    "executive-coaching": {
      title: "Executive Coaching",
      description: "One-on-one coaching for leaders navigating complexity, change, and performance pressure. Custom frameworks for decision-making, strategic clarity, and sustainable high performance.",
      content: `
        <h2>Executive Coaching</h2>
        <p>Krishna Kumar's executive coaching program is designed specifically for senior leaders facing extraordinary demands on their time, energy, and decision-making capacity. This highly personalized engagement creates a confidential space to develop strategic clarity, enhance leadership presence, and build sustainable performance systems.</p>
        
        <h3>The Approach</h3>
        <p>Unlike generic coaching programs, this approach integrates:</p>
        <ul>
          <li>Evidence-based performance psychology</li>
          <li>Strategic decision frameworks</li>
          <li>Custom productivity systems</li>
          <li>Cognitive optimization techniques</li>
        </ul>
        
        <p>Each engagement begins with a comprehensive assessment of current performance patterns, environmental challenges, and strategic objectives. From this baseline, we develop a focused development plan addressing both immediate performance needs and longer-term leadership capacity.</p>
        
        <h3>Engagement Structure</h3>
        <p>Executive coaching engagements typically include:</p>
        <ul>
          <li>Initial intensive half-day session to establish baseline and objectives</li>
          <li>Bi-weekly 60-minute coaching sessions (in-person or virtual)</li>
          <li>Unlimited email support between sessions</li>
          <li>Custom frameworks and tools tailored to your specific challenges</li>
          <li>Quarterly progress reviews and direction refinement</li>
        </ul>
        
        <h3>Ideal For</h3>
        <ul>
          <li>C-suite executives and senior leaders</li>
          <li>Leaders navigating significant organizational change</li>
          <li>High-potential executives preparing for expanded responsibilities</li>
          <li>Technical experts transitioning to broader leadership roles</li>
        </ul>
        
        <h3>Client Outcomes</h3>
        <ul>
          <li>Enhanced decision clarity under complex, high-pressure conditions</li>
          <li>Sustainable performance patterns that prevent burnout</li>
          <li>More effective leadership communication and presence</li>
          <li>Strategic prioritization skills that create organizational focus</li>
          <li>Customized productivity systems aligned with leadership objectives</li>
        </ul>
      `
    },
    "productivity-systems": {
      title: "Productivity Systems Design",
      description: "Custom productivity architectures for individuals and teams. Streamlined workflows, focused environments, and mental models that eliminate overwhelm and create sustainable results.",
      content: `
        <h2>Productivity Systems Design</h2>
        <p>True productivity isn't about working harder or longer—it's about working within systems designed for clarity, focus, and meaningful output. This specialized service helps ambitious professionals create custom productivity architectures tailored to their unique cognitive styles, work demands, and performance objectives.</p>
        
        <h3>The Systems Approach</h3>
        <p>Rather than offering generic productivity tips, this engagement focuses on designing comprehensive systems that work together to eliminate friction, reduce cognitive load, and channel energy toward high-impact activities. The result is not just better time management, but a transformed relationship with work itself.</p>
        
        <h3>Core System Components</h3>
        <ul>
          <li><strong>Task Architecture:</strong> Custom approaches to capturing, organizing, and executing commitments</li>
          <li><strong>Focus Environment:</strong> Physical and digital workspace optimization for different cognitive modes</li>
          <li><strong>Energy Management:</strong> Personalized frameworks for sustaining mental and physical energy</li>
          <li><strong>Information Processing:</strong> Systems for capturing, organizing, and retrieving knowledge</li>
          <li><strong>Decision Protocols:</strong> Frameworks for making decisions at appropriate levels of consideration</li>
        </ul>
        
        <h3>Engagement Structure</h3>
        <p>Productivity system design typically follows a three-phase process:</p>
        
        <h4>1. Assessment & Analysis (2-3 weeks)</h4>
        <ul>
          <li>Comprehensive productivity diagnostic</li>
          <li>Work pattern tracking and analysis</li>
          <li>Cognitive style assessment</li>
          <li>Environmental audit (physical and digital)</li>
          <li>Documentation of current systems and pain points</li>
        </ul>
        
        <h4>2. System Design (2-4 weeks)</h4>
        <ul>
          <li>Custom system architecture development</li>
          <li>Tool selection and configuration</li>
          <li>Workflow design and documentation</li>
          <li>Integration planning across system components</li>
        </ul>
        
        <h4>3. Implementation & Refinement (4-8 weeks)</h4>
        <ul>
          <li>Phased system implementation</li>
          <li>Regular check-ins and adjustments</li>
          <li>Habit formation support</li>
          <li>Troubleshooting and optimization</li>
        </ul>
        
        <h3>Ideal For</h3>
        <ul>
          <li>Executives managing complex demands and information flows</li>
          <li>Entrepreneurs balancing multiple business responsibilities</li>
          <li>Knowledge workers facing information overload and context switching</li>
          <li>Teams seeking alignment in workflows and collaboration patterns</li>
        </ul>
        
        <h3>Client Outcomes</h3>
        <ul>
          <li>30-50% reduction in time spent on low-value activities</li>
          <li>Elimination of chronic work-related stress and overwhelm</li>
          <li>Increased capacity for deep work and creative thinking</li>
          <li>Improved follow-through on commitments and projects</li>
          <li>Enhanced work satisfaction and engagement</li>
        </ul>
      `
    },
    "project-recovery": {
      title: "Project Recovery & Turnaround",
      description: "Specialized intervention for troubled initiatives. Strategic assessment, realignment, and execution planning to transform challenged projects into successful outcomes.",
      content: `
        <h2>Project Recovery & Turnaround</h2>
        <p>When critical projects go off track, organizations need more than standard project management—they need specialized intervention focused on rapid diagnosis, stabilization, and systematic recovery. This service provides expert guidance for transforming troubled initiatives into successful outcomes.</p>
        
        <h3>The Recovery Approach</h3>
        <p>Project recovery requires a distinct methodology from standard project management. This approach combines technical expertise with human factors engineering to address both structural issues and the leadership dynamics that often underlie project challenges.</p>
        
        <h3>The Four-Phase Recovery Process</h3>
        
        <h4>1. Diagnostic Immersion</h4>
        <p>A rapid but comprehensive assessment of current project status, including:</p>
        <ul>
          <li>Stakeholder interviews across all levels</li>
          <li>Documentation and artifact review</li>
          <li>Team dynamic assessment</li>
          <li>Technical feasibility evaluation</li>
          <li>Identification of primary failure patterns</li>
        </ul>
        
        <h4>2. Stabilization</h4>
        <p>Immediate interventions to stop further deterioration:</p>
        <ul>
          <li>Stakeholder expectation reset</li>
          <li>Scope containment measures</li>
          <li>Team reorganization and alignment</li>
          <li>Critical path identification and focus</li>
          <li>Short-term win planning</li>
        </ul>
        
        <h4>3. Structural Redesign</h4>
        <p>Addressing fundamental project structure issues:</p>
        <ul>
          <li>Governance model reconfiguration</li>
          <li>Communication protocol development</li>
          <li>Decision framework implementation</li>
          <li>Risk management system establishment</li>
          <li>Resource allocation optimization</li>
        </ul>
        
        <h4>4. Accelerated Execution</h4>
        <p>Rebuilding momentum toward successful delivery:</p>
        <ul>
          <li>Parallel path execution strategies</li>
          <li>Milestone-based motivation systems</li>
          <li>Rapid feedback and adaptation cycles</li>
          <li>Strategic resource application</li>
          <li>Progressive stakeholder reengagement</li>
        </ul>
        
        <h3>Engagement Models</h3>
        <p>Project recovery services are available in three formats:</p>
        <ul>
          <li><strong>Recovery Leadership:</strong> Direct leadership of the recovery effort as interim project executive</li>
          <li><strong>Recovery Advisory:</strong> Guidance and support to internal recovery leaders</li>
          <li><strong>Recovery Training:</strong> Skill development for teams managing their own recovery</li>
        </ul>
        
        <h3>Ideal For</h3>
        <ul>
          <li>Strategic initiatives that have missed multiple milestones</li>
          <li>Projects experiencing scope creep and diminishing confidence</li>
          <li>Teams facing technical complexity beyond current capabilities</li>
          <li>Initiatives with deteriorating stakeholder relationships</li>
          <li>Projects where previous recovery attempts have failed</li>
        </ul>
        
        <h3>Client Outcomes</h3>
        <ul>
          <li>Clear path to delivery within revised constraints</li>
          <li>Restored stakeholder and team confidence</li>
          <li>Sustainable execution momentum</li>
          <li>Enhanced organizational recovery capabilities</li>
          <li>Knowledge transfer for future project resilience</li>
        </ul>
      `
    },
    "team-performance": {
      title: "Team Performance Optimization",
      description: "Performance engineering for teams facing complex deliverables. Communication frameworks, decision protocols, and execution rhythms that build alignment and velocity.",
      content: `
        <h2>Team Performance Optimization</h2>
        <p>High-performing teams don't happen by accident—they're engineered through deliberate design of communication patterns, decision frameworks, and execution systems. This specialized service transforms capable teams into exceptional ones through systematic performance engineering.</p>
        
        <h3>The Performance Engineering Approach</h3>
        <p>Unlike traditional team building that focuses primarily on relationships, performance engineering addresses the complete system that determines team effectiveness. This integrated approach ensures that team dynamics, work processes, and environmental factors all align to support exceptional performance.</p>
        
        <h3>Core Elements</h3>
        
        <h4>1. Clarity Architecture</h4>
        <ul>
          <li>Shared mental models of success and priorities</li>
          <li>Role clarity and decision rights mapping</li>
          <li>Explicit articulation of team operating principles</li>
          <li>Common language for discussing performance challenges</li>
        </ul>
        
        <h4>2. Communication Systems</h4>
        <ul>
          <li>Custom communication protocols for different information types</li>
          <li>Meeting systems optimized for decision quality</li>
          <li>Feedback mechanisms that accelerate learning</li>
          <li>Documentation approaches that reduce cognitive load</li>
        </ul>
        
        <h4>3. Execution Frameworks</h4>
        <ul>
          <li>Team-specific planning and coordination methods</li>
          <li>Progress visibility systems</li>
          <li>Constraint management processes</li>
          <li>Rapid adaptation protocols for changing conditions</li>
        </ul>
        
        <h4>4. Performance Environment</h4>
        <ul>
          <li>Environmental design for cognitive optimization</li>
          <li>Tool selection and configuration</li>
          <li>Distraction management systems</li>
          <li>Energy maintenance practices</li>
        </ul>
        
        <h3>Engagement Process</h3>
        <p>Team performance optimization typically follows a structured, phased approach:</p>
        
        <h4>Phase 1: Performance Diagnostic</h4>
        <p>Comprehensive assessment of current team performance patterns through:</p>
        <ul>
          <li>Individual team member interviews</li>
          <li>Work process observation</li>
          <li>Communication pattern analysis</li>
          <li>Decision quality evaluation</li>
          <li>Performance metrics review</li>
        </ul>
        
        <h4>Phase 2: System Design</h4>
        <p>Custom design of performance systems addressing identified gaps:</p>
        <ul>
          <li>Team operating system development</li>
          <li>Meeting and communication protocol design</li>
          <li>Decision framework creation</li>
          <li>Performance environment optimization</li>
        </ul>
        
        <h4>Phase 3: Implementation</h4>
        <p>Staged introduction of new performance approaches:</p>
        <ul>
          <li>Team alignment sessions</li>
          <li>System training and skill development</li>
          <li>Facilitated implementation of new methods</li>
          <li>Progressive transition to team ownership</li>
        </ul>
        
        <h4>Phase 4: Refinement</h4>
        <p>Ongoing optimization based on performance data:</p>
        <ul>
          <li>Regular performance reviews</li>
          <li>System adjustment sessions</li>
          <li>Capability development as needed</li>
          <li>Long-term sustainability planning</li>
        </ul>
        
        <h3>Ideal For</h3>
        <ul>
          <li>Leadership teams seeking greater strategic alignment</li>
          <li>Project teams facing complex, high-stakes deliverables</li>
          <li>Cross-functional teams with coordination challenges</li>
          <li>High-potential teams not yet reaching their capability ceiling</li>
          <li>Remote and hybrid teams navigating virtual collaboration</li>
        </ul>
        
        <h3>Client Outcomes</h3>
        <ul>
          <li>30-50% reduction in coordination friction</li>
          <li>Improved decision quality and velocity</li>
          <li>Enhanced team capacity for complex problem solving</li>
          <li>Greater resilience during high-pressure periods</li>
          <li>Increased team member engagement and satisfaction</li>
        </ul>
      `
    },
    "strategic-planning": {
      title: "Strategic Planning Facilitation",
      description: "Guided planning sessions that translate vision into actionable strategy. Clarity on priorities, resource allocation, and measurable outcomes for organizations at inflection points.",
      content: `
        <h2>Strategic Planning Facilitation</h2>
        <p>Effective strategic planning creates clarity, alignment, and focused action—but only when the process itself is designed for real-world impact rather than document creation. This specialized facilitation service translates vision into executable strategy through structured planning sessions that deliver actionable outcomes.</p>
        
        <h3>The Impact-Focused Approach</h3>
        <p>Unlike conventional strategic planning that often produces documents rather than decisions, this approach focuses on creating genuine strategic clarity that drives day-to-day action. The methodology combines rigorous analytical frameworks with practical implementation planning to ensure strategies translate into results.</p>
        
        <h3>Core Planning Elements</h3>
        
        <h4>1. Strategic Reality Assessment</h4>
        <ul>
          <li>Comprehensive current state analysis</li>
          <li>Environmental scanning and trend evaluation</li>
          <li>Capability and resource assessment</li>
          <li>Constraint and opportunity mapping</li>
        </ul>
        
        <h4>2. Strategic Direction Setting</h4>
        <ul>
          <li>Purpose and vision clarification</li>
          <li>Strategic positioning decisions</li>
          <li>Priority establishment and resource allocation</li>
          <li>Success metric definition</li>
        </ul>
        
        <h4>3. Strategic Translation</h4>
        <ul>
          <li>Strategy decomposition into actionable initiatives</li>
          <li>Execution roadmap development</li>
          <li>Accountability framework creation</li>
          <li>Implementation obstacle anticipation</li>
        </ul>
        
        <h4>4. Strategic Adaptation System</h4>
        <ul>
          <li>Progress tracking protocols</li>
          <li>Strategic review cadence</li>
          <li>Adjustment trigger identification</li>
          <li>Learning integration process</li>
        </ul>
        
        <h3>Facilitation Formats</h3>
        <p>Strategic planning facilitation is available in several formats:</p>
        
        <h4>Comprehensive Strategic Planning</h4>
        <p>Full strategic planning process spanning 2-3 months, including:</p>
        <ul>
          <li>Pre-work and stakeholder interviews</li>
          <li>Series of facilitated planning sessions (4-6)</li>
          <li>Working sessions between planning meetings</li>
          <li>Implementation planning and transition support</li>
          <li>90-day and 180-day progress reviews</li>
        </ul>
        
        <h4>Strategic Reset</h4>
        <p>Concentrated strategic realignment for organizations needing rapid direction adjustment:</p>
        <ul>
          <li>Pre-work diagnostic</li>
          <li>2-day intensive planning session</li>
          <li>Implementation framework development</li>
          <li>30-day progress review</li>
        </ul>
        
        <h4>Strategy Implementation Accelerator</h4>
        <p>For organizations with established strategies requiring execution enhancement:</p>
        <ul>
          <li>Implementation diagnostic</li>
          <li>1-day accelerator session</li>
          <li>Execution framework refinement</li>
          <li>60-day implementation review</li>
        </ul>
        
        <h3>Ideal For</h3>
        <ul>
          <li>Organizations at critical growth inflection points</li>
          <li>Leadership teams lacking strategic alignment</li>
          <li>Companies facing significant market shifts or disruption</li>
          <li>Organizations with strategy-to-execution gaps</li>
          <li>Teams with existing strategies not producing desired results</li>
        </ul>
        
        <h3>Client Outcomes</h3>
        <ul>
          <li>Clear, compelling strategic direction</li>
          <li>Enhanced leadership alignment on priorities</li>
          <li>Focused resource allocation to strategic imperatives</li>
          <li>Improved execution velocity and follow-through</li>
          <li>Greater organizational adaptability to changing conditions</li>
        </ul>
      `
    },
    "speaking": {
      title: "Speaking & Workshops",
      description: "Engaging presentations and interactive workshops on productivity, performance psychology, and strategic execution for conferences, leadership teams, and organizations.",
      content: `
        <h2>Speaking & Workshops</h2>
        <p>Krishna Kumar delivers impactful keynotes and workshops that combine evidence-based insights with practical frameworks. Unlike typical motivational talks, these sessions provide actionable approaches that audience members can apply immediately to enhance performance, productivity, and strategic effectiveness.</p>
        
        <h3>Speaking Approach</h3>
        <p>Every presentation combines three essential elements:</p>
        <ul>
          <li><strong>Evidence-Based Insights:</strong> Research-backed principles from performance psychology, neuroscience, and organizational behavior</li>
          <li><strong>Practical Frameworks:</strong> Structured approaches that translate concepts into action</li>
          <li><strong>Implementation Pathways:</strong> Specific steps for applying ideas in real-world contexts</li>
        </ul>
        
        <h3>Signature Topics</h3>
        
        <h4>Strategic Performance</h4>
        <ul>
          <li><strong>The Integration Principle:</strong> Moving beyond work-life balance to strategic life integration</li>
          <li><strong>Decision Clarity:</strong> Frameworks for making high-quality decisions under uncertainty</li>
          <li><strong>Strategic Rest:</strong> The counterintuitive approach to sustainable high performance</li>
          <li><strong>Productive Focus:</strong> Designing environments and systems for deep work in a distracted world</li>
        </ul>
        
        <h4>Leadership Effectiveness</h4>
        <ul>
          <li><strong>Clarity Architecture:</strong> Creating alignment through shared mental models</li>
          <li><strong>Performance Psychology for Leaders:</strong> Applied cognitive science for leadership excellence</li>
          <li><strong>The Recovery Leader:</strong> Approaches for turning around troubled projects and teams</li>
          <li><strong>Strategic Simplicity:</strong> Cutting through complexity to drive focused execution</li>
        </ul>
        
        <h4>Organizational Excellence</h4>
        <ul>
          <li><strong>Beyond Efficiency:</strong> Moving from optimization to strategic effectiveness</li>
          <li><strong>Execution Systems:</strong> Frameworks for translating strategy into consistent results</li>
          <li><strong>Performance Engineering:</strong> Designing teams for exceptional outcomes</li>
          <li><strong>Adaptive Strategy:</strong> Building organizations that thrive in volatility</li>
        </ul>
        
        <h3>Format Options</h3>
        
        <h4>Keynote Presentations</h4>
        <ul>
          <li>30, 45, or 60-minute formats</li>
          <li>Customized to audience needs and event themes</li>
          <li>Optional follow-up materials for participants</li>
          <li>Available in-person or virtual</li>
        </ul>
        
        <h4>Interactive Workshops</h4>
        <ul>
          <li>90-minute to full-day formats</li>
          <li>Hands-on application of frameworks to participant challenges</li>
          <li>Customized workbooks and implementation tools</li>
          <li>Available in-person or virtual</li>
        </ul>
        
        <h4>Executive Sessions</h4>
        <ul>
          <li>Private sessions for leadership teams</li>
          <li>Focus on specific organizational challenges</li>
          <li>Combined content delivery and facilitated application</li>
          <li>Follow-up implementation support available</li>
        </ul>
        
        <h3>Ideal For</h3>
        <ul>
          <li>Corporate leadership conferences and retreats</li>
          <li>Industry association events and conventions</li>
          <li>Executive team development programs</li>
          <li>High-potential leadership programs</li>
          <li>Professional service firm retreats</li>
        </ul>
        
        <h3>Participant Experience</h3>
        <p>Audiences consistently highlight three aspects of Krishna's presentations:</p>
        <ul>
          <li><strong>Actionable Content:</strong> "Finally, a speaker who provided frameworks we can actually use tomorrow."</li>
          <li><strong>Evidence-Based Approach:</strong> "Refreshing to hear insights based on research rather than just anecdotes."</li>
          <li><strong>Engaging Delivery:</strong> "Managed to make complex concepts both accessible and compelling."</li>
        </ul>
      `
    }
  };

  const service = services[slug as keyof typeof services];

  if (!service) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair mb-4">Service Not Found</h1>
          <Link to="/services" className="inline-flex items-center group">
            <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="border-b border-black pb-1 group-hover:mr-2 transition-all duration-300">
              Return to Services
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <Link to="/services" className="inline-flex items-center group mb-8 block">
              <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-2 transition-transform duration-300" />
              <span className="border-b border-black pb-1 group-hover:mr-2 transition-all duration-300">
                Back to Services
              </span>
            </Link>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-playfair mb-6">{service.title}</h1>
            <p className="text-xl text-gray-700">{service.description}</p>
          </div>
          
          <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: service.content }} />
          
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              to="/contact"
              className="border border-black px-6 py-3 hover:bg-black hover:text-white transition-colors duration-300"
            >
              Inquire About This Service
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
