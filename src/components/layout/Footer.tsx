"use client";

import Link from "next/link";
import { footerData } from "@/mocks/footer";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcApplePay,
  FaGooglePay,
} from "react-icons/fa6";

const socialIcons = {
  twitter: FaXTwitter,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  github: FaGithub,
};

const paymentIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Visa: FaCcVisa,
  Mastercard: FaCcMastercard,
  PayPal: FaCcPaypal,
  "Apple Pay": FaCcApplePay,
  "Google Pay": FaGooglePay,
};

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] pt-28 pb-12 sm:pt-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-6">
        {/* Footer main content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5 md:gap-8 lg:gap-12">
          {/* Brand and social links */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="font-integral text-2xl font-black tracking-tight text-black sm:text-3xl"
            >
              SHOP.CO
            </Link>

            <p className="mt-4 max-w-[260px] text-sm leading-6 text-black/60">
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
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-black/10 bg-white text-xs text-black transition-colors duration-200 hover:bg-black hover:text-white"
                  >
                    {Icon ? <Icon /> : social.name[0]}
                  </a>
                );
              })}
            </div>
          </div>

          {/* 4 Link Columns */}
          {footerData.columns.map((column) => (
            <div key={column.id} className="col-span-1">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-black">
                {column.title}
              </h3>

              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.url}
                      className="text-sm text-black/60 transition-colors duration-200 hover:text-black"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 border-t border-black/10 pt-6 sm:mt-14">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-black/60 sm:text-sm">
              {footerData.copyright}
            </p>

            {/* Payment methods */}
            <div className="flex items-center gap-2 text-2xl text-black">
              {footerData.paymentMethods.map((method) => {
                const Icon = paymentIcons[method.name];
                return (
                  <span
                    key={method.id}
                    className="flex h-7 w-11 items-center justify-center rounded border border-black/10 bg-white text-lg"
                    title={method.name}
                  >
                    {Icon ? <Icon /> : method.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
