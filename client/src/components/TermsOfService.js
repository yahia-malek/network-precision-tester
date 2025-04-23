import React from 'react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Terms of Service</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <p className="text-gray-700 mb-6">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
        <p className="text-gray-700 mb-6">
          Welcome to Network Precision Tester ("we," "our," or "us"). By accessing or using our website, 
          mobile applications, or any other services we offer (collectively, the "Services"), you agree to 
          be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not 
          use our Services.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">2. Account Registration</h2>
        <p className="text-gray-700 mb-6">
          While basic network testing is available without registration, certain features of our Services 
          require you to create an account. When you create an account, you agree to provide accurate and 
          complete information. You are responsible for maintaining the confidentiality of your account 
          credentials and for all activities that occur under your account. You agree to notify us immediately 
          of any unauthorized use of your account.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">3. Use of Services</h2>
        <p className="text-gray-700 mb-6">
          You agree to use our Services only for lawful purposes and in accordance with these Terms. 
          Specifically, you agree not to:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>Use the Services in any way that violates any applicable federal, state, local, or international law or regulation</li>
          <li>Attempt to gain unauthorized access to any portions of the Services or any systems or networks connected to the Services</li>
          <li>Use any robot, spider, or other automated device to access the Services for any purpose</li>
          <li>Introduce any viruses, Trojan horses, worms, or other material that is malicious or technologically harmful</li>
          <li>Impersonate or attempt to impersonate us, our employees, or other users</li>
          <li>Engage in any conduct that restricts or inhibits anyone's use or enjoyment of the Services</li>
          <li>Use the Services to generate artificially high traffic or to manipulate speed test results</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">4. Intellectual Property Rights</h2>
        <p className="text-gray-700 mb-6">
          The Services and their entire contents, features, and functionality (including but not limited to all 
          information, software, text, displays, images, and the design and arrangement thereof) are owned by 
          us, our licensors, or other providers of such material and are protected by copyright, trademark, 
          patent, trade secret, and other intellectual property or proprietary rights laws.
        </p>
        <p className="text-gray-700 mb-6">
          You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly 
          perform, republish, download, store, or transmit any of the material on our Services, except as follows:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>Your computer may temporarily store copies of such materials in RAM incidental to your accessing and viewing those materials</li>
          <li>You may store files that are automatically cached by your web browser for display enhancement purposes</li>
          <li>You may print or download one copy of a reasonable number of pages of the Services for your own personal, non-commercial use and not for further reproduction, publication, or distribution</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">5. Test Results and Data</h2>
        <p className="text-gray-700 mb-6">
          When you use our Services to conduct network performance tests, we collect data about your internet 
          connection and device as described in our Privacy Policy. You agree that we may use this data to:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>Provide you with your test results</li>
          <li>Create anonymized statistics and reports about internet performance</li>
          <li>Improve our Services and develop new features</li>
          <li>Share aggregated, anonymized information with third parties, including ISPs, regulatory bodies, and researchers</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">6. Disclaimer of Warranties</h2>
        <p className="text-gray-700 mb-6">
          YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK. THE SERVICES AND ALL CONTENT AND INFORMATION PROVIDED 
          THROUGH THE SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, 
          EITHER EXPRESS OR IMPLIED.
        </p>
        <p className="text-gray-700 mb-6">
          TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING BUT 
          NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. 
          WE DO NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, 
          OR THAT THE SERVICES OR SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
        </p>
        <p className="text-gray-700 mb-6">
          WE MAKE NO GUARANTEES REGARDING THE ACCURACY OF SPEED TEST RESULTS. RESULTS MAY BE AFFECTED BY VARIOUS 
          FACTORS INCLUDING NETWORK CONDITIONS, YOUR HARDWARE, SOFTWARE CONFIGURATION, AND OTHER FACTORS BEYOND OUR CONTROL.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
        <p className="text-gray-700 mb-6">
          TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL WE, OUR AFFILIATES, OR THEIR RESPECTIVE DIRECTORS, 
          OFFICERS, EMPLOYEES, AGENTS, OR SERVICE PROVIDERS BE LIABLE FOR ANY INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, 
          OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO, PERSONAL INJURY, PAIN AND SUFFERING, EMOTIONAL DISTRESS, 
          LOSS OF REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, 
          LOSS OF DATA, ARISING OUT OF OR IN ANY WAY CONNECTED WITH YOUR ACCESS TO OR USE OF THE SERVICES, OR FOR ANY 
          INFORMATION OBTAINED THROUGH THE SERVICES.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">8. Indemnification</h2>
        <p className="text-gray-700 mb-6">
          You agree to defend, indemnify, and hold harmless us, our affiliates, and their respective directors, 
          officers, employees, agents, and service providers from and against any claims, liabilities, damages, 
          judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out 
          of or relating to your violation of these Terms or your use of the Services.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">9. Governing Law and Jurisdiction</h2>
        <p className="text-gray-700 mb-6">
          These Terms and any dispute or claim arising out of or related to them, their subject matter, or their 
          formation shall be governed by and construed in accordance with the laws of the state of [State], without 
          giving effect to any choice or conflict of law provision or rule. Any legal suit, action, or proceeding 
          arising out of, or related to, these Terms or the Services shall be instituted exclusively in the federal 
          courts of the United States or the courts of the state of [State], although we retain the right to bring 
          any suit, action, or proceeding against you for breach of these Terms in your country of residence or any 
          other relevant country.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
        <p className="text-gray-700 mb-6">
          We may revise and update these Terms from time to time in our sole discretion. All changes are effective 
          immediately when we post them, and apply to all access to and use of the Services thereafter. Your continued 
          use of the Services following the posting of revised Terms means that you accept and agree to the changes.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
        <p className="text-gray-700 mb-6">
          We may terminate or suspend your access to all or part of the Services, including your account, without 
          notice and for any reason, including, without limitation, if we believe that you have violated these Terms. 
          Upon termination, your right to use the Services will immediately cease, and you must cease all use of the 
          Services and delete all copies of materials you have obtained from the Services.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">12. Severability</h2>
        <p className="text-gray-700 mb-6">
          If any provision of these Terms is held by a court or other tribunal of competent jurisdiction to be invalid, 
          illegal, or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent 
          such that the remaining provisions of the Terms will continue in full force and effect.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">13. Entire Agreement</h2>
        <p className="text-gray-700 mb-6">
          These Terms, our Privacy Policy, and any other agreements expressly incorporated by reference herein, constitute 
          the sole and entire agreement between you and us with respect to the Services and supersede all prior and 
          contemporaneous understandings, agreements, representations, and warranties, both written and oral, with respect 
          to the Services.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
        <p className="text-gray-700 mb-6">
          If you have any questions or comments about these Terms, please contact us at:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>By email: terms@networkprecisiontester.com</li>
          <li>By visiting our website: www.networkprecisiontester.com/contact</li>
        </ul>
      </div>
    </div>
  );
};

export default TermsOfService; 