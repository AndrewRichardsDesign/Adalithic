import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <section className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-secondary mb-8">Privacy Policy</h1>
          <div className="prose prose-lg text-gray-700 space-y-6">
            <p className="text-lg leading-relaxed">
              <strong>Last updated:</strong> July 2025
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h2 className="text-xl font-semibold text-secondary mb-3">About</h2>
              <p className="text-gray-700 leading-relaxed">Arcatext is a custom keyboard app designed to enhance your typing experience with translation capabilities. This Privacy Policy explains how we handle your data when using our services. By using Arcatext, you consent to this Privacy Policy.</p>
            </div>
            
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">1. Information We Collect and Use</h2>
            <p>Text Input: When you use our keyboard to type text, this input is sent to ChatGPT, a third-party AI service, to provide translation services. We do not store these texts on our servers.

            Device Language Settings:We access your device's default language setting to initialize the keyboard language. This information is not stored beyond its immediate use for setting up the keyboard.

            No Other Personal Data:We do not collect any other personal data like your name, email, location, or any other identifiable information.
</p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">2. How Your Data Is Used</h2>
            <p>Translation Services: Your text inputs are solely used for the purpose of translation by ChatGPT. This service might use these inputs to improve their system, according to their privacy policy.

            Keyboard Customization:The device's language setting is used once to enhance user experience by setting the initial keyboard language.
</p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">3. Third-Party Data Sharing</h2>
            <p>AI Translation Service:Data entered into the keyboard for translation is shared with ChatGPT. Please review ChatGPT's privacy policy to understand how they might use your data.</p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">4. Data Security</h2>
            <p>We are committed to ensuring that your information is secure. However, please note that the transmission of data over the internet to ChatGPT for translation is subject to the security measures implemented by their service. </p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">5. Your Rights</h2>
            <p>You have the right to:

            Know: What information we process for the functionality of the keyboard.

            Delete: Since we do not store your text inputs, there's no stored personal data to delete. However, you can uninstall the app to cease any data processing.</p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">6. Changes to This Privacy Policy</h2>
            <p>This Privacy Policy may be updated from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by updating the "Last Updated" date at the top of this policy.</p>
            
            <h2 className="text-2xl font-semibold text-secondary mt-8 mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please 
              contact us at:
            </p>
            <p>
              Email: <a href="mailto:arcatextapp@gmail.com" className="text-primary hover:underline">
                arcatextapp@gmail.com
              </a>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}