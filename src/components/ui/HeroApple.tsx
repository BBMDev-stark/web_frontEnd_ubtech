"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bot,
  Boxes,
  ChevronDown,
  GraduationCap,
  Handshake,
  LockKeyhole,
  Play,
  X,
} from "lucide-react";
import HeroRobotArm, { HeroCurtainFold } from "./HeroRobotArm";
import {
  HeroShowcaseDialog,
  showcaseNotes,
  walkerShowcase,
} from "./HeroShowcase";

const YT_ID = "MlUIRQkGxfY";
const VIDEO_EMBED = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&controls=1&rel=0`;
const VIDEO_PAGE = `https://www.youtube.com/watch?v=${YT_ID}`;
const classroomRobots = [
  {
    name: "Alpha Mini",
    image: "/images/site/alpha-mini.webp",
    position: "alpha",
  },
  { name: "AI UGOT", image: "/images/site/ai-ugot.webp", position: "ugot" },
  { name: "TrackBot", image: "/images/site/trackbot.webp", position: "track" },
  { name: "Cruzr", image: "/images/site/cruzr.webp", position: "cruzr" },
];
const classroomLinks = [
  { label: "Chương trình K12", href: "/chuong-trinh-k12", Icon: GraduationCap },
  { label: "Bộ học tập", href: "/san-pham?category=bo-kit", Icon: Boxes },
  { label: "Robot giáo dục", href: "/ai-robotic-giao-duc", Icon: Bot },
  { label: "Hỗ trợ triển khai", href: "/lien-he", Icon: Handshake },
];
const scrollKeys = new Set(["ArrowDown", "PageDown", "End", " "]);

export default function HeroApple({ skipIntro = false }: { skipIntro?: boolean }) {
  const [intro, setIntro] = useState<"ready" | "pulling" | "open">(
    skipIntro ? "open" : "ready",
  );
  const [activeNote, setActiveNote] = useState<
    (typeof showcaseNotes)[number] | null
  >(null);
  const [playingVideo, setPlayingVideo] = useState(false);
  const [classroomInView, setClassroomInView] = useState(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const moveFocus = useRef(false);

  const trigger = useCallback(() => {
    setIntro((current) =>
      current === "ready" ? "pulling" : current,
    );
  }, []);

  useEffect(() => {
    if (intro === "open") {
      if (moveFocus.current) sceneRef.current?.focus({ preventScroll: true });
      return;
    }
    let touchStart: { x: number; y: number } | undefined;
    const detailIsOpen = () =>
      document.querySelector(".hap-detail[open]") !== null;
    const outsideIntro = (target: EventTarget | null) =>
      target instanceof Element &&
      !!target.closest("header, dialog, [role='dialog']");
    const startReveal = () => {
      if (intro !== "ready") return;
      moveFocus.current =
        panelRef.current?.contains(document.activeElement) ?? false;
      trigger();
    };
    const onWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        outsideIntro(event.target) ||
        event.deltaY <= Math.abs(event.deltaX) ||
        detailIsOpen()
      )
        return;
      event.preventDefault();
      startReveal();
    };
    const onTouchStart = (event: TouchEvent) => {
      const touch = event.touches.length === 1 && event.touches[0];
      touchStart = touch ? { x: touch.clientX, y: touch.clientY } : undefined;
    };
    const onTouchMove = (event: TouchEvent) => {
      if (
        !touchStart ||
        event.touches.length !== 1 ||
        outsideIntro(event.target) ||
        detailIsOpen()
      )
        return;
      const touch = event.touches[0];
      const distance = touchStart.y - touch.clientY;
      if (distance < 14 || distance <= Math.abs(touch.clientX - touchStart.x))
        return;
      event.preventDefault();
      startReveal();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        event.defaultPrevented ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        (event.shiftKey && event.key === " ") ||
        !scrollKeys.has(event.key)
      )
        return;
      if (detailIsOpen()) return;
      if (
        event.target instanceof Element &&
        event.target.closest(
          "input, textarea, select, [contenteditable], dialog, [role='dialog']",
        )
      )
        return;
      if (
        event.key === " " &&
        event.target instanceof Element &&
        event.target.closest("button")
      )
        return;
      event.preventDefault();
      startReveal();
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [intro, trigger]);

  useEffect(() => {
    if (intro !== "open" || !sceneRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setClassroomInView(entry.intersectionRatio >= 0.6);
      },
      { threshold: 0.6 },
    );
    observer.observe(sceneRef.current);
    return () => observer.disconnect();
  }, [intro]);

  useEffect(() => {
    const panel = panelRef.current;
    if (intro !== "pulling" || !panel) return;

    const finishReveal = (event: AnimationEvent) => {
      if (
        event.target === panel &&
        (event.animationName === "hap-curtain-pull" ||
          event.animationName === "hap-curtain-fade")
      ) {
        setIntro("open");
      }
    };

    panel.addEventListener("animationend", finishReveal);
    panel.addEventListener("animationcancel", finishReveal);
    return () => {
      panel.removeEventListener("animationend", finishReveal);
      panel.removeEventListener("animationcancel", finishReveal);
    };
  }, [intro]);

  return (
    <>
      <div
        className="hap"
        data-intro={intro}
        data-revealing={intro !== "ready" ? "true" : undefined}
        data-classroom-visible={
          (intro === "open" && classroomInView) || undefined
        }
      >
        <div
          className="hap-scene"
          ref={sceneRef}
          tabIndex={-1}
          role="region"
          aria-label="Video giới thiệu UBTECH"
          aria-hidden={intro !== "open" || undefined}
        >
          {intro !== "ready" && (
            <Image
              src="/images/site/ubtech-classroom-backdrop.webp"
              alt=""
              fill
              loading="eager"
              sizes="100vw"
              className="hap-classroom-backdrop"
            />
          )}
          <div className="hap-classroom-stage">
            <h2 className="hap-classroom-title">
              Đưa{" "}
              <span className="hap-classroom-emphasis">
                <span className="hap-classroom-title-accent">
                  AI &amp; Robotics
                </span>
                <span className="hap-classroom-orbit" aria-hidden="true">
                  <span />
                </span>
              </span>{" "}
              vào lớp học
            </h2>
            <div
              className="hap-classroom-player"
              data-playing={playingVideo || undefined}
            >
              {playingVideo ? (
                <iframe
                  src={VIDEO_EMBED}
                  title="Giới thiệu về UBTECH"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <Image
                  src="/images/education/ubtech-stem-classroom.webp"
                  alt="Học sinh tương tác với robot UBTECH trong lớp STEM"
                  fill
                  sizes="(max-width: 700px) 94vw, 47vw"
                />
              )}
              <button
                type="button"
                className="hap-video-toggle"
                aria-label={
                  playingVideo ? "Đóng video" : "Xem video giới thiệu UBTECH"
                }
                tabIndex={intro === "open" ? 0 : -1}
                onClick={() => setPlayingVideo((playing) => !playing)}
              >
                {playingVideo ? (
                  <X size={18} aria-hidden="true" />
                ) : (
                  <span className="hap-video-play">
                    <span className="hap-video-play-icon">
                      <Play size={17} fill="currentColor" aria-hidden="true" />
                    </span>
                    Xem video giới thiệu
                  </span>
                )}
              </button>
              {playingVideo && (
                <a
                  className="hap-video-external"
                  href={VIDEO_PAGE}
                  target="_blank"
                  rel="noreferrer"
                >
                  Xem trên YouTube
                </a>
              )}
            </div>
            {classroomRobots.map(({ name, image, position }) => (
              <div
                key={name}
                className={`hap-classroom-robot hap-classroom-robot-${position}`}
              >
                <Image
                  src={image}
                  alt={name}
                  fill
                  sizes="(max-width: 700px) 20vw, 17vw"
                />
              </div>
            ))}
          </div>
          <nav
            className="hap-classroom-links"
            aria-label="Khám phá giải pháp UBTECH"
          >
            {classroomLinks.map(({ label, href, Icon }) => (
              <Link key={href} href={href} tabIndex={intro === "open" ? 0 : -1}>
                <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div ref={panelRef} className="hap-panel">
          <div className="hap-opening">
            <div className="hap-opening-copy">
              <p className="hap-opening-brand">UBTECH Việt Nam</p>
              <h1 className="hap-opening-title">
                AI &amp; <span>Robotics</span>
              </h1>
              <p className="hap-opening-lead">
                Giải pháp cho giáo dục
                <br /> và doanh nghiệp
              </p>
            </div>

            <figure className="hap-opening-visual">
              <div className="hap-opening-platform" aria-hidden="true" />
              <div className="hap-opening-robot" aria-hidden="true">
                <Image
                  src={walkerShowcase.images[0].src}
                  alt=""
                  width={900}
                  height={900}
                  preload
                />
                <span
                  className="hap-walker-light"
                  style={{
                    maskImage: `url("${walkerShowcase.images[0].src}")`,
                  }}
                />
              </div>
              <button
                type="button"
                className="hap-walker-control"
                aria-label="Xem chi tiết Walker Tienkung"
                aria-haspopup="dialog"
                disabled={intro !== "ready"}
                onClick={() => setActiveNote(walkerShowcase)}
              />
              <div
                className="hap-opening-notes"
                role="group"
                aria-label="Các giải pháp UBTECH"
              >
                {showcaseNotes.map((note) => (
                  <div
                    key={note.position}
                    className={`hap-note hap-note-${note.position}`}
                  >
                    <button
                      type="button"
                      className="hap-note-button"
                      aria-haspopup="dialog"
                      disabled={intro !== "ready"}
                      onClick={() => setActiveNote(note)}
                    >
                      <Image
                        src={note.images[0].src}
                        alt=""
                        width={72}
                        height={52}
                        className="hap-note-photo"
                      />
                      <span className="hap-note-copy">
                        <strong>{note.label}</strong>
                        <small>{note.detail}</small>
                      </span>
                    </button>
                    <span className="hap-note-line" aria-hidden="true" />
                  </div>
                ))}
              </div>
              <figcaption className="hap-opening-model">
                Walker Tienkung
              </figcaption>
            </figure>

            <div className="hap-opening-footer">
              <button
                type="button"
                className="hap-opening-trigger"
                aria-disabled={intro === "pulling" || undefined}
                onClick={() => {
                  if (intro !== "ready") return;
                  moveFocus.current = true;
                  trigger();
                }}
              >
                <ChevronDown
                  size={19}
                  aria-hidden="true"
                  className="hap-opening-chevron"
                />
                Tiếp tục khám phá
              </button>
              <p className="hap-opening-status" role="status">
                <LockKeyhole size={13} aria-hidden="true" />
                {intro === "pulling"
                  ? "Đang mở trang chủ…"
                  : "Cuộn để mở trang chủ"}
              </p>
            </div>
          </div>
          <HeroCurtainFold />
        </div>

        <HeroRobotArm />
        {activeNote && (
          <HeroShowcaseDialog
            note={activeNote}
            onClose={() => setActiveNote(null)}
          />
        )}
      </div>
    </>
  );
}
