import React from 'react';
import { X } from 'lucide-react';

export function LegalModals({ type, onClose }) {
  if (!type) return null;

  const isPrivacy = type === 'privacy';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 max-h-[85vh] overflow-y-auto border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-serif text-2xl font-bold text-[#08004b] mb-4">
          {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
        </h3>

        {isPrivacy ? (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              At Laylitna Invitations, we respect your privacy. This Privacy Policy describes how we handle and protect personal data collected when designing and hosting digital wedding and event invitations.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">1. Information We Collect</h4>
            <p>
              We collect information provided directly by you through our order questionnaire, including your names, event date, venue details, photos, guest contact information (if personalised guest links are requested), and RSVP responses submitted by your guests.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">2. How We Use Your Data</h4>
            <p>
              Your information is solely used to build, customize, host, and maintain your digital invitation, as well as to populate your private Google Sheets RSVP tracker. We never sell, rent, or monetize your personal memories or contact information.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">3. Data Retention</h4>
            <p>
              Your invitation and RSVP spreadsheets remain active until two months after your wedding date, after which all media files and access links can be archived or deleted upon your request.
            </p>
          </div>
        ) : (
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              By ordering a digital invitation from Laylitna Invitations, you agree to the following terms and service conditions.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">1. Design & Unlimited Revisions</h4>
            <p>
              We provide unlimited revisions to ensure you are 100% satisfied with your invitation before sharing. Once initial design work has commenced, payments are non-refundable, but we will continuously iterate until you approve the draft.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">2. Live Hosting Period</h4>
            <p>
              Your digital invitation link is guaranteed to remain active and live through your event date and for an additional 60 days following your celebration.
            </p>
            <h4 className="font-bold text-slate-900 text-sm">3. Updates & Venue Changes</h4>
            <p>
              Emergency timeline, venue, or detail changes are accommodated free of charge right up until your event day.
            </p>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#006989] text-white text-xs font-bold rounded-full hover:bg-[#005570]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
