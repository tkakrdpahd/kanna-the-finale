"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import formatUrl from "../cdn/formatUrl";

import styles from "./styles.module.css";

function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const hashCheckIntervalRef = useRef<NodeJS.Timeout>();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");

  // 모바일 여부 상태
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(
        typeof window !== "undefined" &&
          window.matchMedia("(max-width: 768px)").matches
      );
    }

    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);

  // URL 해시 체크 인터벌
  useEffect(() => {
    hashCheckIntervalRef.current = setInterval(() => {
      const hash = window.location.hash.slice(1); // Remove the # symbol
      if (hash && hash !== activeSection) {
        setActiveSection(hash);
      }
    }, 50);

    return () => {
      if (hashCheckIntervalRef.current) {
        clearInterval(hashCheckIntervalRef.current);
      }
    };
  }, [activeSection]);

  // 메뉴 항목 데이터
  const navItems = [
    { id: "main", alternatives: ["hero", "banner", "main"], label: "메인" },
    { id: "pv", alternatives: ["pv", "story"], label: "PV" },
    { id: "history", alternatives: ["history", "history2"], label: "보석함" },
    {
      id: "post",
      alternatives: ["post", "giftbox", "share"],
      label: "칸나의 선물",
    },
  ];

  return (
    <>
      <div
        className={`${styles.dim} ${isMobileNavOpen ? styles.show : ""}`}
        onClick={() => setIsMobileNavOpen(false)}
      />

      <header className={styles.header}>
        <div
          ref={headerRef}
          className={`${styles.container} ${isMobile ? styles.withBg : ""}`}
        >
          <a href="#hero">
            <Image
              width={86}
              height={44}
              className={styles.logo}
              src={formatUrl("/images/logos/horizontal.png")}
              alt="The Finale"
            />
          </a>

          <nav className={styles.pcNav}>
            <ul className={styles.nav}>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={
                      (
                        item.alternatives
                          ? item.alternatives.includes(activeSection)
                          : item.id === activeSection
                      )
                        ? styles.active
                        : ""
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={styles.hamburger}
            onClick={() => {
              setIsMobileNavOpen(!isMobileNavOpen);
            }}
            aria-label="Navigation Button"
          >
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M64 384h384v-42.666H64V384zm0-106.666h384v-42.667H64v42.667zM64 128v42.665h384V128H64z"></path>
            </svg>
          </button>
        </div>

        <div
          className={`${styles.mobileNav} ${styles.withBg} ${
            isMobileNavOpen ? styles.show : ""
          }`}
        >
          <div>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={
                  (
                    item.alternatives
                      ? item.alternatives.includes(activeSection)
                      : item.id === activeSection
                  )
                    ? styles.active
                    : ""
                }
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
