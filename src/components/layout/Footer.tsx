"use client";

import { footerData } from "@/mocks/footer";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaApplePay,
  FaGooglePay,
} from "react-icons/fa6";

const socialIcons = {
  twitter: FaXTwitter,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  github: FaGithub,
};

const paymentIcons = {
  Visa: FaCcVisa,
  Mastercard: FaCcMastercard,
  PayPal: FaCcPaypal,
  "Apple Pay": FaApplePay,
  "Google Pay": FaGooglePay,
};

export default function Footer() {
  return (
    <footer className="bg-[#f0f0f0] px-5 py-10 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-[1240px]">
        {/* Footer main content */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-5 md:gap-8">
          {/* Brand and social links */}
          <div className="col-span-2 md:col-span-1">
            <a
              href="/"
              className="text-2xl font-black tracking-tighter text-black"
            >
              SSTORE.CO
            </a>

            <p className="mt-4 max-w-[270px] text-sm leading-6 text-gray-500">
              {footerData.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              {footerData.socialLinks.map((social) => {
                const Icon =
                  socialIcons[social.icon as keyof typeof socialIcons];

                return (
                  <a
                    key={social.id}
                    href={social.url}
                    aria-label={social.name}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white text-sm text-black transition hover:bg-black hover:text-white"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer navigation columns */}
          {footerData.columns.map((column) => (
            <div key={column.id}>
              <h3 className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-black">
                {column.title}
              </h3>

              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.url}
                      className="text-sm text-gray-500 transition hover:text-black"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright and payment methods */}
        <div className="mt-10 flex flex-col gap-5 border-t border-gray-300 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-500">{footerData.copyright}</p>

          <div className="flex flex-wrap items-center gap-2">
            {footerData.paymentMethods.map((payment) => {
              const Icon =
                paymentIcons[payment.name as keyof typeof paymentIcons];

              return (
                <div
                  key={payment.id}
                  title={payment.name}
                  className="flex h-8 min-w-10 items-center justify-center rounded-md border border-gray-200 bg-white px-2"
                >
                  <Icon className="text-2xl text-black" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
