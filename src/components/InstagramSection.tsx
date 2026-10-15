import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

const INSTAGRAM_POSTS = [
  {
    image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?auto=format&fit=crop&w=600&q=80',
    caption: 'Morning stem selection at the floral market. French lisianthus & blush roses.',
    likes: '1,420',
  },
  {
    image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=600&q=80',
    caption: 'Bespoke bridal arrangement with raw hand-torn silk ribbons.',
    likes: '2,180',
  },
  {
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=600&q=80',
    caption: 'Minimalist vessel styling in natural morning sunlight.',
    likes: '984',
  },
  {
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    caption: 'Signature black velvet hat box filled with velvety crimson blooms.',
    likes: '3,410',
  },
];

export const InstagramSection: React.FC = () => {
  return (
    <section className="w-full py-12 md:py-20 px-4 sm:px-6 md:px-10 lg:px-14 max-w-[1440px] mx-auto border-t border-[#33251e]/10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="font-label-caps text-xs uppercase text-[#8d4e20] tracking-widest block mb-2 font-semibold">
            Social Journal
          </span>
          <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-bold text-[#33251e]">
            Follow Our Botanical Journey
          </h2>
        </div>

        <a
          href="https://www.instagram.com/florasea.co/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#33251e] hover:text-[#8d4e20] transition-colors group"
        >
          <Instagram className="w-4 h-4 text-[#CE2D4F]" />
          <span>@florasea.co on Instagram</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
        {INSTAGRAM_POSTS.map((post, idx) => (
          <a
            key={idx}
            href="https://www.instagram.com/florasea.co/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative h-48 sm:h-64 lg:h-72 rounded-2xl overflow-hidden shadow-sm border border-[#33251e]/10 bg-[#ffdbc7]/30"
          >
            <img
              src={post.image}
              alt="Flora Sea Instagram post"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-[#33251e]/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
              <div className="flex justify-end">
                <Instagram className="w-5 h-5 text-white/90" />
              </div>
              <div>
                <p className="text-xs line-clamp-2 text-white/90 font-medium">{post.caption}</p>
                <span className="text-[10px] text-white/75 mt-1 block uppercase tracking-wider font-semibold">
                  ♥ {post.likes} likes
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
