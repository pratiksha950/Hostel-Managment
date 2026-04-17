import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Users, Target, Eye, CheckCircle, Star, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import ShaderBackground from '../components/ui/shader-background';

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    message: '',
    rating: 5,
    company: '',
    role: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/about');
        setAboutData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load about data');
        setLoading(false);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reviews');
        if (response.data.success) {
          setReviews(response.data.data || []);
        }
      } catch (err) {
        console.log('Failed to fetch reviews');
      }
    };

    fetchAboutData();
    fetchReviews();
  }, []);

  const handleReviewInputChange = (e) => {
    const { name, value } = e.target;
    setReviewForm(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await axios.post('http://localhost:8080/api/reviews', reviewForm);
      if (response.data.success) {
        setReviews(prev => [response.data.data, ...prev]);
        setReviewForm({
          name: '',
          email: '',
          message: '',
          rating: 5,
          company: '',
          role: ''
        });
        setShowReviewForm(false);
      }
    } catch (err) {
      console.log('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Oops! Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  const features = [
    { icon: <Users className="w-8 h-8" />, title: "Team Collaboration", description: "Seamlessly work together with your team members in real-time." },
    { icon: <Target className="w-8 h-8" />, title: "Goal Tracking", description: "Set, track, and achieve your goals with our intuitive dashboard." },
    { icon: <CheckCircle className="w-8 h-8" />, title: "Task Management", description: "Organize and prioritize tasks with advanced filtering and sorting." },
    { icon: <Star className="w-8 h-8" />, title: "Performance Analytics", description: "Get insights into your productivity with detailed analytics." }
  ];

  const whyChooseUs = [
    "Cutting-edge technology stack",
    "User-centric design approach",
    "24/7 customer support",
    "Scalable and secure architecture",
    "Continuous innovation and updates",
    "Proven track record of success"
  ];

  const teamMembers = aboutData?.team || [
    { name: 'Aria Reed', role: 'Founder & CEO', bio: 'Guiding product strategy with a systems-first mindset.' },
    { name: 'Eli Navarro', role: 'CTO', bio: 'Building the platform and engineering durable services.' },
    { name: 'Maya Chen', role: 'Head of Design', bio: 'Crafting intuitive experiences with precision and flair.' }
  ];

  return (
    <>
   <Navbar />
   <ShaderBackground />
    <div className="min-h-screen text-[#e8f7ff]">
      <section className="relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="relative max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cyan-200 backdrop-blur-md">
              Vision Brief
            </span>
            <h1 className="mt-8 text-5xl sm:text-6xl font-black tracking-tight leading-[0.94] text-transparent bg-clip-text bg-gradient-to-r from-[#e8f7ff] via-[#4dbfff] to-[#30ffd9]">
              Building connected systems for the next wave of innovation.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#b9d6ff] max-w-2xl leading-8">
              {aboutData?.tagline || 'We accelerate ambitious teams with a platform that blends intelligence, security, and elegant automation into every workflow.'}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#story"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4dbfff] to-[#30ffd9] px-6 py-3 text-sm font-semibold text-[#070914] shadow-lg shadow-cyan-500/20 transition duration-300"
              >
                Explore our story <ArrowRight className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href="#mission"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-white/5 px-6 py-3 text-sm font-semibold text-[#e8f7ff] transition duration-300 hover:border-cyan-300/40 hover:bg-white/10"
              >
                Mission & vision
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="story" className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-[32px] border border-white/8 bg-[rgba(4,12,30,0.78)] p-10 shadow-[0_40px_120px_rgba(7,14,34,0.18)] backdrop-blur-xl"
          >
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Origins</p>
            <h2 className="mt-6 text-4xl font-bold text-[#e8f7ff]">From bold ambition to a platform that moves with your team.</h2>
            <p className="mt-6 text-lg leading-8 text-[#b9d6ff]">
              {aboutData?.problem || 'Teams face fragmented workflows, sluggish collaboration, and tools that fail to keep up with modern ambition.'}
            </p>
            <p className="mt-5 text-lg leading-8 text-[#b9d6ff]">
              {aboutData?.solution || 'Our platform removes the complexity, connects every experience, and empowers teams to operate faster with more confidence.'}
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-[rgba(4,12,30,0.78)] p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-[#c7e6ff]">Projects deployed</p>
                <p className="mt-4 text-3xl font-semibold text-[#e8f7ff]">218+</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-[rgba(4,12,30,0.78)] p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-[#c7e6ff]">Response time</p>
                <p className="mt-4 text-3xl font-semibold text-[#e8f7ff]"><span className="text-[#30ffd9]">1hr</span> SLA</p>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="rounded-[28px] border border-cyan-400/15 bg-cyan-400/5 p-8 shadow-[0_25px_70px_rgba(17,88,128,0.18)] backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold text-[#e8f7ff]">Our mission</h3>
              <p className="mt-4 text-[#b9d6ff] leading-7">
                {aboutData?.mission || 'Empower teams worldwide with secure, intelligent workflows that scale effortlessly.'}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="rounded-[28px] border border-violet-400/10 bg-violet-400/5 p-8 shadow-[0_25px_70px_rgba(99,102,241,0.16)] backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold text-[#e8f7ff]">Our vision</h3>
              <p className="mt-4 text-[#b9d6ff] leading-7">
                {aboutData?.vision || 'To become the trusted operational layer for fluid, high-performing organizations.'}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-[28px] border border-slate-600/60 bg-[rgba(4,12,30,0.78)] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.16)] backdrop-blur-xl"
            >
              <h3 className="text-xl font-semibold text-[#e8f7ff]">Core values</h3>
              <ul className="mt-5 space-y-3 text-[#b9d6ff]">
                <li>Fast, clear communication</li>
                <li>Radical transparency</li>
                <li>Innovation through simplicity</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Platform Highlights</p>
          <h2 className="mt-4 text-4xl font-bold text-[#e8f7ff]">Capabilities built for tomorrow's teams.</h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#b9d6ff] leading-8">
            Every feature is designed to move workflows forward, not slow them down.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: index * 0.1 }}
              className="group rounded-[28px] border border-white/8 bg-[rgba(4,12,30,0.78)] p-8 shadow-[0_28px_80px_rgba(15,23,42,0.28)] hover:border-cyan-400/30 hover:shadow-[0_32px_90px_rgba(56,189,248,0.18)] transition-all duration-300"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-300 shadow-inner shadow-cyan-500/5">
                {feature.icon}
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#e8f7ff]">{feature.title}</h3>
              <p className="mt-4 text-[#b9d6ff] leading-7">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="team" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 bg-[#07111f]">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Leadership</p>
          <h2 className="mt-4 text-4xl font-bold text-[#e8f7ff]">Meet the crew powering every launch.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, delay: index * 0.1 }}
              className="rounded-[32px] border border-white/8 bg-[rgba(4,12,30,0.78)] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.22)] hover:-translate-y-1 hover:shadow-[0_25px_80px_rgba(16,37,73,0.32)] transition-all duration-300"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-[#a58bff] to-[#30ffd9] text-2xl font-bold text-[#070914]">
                {member.name.charAt(0)}
              </div>
              <h3 className="mt-6 text-2xl font-semibold text-[#e8f7ff]">{member.name}</h3>
              <p className="mt-2 text-[#30ffd9] font-medium">{member.role}</p>
              <p className="mt-4 text-[#b9d6ff] leading-7">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="reasons" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] items-start">
          <div className="rounded-[32px] border border-cyan-400/10 bg-[rgba(4,12,30,0.78)] p-10 shadow-[0_35px_100px_rgba(14,165,233,0.10)] backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">Why choose us</p>
            <h2 className="mt-6 text-4xl font-bold text-[#e8f7ff]">Built for speed, security, and ambitious teams.</h2>
            <p className="mt-6 text-[#b9d6ff] leading-8">
              We fuse clarity, intelligence, and reliability into a platform that helps modern organizations move faster than ever.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {whyChooseUs.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
                className="rounded-3xl border border-white/10 bg-[#06101c]/90 p-7 shadow-[0_20px_50px_rgba(15,23,42,0.22)] transition-all duration-300 hover:border-cyan-400/25"
              >
                <div className="flex items-center gap-3 text-[#30ffd9]">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-semibold text-[#e8f7ff]">{reason}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300">What our users say</p>
          <h2 className="mt-4 text-4xl font-bold text-[#e8f7ff]">Trusted by teams worldwide</h2>
          <p className="mt-4 max-w-2xl mx-auto text-[#b9d6ff] leading-8">
            See how our platform has transformed workflows and boosted productivity for organizations like yours.
          </p>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4dbfff] to-[#30ffd9] px-6 py-3 text-sm font-semibold text-[#070914] shadow-lg shadow-cyan-500/20 transition duration-300"
          >
            <Star className="w-4 h-4" />
            {showReviewForm ? 'Close Form' : 'Share Your Review'}
          </motion.button>
        </div>

        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-12 rounded-[28px] border border-cyan-400/20 bg-[rgba(4,12,30,0.78)] p-8 shadow-[0_28px_80px_rgba(15,23,42,0.28)]"
          >
            <h3 className="text-2xl font-bold text-[#e8f7ff] mb-6">Add Your Review</h3>
            <form onSubmit={handleReviewSubmit} className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-[#c7e6ff] font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleReviewInputChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[rgba(4,12,30,0.78)] px-4 py-3 text-[#e8f7ff] placeholder-[#b9d6ff]/50 focus:border-cyan-400/50 focus:outline-none transition"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-[#c7e6ff] font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={reviewForm.email}
                  onChange={handleReviewInputChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[rgba(4,12,30,0.78)] px-4 py-3 text-[#e8f7ff] placeholder-[#b9d6ff]/50 focus:border-cyan-400/50 focus:outline-none transition"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-[#c7e6ff] font-medium mb-2">Company</label>
                <input
                  type="text"
                  name="company"
                  value={reviewForm.company}
                  onChange={handleReviewInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[rgba(4,12,30,0.78)] px-4 py-3 text-[#e8f7ff] placeholder-[#b9d6ff]/50 focus:border-cyan-400/50 focus:outline-none transition"
                  placeholder="Your company"
                />
              </div>
              <div>
                <label className="block text-[#c7e6ff] font-medium mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={reviewForm.role}
                  onChange={handleReviewInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[rgba(4,12,30,0.78)] px-4 py-3 text-[#e8f7ff] placeholder-[#b9d6ff]/50 focus:border-cyan-400/50 focus:outline-none transition"
                  placeholder="Your role"
                />
              </div>
              <div>
                <label className="block text-[#c7e6ff] font-medium mb-2">Rating</label>
                <select
                  name="rating"
                  value={reviewForm.rating}
                  onChange={handleReviewInputChange}
                  className="w-full rounded-xl border border-white/10 bg-[rgba(4,12,30,0.78)] px-4 py-3 text-[#e8f7ff] focus:border-cyan-400/50 focus:outline-none transition"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>
              <div></div>
              <div className="md:col-span-2">
                <label className="block text-[#c7e6ff] font-medium mb-2">Review Message</label>
                <textarea
                  name="message"
                  value={reviewForm.message}
                  onChange={handleReviewInputChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[rgba(4,12,30,0.78)] px-4 py-3 text-[#e8f7ff] placeholder-[#b9d6ff]/50 focus:border-cyan-400/50 focus:outline-none transition resize-none"
                  placeholder="Share your experience with our platform..."
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="md:col-span-2 rounded-xl bg-gradient-to-r from-[#4dbfff] to-[#30ffd9] px-6 py-3 font-semibold text-[#070914] hover:shadow-lg hover:shadow-cyan-500/20 transition disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </motion.div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reviews && reviews.length > 0 ? (
            reviews.slice(0, 6).map((review, index) => (
              <motion.div
                key={review._id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, delay: index * 0.1 }}
                className="rounded-[28px] border border-white/8 bg-[rgba(4,12,30,0.78)] p-8 shadow-[0_28px_80px_rgba(15,23,42,0.28)] hover:border-cyan-400/20 transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#30ffd9] text-[#30ffd9]" />
                  ))}
                </div>
                <p className="text-[#b9d6ff] leading-7 mb-6 italic">"{review.message}"</p>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#a58bff] to-[#30ffd9] text-sm font-bold text-[#070914]">
                    {review.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-[#e8f7ff]">{review.name}</p>
                    <p className="text-sm text-[#c7e6ff]">{review.role ? `${review.role}, ${review.company}` : review.company || 'User'}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-[#b9d6ff] text-center py-8">Be the first to share your review!</p>
          )}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-6 rounded-[24px] border border-cyan-400/20 bg-cyan-400/5 px-8 py-6 backdrop-blur-xl">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#e8f7ff]">4.9/5</p>
              <p className="text-sm text-[#b9d6ff]">Average rating</p>
            </div>
            <div className="h-12 w-px bg-cyan-400/20"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#e8f7ff]">{reviews.length || 500}+</p>
              <p className="text-sm text-[#b9d6ff]">Happy customers</p>
            </div>
            <div className="h-12 w-px bg-cyan-400/20"></div>
            <div className="text-center">
              <p className="text-3xl font-bold text-[#e8f7ff]">99.9%</p>
              <p className="text-sm text-[#b9d6ff]">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-[#04090f] py-12 px-4 sm:px-6 lg:px-8 text-[#c7e6ff]">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold text-[#e8f7ff]">{aboutData?.projectName || 'Our Platform'}</h3>
              <p className="mt-4 max-w-xl leading-7 text-[#b9d6ff]">
                {aboutData?.description || 'Empowering teams to achieve more through innovative technology solutions.'}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-[#c7e6ff] transition hover:bg-cyan-400/20">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-[#c7e6ff] transition hover:bg-cyan-400/20">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="#" className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/5 text-[#c7e6ff] transition hover:bg-cyan-400/20">
                  <MapPin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#e8f7ff]">Quick Links</h4>
              <ul className="mt-5 space-y-3 text-[#b9d6ff]">
                <li><a href="#" className="hover:text-[#e8f7ff] transition">Home</a></li>
                <li><a href="#" className="hover:text-[#e8f7ff] transition">About</a></li>
                <li><a href="#" className="hover:text-[#e8f7ff] transition">Services</a></li>
                <li><a href="#" className="hover:text-[#e8f7ff] transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-[#e8f7ff]">Support</h4>
              <ul className="mt-5 space-y-3 text-[#b9d6ff]">
                <li><a href="#" className="hover:text-[#e8f7ff] transition">Help Center</a></li>
                <li><a href="#" className="hover:text-[#e8f7ff] transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#e8f7ff] transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#e8f7ff] transition">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-[#98c3ff]">
            © 2024 {aboutData?.projectName || 'Our Platform'}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
    <Footer />
     </>
  );
};

export default About;