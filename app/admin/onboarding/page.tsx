"use client";

import React, { useState, useEffect, useTransition } from 'react';
import { Building2, User, Mail, FolderCog, Loader2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { createDealership, ActionResponse } from './actions';

export default function OnboardingPage() {
  const [dealershipName, setDealershipName] = useState("");
  const [primaryContactName, setPrimaryContactName] = useState("");
  const [primaryContactEmail, setPrimaryContactEmail] = useState("");
  const [itContactEmail, setItContactEmail] = useState("");
  const [ftpFolderPath, setFtpFolderPath] = useState("");
  const [isManualFtp, setIsManualFtp] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [response, setResponse] = useState<ActionResponse | null>(null);
  const [showToast, setShowToast] = useState(false);

  // Auto-generate preview slug based on dealership_name
  useEffect(() => {
    if (!isManualFtp) {
      const slug = dealershipName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-') // Replace spaces and special characters with dashes
        .replace(/(^-|-$)/g, '');    // Remove leading/trailing dashes
      
      if (slug) {
        setFtpFolderPath(`/${slug}/`);
      } else {
        setFtpFolderPath("");
      }
    }
  }, [dealershipName, isManualFtp]);

  const handleFtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFtpFolderPath(e.target.value);
    setIsManualFtp(true);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResponse(null);

    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const res = await createDealership(null, formData);
      setResponse(res);
      if (res.success) {
        // Clear all form inputs
        setDealershipName("");
        setPrimaryContactName("");
        setPrimaryContactEmail("");
        setItContactEmail("");
        setFtpFolderPath("");
        setIsManualFtp(false);
        // Show success toast
        setShowToast(true);
        // Automatically hide toast after 5 seconds
        setTimeout(() => setShowToast(false), 5000);
      }
    });
  };

  return (
    <div className="relative min-h-screen bg-[#0A1929] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans text-white">
      {/* Background Neon Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] rounded-full bg-[radial-gradient(circle,_rgba(41,171,226,0.18)_0%,_transparent_70%)] blur-3xl pointer-events-none select-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,_rgba(0,229,255,0.12)_0%,_transparent_70%)] blur-3xl pointer-events-none select-none z-0" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Main Glassmorphic Panel */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_24px_64px_rgba(0,0,0,0.4)] rounded-[32px] p-8 md:p-12 relative overflow-hidden">
          
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#29abe2]/20 to-[#00e5ff]/5 border border-[#29abe2]/30 flex items-center justify-center mb-4 shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
              <Building2 className="text-[#29abe2]" size={30} strokeWidth={1.5} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              New Dealership Intake
            </h1>
            <p className="mt-2 text-white/55 text-sm font-medium">
              Configure and register a new partner dealership to the CarMeta platform.
            </p>
          </div>

          {/* Form Error Message */}
          {response && !response.success && (
            <div className="mb-6 flex items-start gap-3 bg-rose-500/10 border border-rose-500/30 text-rose-200 p-4 rounded-2xl text-sm font-medium animate-in fade-in duration-200">
              <AlertCircle className="text-rose-400 shrink-0 mt-0.5" size={18} />
              <div>
                <span className="font-bold">Submission failed:</span> {response.error}
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleFormSubmit} className="space-y-6">
            
            {/* Dealership Name */}
            <div>
              <label htmlFor="dealership_name" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                Dealership Name
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input
                  id="dealership_name"
                  name="dealership_name"
                  type="text"
                  required
                  placeholder="e.g. Texas Motors"
                  value={dealershipName}
                  onChange={(e) => setDealershipName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#29abe2] focus:ring-2 focus:ring-[#29abe2]/20 transition-all font-medium"
                />
              </div>
            </div>

            {/* Contacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Primary Contact Name */}
              <div>
                <label htmlFor="primary_contact_name" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                  Primary Contact Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    id="primary_contact_name"
                    name="primary_contact_name"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={primaryContactName}
                    onChange={(e) => setPrimaryContactName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#29abe2] focus:ring-2 focus:ring-[#29abe2]/20 transition-all font-medium"
                  />
                </div>
              </div>

              {/* Primary Contact Email */}
              <div>
                <label htmlFor="primary_contact_email" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                  Primary Contact Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                  <input
                    id="primary_contact_email"
                    name="primary_contact_email"
                    type="email"
                    required
                    placeholder="john@dealership.com"
                    value={primaryContactEmail}
                    onChange={(e) => setPrimaryContactEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#29abe2] focus:ring-2 focus:ring-[#29abe2]/20 transition-all font-medium"
                  />
                </div>
              </div>

            </div>

            {/* IT Contact Email */}
            <div>
              <label htmlFor="it_contact_email" className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                IT Contact Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input
                  id="it_contact_email"
                  name="it_contact_email"
                  type="email"
                  required
                  placeholder="it-admin@dealership.com"
                  value={itContactEmail}
                  onChange={(e) => setItContactEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#29abe2] focus:ring-2 focus:ring-[#29abe2]/20 transition-all font-medium"
                />
              </div>
            </div>

            {/* FTP Folder Path */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="ftp_folder_path" className="block text-xs font-bold uppercase tracking-wider text-white/60">
                  FTP Folder Path
                </label>
                {isManualFtp && (
                  <button
                    type="button"
                    onClick={() => setIsManualFtp(false)}
                    className="text-[10px] text-[#29abe2] hover:underline font-bold uppercase tracking-wider"
                  >
                    Reset Auto Slug
                  </button>
                )}
              </div>
              <div className="relative">
                <FolderCog className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                <input
                  id="ftp_folder_path"
                  name="ftp_folder_path"
                  type="text"
                  required
                  placeholder="/slug-name/"
                  value={ftpFolderPath}
                  onChange={handleFtpChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#29abe2] focus:ring-2 focus:ring-[#29abe2]/20 transition-all font-medium"
                />
              </div>
              <p className="mt-1.5 text-[10px] text-white/40 font-medium">
                Must start and end with a slash, e.g. <span className="text-white/60">/texas-motors/</span>
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#29abe2] hover:bg-[#2089b5] disabled:bg-[#29abe2]/50 text-white font-bold py-3.5 text-sm transition-all shadow-md shadow-[#29abe2]/15 hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:cursor-not-allowed"
              >
                {isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-white" />
                    <span>Processing Intake...</span>
                  </>
                ) : (
                  <>
                    <span>Register Dealership</span>
                    <ArrowRight size={16} className="text-white" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>

      {/* Glassmorphic Toast Notification */}
      {showToast && response?.success && (
        <div 
          onClick={() => setShowToast(false)}
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-emerald-500/20 backdrop-blur-2xl border border-emerald-500/35 text-white rounded-2xl p-4 md:p-5 shadow-2xl cursor-pointer max-w-sm animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center shrink-0">
            <ShieldCheck className="text-emerald-400" size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">Intake Successful</h4>
            <p className="text-xs text-emerald-200/80 mt-0.5 font-medium leading-normal">
              {response.message}
            </p>
          </div>
        </div>
      )}

    </div>
  );
}
