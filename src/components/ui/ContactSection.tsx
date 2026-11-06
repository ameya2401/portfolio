"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import BrandLogo from "./BrandLogo";
import { profile } from "@/data/profile";
import { PortfolioButton, PortfolioLinkButton } from "./PortfolioControls";

export default function ContactSection() {
  const [copying, setCopying] = useState(false);
  const pending = useRef(false);
  const alive = useRef(true);
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState("");
  const [pointerCopy, setPointerCopy] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => { alive.current = true; return () => { alive.current = false; clearTimeout(copyTimer.current); }; }, []);

  async function copyEmail() {
    if (pending.current) return;
    pending.current = true;
    setCopying(true);
    setCopied(false);
    setStatus("Copying email…");
    clearTimeout(copyTimer.current);
    try {
      await navigator.clipboard.writeText(profile.email);
      if (!alive.current) return;
      setCopied(true);
      setStatus("Email copied");
      copyTimer.current = setTimeout(() => {
        setCopied(false);
        setStatus("");
      }, 2500);
    } catch {
      if (!alive.current) return;
      setCopied(false);
      setStatus(`Couldn’t copy. You can select this address: ${profile.email}`);
    } finally { pending.current = false; if (alive.current) setCopying(false); }
  }

  const links = [
    { label: profile.twitterHandle, href: profile.twitter, logo: "x" },
    { label: "GitHub", href: profile.github, logo: "github" },
    { label: "View Resume", href: "/ameya_bhagat_resume.pdf", logo: "paper" },
  ];

  return (
    <section id="contact" className="section contact-section">
      <div className="section-heading"><h2>Let’s talk</h2></div>
      <div className="contact-panel">
        <div className="contact-top">
          <div>
            <h3>Let’s build something good.</h3>
            <p>Open to frontend roles.<br />If you’re hiring, I’d love to hear from you.</p>
          </div>
        </div>
        <div className="email-actions">
          <PortfolioLinkButton href={`mailto:${profile.email}`} className="email-link">
            <BrandLogo name="gmail" size={18} />
            <span>{profile.email}</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </PortfolioLinkButton>
          <PortfolioButton
            type="button"
            shape="square"
            className="copy-email"
            aria-disabled={copying}
            aria-busy={copying}
            data-copied={copied}
            data-pointer={pointerCopy}
            onPointerDown={() => setPointerCopy(true)}
            onKeyDown={() => setPointerCopy(false)}
            onClick={copyEmail}
            aria-label={copying ? "Copying email" : copied ? "Email copied" : "Copy email address"}
          >
            <Copy size={16} className="copy-default" aria-hidden="true" />
            <Check size={18} className="copy-success" aria-hidden="true" />
          </PortfolioButton>
        </div>
        <p className="copy-status" role="status" aria-atomic="true">{status}</p>
        <div className="contact-socials">
          {links.map((link) => (
            <a key={link.logo} href={link.href} target="_blank" rel="noreferrer">
              <BrandLogo name={link.logo} size={16} />
              <span>{link.label}</span>
              <ArrowUpRight size={12} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
      <p className="contact-note">{profile.location} <span aria-hidden="true">·</span> Usually replies within 24 hours</p>
    </section>
  );
}
