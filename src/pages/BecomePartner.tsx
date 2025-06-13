import React, { useState } from 'react';
import Layout from '../components/common/Layout';
import { 
  Users, 
  Star, 
  TrendingUp, 
  Shield, 
  Globe, 
  Heart, 
  CheckCircle, 
  ArrowRight,
  Mail,
  Award,
  Target,
  Briefcase,
  Send,
  ExternalLink
} from 'lucide-react';
import Button from '../components/common/Button';

interface PartnerApplicationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  foraAdvisorId: string;
  yearsExperience: string;
  specialties: string[];
  portfolioUrl: string;
  linkedinUrl: string;
  whyPartner: string;
  preferredDestinations: string;
  agreeToTerms: boolean;
}

const specialtyOptions = [
  'Family Travel',
  'Luxury Hotels',
  'Boutique Properties',
  'Multi-generational Travel',
  'Adventure Travel',
  'Wellness & Spa',
  'Cultural Experiences',
  'Beach Destinations',
  'Mountain Retreats',
  'City Breaks',
  'International Travel',
  'Domestic Travel'
];

const BecomePartner: React.FC = () => {
  const [formData, setFormData] = useState<PartnerApplicationForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    foraAdvisorId: '',
    yearsExperience: '',
    specialties: [],
    portfolioUrl: '',
    linkedinUrl: '',
    whyPartner: '',
    preferredDestinations: '',
    agreeToTerms: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => {
      const currentSpecialties = prev.specialties;
      if (currentSpecialties.includes(specialty)) {
        return {
          ...prev,
          specialties: currentSpecialties.filter(s => s !== specialty)
        };
      }
      if (currentSpecialties.length < 5) {
        return {
          ...prev,
          specialties: [...currentSpecialties, specialty]
        };
      }
      return prev;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitted(true);
    setLoading(false);
  };

  const benefits = [
    {
      icon: <TrendingUp className="w-8 h-8 text-amber-600" />,
      title: "Qualified Leads",
      description: "Receive high-quality booking leads from families actively seeking boutique hotel experiences."
    },
    {
      icon: <Star className="w-8 h-8 text-amber-600" />,
      title: "Curated Portfolio",
      description: "Access our handpicked collection of family-friendly boutique and lifestyle hotels."
    },
    {
      icon: <Shield className="w-8 h-8 text-amber-600" />,
      title: "Fora Partnership",
      description: "Leverage the trusted Fora Travel platform for seamless booking and commission management."
    },
    {
      icon: <Globe className="w-8 h-8 text-amber-600" />,
      title: "Marketing Support",
      description: "Benefit from our marketing efforts and brand recognition in the family travel space."
    },
    {
      icon: <Users className="w-8 h-8 text-amber-600" />,
      title: "Community Network",
      description: "Join a select network of family travel specialists and share best practices."
    }
  ];

  const requirements = [
    "Active Certified Fora Travel Advisor in good standing",
    "Demonstrated expertise in family travel planning",
    "Strong client testimonials and portfolio",
    "Commitment to Goldilock's List brand standards"
  ];

  if (submitted) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Application Submitted Successfully!
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Thank you for your interest in becoming a Goldilock's List Travel Advisor Partner. Our team will review your application and get back to you within 3-5 business days.
              </p>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
                <div className="space-y-3 text-left">
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-amber-600 text-sm font-bold">1</span>
                    </div>
                    <p className="text-gray-700">Application review by our Travel Advisor Partnership team</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-amber-600 text-sm font-bold">2</span>
                    </div>
                    <p className="text-gray-700">Initial phone interview to discuss Travel Advisor Partnership details</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-amber-600 text-sm font-bold">3</span>
                    </div>
                    <p className="text-gray-700">Onboarding and platform training</p>
                  </div>
                  <div className="flex items-start">
                    <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-amber-600 text-sm font-bold">4</span>
                    </div>
                    <p className="text-gray-700">Start receiving qualified leads!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50">
        {/* Hero Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mr-4">
                  <Briefcase className="w-8 h-8 text-amber-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Become a Travel Advisor Partner
                </h1>
              </div>
              
              <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                Join our exclusive network of Certified Fora Travel Advisors and connect with families seeking 
                'just right' boutique hotel experiences. Turn your expertise into qualified bookings.
              </p>

              <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200 mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-amber-600 mr-2" />
                  <span className="text-lg font-semibold text-gray-900">Exclusively for Certified Fora Travel Advisors</span>
                </div>
                <p className="text-gray-600 mb-4">
                  We partner exclusively with Fora Travel's certified advisors to ensure the highest level of service 
                  and seamless booking experiences for our clients.
                </p>
                <a
                  href="https://referral.foratravel.com/ABCTPD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Join Fora
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Become a Travel Advisor Partner with Goldilock's List?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We provide everything you need to succeed in the growing family travel market
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Our Travel Advisor Partnership Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                A seamless process designed to maximize your success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Qualified Leads</h3>
                <p className="text-gray-600">
                  We send you pre-qualified families actively seeking boutique hotel experiences that match your expertise.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Provide Expert Service</h3>
                <p className="text-gray-600">
                  Use your expertise to create perfect family travel experiences using our curated hotel portfolio.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Book Through Fora</h3>
                <p className="text-gray-600">
                  Complete bookings through the trusted Fora platform and receive your commissions seamlessly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Requirements */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Travel Advisor Partnership Requirements</h2>
                <p className="text-gray-600">
                  We maintain high standards to ensure exceptional client experiences
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {requirements.map((requirement, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{requirement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Apply to Become a Travel Advisor Partner</h2>
                <p className="text-gray-600">
                  Ready to join our network? Complete the application below and we'll be in touch within 3-5 business days.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fora Advisor ID *</label>
                    <input
                      type="text"
                      required
                      value={formData.foraAdvisorId}
                      onChange={(e) => setFormData(prev => ({ ...prev, foraAdvisorId: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="Your Fora Travel Advisor ID"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience *</label>
                    <select
                      required
                      value={formData.yearsExperience}
                      onChange={(e) => setFormData(prev => ({ ...prev, yearsExperience: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      <option value="">Select experience level</option>
                      <option value="0-2">0-2 years</option>
                      <option value="2-3">2-3 years</option>
                      <option value="4-5">4-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="10+">10+ years</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Travel Specialties * (Select up to 5)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {specialtyOptions.map(specialty => (
                      <button
                        key={specialty}
                        type="button"
                        onClick={() => handleSpecialtyToggle(specialty)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          formData.specialties.includes(specialty)
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {specialty}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio/Website URL</label>
                    <input
                      type="url"
                      value={formData.portfolioUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="https://your-portfolio.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                    <input
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      placeholder="https://linkedin.com/in/yourprofile"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Destinations
                  </label>
                  <textarea
                    value={formData.preferredDestinations}
                    onChange={(e) => setFormData(prev => ({ ...prev, preferredDestinations: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="List your preferred destinations and regions of expertise..."
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why do you want to become a Travel Advisor Partner with Goldilock's List? *
                  </label>
                  <textarea
                    required
                    value={formData.whyPartner}
                    onChange={(e) => setFormData(prev => ({ ...prev, whyPartner: e.target.value }))}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    placeholder="Tell us about your interest in family travel and boutique hotels..."
                  />
                </div>

                <div className="mb-6">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                      className="mt-1 mr-3 h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                      required
                    />
                    <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
                      I agree to the Terms & Conditions for Fora Travel Advisors. I understand that my access to Goldilocks List is for personal use with clients via Fora only, and that copying or redistributing content is not allowed. *
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  primary
                  className="w-full flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Application
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-500 mt-4 text-center">
                  By submitting this application, you agree to our Travel Advisor Partnership terms and conditions.
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Questions About Our Travel Advisor Partnership?</h2>
              <p className="text-gray-600 mb-8">
                Our Travel Advisor Partnership team is here to help you understand the opportunity and application process.
              </p>

              <div className="max-w-md mx-auto">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <Mail className="w-8 h-8 text-amber-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Email Us</h3>
                  <p className="text-gray-600 text-sm mb-3">Get detailed information about our Travel Advisor Partnership program</p>
                  <a href="mailto:partners@goldilockslist.com" className="text-amber-600 hover:text-amber-700 font-medium">
                    partners@goldilockslist.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BecomePartner;