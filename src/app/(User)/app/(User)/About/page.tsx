"use client";

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 light:bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
      <p className="text-lg dark:text-gray-300 light:text-gray-700 mb-4">
        Welcome to <span className="font-bold">Socio</span>, a platform dedicated to connecting people and providing innovative social and financial services. Our mission is to empower individuals and communities by offering tools and resources that make life easier and more connected.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Our Mission</h2>
      <p className="dark:text-gray-300 light:text-gray-700 mb-4">
        At Socio, our mission is to create a world where everyone has access to the tools they need to succeed. Whether it&apos;s connecting with others, managing finances, or accessing premium services, we are here to make it happen.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Our Team</h2>
      <p className="dark:text-gray-300 light:text-gray-700 mb-4">
        Our team is made up of passionate individuals who are committed to innovation and excellence. We work tirelessly to ensure that Socio remains a trusted and reliable platform for all our users.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Why Choose Us?</h2>
      <ul className="list-disc list-inside dark:text-gray-300 light:text-gray-700 space-y-2">
        <li>Secure and reliable platform</li>
        <li>User-friendly interface</li>
        <li>Innovative features and services</li>
        <li>Dedicated customer support</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
      <p className=" dark:text-gray-300 light:text-gray-700">
        Have questions or need support? Feel free to reach out to us at{" "}
        <a href="mailto:support@socio.com" className="text-blue-500 underline">
          support@socio.com
        </a>. We&apos;re here to help!
      </p>
    </div>
  );
};

export default AboutPage;