import React from 'react';
import Layout from '../components/common/Layout';
import { Newspaper, Calendar, User, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "10 Must-Visit Family Destinations for 2025",
    excerpt: "Discover the top family-friendly vacation spots that offer activities for all ages while maintaining the comfort every family needs.",
    date: "April 15, 2025",
    author: "Jessica Wilson",
    readTime: "8 min read",
    category: "Destinations",
    image: "https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg"
  },
  {
    id: 2,
    title: "Packing Essentials for Family Vacations",
    excerpt: "The ultimate checklist to ensure you have everything you need for a stress-free family trip, from toddlers to teens.",
    date: "April 10, 2025",
    author: "Michael Rodriguez",
    readTime: "6 min read",
    category: "Tips & Tricks",
    image: "https://images.pexels.com/photos/6169051/pexels-photo-6169051.jpeg"
  },
  {
    id: 3,
    title: "How to Find Kid-Friendly Activities at Any Destination",
    excerpt: "A guide to discovering the best family activities no matter where you're staying, including hidden gems the locals love.",
    date: "April 5, 2025",
    author: "Amanda Johnson",
    readTime: "5 min read",
    category: "Activities",
    image: "https://images.pexels.com/photos/1449775/pexels-photo-1449775.jpeg"
  },
  {
    id: 4,
    title: "Budget-Friendly Family Vacations That Feel Luxurious",
    excerpt: "Stretch your vacation budget without sacrificing comfort or fun with these clever travel hacks and destination choices.",
    date: "March 28, 2025",
    author: "David Thompson",
    readTime: "7 min read",
    category: "Budget Travel",
    image: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg"
  },
  {
    id: 5,
    title: "Creating Lasting Memories: Beyond the Typical Family Vacation",
    excerpt: "How to plan meaningful experiences that your children will remember forever, from unique accommodations to special traditions.",
    date: "March 22, 2025",
    author: "Sarah Parker",
    readTime: "9 min read",
    category: "Family Bonding",
    image: "https://images.pexels.com/photos/3771836/pexels-photo-3771836.jpeg"
  },
  {
    id: 6,
    title: "Traveling with Multiple Age Groups: A Harmony Guide",
    excerpt: "Navigate the challenges of keeping everyone from toddlers to grandparents happy during your family travels.",
    date: "March 15, 2025",
    author: "Robert Chen",
    readTime: "8 min read",
    category: "Multi-generational",
    image: "https://images.pexels.com/photos/7148364/pexels-photo-7148364.jpeg"
  }
];

const Blog: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <Newspaper className="w-8 h-8 text-amber-500 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">The Family Travel Blog</h1>
          </div>
          
          <p className="text-gray-600 mb-12 text-lg max-w-3xl">
            Expert tips, destination guides, and inspirational stories to help you plan the perfect family getaway.
          </p>
          
          {/* Featured Post */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/1834403/pexels-photo-1834403.jpeg" 
                  alt="Featured blog post" 
                  className="h-64 md:h-full w-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                <div className="bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full inline-block mb-3">
                  Featured
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  How to Find the Perfect 'Just Right' Stay for Your Family
                </h2>
                <p className="text-gray-600 mb-4">
                  Our founder shares the insider methods we use to evaluate and select properties that perfectly balance family needs, comfort, and that special something that makes a stay memorable.
                </p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span className="mr-4">April 20, 2025</span>
                  <Clock className="w-4 h-4 mr-1" />
                  <span>10 min read</span>
                </div>
                <div className="flex items-center">
                  <img 
                    src="https://images.pexels.com/photos/5393594/pexels-photo-5393594.jpeg" 
                    alt="Emma Goldstein" 
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <span className="font-medium text-gray-900">Emma Goldstein, Founder</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="relative h-48">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="mr-4">{post.date}</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-gray-400" />
                      <span className="text-sm text-gray-500">{post.author}</span>
                    </div>
                    <Link to="#" className="text-amber-600 hover:text-amber-700 text-sm font-medium">
                      Read more →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Newsletter */}
          <div className="mt-16 bg-amber-50 rounded-xl p-8 border border-amber-100">
            <div className="md:flex items-center">
              <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Get Family Travel Tips in Your Inbox
                </h3>
                <p className="text-gray-700">
                  Subscribe to our newsletter for exclusive travel deals, destination inspiration, and expert advice for traveling with kids.
                </p>
              </div>
              <div className="md:w-1/3">
                <form className="flex flex-col sm:flex-row md:flex-col gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email address"
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 flex-grow"
                  />
                  <button 
                    type="submit"
                    className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors font-medium"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;