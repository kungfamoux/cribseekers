'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Upload, FileText, Camera, Clock, ArrowRight } from 'lucide-react';
import { ProtectedRoute } from '@/components/shared';
import { apiClient } from '@/services/api/axios';
import { API_ENDPOINTS } from '@/services/api/endpoints';
import { toast } from 'sonner';

export default function IdentityVerificationPage() {
  const [governmentId, setGovernmentId] = useState<File | null>(null);
  const [selfie, setSelfie] = useState<File | null>(null);
  const [proofOfAddress, setProofOfAddress] = useState<File | null>(null);
  const [governmentIdPreview, setGovernmentIdPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [proofOfAddressPreview, setProofOfAddressPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'submitted' | 'verified'>('pending');

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: (file: File | null) => void,
    previewSetter: (preview: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setter(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        previewSetter(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!governmentId || !selfie) {
      toast.error('Missing required documents', {
        description: 'Please upload your Government ID and Selfie',
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('governmentId', governmentId);
      formData.append('selfie', selfie);
      if (proofOfAddress) {
        formData.append('proofOfAddress', proofOfAddress);
      }

      await apiClient.post(API_ENDPOINTS.KYC_SUBMIT, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setVerificationStatus('submitted');
      toast.success('Documents submitted successfully!', {
        description: 'Your documents are being reviewed',
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      toast.error('Failed to submit documents', {
        description: message || 'An error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (verificationStatus === 'submitted') {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-950 dark:to-forest-900 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <Clock className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
                </div>
              </div>
              <h3 className="heading-lg text-forest-900 dark:text-forest-50 mb-2">
                Verification in progress
              </h3>
              <p className="body-md text-forest-600 dark:text-forest-400 mb-6">
                Your documents are being reviewed. This typically takes 1-2 business days. We'll notify you once verification is complete.
              </p>
              <Link
                href="/welcome-dashboard"
                className="inline-flex items-center justify-center px-4 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium w-full"
              >
                Continue to Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-forest-50 to-forest-100 dark:from-forest-950 dark:to-forest-900 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-6">
                <Image
                  src="/logo.png"
                  alt="CribSeekers"
                  width={80}
                  height={80}
                  className="h-12 w-12"
                />
                <span className="heading-2xl font-heading text-forest-900 dark:text-forest-50">CribSeekers</span>
              </Link>
              <h1 className="heading-2xl font-heading text-forest-900 dark:text-forest-50 mb-2">
                Identity Verification
              </h1>
              <p className="body-md text-forest-600 dark:text-forest-400">
                Upload your documents to verify your identity
              </p>
            </div>

            {/* Verification Form */}
            <div className="bg-white dark:bg-forest-800 rounded-xl shadow-sm border border-border-default p-8">
              {/* Info Banner */}
              <div className="bg-forest-50 dark:bg-forest-900 border border-forest-200 dark:border-forest-700 rounded-lg p-4 mb-8">
                <div className="flex items-start">
                  <Shield className="h-5 w-5 text-forest-600 dark:text-forest-400 mt-0.5 mr-3" />
                  <div>
                    <h4 className="heading-sm text-forest-900 dark:text-forest-50 mb-1">
                      Why we need this information
                    </h4>
                    <p className="body-sm text-forest-600 dark:text-forest-400">
                      Identity verification helps us maintain a secure platform and prevent fraud. Your documents are encrypted and stored securely.
                    </p>
                  </div>
                </div>
              </div>

              {/* Document Uploads */}
              <div className="space-y-8">
                {/* Government ID */}
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Government ID <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-border-default rounded-lg p-6 text-center hover:border-forest-300 dark:hover:border-forest-700 transition-colors">
                    {governmentIdPreview ? (
                      <div className="space-y-4">
                        <img src={governmentIdPreview} alt="Government ID" className="max-h-48 mx-auto rounded" />
                        <button
                          onClick={() => {
                            setGovernmentId(null);
                            setGovernmentIdPreview(null);
                          }}
                          className="body-sm text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <FileText className="h-12 w-12 text-forest-400 mx-auto mb-4" />
                        <p className="body-sm text-forest-600 dark:text-forest-400 mb-2">
                          Upload your National ID, Driver's License, or Passport
                        </p>
                        <label htmlFor="governmentId" className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-sm cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </label>
                        <input
                          type="file"
                          id="governmentId"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange(e, setGovernmentId, setGovernmentIdPreview)}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Selfie */}
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Selfie <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-border-default rounded-lg p-6 text-center hover:border-forest-300 dark:hover:border-forest-700 transition-colors">
                    {selfiePreview ? (
                      <div className="space-y-4">
                        <img src={selfiePreview} alt="Selfie" className="max-h-48 mx-auto rounded-full" />
                        <button
                          onClick={() => {
                            setSelfie(null);
                            setSelfiePreview(null);
                          }}
                          className="body-sm text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Camera className="h-12 w-12 text-forest-400 mx-auto mb-4" />
                        <p className="body-sm text-forest-600 dark:text-forest-400 mb-2">
                          Take a clear selfie holding your Government ID
                        </p>
                        <label htmlFor="selfie" className="inline-flex items-center px-4 py-2 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-sm cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </label>
                        <input
                          type="file"
                          id="selfie"
                          accept="image/*"
                          capture="user"
                          onChange={(e) => handleFileChange(e, setSelfie, setSelfiePreview)}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Proof of Address */}
                <div>
                  <label className="block body-sm font-medium text-forest-900 dark:text-forest-50 mb-2">
                    Proof of Address <span className="text-forest-500">(Optional)</span>
                  </label>
                  <div className="border-2 border-dashed border-border-default rounded-lg p-6 text-center hover:border-forest-300 dark:hover:border-forest-700 transition-colors">
                    {proofOfAddressPreview ? (
                      <div className="space-y-4">
                        <img src={proofOfAddressPreview} alt="Proof of Address" className="max-h-48 mx-auto rounded" />
                        <button
                          onClick={() => {
                            setProofOfAddress(null);
                            setProofOfAddressPreview(null);
                          }}
                          className="body-sm text-red-500 hover:text-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div>
                        <FileText className="h-12 w-12 text-forest-400 mx-auto mb-4" />
                        <p className="body-sm text-forest-600 dark:text-forest-400 mb-2">
                          Upload utility bill, bank statement, or lease agreement
                        </p>
                        <label htmlFor="proofOfAddress" className="inline-flex items-center px-4 py-2 bg-white dark:bg-forest-700 text-forest-900 dark:text-forest-50 border border-border-default rounded-lg hover:bg-surface-secondary transition-colors body-sm cursor-pointer">
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </label>
                        <input
                          type="file"
                          id="proofOfAddress"
                          accept="image/*,.pdf"
                          onChange={(e) => handleFileChange(e, setProofOfAddress, setProofOfAddressPreview)}
                          className="hidden"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-border-default">
                <Link
                  href="/complete-profile"
                  className="body-md text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors"
                >
                  Back
                </Link>
                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center justify-center px-8 py-3 bg-forest-900 text-white rounded-lg hover:bg-forest-800 transition-colors body-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Documents
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Skip Button */}
            <div className="mt-6 text-center">
              <Link
                href="/welcome-dashboard"
                className="inline-flex items-center text-forest-600 dark:text-forest-400 hover:text-forest-900 dark:hover:text-forest-50 transition-colors body-md"
              >
                Skip for now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
