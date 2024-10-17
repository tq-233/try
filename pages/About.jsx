import React from 'react';

const About = () => {
  return (
    <div className="max-w-3xl mx-auto p-6" style={{marginLeft:'25px',marginRight:'25px', marginTop:'50px'}}>
      <h1 className="text-3xl font-bold mb-6">About Our Quantitative Trading Platform</h1>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="mb-4">
          We strive to provide cutting-edge quantitative trading solutions to our clients. 
          Our platform leverages advanced algorithms and data analysis to identify trading opportunities.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Legal Disclaimers</h2>
        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="mb-4">
            <strong>Risk Warning:</strong> Trading in financial instruments carries a high level of risk to your capital with the possibility of losing more than your initial investment. You should not engage in trading unless you fully understand the nature of the transactions you are entering into and the extent of your exposure to loss.
          </p>
          <p className="mb-4">
            <strong>No Guarantee of Profits:</strong> Past performance is not indicative of future results. No representation is being made that any account will or is likely to achieve profits or losses similar to those discussed on this platform.
          </p>
          <p className="mb-4">
            <strong>Not Financial Advice:</strong> The information provided on this platform is for general informational purposes only and should not be considered as investment advice. Always seek the advice of a qualified financial advisor before making any investment decisions.
          </p>
          <p className="mb-4">
            <strong>Accuracy of Information:</strong> While we strive to provide accurate and up-to-date information, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the platform or the information contained on the platform for any purpose.
          </p>
          <p>
            <strong>Regulatory Compliance:</strong> Our platform adheres to all applicable financial regulations. Users are responsible for ensuring their use of our platform complies with local laws and regulations in their jurisdiction.
          </p>
        </div>
      </section>

      <p className="text-sm text-gray-600">
        By using our platform, you acknowledge that you have read, understood, and agree to these disclaimers and the terms of service.
      </p>
    </div>
  );
};

export default About;