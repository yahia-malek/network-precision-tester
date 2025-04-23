import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Privacy Policy</h1>
      
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <p className="text-gray-700 mb-6">
          Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
        <p className="text-gray-700 mb-6">
          Welcome to Network Precision Tester. We respect your privacy and are committed to protecting your personal data. 
          This privacy policy will inform you about how we look after your personal data when you visit our website 
          and tell you about your privacy rights and how the law protects you.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">The Data We Collect</h2>
        <p className="text-gray-700 mb-6">
          We collect the following information when you use our service:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>
            <span className="font-medium">Connection Information:</span> IP address, ISP, network type, and geographical location (city/region/country)
          </li>
          <li>
            <span className="font-medium">Device Information:</span> Browser type and version, operating system, device type
          </li>
          <li>
            <span className="font-medium">Test Results:</span> Download speed, upload speed, ping, jitter, and other network performance metrics
          </li>
          <li>
            <span className="font-medium">Usage Data:</span> How you interact with our website, which features you use, and time spent on site
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">How We Use Your Data</h2>
        <p className="text-gray-700 mb-6">
          We use the collected data for various purposes:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>To provide and maintain our service</li>
          <li>To notify you about changes to our service</li>
          <li>To allow you to participate in interactive features when you choose to do so</li>
          <li>To provide customer support</li>
          <li>To gather analysis or valuable information so that we can improve our service</li>
          <li>To monitor the usage of our service</li>
          <li>To detect, prevent and address technical issues</li>
          <li>To create anonymized statistics about internet performance by region</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
        <p className="text-gray-700 mb-6">
          We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. 
          We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, 
          resolve disputes, and enforce our legal agreements and policies.
        </p>
        <p className="text-gray-700 mb-6">
          For test history that's linked to your account, we retain this data for 12 months, after which it may be anonymized 
          and kept only for statistical purposes. You can request deletion of your test history at any time through your account settings.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
        <p className="text-gray-700 mb-6">
          We do not sell or rent your personal information to third parties. We may disclose your information in the following circumstances:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>
            <span className="font-medium">Service Providers:</span> We may employ third-party companies and individuals to facilitate our Service, 
            to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used. 
            These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose 
            or use it for any other purpose.
          </li>
          <li>
            <span className="font-medium">Legal Requirements:</span> We may disclose your Personal Data in the good faith belief that such action 
            is necessary to comply with a legal obligation, protect and defend our rights or property, prevent or investigate possible wrongdoing 
            in connection with the Service, protect the personal safety of users of the Service or the public, or protect against legal liability.
          </li>
          <li>
            <span className="font-medium">Business Transfers:</span> If we are involved in a merger, acquisition or asset sale, your Personal Data 
            may be transferred. We will provide notice before your Personal Data is transferred and becomes subject to a different Privacy Policy.
          </li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Cookies and Tracking</h2>
        <p className="text-gray-700 mb-6">
          We use cookies and similar tracking technologies to track activity on our Service and hold certain information. Cookies are files with 
          small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.
        </p>
        <p className="text-gray-700 mb-6">
          You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, 
          you may not be able to use some portions of our Service.
        </p>
        <p className="text-gray-700 mb-6">
          We use cookies for the following purposes:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>To remember your preferences and settings</li>
          <li>To maintain your session while you are logged in</li>
          <li>To track your usage of our service for analytics and optimization</li>
        </ul>
        
        <h2 className="text-2xl font-semibold mb-4">Your Data Protection Rights</h2>
        <p className="text-gray-700 mb-6">
          Under certain circumstances, you have rights under data protection laws in relation to your personal data:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
          <li>
            <span className="font-medium">The right to access</span> – You have the right to request copies of your personal data.
          </li>
          <li>
            <span className="font-medium">The right to rectification</span> – You have the right to request that we correct any information 
            you believe is inaccurate or complete any information you believe is incomplete.
          </li>
          <li>
            <span className="font-medium">The right to erasure</span> – You have the right to request that we erase your personal data, 
            under certain conditions.
          </li>
          <li>
            <span className="font-medium">The right to restrict processing</span> – You have the right to request that we restrict the 
            processing of your personal data, under certain conditions.
          </li>
          <li>
            <span className="font-medium">The right to object to processing</span> – You have the right to object to our processing of your 
            personal data, under certain conditions.
          </li>
          <li>
            <span className="font-medium">The right to data portability</span> – You have the right to request that we transfer the data that 
            we have collected to another organization, or directly to you, under certain conditions.
          </li>
        </ul>
        <p className="text-gray-700 mb-6">
          If you wish to exercise any of these rights, please contact us using the information in the "Contact Us" section below.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
        <p className="text-gray-700 mb-6">
          Our Service does not address anyone under the age of 16. We do not knowingly collect personally identifiable information from 
          anyone under the age of 16. If you are a parent or guardian and you are aware that your child has provided us with Personal Data, 
          please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, 
          we take steps to remove that information from our servers.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
        <p className="text-gray-700 mb-6">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page 
          and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for 
          any changes. Changes to this Privacy Policy are effective when they are posted on this page.
        </p>
        
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="text-gray-700 mb-6">
          If you have any questions about this Privacy Policy, please contact us:
        </p>
        
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>By email: privacy@networkprecisiontester.com</li>
          <li>By visiting our website: www.networkprecisiontester.com/contact</li>
        </ul>
      </div>
    </div>
  );
};

export default PrivacyPolicy; 