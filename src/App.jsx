import React, { useState, useEffect, useRef } from "react";

// Animation utilities
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

// Animated section wrapper
const AnimatedSection = ({ children, className = "", delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Page transition wrapper
const PageTransition = ({ children, isActive }) => {
  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isActive
          ? "opacity-100 transform translate-x-0"
          : "opacity-0 transform translate-x-4"
      }`}
    >
      {children}
    </div>
  );
};

const PageIntro = ({ kicker, title, description, align = "center" }) => {
  const alignmentClass = align === "left" ? "text-left" : "text-center";
  const copyClass = align === "left" ? "mx-0" : "mx-auto";

  return (
    <div className={`page-intro ${alignmentClass}`}>
      <span className="page-intro-kicker">{kicker}</span>
      <h1 className="page-intro-title">{title}</h1>
      <p className={`page-intro-copy ${copyClass}`}>{description}</p>
    </div>
  );
};

// Loading spinner component
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#006400] border-t-transparent"></div>
  </div>
);

const navItems = ["Home", "About", "Programs", "Team", "Gallery", "Contact"];

const WhatsAppIcon = ({ className = "w-5 h-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
  >
    <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.62 2 2.2 6.4 2.2 11.82c0 1.73.45 3.42 1.31 4.91L2 22l5.42-1.42a9.83 9.83 0 0 0 4.6 1.17h.01c5.41 0 9.83-4.4 9.84-9.82A9.77 9.77 0 0 0 19.05 4.91Zm-7.02 15.17h-.01a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-3.22.84.86-3.14-.2-.32a8.13 8.13 0 0 1-1.25-4.33c0-4.5 3.68-8.16 8.2-8.16 2.19 0 4.25.85 5.79 2.39a8.1 8.1 0 0 1 2.4 5.78c0 4.5-3.69 8.16-8.13 8.16Zm4.47-6.1c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.63-1.17-1.4-1.31-1.64-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.56 4.08 3.59.57.25 1.02.4 1.37.51.58.18 1.1.15 1.51.09.46-.07 1.4-.57 1.6-1.13.2-.55.2-1.03.14-1.13-.06-.1-.22-.16-.46-.28Z" />
  </svg>
);

// Navigation Component
const Navigation = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed z-50 w-full border-b border-white/10 bg-[#006400]/95 shadow-[0_18px_45px_rgba(0,0,0,0.15)] backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="group flex items-center gap-3">
            <img
              src="/images/SYLS-Logo.jpg.jpeg"
              alt="SYLS Logo"
              className="h-12 w-12 rounded-xl border border-white/15 bg-white/10 p-1 object-contain transition-transform group-hover:scale-110"
            />
            <div className="flex flex-col">
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-green-100/80">
                Malawi Non-Profit School
              </span>
              <button
                onClick={() => setCurrentPage("Home")}
                className="text-left text-xl font-bold text-white transition-all hover:text-green-50 sm:text-2xl"
              >
                Say Yes Learning Schools
              </button>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2 rounded-full border border-white/10 bg-white/10 px-2 py-2 shadow-inner">
            {navItems.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => currentPage !== item && setCurrentPage(item)}
                disabled={currentPage === item}
                aria-current={currentPage === item ? "page" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-all ${
                  currentPage === item
                    ? "bg-white text-[#0d3819] cursor-default shadow-md"
                    : "text-green-50/90 hover:bg-white/10 hover:text-white"
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-full border border-white/15 bg-white/10 p-2 text-green-50 transition-all hover:scale-110 hover:bg-white/15 focus:outline-none"
            >
              <span className="text-xl">{isOpen ? "X" : "="}</span>
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="animate-slide-in-left pb-4 md:hidden">
            {navItems.map((item, index) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  if (currentPage !== item) {
                    setCurrentPage(item);
                  }
                  setIsOpen(false);
                }}
                disabled={currentPage === item}
                aria-current={currentPage === item ? "page" : undefined}
                className={`mb-2 block w-full rounded-2xl px-4 py-3 text-left text-base font-semibold transition-all ${
                  currentPage === item
                    ? "bg-white text-[#0d3819] cursor-default"
                    : "bg-white/10 text-green-100 hover:bg-white/15 hover:text-white"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const FixedMarquee = () => {
  const newsHeadlines = [
    "Say Yes Learning Schools: Empowering Girls' Education in Malawi",
    "Evidence-Based Teaching Methods for Grades 1-8 Learners",
    "Building Quality Education in Area 44, TA Tsabango, Lilongwe",
    "Child Safety First: Protecting Every Learner's Future",
    "Integrity & Respect: Core Values Driving Educational Excellence",
    "Diversity & Inclusiveness: Welcoming All Learners to Thrive",
    "Malawian Non-Profit Committed to Educational Transformation",
    "Supporting Inquisitive Learning Through Proven Teaching Methods",
    "Quality Education for Leaders, Innovators, and Responsible Citizens",
    "Fundraising for School Construction: Building Tomorrow's Leaders Today",
  ];

  const marqueeHeadlines = [...newsHeadlines, ...newsHeadlines];

  return (
    <div className="fixed top-20 left-0 right-0 z-40 flex h-11 items-center overflow-hidden border-y border-green-100 bg-white/95 shadow-sm backdrop-blur-sm">
      <div
        className="animate-marquee-track flex w-max min-w-max items-center text-sm font-semibold tracking-wide text-[#006400] md:text-base"
        style={{ animationDuration: "100s" }}
      >
        {marqueeHeadlines.map((headline, idx) => (
          <span key={`${headline}-${idx}`} className="shrink-0 px-6">
            {headline}
          </span>
        ))}
      </div>
    </div>
  );
};

// Home Page Component
const HomePage = ({ setCurrentPage }) => {
  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1800&q=80",
      titleSub: "Say Yes to",
      titleMain: "Quality Education",
      caption:
        "Transforming lives through excellence, integrity, and dedicated educational leadership.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1800&q=80",
      titleSub: "Say Yes to",
      titleMain: "Student Success",
      caption:
        "Nurturing leaders through innovative teaching and hands-on experiences.",
    },
    {
      image:
        "https://s7d1.scene7.com/is/image/wbcollab/vk-blog1-edu?qlt=90&fmt=webp&resMode=sharp2",
      titleSub: "Say Yes to",
      titleMain: "Community Growth",
      caption:
        "Building stronger communities through accessible, high-quality schooling.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1800&q=80",
      titleSub: "Say Yes to",
      titleMain: "Inclusive Learning",
      caption:
        "A welcoming environment for every learner to thrive and achieve.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1800&q=80",
      titleSub: "Say Yes to",
      titleMain: "Future Readiness",
      caption:
        "Preparing youth with knowledge, values, and 21st-century skills.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  return (
    <div className="space-y-14 pb-6">
      <section className="relative pt-14">
        <div className="relative min-h-[520px] overflow-hidden rounded-b-[2rem] sm:min-h-[620px]">
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
              filter: "brightness(0.78) saturate(1.02)",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#052611]/85 via-[#0c4421]/55 to-black/30" />

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition-all hover:scale-110 hover:bg-white/20"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-3 text-white transition-all hover:scale-110 hover:bg-white/20"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl pt-16 text-left">
              <span className="mb-5 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-green-100 animate-fade-in-up">
                Quality primary education in Malawi
              </span>
              <h1 className="mb-5 text-4xl font-bold leading-tight text-white animate-fade-in-up sm:text-5xl md:text-6xl">
                {heroSlides[currentSlide].titleSub}
                <span className="block text-white">{heroSlides[currentSlide].titleMain}</span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg leading-8 text-green-50/95 animate-fade-in-up animation-delay-200 sm:text-xl md:text-2xl">
                {heroSlides[currentSlide].caption}
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button
                  onClick={() => setCurrentPage("Contact")}
                  className="rounded-full bg-white px-8 py-3 text-base font-semibold text-[#0b5f2c] shadow-lg transition-all hover:scale-105 hover:bg-green-50 animate-fade-in-up animation-delay-400"
                >
                  Learn More
                </button>
                <button
                  onClick={() => setCurrentPage("About")}
                  className="rounded-full border border-white/30 px-8 py-3 text-base font-semibold text-white transition-all hover:scale-105 hover:bg-white/10 animate-fade-in-up animation-delay-400"
                >
                  Our Story
                </button>
              </div>
            </div>

            <div className="mt-12 grid max-w-4xl grid-cols-1 gap-4 pb-10 sm:grid-cols-3 animate-fade-in-up animation-delay-600">
              {[
                { title: "Evidence-Based Teaching", text: "Focused support for learners from Grade 1 to Grade 8." },
                { title: "Safe, Inclusive Learning", text: "A values-driven environment where every child can thrive." },
                { title: "Community Impact", text: "Building classrooms and opportunities for future leaders." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/15 bg-white/10 p-5 text-white shadow-lg backdrop-blur-sm">
                  <h3 className="mb-2 text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-6 text-green-50/90">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-3 animate-fade-in-up animation-delay-600">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-3 w-3 rounded-full transition-all hover:scale-125 ${idx === currentSlide ? "bg-white scale-110" : "bg-white/60 hover:bg-white"}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatedSection delay={100}>
        <section className="site-shell">
          <div className="overflow-hidden rounded-[1.75rem] border border-green-800 bg-gradient-to-br from-[#004d1f] via-[#006400] to-[#0a7a31] px-6 py-10 text-center shadow-[0_28px_60px_rgba(0,57,20,0.28)] sm:px-10">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-green-100">
              Our Mission
            </p>
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">
              Empowering learners through quality, values-driven schooling
            </h2>
            <p className="mx-auto max-w-4xl text-lg leading-8 text-white">
              Say Yes Learning School's mission in Malawi is to deliver quality education to learners of all ages especially girls who have lagged behind in education for years in Malawi ranging from grade 1-8. Say Yes Learning Schools main goal is to support learners obtain inquisitive search for knowledge with evidence based methods of teaching.
            </p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={200}>
        <section className="site-shell">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              { number: "11", label: "Board Members", detail: "Experienced leaders supporting strategy and governance." },
              { number: "100%", label: "Commitment", detail: "Focused on learner growth, protection, and school excellence." },
              { number: "Infinity", label: "Potential", detail: "Helping children build brighter futures through education." },
            ].map((stat, idx) => (
              <div key={idx} className="grid-card p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="mb-3 text-5xl font-bold text-[#006400] animate-count-up">{stat.number}</div>
                <div className="mb-2 text-xl font-semibold text-gray-900">{stat.label}</div>
                <p className="text-base leading-7 text-gray-600">{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={300}>
        <section className="site-shell">
          <div className="page-intro">
            <span className="page-intro-kicker">Core Values</span>
            <h2 className="page-intro-title">Our <span className="text-[#006400]">Core Values</span></h2>
            <p className="page-intro-copy">The principles guiding how we teach, lead, and care for learners.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Child Safety", desc: "Ensuring the protection and well-being of every child" },
              { title: "Integrity", desc: "Operating with honesty and strong moral principles" },
              { title: "Respect & Honesty", desc: "Treating others with dignity and maintaining truthfulness" },
              { title: "Diversity & Inclusiveness", desc: "Embracing all backgrounds and ensuring equal opportunities" },
            ].map((value, idx) => (
              <div key={idx} className="overflow-hidden rounded-[1.5rem] border border-green-100 bg-white p-7 shadow-[0_24px_55px_rgba(6,42,20,0.08)] transition-all hover:-translate-y-2 hover:shadow-2xl" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="mb-5 h-1.5 w-14 rounded-full bg-[#006400]" />
                <h3 className="mb-3 text-xl font-bold text-gray-900">{value.title}</h3>
                <p className="text-base leading-7 text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
};

// About Page Component
const AboutPage = ({ setCurrentPage }) => {
  return (
    <div className="pt-32 pb-20">
      <div className="site-shell">
        <AnimatedSection>
          <PageIntro
            kicker="About Us"
            title="About Say Yes Learning Schools"
            description="A values-based non-profit school initiative focused on learner achievement, child protection, and inclusive educational growth in Malawi."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-8">
            <AnimatedSection delay={100}>
              <div className="grid-card p-8 sm:p-10">
                <h2 className="mb-5 text-3xl font-bold text-[#006400]">Who We Are</h2>
                <p className="text-lg leading-8 text-gray-700">
                  Say Yes Learning schools is a Malawian non-profit that aims at improving learners' education in primary school and prepare them to obtain high grades with teaching methods that are evidence based. We take action in promoting children's education for a successful future. Say Yes Learning Schools will be built in area 44, TA Tsabango. We strive to educate and protect children's future.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="grid-card p-8 sm:p-10">
                <h2 className="mb-5 text-3xl font-bold text-[#006400]">Our Mission</h2>
                <p className="text-lg leading-8 text-gray-700">
                  Say Yes Learning School's mission in Malawi is to deliver quality education to learners of all ages especially girls who have lagged behind in education for years in Malawi ranging from grade 1-8. Say Yes Learning Schools main goal is to support learners obtain inquisitive search for knowledge with evidence based methods of teaching.
                </p>
              </div>
            </AnimatedSection>
          </div>

          <div className="space-y-8">
            <AnimatedSection delay={300}>
              <div className="grid-card p-8 sm:p-10">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#006400]">
                  Vision
                </p>
                <h2 className="mb-5 text-3xl font-bold text-[#006400]">
                  Our Vision
                </h2>
                <p className="text-lg leading-8 text-gray-700">
                  Our vision at Say Yes Learning Schools in Malawi is to nurture leaders of tomorrow and empower learners especially (girls) to attain and retain educational knowledge.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <div className="grid-card p-8 sm:p-10">
                <h2 className="mb-5 text-3xl font-bold text-[#006400]">Our Values</h2>
                <ul className="space-y-4 text-lg text-gray-700">
                  {[
                    "Child safety",
                    "Integrity",
                    "Respect and honesty",
                    "Diversity and inclusiveness",
                  ].map((value) => (
                    <li key={value} className="flex items-start gap-3 leading-7">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-[#006400]" />
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => setCurrentPage("Contact")}
                  className="mt-8 rounded-full bg-[#006400] px-6 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Contact the School Team
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
};

// Programs Page Component
const ProgramsPage = () => {
  const programs = [
    {
      icon: "Academic",
      title: "Academic Excellence",
      description:
        "Rigorous curriculum designed to foster critical thinking and lifelong learning",
      highlights: ["Mathematics", "Sciences", "Languages", "Social Studies"],
    },
    {
      icon: "Sports",
      title: "Sports & Recreation",
      description:
        "Comprehensive athletic programs promoting physical fitness and teamwork",
      highlights: [
        "Team Sports",
        "Individual Sports",
        "Fitness Programs",
        "Competitions",
      ],
    },
    {
      icon: "Arts",
      title: "Arts & Culture",
      description:
        "Creative programs encouraging artistic expression and cultural awareness",
      highlights: ["Music", "Visual Arts", "Drama", "Cultural Events"],
    },
    {
      icon: "Skills",
      title: "Life Skills",
      description:
        "Development programs for character building and personal growth",
      highlights: ["Leadership", "Ethics", "Communication", "Problem Solving"],
    },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="site-shell">
        <PageIntro
          kicker="Programs"
          title="Our Programs"
          description="Comprehensive educational programs designed to support academic growth, creativity, character formation, and learner wellbeing."
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {programs.map((program, idx) => (
            <div
              key={idx}
              className="section-panel p-8 sm:p-10 transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#006400]">{program.icon}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{program.title}</h3>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-green-50" />
              </div>
              <p className="mb-6 text-lg leading-8 text-gray-700">{program.description}</p>
              <div>
                <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#006400]">Key Areas</h4>
                <div className="grid grid-cols-2 gap-3">
                  {program.highlights.map((highlight, hidx) => (
                    <div
                      key={hidx}
                      className="rounded-2xl border border-green-100 bg-green-50/70 px-4 py-3 text-sm font-semibold text-[#0d3819]"
                    >
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Team Page Component
const TeamPage = () => {
  const boardMembers = [
    {
      name: "Lizzie Muyawa Dube",
      role: "Chief Executive Officer",
      photo: "/images/board-members/Lizzie Muyawa Dube Photo.jpg",
      description:
        "Lizzie's principal research and teaching interests are sociological, historical, special needs, teacher education, and international education with a comparative analysis across intercultural aspects of education with a focus on youth and qualitative research methods.\n\nShe holds a Master's degree in Cultural Foundations of Education from Syracuse University in Syracuse, New York and a Bachelor's degree in Sociology from Hollins University in Roanoke, Virginia. She has worked in program/project management, social protection and case management with international organizations.\n\nShe has experience working in comprehensive schools, first as Postgraduate Education Project Coordinator in the United States at Syracuse University where she led a Dean's School of Education tutoring project for two years in five elementary and five high schools. Upon completion of her Master's Degree in Cultural Foundations of Education, she taught for a year at a primary school in Pittsburgh USA and later worked as class teacher at a private secondary school in Chikwawa district in Malawi. While in Chikwawa, she conducted special needs education research independently.",
    },
    {
      name: "Catherine Chisuse",
      role: "Board Chairperson",
      photo: "/images/board-members/Catherine Chisuse Photo.jpg",
      description:
        "Catherine is a flexible high-performance person with a strong focus on program development and quality. She is a multipurpose organized, program development specialist and manager with expertise in program management, governance, gender equality social inclusion, administration, organizational development, strategic program leadership and management, humanitarian emergency response, disaster risk management and community development.\n\nShe has accumulated this expertise over 18 years of professional engagements with WUSC-EUMC, United Nations, DAI Global, Goal Global, NBS Bank Plc, CCAP Blantyre Synod, Save the Children International SCI, and World Vision International. She holds a Master of Business Administration from Nexford University in USA.\n\nCatherine thrives in challenging environments, creates a strong vision for the future, develops strategies and clearly defines outcomes. She demonstrates value for money by focusing on accountability, quality and impact.",
    },
    {
      name: "Judith Anafi Mpasu",
      role: "Vice Chairperson",
      photo: "/images/board-members/Judie Anafi_Photo.jpg",
      description:
        "Judith is an Educationalist with over 10 years' experience. Having completed a Bachelor of Arts in Media from Chancellor College in 2009, she has mostly spent her career journey in the education field.\n\nShe worked with Ladybird International School before joining Chatonda Private as a teacher. In the course of her teaching, she was promoted to a post of a deputy head teacher which she was also further promoted as a school head teacher. Over the years, she has also worked at Nathenje Education Centre as a school principal.\n\nCurrently, she is working at Stars Academy as a School Principal.",
    },
    {
      name: "Lundu Soliat",
      role: "Treasurer",
      photo: "/images/board-members/Photo_Lundu Soliat.png",
      description:
        "Lundu is driven by the principle of empowering young people through hands-on science education, equipping them to develop practical skills and contribute to community development. With a degree in Agribusiness from Malawi Adventist University, Ntcheu, Lundu brings creativity and sustainability to teaching.\n\nDuring studies, led an eco-friendly apiculture project, turning beeswax into soap and hair pomade, showcasing innovative thinking. This project earned a 6-month internship as a farm manager, where developed leadership and communication skills. Also worked for a year at Airtel Malawi, excelling in customer service and communication by ensuring clients followed health protocols.\n\nToday, inspires students to apply classroom knowledge practically, fostering confidence, independence, and sustainable solutions for stronger communities and hopeful future.",
    },
    {
      name: "Judith Priscilla Lungu",
      role: "Secretary",
      photo: "/images/board-members/Judith Lungu Photo.jpg",
      description:
        "Judith Lungu (preferred name 'Judie') is a psychotherapist and a public health professional with 15 years of experience in adolescent and youth programs with both local and International Organizations.\n\nHer specialization is in key public health areas including: Mental Health and Wellbeing, Mental Health in Emergencies, HIV in Adolescence, Sexual and Reproductive Health (SRHR), Maternal and Child Health (MCH), Prevention of Mother to Child Transmission (PMTCT), Positive Youth Development (PYD), Water, Sanitation and Hygiene (WASH), Nutrition and Food Security, Early Childhood Development, Child Protection and Safety and Health Systems strengthening.\n\nCurrently working with Grassroot Soccer's global partnerships team, she is based in Lilongwe, Malawi collaborating with inspiring individuals and motivated institutions including Government.",
    },
    {
      name: "Esther Nyirenda",
      role: "Board Member",
      photo: "/images/board-members/Esther Nyirenda Passport photo.jpg",
      description:
        "Esther is an experienced and impact-oriented Development Specialist with over five years of leadership in inclusive, sustainability-driven programs, particularly in agriculture, livelihoods, and climate resilience. With a Master's in Aquaculture obtained from Lilongwe University of Agriculture and Natural Resources, she brings deep expertise in capacity building, knowledge transfer, and program-based learning.\n\nThrough strategic roles with the United Nations High Commissioner for Refugees (UNHCR), she has led innovative, learner-centered programs that promote economic inclusion through skills development, entrepreneurship training, and community education. Her work has centered on empowering marginalized groups—including refugees, youth, and smallholder farmers—with practical, market-relevant knowledge.",
    },
    {
      name: "Andrew Mtukuleni",
      role: "Board Member",
      photo: "/images/board-members/Andrew Mtukuleni Photo.jpg",
      description:
        "Andrew Mtukuleni is a distinguished Malawian professional with expertise in international trade, customs modernization, and education. He holds advanced degrees from the University of Muenster (Germany) and the University of Malawi, and is professionally accredited by the Chartered Institute of Procurement and Supply (UK).\n\nHe is the first Malawian to be accredited by the World Customs Organization (WCO) as a Customs Valuation Expert. Andrew co-developed the Customs Valuation training curriculum used at the Malawi University of Business and Applied Science.\n\nAs a board member of Say Yes to Education Schools, Andrew is helping to shape a progressive and inclusive educational environment, bringing expertise in curriculum development, training, and stakeholder engagement.",
    },
    {
      name: "Jenala Bota",
      role: "Board Member",
      photo: "/images/board-members/Jenala Bota Photo.jpg",
      description:
        "Jenala is a detail-oriented and experienced legal professional with over five years of experience in administrative legal support, compliance, and human rights work across national and international organizations.\n\nSkilled in legal research, document management, contract administration, and stakeholder coordination. Proven ability to work independently in dynamic, multicultural settings.\n\nCommitted to ethical governance, access to justice, and upholding organizational integrity.",
    },
    {
      name: "Ali Barnet",
      role: "Board Member",
      photo: "/images/board-members/Ali Barnet Photo.jpg",
      description:
        "Ali is highly motivated and result oriented with extensive experience in refugee status determination, resettlement and complementary pathways processes, and voluntary repatriation as well as refugee emergency response.\n\nDemonstrates expertise in conducting interviews, counselling refugees, and preparing detailed submissions aligned with UNHCR standards. Skilled in cross-cultural communication, anti-fraud procedures, and emergency response operations.\n\nProficient in utilizing ProGres V4 and generating statistical reports to ensure accurate case tracking and data management.",
    },
    {
      name: "Ernest Chilalika",
      role: "Board Member",
      photo: "/images/board-members/Ernest Chilalika Photo.jpeg",
      description:
        "Ernest is an experienced WASH, Irrigation and Renewable Energy Engineer with over 13 years of progressive experience in the design, implementation, and monitoring of inclusive WASH and Energy programmes in humanitarian and development contexts.\n\nDemonstrated expertise in gender-responsive WASH, WASH in Schools, community-led sanitation, and menstrual health promotion, with strong capacity in stakeholder coordination, capacity building, and results-based programme management.\n\nStrong commitment to advancing the United Nations Sustainable Development Goals (SDGs), particularly SDG-6, SDG-7, and SDG-13.",
    },
    {
      name: "Shupekire Jere",
      role: "Board Member",
      photo: "/images/board-members/Shupekire Jere Passport Photo.jpg",
      description:
        "Shupekire Jere is a highly respected and multifaceted individual with a wealth of experience in education, sales, and entrepreneurship. With over 17 years as a dedicated primary school teacher and a Certificate in Teaching for Primary Education, she honed her skills in shaping young minds.\n\nShupekire expanded her skill set by taking lessons in accounting and transitioning into sales, working with notable companies like Khumbo Aggressive Company and Blue Finance.\n\nShe successfully ran a side business importing cars from Japan and selling them in Malawi for over a decade, showcasing her entrepreneurial acumen.",
    },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="site-shell">
        <AnimatedSection>
          <PageIntro
            kicker="Leadership"
            title="Board Members"
            description="Dedicated leaders guiding Say Yes Learning Schools with expertise in education, governance, community development, and learner wellbeing."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {boardMembers.map((member, idx) => (
            <AnimatedSection
              key={idx}
              delay={idx * 100}
              className="group relative flex flex-col overflow-hidden rounded-[1.5rem] border border-green-100 bg-white shadow-[0_22px_55px_rgba(6,42,20,0.08)] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="h-56 w-full flex-shrink-0 overflow-hidden bg-[#006400]">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src =
                      'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23006400" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" fill="%23fff" font-size="12" text-anchor="middle" dy=".3em"%3EPhoto unavailable%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="flex-1 p-6">
                <div className="mb-3 h-1.5 w-12 rounded-full bg-[#006400]" />
                <h3 className="mb-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-[#006400]">
                  {member.name}
                </h3>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#006400]">
                  {member.role}
                </p>
                <p className="text-sm leading-7 text-gray-700 whitespace-pre-wrap">
                  {member.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={400}>
          <div className="mt-16 section-panel bg-[#006400] p-8 text-white sm:p-10">
            <h2 className="mb-4 text-3xl font-bold text-white">
              Leadership & Governance
            </h2>
            <p className="text-lg leading-8 text-green-50/95">
              Our board members are committed to providing strategic oversight
              and ensuring that Say Yes Learning Schools maintains the highest
              standards of educational excellence and institutional integrity.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

// Gallery Page Component
const GalleryPage = () => {
  return (
    <div className="pt-32 pb-20">
      <div className="site-shell">
        <PageIntro
          kicker="Gallery"
          title="School Gallery"
          description="Capturing moments of excellence, community, and growth across the life of the school."
        />

        <div className="section-panel mx-auto max-w-4xl p-12 text-center">
          <div className="mx-auto mb-6 h-16 w-16 rounded-[1.5rem] bg-green-50" />
          <h3 className="mb-3 text-3xl font-bold text-gray-900">Coming Soon</h3>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-gray-700">
            Our photo gallery is not available at this moment. We are working on
            showcasing memorable moments from our school events, academic
            activities, sports programs, and cultural celebrations. Check back
            later for updates.
          </p>
        </div>
      </div>
    </div>
  );
};

// Contact Page Component
const ContactPage = () => {
  const whatsappNumber = "265885871388";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = formData;
    const whatsappMessage = `Hello, my name is ${name}.
Email: ${email}

Subject: ${subject}

Message: ${message}`;
    const encodedMessage = encodeURIComponent(whatsappMessage);
    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodedMessage}`,
      "_blank",
    );
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="pt-32 pb-20">
      <div className="site-shell">
        <PageIntro
          kicker="Contact"
          title="Contact Us"
          description="Get in touch with Say Yes Learning Schools to learn more, partner with us, or support the future of education in Malawi."
        />

        <div
          id="donate"
          className="section-panel mb-16 overflow-hidden bg-green-50/80 p-8 sm:p-10"
        >
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#006400]">Get Involved</p>
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Make a Donation</h2>
            <p className="text-lg leading-8 text-gray-700">
              Learn how you can donate to make a difference in children's education in Malawi, especially girls. Please consider making a donation and help Say Yes Learning Schools build classrooms. Your help will ensure and brighten the children's education, simultaneously making our world a better place for all.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="grid-card p-6 sm:p-8">
              <h3 className="mb-4 text-2xl font-bold text-[#006400]">International Donation</h3>
              <p className="mb-4 text-gray-700 font-semibold">
                To donate internationally use:{" "}
                <a href="https://www.unfcu.org" target="_blank" rel="noopener noreferrer" className="text-[#006400] underline underline-offset-4">
                  www.unfcu.org
                </a>
              </p>
              <div className="space-y-2 text-sm leading-7 text-gray-700">
                <p><strong>Lizzie T Dube</strong></p>
                <p><strong>Member Number:</strong> 8147202</p>
                <p><strong>Checking Account:</strong> 20007843005</p>
                <p><strong>P.O. Box:</strong> 30230, Lilongwe, Malawi</p>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4 space-y-2 text-sm leading-7 text-gray-700">
                <p><strong>ABA/Bank Routing Number:</strong> 226078609</p>
                <p><strong>United Nations Federal Credit Union, NY</strong></p>
                <p><strong>Bank Address:</strong></p>
                <p>2 United Nations Plaza, New York<br />NY 10017, USA</p>
              </div>
              <div className="mt-4 border-t border-gray-200 pt-4 space-y-1 text-sm leading-7 text-gray-700">
                <p><strong>Phone:</strong> 265885871388 / 265997544244</p>
                <p><strong>Email:</strong> lizzie.dube@yahoo.com</p>
              </div>
            </div>

            <div className="grid-card p-6 sm:p-8">
              <h3 className="mb-4 text-2xl font-bold text-[#006400]">Local Donation (Malawi)</h3>
              <p className="mb-3 text-gray-700 font-semibold">To donate locally use:</p>
              <div className="space-y-2 text-sm leading-7 text-gray-700">
                <p><strong>National Bank of Malawi</strong></p>
                <p><strong>Say Yes Learning Schools</strong></p>
                <p><strong>Account Number:</strong> 1012897517</p>
                <p><strong>Swiftcode:</strong> NBMAMWMW002</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="section-panel p-8 sm:p-10">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-gray-700">Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="field-control w-full px-4 py-3 text-gray-900 placeholder-gray-500" placeholder="Your name" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-gray-700">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required className="field-control w-full px-4 py-3 text-gray-900 placeholder-gray-500" placeholder="your@email.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-gray-700">Subject</label>
                <input type="text" name="subject" value={formData.subject} onChange={handleChange} required className="field-control w-full px-4 py-3 text-gray-900 placeholder-gray-500" placeholder="Message subject" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-gray-700">Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="5" className="field-control w-full px-4 py-3 text-gray-900 placeholder-gray-500" placeholder="Your message here..."></textarea>
              </div>
              <button type="submit" className="w-full rounded-full bg-[#006400] px-6 py-3 text-base font-semibold text-white transition-all hover:scale-[1.01] hover:bg-green-700">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <div className="overflow-hidden rounded-[1.5rem] border border-green-800 bg-gradient-to-br from-[#004d1f] via-[#006400] to-[#0a7a31] p-6 text-white shadow-[0_24px_50px_rgba(0,57,20,0.24)]">
              <h3 className="mb-3 text-2xl font-bold text-white">Location</h3>
              <p className="text-lg text-white">Say Yes Learning Schools</p>
              <p className="text-white/95">Area 44, TA Tsabango, Lilongwe</p>
              <p className="text-white/95">Malawi</p>
            </div>

            <div className="grid-card p-6">
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Contact Information</h3>
              <p className="mb-2 text-gray-700">lizzie.dube@yahoo.com</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#006400] underline underline-offset-4">
                WhatsApp: +265885871388
              </a>
            </div>

            <div className="grid-card p-6">
              <h3 className="mb-3 text-2xl font-bold text-gray-900">Office Hours</h3>
              <p className="text-gray-700">Monday - Friday</p>
              <p className="text-gray-700">7:30 AM - 4:00 PM</p>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-green-900 bg-gradient-to-br from-[#0a3518] via-[#0f4a22] to-[#14652d] p-6 text-white shadow-[0_24px_50px_rgba(0,46,18,0.26)]">
              <h3 className="mb-3 text-2xl font-bold text-white">Connect With Us</h3>
              <p className="mb-4 text-white/95">Reach out directly for partnership, enrolment, and support conversations.</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Footer Component
const Footer = ({ currentPage, setCurrentPage }) => {
  const whatsappLink = "https://wa.me/265885871388";
  const footerLinks = navItems.filter((item) => item !== currentPage);

  return (
    <footer className="mt-20 border-t border-green-800 bg-gradient-to-br from-[#032d12] via-[#06451e] to-[#0b5f2c] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-10 grid grid-cols-1 gap-8 border-b border-white/15 pb-10 lg:grid-cols-[1.5fr_1fr_1fr_1.1fr]">
          <div className="max-w-md">
            <div className="mb-5 flex items-center gap-3">
              <img
                src="/images/SYLS-Logo.jpg.jpeg"
                alt="Say Yes Learning Schools logo"
                className="h-12 w-12 rounded-xl border border-white/15 object-contain bg-white/10 p-1"
              />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-green-200">
                  Say Yes Learning Schools
                </p>
                <h3 className="text-2xl font-bold text-white">
                  Building brighter futures through education
                </h3>
              </div>
            </div>
            <p className="text-sm leading-7 text-green-50/85">
              We are a Malawian non-profit committed to quality primary
              education, learner protection, and long-term community impact
              through inclusive and values-driven schooling.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-green-200">
              Explore
            </h4>
            <ul className="space-y-3 text-sm text-green-50/90">
              {footerLinks.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => setCurrentPage(item)}
                    className="group inline-flex items-center gap-2 transition hover:text-white"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-green-300 transition group-hover:scale-125" />
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-green-200">
              Contact
            </h4>
            <div className="space-y-3 text-sm text-green-50/90">
              <p>Area 44, TA Tsabango, Lilongwe, Malawi</p>
              <a
                href="mailto:lizzie.dube@yahoo.com"
                className="block transition hover:text-white"
              >
                lizzie.dube@yahoo.com
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-white"
              >
                +265 885 871 388
              </a>
              <p>Monday - Friday, 7:30 AM - 4:00 PM</p>
            </div>
          </div>

          <div>
            <div className="rounded-2xl border border-white/15 bg-white/10 p-5 shadow-lg shadow-black/10 backdrop-blur-sm">
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-green-200">
                Partner With Us
              </h4>
              <p className="mb-5 text-sm leading-7 text-green-50/90">
                Support school development, learner wellbeing, and access to
                quality education for children in Malawi.
              </p>
              <button
                type="button"
                onClick={() => setCurrentPage("Contact")}
                className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-[#0b5f2c] transition hover:bg-green-100"
              >
                Donate or Get Involved
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-sm text-green-50/80 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Say Yes Learning Schools. All
            rights reserved.
          </p>
          <p>
            Educating with integrity, inclusion, and care for every learner.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState("Home");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial load animation
    setTimeout(() => setIsLoaded(true), 100);
  }, []);

  const handlePageChange = (page) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    if (page !== currentPage) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(page);
        setIsTransitioning(false);
      }, 250);
    }
  };

  const renderPage = () => {
    const pageProps = { setCurrentPage: handlePageChange };

    switch (currentPage) {
      case "Home":
        return <HomePage {...pageProps} />;
      case "About":
        return <AboutPage {...pageProps} />;
      case "Programs":
        return <ProgramsPage />;
      case "Team":
        return <TeamPage />;
      case "Gallery":
        return <GalleryPage />;
      case "Contact":
        return <ContactPage />;
      default:
        return <HomePage {...pageProps} />;
    }
  };

  return (
    <>
      {!isLoaded && <LoadingSpinner />}
      <div
        className={`min-h-screen text-gray-900 transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <Navigation
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
        />
        <FixedMarquee />
        <main className="pt-14">
          <PageTransition isActive={!isTransitioning}>
            {renderPage()}
          </PageTransition>
        </main>
        <Footer currentPage={currentPage} setCurrentPage={handlePageChange} />
      </div>
    </>
  );
}
