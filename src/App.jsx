import React, { useState, useEffect } from 'react'

const navItems = ['Home', 'About', 'Programs', 'Team', 'Gallery', 'Contact']

const WhatsAppIcon = ({ className = 'w-5 h-5' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.62 2 2.2 6.4 2.2 11.82c0 1.73.45 3.42 1.31 4.91L2 22l5.42-1.42a9.83 9.83 0 0 0 4.6 1.17h.01c5.41 0 9.83-4.4 9.84-9.82A9.77 9.77 0 0 0 19.05 4.91Zm-7.02 15.17h-.01a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.22.84.86-3.14-.2-.32a8.13 8.13 0 0 1-1.25-4.33c0-4.5 3.68-8.16 8.2-8.16 2.19 0 4.25.85 5.79 2.39a8.1 8.1 0 0 1 2.4 5.78c0 4.5-3.69 8.16-8.13 8.16Zm4.47-6.1c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.17-1.4-1.31-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.56 4.08 3.59.57.25 1.02.4 1.37.51.58.18 1.1.15 1.51.09.46-.07 1.4-.57 1.6-1.13.2-.55.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
  </svg>
)

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed w-full bg-[#006400] shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-3">
            <img src="/images/SYLS-Logo.jpg.jpeg" alt="SYLS Logo" className="h-10 w-10 object-contain rounded-md" />
            <button onClick={() => setCurrentPage('Home')} className="text-2xl font-bold text-green-100 hover:text-white transition">
              Say Yes Learning schools 
            </button>
          </div>

          <div className="hidden md:flex space-x-1">
            {navItems.map(item => (
              <button
                key={item}
                type="button"
                onClick={() => currentPage !== item && setCurrentPage(item)}
                disabled={currentPage === item}
                aria-current={currentPage === item ? 'page' : undefined}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${
                  currentPage === item
                    ? 'bg-green-500 text-green-950 cursor-default'
                    : 'text-green-100 hover:bg-green-700 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-amber-100 hover:text-white focus:outline-none"
            >
              {isOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-3">
            {navItems.map(item => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  if (currentPage !== item) {
                    setCurrentPage(item)
                  }
                  setIsOpen(false)
                }}
                disabled={currentPage === item}
                aria-current={currentPage === item ? 'page' : undefined}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item
                    ? 'bg-green-500 text-green-950 cursor-default'
                    : 'text-green-100 hover:bg-green-700 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

const FixedMarquee = () => {
  const newsHeadlines = [
    'SYLS: 11 dedicated board members guiding educational excellence',
    'Academic Excellence Program: Mathematics, Sciences, Languages, Social Studies',
    'Sports & Recreation: Team sports, individual sports, fitness programs, competitions',
    'Arts & Culture: Music, visual arts, drama, cultural events',
    'Life Skills: Leadership, ethics, communication, problem solving',
    'SYLS Mission: Quality education for leaders, innovators, responsible citizens',
    'Experienced faculty, comprehensive curriculum, state-of-the-art facilities',
    'Emphasis on character development and leadership training',
    'Strong community involvement and parental engagement',
    'Proven track record of student excellence and achievement'
  ]

  const marqueeHeadlines = [...newsHeadlines, ...newsHeadlines]

  return (
    <div className="fixed top-16 left-0 right-0 z-40 overflow-hidden h-10 bg-[#006400] flex items-center shadow-md">
      <div className="animate-marquee-track flex w-max min-w-max items-center text-white font-bold text-sm md:text-base" style={{ animationDuration: '100s' }}>
        {marqueeHeadlines.map((headline, idx) => (
          <span key={`${headline}-${idx}`} className="shrink-0 px-6">{headline}</span>
        ))}
      </div>
    </div>
  )
}

// Home Page Component
const HomePage = ({ setCurrentPage }) => {
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80',
      titleSub: 'Say Yes to',
      titleMain: 'Quality Education',
      caption: 'Transforming lives through excellence, integrity, and dedicated educational leadership.'
    },
    {
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1800&q=80',
      titleSub: 'Say Yes to',
      titleMain: 'Student Success',
      caption: 'Nurturing leaders through innovative teaching and hands-on experiences.'
    },
    {
      image: 'https://s7d1.scene7.com/is/image/wbcollab/vk-blog1-edu?qlt=90&fmt=webp&resMode=sharp2',
      titleSub: 'Say Yes to',
      titleMain: 'Community Growth',
      caption: 'Building stronger communities through accessible, high-quality schooling.'
    },
    {
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80',
      titleSub: 'Say Yes to',
      titleMain: 'Inclusive Learning',
      caption: 'A welcoming environment for every learner to thrive and achieve.'
    },
    {
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1800&q=80',
      titleSub: 'Say Yes to',
      titleMain: 'Future Readiness',
      caption: 'Preparing youth with knowledge, values, and 21st-century skills.'
    }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5500)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <div className="space-y-10">
      <section className="relative pt-10">
        {/* Hero Slider */}
        <div className="relative h-[56vh] min-h-[420px]">
        <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out" style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }} />
        <div className="absolute inset-0 bg-black/40" />

        {/* Arrow Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
          aria-label="Previous slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all hover:scale-110"
          aria-label="Next slide"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {heroSlides[currentSlide].titleSub}
            <span className="block text-[#006400]">{heroSlides[currentSlide].titleMain}</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-100 mb-8 max-w-3xl">{heroSlides[currentSlide].caption}</p>
          <button 
            onClick={() => setCurrentPage('Contact')}
            className="bg-[#006400] hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all transform hover:scale-105"
          >
            Learn More
          </button>

          <div className="mt-8 flex gap-3">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-3 w-3 rounded-full transition-all ${idx === currentSlide ? 'bg-white scale-110' : 'bg-white/60 hover:bg-white'}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
      </section>

      <section className="mt-6 p-6 bg-[#006400] rounded-lg shadow-lg border-l-4 border-green-600">
        <h2 className="text-2xl font-bold text-white mb-4 text-center">Our Mission</h2>
        <p className="text-green-100 text-lg leading-relaxed text-center max-w-3xl mx-auto">
          To provide comprehensive, quality education that empowers students to become leaders, innovators, and responsible citizens who contribute positively to society.
        </p>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{ number: '11', label: 'Board Members' }, { number: '100%', label: 'Commitment' }, { number: '∞', label: 'Potential' }].map((stat, idx) => (
              <div key={idx} className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-[#006400] mb-2">{stat.number}</div>
                <div className="text-gray-700">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">Our <span className="text-[#006400]">Core Values</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🎓', title: 'Excellence', desc: 'Providing outstanding education' },
              { icon: '🤝', title: 'Integrity', desc: 'Operating with honesty' },
              { icon: '🌟', title: 'Innovation', desc: 'Embracing modern approaches' },
              { icon: '❤️', title: 'Compassion', desc: 'Caring for every student' }
            ].map((value, idx) => (
              <div key={idx} className="p-6 bg-[#006400] rounded-lg hover:shadow-xl transition-all transform hover:scale-105 border border-green-600">
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                <p className="text-green-100">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// About Page Component
const AboutPage = () => {
  return (
    <div className="pt-20 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-12">About Say Yes Learning Schools</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-[#006400] mb-4">Who We Are</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Say Yes Learning Schools is a premier educational institution dedicated to nurturing intellectual growth, character development, and holistic learning for our students. Our commitment is to create an environment where every student can thrive and reach their full potential.
            </p>
            <h2 className="text-2xl font-bold text-[#006400] mb-4">Our Vision</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              To be recognized as a leading institution that produces well-rounded graduates equipped with academic excellence, strong values, and the ability to make meaningful contributions to society.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#006400] mb-4">Why Choose SYLS?</h2>
            <div className="space-y-3">
              {[
                'Experienced and dedicated faculty members',
                'Comprehensive curriculum with practical learning',
                'State-of-the-art facilities and resources',
                'Emphasis on character and leadership development',
                'Strong community and parental involvement',
                'Proven track record of student excellence',
                'Safe and nurturing learning environment',
                'Holistic approach to education'
              ].map((reason, idx) => (
                <div key={idx} className="flex items-start p-3 bg-[#006400] rounded-lg border border-green-600">
                  <span className="text-white mr-3 text-lg">✓</span>
                  <span className="text-white">{reason}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Programs Page Component
const ProgramsPage = () => {
  const programs = [
    {
      icon: '📚',
      title: 'Academic Excellence',
      description: 'Rigorous curriculum designed to foster critical thinking and lifelong learning',
      highlights: ['Mathematics', 'Sciences', 'Languages', 'Social Studies']
    },
    {
      icon: '🎯',
      title: 'Sports & Recreation',
      description: 'Comprehensive athletic programs promoting physical fitness and teamwork',
      highlights: ['Team Sports', 'Individual Sports', 'Fitness Programs', 'Competitions']
    },
    {
      icon: '🎨',
      title: 'Arts & Culture',
      description: 'Creative programs encouraging artistic expression and cultural awareness',
      highlights: ['Music', 'Visual Arts', 'Drama', 'Cultural Events']
    },
    {
      icon: '🌱',
      title: 'Life Skills',
      description: 'Development programs for character building and personal growth',
      highlights: ['Leadership', 'Ethics', 'Communication', 'Problem Solving']
    }
  ]

  return (
    <div className="pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Programs</h1>
        <p className="text-xl text-gray-700 mb-12">Comprehensive educational programs for holistic development</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programs.map((program, idx) => (
            <div key={idx} className="p-8 bg-[#006400] rounded-lg border border-green-600 hover:shadow-xl transition-all">
              <div className="text-5xl mb-4">{program.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">{program.title}</h3>
              <p className="text-green-100 mb-4">{program.description}</p>
              <div className="space-y-2">
                <h4 className="font-bold text-green-200">Key Areas:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {program.highlights.map((highlight, hidx) => (
                    <div key={hidx} className="text-green-200 text-sm flex items-center">
                      <span className="text-white mr-2">•</span> {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Team Page Component
const TeamPage = () => {
  const boardMembers = [
    {
      name: 'Ali Barnet',
      role: 'Board Member',
      photo: '/images/board-members/Ali Barnet Photo.jpg'
    },
    {
      name: 'Andrew Mtukuleni',
      role: 'Board Member',
      photo: '/images/board-members/Andrew Mtukuleni Photo.jpg'
    },
    {
      name: 'Catherine Chisuse',
      role: 'Board Member',
      photo: '/images/board-members/Catherine Chisuse Photo.jpg'
    },
    {
      name: 'Ernest Chilalika',
      role: 'Board Member',
      photo: '/images/board-members/Ernest Chilalika Photo.jpeg'
    },
    {
      name: 'Esther Nyirenda',
      role: 'Board Member',
      photo: '/images/board-members/Esther Nyirenda Passport photo.jpg'
    },
    {
      name: 'Jenala Bota',
      role: 'Board Member',
      photo: '/images/board-members/Jenala Bota Photo.jpg'
    },
    {
      name: 'Judie Anafi',
      role: 'Board Member',
      photo: '/images/board-members/Judie Anafi_Photo.jpg'
    },
    {
      name: 'Judith Lungu',
      role: 'Board Member',
      photo: '/images/board-members/Judith Lungu Photo.jpg'
    },
    {
      name: 'Lizzie Muyawa Dube',
      role: 'Board Member',
      photo: '/images/board-members/Lizzie Muyawa Dube Photo.jpg'
    },
    {
      name: 'Lundu Soliat',
      role: 'Board Member',
      photo: '/images/board-members/Photo_Lundu Soliat.png'
    },
    {
      name: 'Shupekire Jere',
      role: 'Board Member',
      photo: '/images/board-members/Shupekire Jere Passport Photo.jpg'
    }
  ]

  return (
    <div className="pt-20 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Board Members</h1>
        <p className="text-xl text-gray-700 mb-12">Dedicated leaders guiding Say Yes Learning Schools</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {boardMembers.map((member, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-lg border border-gray-300 hover:border-[#006400] transition-all bg-white shadow-md hover:shadow-lg">
              <div className="aspect-square overflow-hidden bg-[#006400]">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23006400" width="200" height="200"/%3E%3Ctext x="50%%" y="50%%" fill="%23fff" font-size="12" text-anchor="middle" dy=".3em"%3EPhoto unavailable%3C/text%3E%3C/svg%3E'
                  }}
                />
              </div>
              <div className="p-4 bg-[#006400]">
                <h3 className="font-bold text-white text-center">{member.name}</h3>
                <p className="text-green-200 text-sm text-center">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-[#006400] rounded-lg border border-green-600">
          <h2 className="text-2xl font-bold text-white mb-4">Leadership & Governance</h2>
          <p className="text-green-100 mb-4">
            Our board members are committed to providing strategic oversight and ensuring that Say Yes Learning Schools
            maintains the highest standards of educational excellence and institutional integrity.
          </p>
        </div>
      </div>
    </div>
  )
}

// Gallery Page Component
const GalleryPage = () => {
  const galleryCategories = [
    {
      title: 'School Events',
      description: 'Memorable moments from our school gatherings and celebrations'
    },
    {
      title: 'Academic Activities',
      description: 'Students engaged in learning and academic excellence'
    },
    {
      title: 'Sports & Recreation',
      description: 'Athletes showcasing skill and teamwork'
    },
    {
      title: 'Cultural Programs',
      description: 'Celebrations of arts, music, and culture'
    }
  ]

  return (
    <div className="pt-20 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Gallery</h1>
        <p className="text-xl text-gray-700 mb-12">Capturing moments of excellence and growth</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galleryCategories.map((category, idx) => (
            <div key={idx} className="p-12 bg-[#006400] rounded-lg border border-green-600 hover:shadow-xl transition-all group cursor-pointer">
              <div className="text-4xl mb-4 text-center">📸</div>
              <h3 className="text-2xl font-bold text-white mb-2 text-center">{category.title}</h3>
              <p className="text-green-100 text-center">{category.description}</p>
            </div>
          ))}
        </div>

        {/* <div className="mt-12 p-8 bg-[#006400] rounded-lg border border-green-600">
          <p className="text-green-100 text-center">
            Photo gallery content can be added and managed by uploading images.
          </p>
        </div> */}
      </div>
    </div>
  )
}

// Contact Page Component
const ContactPage = () => {
  const whatsappNumber = '265885871388'
  const whatsappLink = `https://wa.me/${whatsappNumber}`

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormData({ name: '', email: '', subject: '', message: '' })
    window.location.href = whatsappLink
  }

  return (
    <div className="pt-20 pb-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-700 mb-12">Get in touch with Say Yes Learning Schools</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#006400]"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#006400]"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#006400]"
                  placeholder="Message subject"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#006400]"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#006400] hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="p-6 bg-[#006400] rounded-lg border border-green-600">
              <h3 className="text-xl font-bold text-white mb-3">📍 Location</h3>
              <p className="text-green-100">Say Yes Learning Schools</p>
              <p className="text-green-100">Malawi</p>
            </div>

            <div className="p-6 bg-[#006400] rounded-lg border border-green-600">
              <h3 className="text-xl font-bold text-white mb-3">📞 Contact Information</h3>
              <p className="text-green-100 mb-2">lizzie.dube@yahoo.com</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-100 hover:text-white underline underline-offset-4"
              >
                WhatsApp: +265885871388
              </a>
            </div>

            <div className="p-6 bg-[#006400] rounded-lg border border-green-600">
              <h3 className="text-xl font-bold text-white mb-3">🕐 Office Hours</h3>
              <p className="text-green-100">Monday - Friday</p>
              <p className="text-green-100">7:30 AM - 4:00 PM</p>
            </div>

            <div className="p-6 bg-[#006400] rounded-lg border border-green-600">
              <h3 className="text-xl font-bold text-white mb-3">🔗 Connect With Us</h3>
              <div className="flex space-x-3">
                <button type="button" className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center font-bold transition">
                  f
                </button>
                <button type="button" className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center font-bold transition">
                  in
                </button>
                <button
                  type="button"
                  onClick={() => { window.location.href = whatsappLink }}
                  aria-label="Open WhatsApp"
                  className="w-10 h-10 bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition"
                >
                  <WhatsAppIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Footer Component
const Footer = ({ currentPage, setCurrentPage }) => {
  return (
      <footer className="bg-green-900 border-t border-green-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold text-yellow-300 mb-4">Say Yes Learning schools</h3>
            <p className="text-green-200">Empowering students through quality education and holistic development.</p>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-amber-200 text-sm">
              {navItems.filter(item => item !== currentPage).map(item => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(item)}
                    className="text-sm text-amber-200 hover:text-yellow-300 transition"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-amber-200 text-sm">
              <li><a href="#" className="hover:text-yellow-300">Student Portal</a></li>
              <li><a href="#" className="hover:text-yellow-300">Parent Resources</a></li>
              <li><a href="#" className="hover:text-yellow-300">Academic Calendar</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-4">Information</h4>
            <p className="text-amber-200 text-sm">Malawi</p>
            <p className="text-amber-200 text-sm">lizzie.dube@yahoo.com</p>
            <p className="text-amber-200 text-sm">+265885871388</p>
          </div>
        </div>
        <div className="border-t border-amber-800 pt-8 text-center text-amber-300">
          <p>&copy; 2026 Say Yes Learning Schools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('Home')

  const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <HomePage setCurrentPage={setCurrentPage} />
      case 'About':
        return <AboutPage />
      case 'Programs':
        return <ProgramsPage />
      case 'Team':
        return <TeamPage />
      case 'Gallery':
        return <GalleryPage />
      case 'Contact':
        return <ContactPage />
      default:
        return <HomePage setCurrentPage={setCurrentPage} />
    }
  }

  return (
    <div className="bg-white min-h-screen text-gray-900">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <FixedMarquee />
      <main className="pt-10">
        {renderPage()}
      </main>
      <Footer currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  )
}
