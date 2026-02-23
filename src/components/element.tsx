import Image from "next/image";
import React from "react";

const Element = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      
      {/* Section 1 */}
      <div className="w-full bg-fuchsia-50 px-4 md:px-10 py-12 flex flex-col md:flex-row items-center">
        
        <div className="md:w-1/2 text-center md:text-left py-6">
          <h3 className="text-blue-600 font-semibold text-lg mb-2">
            Fast-track your learning
          </h3>

          <p className="text-gray-600">
            Learn Programming skills from absolute beginner to advanced mastery.
            We create project-based courses to help you learn professionally
            and feel like a complete developer.
          </p>
        </div>

        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <Image
            src="/assets/images/two.jpg"
            alt="Learning by doing"
            width={500}
            height={400}
            className="rounded-lg w-full max-w-md"
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="w-full bg-blue-50 px-4 md:px-10 py-12 flex flex-col md:flex-row items-center">
        
        <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
          <Image
            src="/assets/images/one.jpg"
            alt="Put Your Learning"
            width={500}
            height={400}
            className="rounded-lg w-full max-w-md"
          />
        </div>

        <div className="md:w-1/2 text-center md:text-left">
          <h3 className="text-green-600 font-semibold text-lg mb-2">
            Step-by-step lessons
          </h3>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Put Your Learning <br /> Into Practice
          </h2>

          <p className="text-gray-600">
            Apply your learning with real-world projects and take your career
            to the next level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Element;