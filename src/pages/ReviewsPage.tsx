import React, { useState } from 'react';
import { ReviewItem, WebsiteSettings } from '../types';
import { Star, MessageSquarePlus, CheckCircle, Shield, AlertCircle } from 'lucide-react';
import { LeaveReviewModal } from '../components/LeaveReviewModal';

interface ReviewsPageProps {
  reviews: ReviewItem[];
  settings: WebsiteSettings;
  refreshReviews: () => void;
  openEstimateModal: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({
  reviews,
  settings,
  refreshReviews,
  openEstimateModal,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [starFilter, setStarFilter] = useState<number | null>(null);

  const filteredReviews = starFilter
    ? reviews.filter((r) => r.rating === starFilter)
    : reviews;

  // Calculate statistics
  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)
    : '5.0';

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Header */}
      <section className="bg-slate-950 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">
            Client Testimonials
          </span>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            Customer Reviews & Ratings
          </h1>
          <p className="text-slate-300 text-base max-w-2xl mx-auto leading-relaxed">
            Read authentic feedback from homeowners and commercial property managers across Austin, Round Rock, and Central Texas.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setModalOpen(true)}
              className="px-6 py-3 bg-amber-500 text-slate-950 font-bold text-xs rounded-xl hover:bg-amber-400 shadow-md transition-colors inline-flex items-center gap-2"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>
      </section>

      {/* Aggregate Scorecard & Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-20 h-20 rounded-2xl bg-amber-500 text-slate-950 flex flex-col items-center justify-center font-black">
              <span className="text-3xl leading-none">{avgRating}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider mt-1">Out of 5</span>
            </div>
            <div>
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <h3 className="font-extrabold text-base text-slate-900 mt-1">
                Outstanding Customer Satisfaction
              </h3>
              <p className="text-xs text-slate-500">
                Based on {totalReviews} verified project installations across Travis & Williamson counties.
              </p>
            </div>
          </div>

          {/* Filter by star rating */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setStarFilter(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                starFilter === null
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Stars ({totalReviews})
            </button>
            {[5, 4, 3].map((stars) => {
              const count = reviews.filter((r) => r.rating === stars).length;
              return (
                <button
                  key={stars}
                  onClick={() => setStarFilter(stars)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    starFilter === stars
                      ? 'bg-amber-500 text-slate-950'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {stars} Stars ({count})
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Demo Mode Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3 text-xs text-blue-900">
          <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Sample & Demo Review Policy:</strong> In compliance with truthful advertising and sales demo requirements, sample customer testimonials in this demonstration are clearly badged with a "Demo Sample" marker. Real customer reviews submitted through the form require admin approval before becoming visible.
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.isSample ? (
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                      Demo Sample
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified Client
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.reviewText}"
                </p>

                {rev.photo && (
                  <div className="pt-2">
                    <img
                      src={rev.photo}
                      alt="Finished project photo submitted by client"
                      className="w-full aspect-[16/9] object-cover rounded-xl border border-slate-200"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-extrabold text-slate-900">{rev.author}</div>
                  <div className="text-[11px] text-slate-500">{rev.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-amber-700 font-semibold">{rev.serviceType}</div>
                  <div className="text-[10px] text-slate-400">{rev.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leave Review Modal */}
      <LeaveReviewModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmitted={refreshReviews}
      />
    </div>
  );
};
