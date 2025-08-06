import React from "react";

const PrivacyPolicy = () => (
  <div className="mx-auto py-16 px-4 sm:px-8 md:px-16 lg:px-32 max-w-5xl bg-white shadow-lg rounded-lg text-gray-900" style={{fontSize: '1.08rem', lineHeight: '1.8'}}>
    <h1 className="font-playfair text-4xl font-bold mb-8 text-center text-black">Legal and Privacy Framework for thekrishnakumar.com</h1>
    <div className="prose max-w-none prose-blue prose-lg">
      <h2>Part I: Privacy Policy for thekrishnakumar.com</h2>
  
      <h3>1.0 Introduction &amp; Key Definitions</h3>
      <h4>1.1 Purpose and Scope</h4>
      <p>This Privacy Policy ("Policy") is designed to provide you with clear, transparent, and comprehensive information regarding your privacy rights and our data practices. It describes how thekrishnakumar.com (referred to as "we," "us," or "our") collects, uses, stores, protects, shares, and otherwise processes your information when you access or use our website, including all content, free assessments, frameworks, paid courses, and other services we may offer (collectively, the "Services").</p>
      <p>This Policy is a legally binding document. By accessing, registering for, or using our Services, you acknowledge that you have read, understood, and agree to be bound by the practices described in this Policy. If you do not agree with this Policy, you must not use our Services.</p>
      <p>We are committed to protecting your privacy and handling your data in an open and transparent manner. This Policy has been drafted to meet the standards of major international data protection regulations, including but not limited to the European Union's General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA), India's Digital Personal Data Protection Act (DPDPA), Canada's Personal Information Protection and Electronic Documents Act (PIPEDA), and Brazil's Lei Geral de Proteção de Dados (LGPD).</p>
      <p>We will review and update this Policy periodically to reflect changes in our practices or in applicable law. The "Last Updated" date at the top of this page indicates when this Policy was last revised. We encourage you to review it regularly. For significant changes, we may provide more prominent notice, such as through email.</p>
      <h4>1.2 Key Definitions</h4>
      <ul>
        <li><b>Personal Data (or Personal Information):</b> This refers to any information that identifies, relates to, describes, is reasonably capable of being associated with, or could reasonably be linked, directly or indirectly, with a particular individual or household. This is a comprehensive definition intended to encompass the legal definitions under GDPR, CCPA/CPRA, DPDPA, PIPEDA, and LGPD. Examples include your name, email address, IP address, payment information, and course progress data.</li>
        <li><b>Sensitive Personal Information (SPI):</b> This is a specific category of Personal Data that requires enhanced protection. As defined under laws like the CPRA and LGPD, it includes information such as financial account details (including debit or credit card number in combination with any required security code, password, or credentials allowing access to an account), precise geolocation, and the contents of a user's communications, unless we are the intended recipient of the communication. We take additional precautions when processing any SPI.</li>
        <li><b>Data Controller / Data Fiduciary:</b> For the purposes of laws like the GDPR and India's DPDPA, thekrishnakumar.com is the "Data Controller" or "Data Fiduciary." This means we are the entity that determines the purposes for which and the means by which your Personal Data is processed.</li>
        <li><b>Data Processor:</b> This refers to any third-party entity that processes Personal Data on our behalf and under our instructions, such as our cloud hosting provider or payment processor. We ensure all Data Processors are bound by strict contractual obligations to protect your data.</li>
        <li><b>Processing:</b> This includes any operation or set of operations performed on Personal Data, whether or not by automated means. It covers activities like collection, recording, organization, structuring, storage, adaptation, retrieval, use, disclosure by transmission, dissemination, or otherwise making available, alignment, combination, restriction, erasure, or destruction of Personal Data.</li>
        <li><b>Sharing (for CCPA/CPRA purposes):</b> This term has a specific meaning under California law and includes disclosing, disseminating, making available, transferring, or otherwise communicating a consumer's personal information by the business to a third party for cross-context behavioral advertising, whether or not for monetary or other valuable consideration.</li>
        <li><b>User ("you"):</b> This refers to any individual who accesses or uses our Services, including website visitors, participants in free assessments, and registered users enrolled in paid courses.</li>
      </ul>
      <h3>2.0 Information We Collect and How We Collect It</h3>
      <p>To provide and improve our Services, we must collect certain Personal Data. We are committed to the principle of "data minimization," meaning we only collect what is necessary for the purposes we have identified. This section provides a transparent and exhaustive overview of the categories of data we collect and the sources from which we collect it, fulfilling our "Notice at Collection" obligations under laws like the CCPA/CPRA.</p>
      <h4>2.1 Data You Provide Directly to Us</h4>
      <ul>
        <li><b>Account and Profile Data:</b> When you register for an account, we collect information necessary to create and manage it, such as your full name, email address, a secure password, and your country of residence. You may voluntarily provide additional profile information.</li>
        <li><b>Assessment and Course Data:</b> When you participate in our free assessments or enroll in our courses, we collect data related to your performance and engagement. This includes your answers to assessment questions, quiz and exam results, assignment submissions, projects you create, peer-graded assignments and feedback, course progress, completion data, and any certificates of completion you earn. This may include user-generated content that you submit as part of your coursework.</li>
        <li><b>Payment and Transaction Data:</b> When you purchase a course or any other paid Service, we collect information required to process your transaction. This includes your name, billing address, and transaction details such as the date of purchase. It is critical to note that we do not directly collect, process, or store your full credit card number or other sensitive payment credentials. We utilize secure, third-party payment processors (e.g., Stripe, PayPal) that are fully compliant with the Payment Card Industry Data Security Standard (PCI DSS). Your payment information is provided directly to these processors through a secure connection. We may receive and store a transaction ID, the date of the transaction, and the last four digits of your card for verification and record-keeping purposes. This architectural decision significantly limits our PCI DSS scope and enhances the security of your most sensitive financial data.</li>
        <li><b>Communications Data:</b> We collect Personal Data when you communicate with us. This includes information you provide when you contact our support team, send us an email, respond to surveys, provide feedback, or participate in any public forums we may offer.</li>
      </ul>
      <h4>2.2 Data We Collect Automatically</h4>
      <ul>
        <li><b>System and Device Data:</b> We collect technical information about the device and software you use to access our Services. This includes your IP address, device type (e.g., desktop, mobile), operating system version, browser type and language, and unique device identifiers.</li>
        <li><b>Usage Data (Analytics):</b> We log information about your interactions with our Services. This includes the pages you visit, the features you use, the order and time of your visits, your clickstream data (the path you take through our site), search queries you make on our site, and the website that referred you to our Services. This data is collected through server logs and tracking technologies like cookies and web beacons.</li>
      </ul>
      <h4>2.3 Data from Third-Party Sources</h4>
      <ul>
        <li><b>Third-Party Logins:</b> If you choose to register or log in to our Services using a third-party account (such as Google or Facebook), we will receive certain profile information about you from that provider. The specific information we receive depends on your privacy settings with that third-party service, but it typically includes your name, email address, and profile picture. We will only collect the information you have authorized that service to share with us.</li>
        <li><b>Payment Service Providers:</b> As mentioned, our payment processors may provide us with limited information, such as confirmation that your payment was successful, to help us fulfill your order.</li>
        <li><b>Data Enrichment Providers:</b> We may receive additional demographic or professional information from third-party data providers to help us better understand our users and personalize our Services and marketing efforts.</li>
      </ul>
      <h3>3.0 How and Why We Use Your Data (Purpose and Legal Basis)</h3>
      <p>We are committed to processing your Personal Data lawfully, fairly, and transparently. In compliance with the principles of "Purpose Limitation" and "Lawfulness" under regulations like GDPR and DPDPA, this section details every purpose for which we process your data and, for users in applicable jurisdictions, the specific legal basis we rely on for that processing.</p>
      <ul>
        <li><b>To Provide and Manage Our Services:</b> Performance of a contract.</li>
        <li><b>To Process Payments and Transactions:</b> Performance of a contract.</li>
        <li><b>To Communicate With You:</b> Performance of a contract and legitimate interest.</li>
        <li><b>To Improve and Personalize Our Services:</b> Legitimate interest.</li>
        <li><b>For Marketing, Promotions, and Advertising:</b> Consent and legitimate interest.</li>
        <li><b>To Maintain Security and Prevent Fraud:</b> Legitimate interest and legal obligation.</li>
        <li><b>To Comply with Legal Obligations:</b> Compliance with a legal obligation.</li>
      </ul>
      <h3>4.0 Cookies, Analytics, and Personalized Advertising</h3>
      <p>We use cookies and similar tracking technologies to function effectively, analyze performance, and deliver personalized experiences and advertising. You can manage your cookie preferences at any time through our website footer.</p>
      <ul>
        <li><b>Strictly Necessary Cookies:</b> Essential for site functionality.</li>
        <li><b>Performance and Analytics Cookies:</b> Help us improve our website.</li>
        <li><b>Functional Cookies:</b> Remember your preferences.</li>
        <li><b>Advertising/Targeting Cookies:</b> Make advertising more relevant to your interests.</li>
      </ul>
      <h3>5.0 How We Share and Disclose Your Information</h3>
      <ul>
        <li>With service providers and processors (e.g., payment processors, cloud hosting, analytics, marketing, customer support).</li>
        <li>With instructors (for course-related data, not your email without consent).</li>
        <li>For legal compliance and security.</li>
        <li>In connection with a business transfer (e.g., merger, acquisition).</li>
        <li>With your explicit consent.</li>
        <li>Aggregated or de-identified data for research or marketing.</li>
      </ul>
      <h3>6.0 Data Security</h3>
      <ul>
        <li>Encryption in transit and at rest.</li>
        <li>Strict access controls and role-based access.</li>
        <li>Secure authentication and multi-factor authentication (MFA) recommended.</li>
        <li>Vulnerability management and monitoring.</li>
        <li>PCI DSS-compliant payment processing.</li>
        <li>Vendor due diligence for security.</li>
        <li>Incident response plan for data breaches.</li>
        <li><b>Your Responsibility:</b> Maintain the confidentiality of your password and notify us if compromised.</li>
      </ul>
      <h3>7.0 Data Retention</h3>
      <ul>
        <li>We retain your data only as long as necessary for the purposes collected.</li>
        <li>Account data is deleted or anonymized after account closure, unless required for legal reasons.</li>
        <li>Transaction data is retained as required by law.</li>
        <li>Marketing consent data is retained until you withdraw consent.</li>
        <li>Data is securely deleted or anonymized when no longer needed.</li>
      </ul>
      <h3>8.0 Your Legal Rights and Choices</h3>
      <p>Depending on your location, you may have rights to access, correct, delete, restrict, or object to the processing of your data, as well as data portability and the right to withdraw consent. To exercise your rights, contact us at <a href="mailto:privacy@thekrishnakumar.com" className="text-blue-600 underline">privacy@thekrishnakumar.com</a>.</p>
      <h3>9.0 International Data Transfers</h3>
      <p>We may process, store, and transfer your data in countries outside your country of residence. We use legally recognized transfer mechanisms to safeguard your data, such as Standard Contractual Clauses and adequacy decisions.</p>
      <h3>10.0 Children's Privacy</h3>
      <ul>
        <li>Our Services are not directed to children under 13 (or the relevant minimum age in your jurisdiction).</li>
        <li>We do not knowingly collect data from children without parental consent.</li>
        <li>Parents may contact us to request deletion of their child's data.</li>
      </ul>
      <h3>11.0 Region-Specific Disclosures</h3>
      <ul>
        <li><b>EEA/UK/Switzerland:</b> You have rights under GDPR. Contact us for DPO details if required.</li>
        <li><b>California (CCPA/CPRA):</b> You have specific rights, including the right to opt-out of sale/sharing and to limit use of sensitive information.</li>
        <li><b>India (DPDPA):</b> You have rights as a Data Principal. Contact our Grievance Officer at <a href="mailto:privacy@thekrishnakumar.com" className="text-blue-600 underline">privacy@thekrishnakumar.com</a>.</li>
        <li><b>Canada (PIPEDA):</b> We comply with PIPEDA's 10 Fair Information Principles. Contact us for access or correction requests.</li>
        <li><b>Brazil (LGPD):</b> You have rights under LGPD. Contact our DPO at <a href="mailto:privacy@thekrishnakumar.com" className="text-blue-600 underline">privacy@thekrishnakumar.com</a>.</li>
      </ul>
      <h3>12.0 Policy Updates and Contact Information</h3>
      <h4>12.1 Changes to This Privacy Policy</h4>
      <p>We may update this Privacy Policy from time to time. The "Last Updated" date will be revised accordingly. Material changes will be communicated via prominent notice or email. Continued use of our Services indicates your agreement to the revised policy.</p>
      <h4>12.2 Contact Us</h4>
      <p>If you have any questions, comments, or concerns about this Privacy Policy or our privacy practices, or if you wish to exercise any of your legal rights, please contact us at <a href="mailto:o0krishh0o@gmail.com" className="text-blue-600 underline">o0krishh0o@gmail.com</a>.</p>
      
      <h2 className="mt-16">Part II: Terms and Conditions for thekrishnakumar.com</h2>
     
      <h3>1.0 Introduction and Acceptance of Terms</h3>
      <p>Welcome to thekrishnakumar.com. These Terms and Conditions ("Terms") constitute a legally binding agreement between you ("you," "your," or "User") and thekrishnakumar.com ("we," "us," or "our") concerning your access to and use of our website, including all content, free assessments, frameworks, paid courses, and other services we may offer (collectively, the "Services").</p>
      <p>By accessing, registering for, or using the Services, you acknowledge that you have read, understood, and agree to be bound by all of these Terms. You also agree to our Privacy Policy, which is incorporated by reference into these Terms and governs our collection and use of your personal information. If you do not agree with all of these Terms and the Privacy Policy, you are expressly prohibited from using the Services and you must discontinue use immediately.</p>
      <p>We reserve the right, in our sole discretion, to make changes or modifications to these Terms at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of these Terms. It is your responsibility to periodically review these Terms to stay informed of updates. Your continued use of the Services after the date such revised Terms are posted will be deemed to be your acceptance of the changes.</p>
      <h3>2.0 User Accounts</h3>
      <ul>
        <li><b>Account Creation:</b> To access certain features of the Services, such as enrolling in courses, you may be required to register for an account. You agree to provide true, accurate, current, and complete information during the registration process and to update such information to keep it accurate and complete.</li>
        <li><b>Account Responsibility and Security:</b> You are entirely responsible for maintaining the confidentiality of your account password and for any and all activities that occur under your account. You agree not to share your account credentials with any other person. You must notify us immediately of any unauthorized use of your account or any other breach of security. We will not be liable for any loss or damage arising from your failure to comply with this section.</li>
        <li><b>Account Termination:</b> We reserve the right to suspend, disable, or terminate your account and your access to the Services, with or without notice, for any reason or no reason, including if you violate any provision of these Terms. Reasons for termination may include, but are not limited to, failure to pay fees when due, fraudulent chargeback requests, engaging in prohibited conduct, or upon the request of law enforcement.</li>
      </ul>
      <h3>3.0 Payments, Subscriptions, and Refunds</h3>
      <ul>
        <li><b>Fees and Payment:</b> For paid Services, such as our online courses, you agree to pay the fees specified at the time of your purchase. You authorize us and our third-party payment processors to charge your selected payment method for all such fees. All fees are quoted in a designated currency and are non-refundable, except as expressly stated in our Refund Policy below.</li>
        <li><b>Payment Method:</b> You must provide a valid and authorized payment method. By providing payment information, you represent and warrant that you are authorized to use the designated payment method and that the information you provide is accurate. If your payment method fails, we may suspend your access to the paid Services until payment is received.</li>
        <li><b>Subscriptions:</b> If we offer Services on a subscription basis, your subscription will automatically renew at the end of each billing cycle (e.g., monthly or annually) unless you cancel it. You will be charged the then-current subscription fee. To avoid being charged for the next billing period, you must cancel your subscription through your account settings before the renewal date.</li>
        <li><b>Refund Policy:</b> We want you to be satisfied with your purchase. Our refund policy is as follows:
          <ul>
            <li>For one-time course purchases, you may request a full refund within 14 days of the purchase date, provided you have not completed more than 25% of the course content.</li>
            <li>No refunds will be issued for subscription fees already paid.</li>
            <li>To request a refund, please contact our support team with your purchase details. We reserve the right to refuse a refund if we suspect abuse of this policy.</li>
          </ul>
        </li>
        <li><b>Price Changes:</b> We reserve the right to change the prices for our Services at any time. For subscriptions, any price changes will take effect at the start of the next subscription period following the date of the price change.</li>
      </ul>
      <h3>4.0 Intellectual Property Rights</h3>
      <p>This clause is fundamental to protecting the significant investment made in creating our educational content. It establishes a clear boundary between permitted use and prohibited infringement, employing a dual-pronged strategy to control both access to the platform and use of the content itself.</p>
      <ul>
        <li><b>Ownership of Our Content:</b> The Services and all of their content, including but not limited to the text, graphics, images, videos, logos, software, assessments, frameworks, and all other course materials (collectively, the "Site Content"), are the exclusive property of thekrishnakumar.com and its licensors. The Site Content is protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws in the United States and other countries.</li>
        <li><b>Limited License to You:</b> Upon your purchase of or enrollment in a course, we grant you a limited, non-exclusive, non-transferable, and revocable license to access and view the Site Content associated with that course. This license is for your personal, non-commercial, educational use only. This license is contingent upon your full compliance with these Terms and timely payment of all applicable fees. This license is granted to you alone and cannot be transferred or sublicensed to any other person.</li>
        <li><b>Restrictions on Use:</b> This license is strictly limited. You expressly agree that you will not:
          <ul>
            <li>Reproduce, redistribute, transmit, assign, sell, broadcast, rent, share, lend, modify, adapt, edit, create derivative works of, sublicense, or otherwise transfer or use any Site Content unless we give you explicit permission in a signed written agreement.</li>
            <li>Share your account login credentials with any other person to allow them to access the Site Content.</li>
            <li>Copy, record (including screen recording), or download any Site Content, except for materials explicitly designated as downloadable (e.g., workbooks).</li>
            <li>Use any of our methods, frameworks, or strategies taught in the courses for your own commercial purposes without our prior written consent.</li>
          </ul>
        </li>
      </ul>
      <p>By clearly defining the license as personal and non-transferable, we control access to the platform, making password sharing a direct violation of these Terms. By explicitly forbidding duplication and redistribution, we protect the copyright of the content itself. This comprehensive approach is essential for safeguarding the value of our digital products. Any violation of this Section 4.0 is a material breach of these Terms and will result in the immediate termination of your account and license without refund, and may subject you to legal action for damages.</p>
      <h3>5.0 User Conduct and Prohibited Uses</h3>
      <p>We are building a community dedicated to learning and professional development. To protect this environment, you agree to use the Services for lawful purposes only and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Services.</p>
      <ul>
        <li><b>Acceptable Use:</b> You agree to use the Services in a respectful and professional manner.</li>
        <li><b>Prohibited Activities:</b> The following activities are strictly prohibited. You may not:
          <ul>
            <li>Engage in any activity that is illegal under local, state, national, or international law.</li>
            <li>Post, upload, or share any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, libelous, invasive of another's privacy, hateful, or racially, ethnically, or otherwise objectionable.</li>
            <li>Harass, threaten, or stalk other users.</li>
            <li>Impersonate any person or entity, or falsely state or otherwise misrepresent your affiliation with a person or entity.</li>
            <li>Violate the intellectual property rights of thekrishnakumar.com or any third party.</li>
            <li>Attempt to gain unauthorized access to our computer systems, or engage in any activity that disrupts, diminishes the quality of, interferes with the performance of, or impairs the functionality of, the Services.</li>
            <li>Use any automated means, such as bots, spiders, or scrapers, to access, query, or otherwise collect information from the Services, except as expressly permitted by us.</li>
            <li>Upload or transmit any viruses, Trojan horses, worms, or any other malicious code or software.</li>
            <li>Use the Services for any form of spamming or to send unsolicited advertising or promotional materials.</li>
          </ul>
        </li>
    </ul>
      <p>We reserve the right to investigate and take appropriate legal action against anyone who, in our sole discretion, violates this provision, including without limitation, removing the offending content from the Services and terminating the account of such violators.</p>
      <h3>6.0 Disclaimers and Limitation of Liability</h3>
      <p>This section limits our legal liability and clarifies what you can and cannot expect from our Services. Please read it carefully.</p>
      <ul>
        <li><b>"As Is" and "As Available" Disclaimer:</b> The Services and all Site Content are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. We do not warrant that the Services will be uninterrupted, timely, secure, or error-free, or that any defects will be corrected. Your use of the Services is at your sole risk.</li>
        <li><b>No Guarantee of Results Disclaimer:</b> This is particularly important for an educational platform. You acknowledge and agree that we make no representations, warranties, or guarantees regarding the results or outcomes you may achieve from using our Services, including our courses and frameworks. Any success stories, testimonials, or examples of results are illustrative and are not a guarantee that you will achieve the same or similar results. Your success depends on many factors, including your own effort, background, and dedication. All information provided is for educational and informational purposes only and should not be construed as professional, financial, legal, or medical advice.</li>
        <li><b>Limitation of Liability:</b> To the fullest extent permitted by applicable law, in no event shall thekrishnakumar.com, its affiliates, directors, employees, or licensors be liable for any indirect, incidental, special, consequential, exemplary, or punitive damages, including but not limited to, damages for loss of profits, revenue, data, goodwill, or other intangible losses, arising out of or in connection with your access to or use of, or inability to access or use, the Services or any Site Content.</li>
        <li><b>Maximum Liability:</b> To the fullest extent permitted by law, our total cumulative liability to you for any and all claims arising from or relating to the Services, regardless of the form of action, is limited to the greater of: (a) the total amount of fees, if any, that you have paid to us for the Services in the twelve (12) months immediately preceding the event giving rise to the claim, or (b) one hundred U.S. dollars ($100.00).</li>
    </ul>
      <h3>7.0 Indemnification</h3>
      <p>You agree to defend, indemnify, and hold harmless thekrishnakumar.com and its officers, directors, employees, and agents, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees) arising from: (i) your use of and access to the Services; (ii) your violation of any term of these Terms; (iii) your violation of any third-party right, including without limitation any copyright, property, or privacy right; or (iv) any claim that your use of the Services caused damage to a third party. This defense and indemnification obligation will survive these Terms and your use of the Services.</p>
      <h3>8.0 Governing Law and Dispute Resolution</h3>
      <ul>
        <li><b>Governing Law:</b> These Terms and any dispute or claim arising out of or in connection with them shall be governed by and construed in accordance with the laws of, United States, without regard to its conflict of law provisions.</li>
        <li><b>Dispute Resolution:</b> We hope to resolve any disagreements amicably. Before filing a formal legal claim, you agree to first contact us at [support@thekrishnakumar.com] to try to resolve the dispute informally. If we cannot resolve the dispute within 30 days, you and we agree to resolve any claims relating to these Terms through final and binding arbitration, except as set forth under the "Exceptions to Agreement to Arbitrate" section below. The arbitration will be administered by the American Arbitration Association (AAA) under its Consumer Arbitration Rules. The arbitration will be held in, or any other location we agree to.</li>
        <li><b>Exceptions to Agreement to Arbitrate:</b> Either party may bring a lawsuit in court for claims of infringement or misuse of intellectual property rights, or for claims seeking injunctive relief.</li>
    </ul>
      <h3>9.0 General Provisions</h3>
      <ul>
        <li><b>Entire Agreement:</b> These Terms, together with the Privacy Policy and any other legal notices published by us on the Services, shall constitute the entire agreement between you and us concerning the Services.</li>
        <li><b>Severability:</b> If any provision of these Terms is deemed invalid by a court of competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of these Terms, which shall remain in full force and effect.</li>
        <li><b>No Waiver:</b> No waiver of any term of these Terms shall be deemed a further or continuing waiver of such term or any other term, and our failure to assert any right or provision under these Terms shall not constitute a waiver of such right or provision.</li>
        <li><b>Contact Information:</b> If you have any questions about these Terms, please contact us at:<br/>Email: <a href="mailto:o0krishh0o@gmail.com" className="text-blue-600 underline">o0krishh0o@gmail.com</a></li>
    </ul>
    </div>
  </div>
);

export default PrivacyPolicy; 