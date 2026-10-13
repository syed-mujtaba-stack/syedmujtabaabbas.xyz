"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { label: "About", href: "#about" },
  { label: "Expertise", href: "#expertise" },
  { label: "Process", href: "#process" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              second.intersectionRatio - first.intersectionRatio,
          );

        if (visibleSections[0]) {
          setActiveSection(`#${visibleSections[0].target.id}`);
        }
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5, 0.75] },
    );

    sections.forEach((section) => observer.observe(section));

    const updateScrollState = () => setIsScrolled(window.scrollY > 20);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScrollState);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <a
        className="brand"
        href="#home"
        aria-label="Syed Mujtaba Abbas, home"
        onClick={closeMenu}
      >
        <span className="brand-mark">M.</span>
        <span className="brand-name">
          MUJTABA <span>ABBAS</span>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Main navigation">
        {links.map(({ label, href }) => (
          <a
            key={href}
            href={href}
            aria-current={activeSection === href ? "location" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>

      <a
        className="header-contact"
        href="mailto:abbasmujtaba125@gmail.com?subject=Let%27s%20talk"
      >
        Let&apos;s talk <ArrowUpRight size={14} aria-hidden="true" />
      </a>

      <button
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-controls="mobile-navigation"
        aria-expanded={isMenuOpen}
        className="mobile-menu-toggle"
        onClick={() => setIsMenuOpen((open) => !open)}
        type="button"
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav
        aria-label="Mobile navigation"
        className={`mobile-nav${isMenuOpen ? " is-open" : ""}`}
        id="mobile-navigation"
        inert={!isMenuOpen}
      >
        {links.map(({ label, href }, index) => (
          <a
            key={href}
            href={href}
            aria-current={activeSection === href ? "location" : undefined}
            onClick={closeMenu}
            style={{ transitionDelay: isMenuOpen ? `${index * 35}ms` : "0ms" }}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            <span className="mobile-nav-index">0{index + 1}</span>
            {label}
            <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ))}
      </nav>
    </header>
  );
}
