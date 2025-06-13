import React from 'react';

const testimonials = [
  {
    id: 1,
    name: "Jennifer Smith",
    location: "Chicago, IL",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    text: "We found the most amazing lake house through Goldilock's List. It had everything we needed for our three kids, and the host even provided beach toys and life jackets. It truly was 'just right' for our family!",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Johnson",
    location: "San Diego, CA",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    text: "As a family of six, finding accommodations can be challenging. Goldilock's List helped us discover a spacious mountain cabin with separate rooms for the kids. The recommendations were spot on!",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Miami, FL",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
    text: "The farm stay we booked through Goldilock's List was the highlight of our year. Our children loved feeding the animals each morning, and the host family was incredibly welcoming. We've already booked our return visit!",
    rating: 5,
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 bg-[#f8e1e6]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Happy Families</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from families who found their perfect stays through Goldilock's List
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-md p-6 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-${i < testimonial.rating ? 'amber' : 'gray'}-400`}>★</span>
                ))}
              </div>
              
              <p className="text-gray-700 italic">"{testimonial.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;