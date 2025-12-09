"use client";

import { ContactUsPage } from "@/lib/wordpress";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import parse from "html-react-parser";

interface ContactUsTemplateProps {
  page: ContactUsPage;
}

export default function ContactUsTemplate({ page }: ContactUsTemplateProps) {
  const { meta } = page;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    // Validate required fields
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.message
    ) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      setIsSubmitting(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || "";
      const apiUrl = `${baseUrl}/wp-json/nrna/v1/contact`;
      
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message: "Thank you! Your message has been sent successfully.",
        });
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Hero + Contact Info + Form Section */}
      <section className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-12">
          {/* Left Side - Hero + Contact Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="h1 text-gray-900">{meta.hero_title}</h1>
              <p className="p1-regular text-gray-600">
                {meta.hero_description}
              </p>
            </div>

            <div className="space-y-4">
              {/* Email */}
              <a
                href={`mailto:${meta.hero_email}`}
                className="p1-regular block text-gray-800 hover:text-blue-600 transition-colors"
              >
                {meta.hero_email}
              </a>

              {/* Phone Numbers */}
              <div className="space-y-2">
                {meta.hero_phone_numbers?.map((phone, index) => (
                  <a
                    key={index}
                    href={`tel:${phone.replace(/[\s-]/g, "")}`}
                    className="p1-regular block text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    {phone}
                  </a>
                ))}
              </div>

              {/* Location */}
              <p className="p1-regular whitespace-pre-line text-gray-800">
                {meta.hero_location}
              </p>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <a
                href={meta.hero_cta_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 text-gray-800 transition-all hover:border-gray-400 hover:shadow-md"
              >
                <ArrowUpRight className="h-5 w-5" />
                <span className="button-regular">{meta.hero_cta_title}</span>
              </a>
            </div>
          </div>

          {/* Right Side - Get In Touch Form */}
          <div className="w-full">
            <div className="rounded-2xl bg-white p-6 shadow-lg md:p-8 lg:sticky lg:top-24">
              <h2 className="h4 mb-6 text-gray-900">Get in Touch</h2>
              <p className="p2-regular mb-6 text-gray-600">
                You can reach us anytime.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="label-medium mb-2 block text-gray-700"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="label-medium mb-2 block text-gray-700"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="label-medium mb-2 block text-gray-700"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="label-medium mb-2 block text-gray-700"
                  >
                    Phone No.
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="label-medium mb-2 block text-gray-700"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-3 text-white transition-all hover:from-blue-700 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="button-regular">
                    {isSubmitting ? "Sending..." : "Donate"}
                  </span>
                </button>

                {/* Disclaimer */}
                <p className="label-regular text-center text-gray-500">
                  By contacting us, you agree to our{" "}
                  <a href="/terms-of-service" className="text-blue-600 hover:underline">
                    Terms of service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy-policy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </a>
                </p>

                {/* Status Messages */}
                {submitStatus.type && (
                  <div
                    className={`rounded-lg p-4 ${
                      submitStatus.type === "success"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    <p className="p2-regular">{submitStatus.message}</p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Information Blocks Section */}
      {meta.information_descriptions &&
        meta.information_descriptions.length > 0 && (
          <section className="bg-gray-50 py-12 md:py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                {meta.information_descriptions.map((info, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="h4 font-semibold text-gray-900">
                      {info.title}
                    </h3>
                    <p className="p1-regular text-gray-600">
                      {info.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* Google Map Embed Section */}
      {meta.map_embed && (
        <section className="w-full">
          <div
            className="h-[450px] w-full md:h-[500px] lg:h-[550px]"
            dangerouslySetInnerHTML={{
              __html: meta.map_embed.replace(
                /style="[^"]*"/g,
                'style="border:0; width:100%; height:100%;"'
              ),
            }}
          />
        </section>
      )}
    </div>
  );
}
