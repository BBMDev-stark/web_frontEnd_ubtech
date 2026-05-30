"use client";
import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const YT_ID = "MlUIRQkGxfY";
const ALPHA_MINI =
  "https://lh3.googleusercontent.com/d/10dpsDljzIrY9U6TeSODxbmNMrB8OUSO-";

export default function HeroApple() {
  const armRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  const phaseRef = useRef<"idle" | "raising" | "pushing" | "done">("idle");
  const triggeredRef = useRef(false);

  const openModal = useCallback(() => {
    if (!modalRef.current || !frameRef.current) return;
    frameRef.current.src = `https://www.youtube.com/embed/${YT_ID}?autoplay=1&controls=1&rel=0&modestbranding=1`;
    modalRef.current.dataset.open = "true";
  }, []);

  const closeModal = useCallback(() => {
    if (!modalRef.current || !frameRef.current) return;
    delete modalRef.current.dataset.open;
    setTimeout(() => {
      if (frameRef.current) frameRef.current.src = "about:blank";
    }, 350);
  }, []);

  const runSequence = useCallback(() => {
    const arm = armRef.current;
    const panel = panelRef.current;
    const scene = sceneRef.current;
    const hint = hintRef.current;
    if (!arm || !panel || !scene || !hint || phaseRef.current !== "idle")
      return;
    setTimeout(() => {
      phaseRef.current = "raising";
      arm.dataset.state = "raise";
      setTimeout(() => {
        phaseRef.current = "pushing";
        panel.dataset.state = "down";
        setTimeout(() => {
          arm.dataset.state = "exit";
        }, 180);
        setTimeout(() => {
          scene.dataset.visible = "true";
          hint.dataset.hide = "true";
          phaseRef.current = "done";
        }, 600);
      }, 1050);
    }, 600);
  }, []);

  const trigger = useCallback(() => {
    if (triggeredRef.current) return;
    triggeredRef.current = true;
    runSequence();
  }, [runSequence]);

  useEffect(() => {
    const t = setTimeout(trigger, 2000);
    const onW = () => trigger();
    const onK = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("wheel", onW, { passive: true });
    window.addEventListener("touchmove", onW, { passive: true });
    document.addEventListener("keydown", onK);
    return () => {
      clearTimeout(t);
      window.removeEventListener("wheel", onW);
      window.removeEventListener("touchmove", onW);
      document.removeEventListener("keydown", onK);
    };
  }, [trigger, closeModal]);

  return (
    <>
      <div className="hap">
        {/* ══ SCENE ══ */}
        <div ref={sceneRef} className="hap-scene">
          <div className="hap-orb hap-orb1" />
          <div className="hap-orb hap-orb2" />
          <div className="hap-orb hap-orb3" />
          <div className="hap-light" />
          <div className="hap-bigtext">AI &amp; ROBOTIC</div>
          <div className="hap-floor" />

          <div className="hap-badge">
            Công nghệ AI &amp; Robotics hàng đầu
          </div>

          {/* Float cards */}
          <div className="hap-card hap-card1">
            <div className="hap-card-title">AI Robotics</div>
            <div className="hap-card-sub">UBTECH Vietnam — Độc quyền</div>
          </div>
          <div className="hap-card hap-card2">
            <div className="hap-card-title">K1 – K12</div>
            <div className="hap-card-sub">Chương trình giáo dục</div>
          </div>

          {/* Background robots */}
          <div className="hap-bot hap-bot1">
            <img
              src="https://lh3.googleusercontent.com/d/1HVhd73x_HfF1Syl-LfDMgsSgp2fgnN_L"
              alt="Yanshee"
            />
            <div className="hap-bot-shadow" />
          </div>
          <div className="hap-bot hap-bot3">
            <img
              src="https://lh3.googleusercontent.com/d/12FU50aqn--4P133EitfmuPFI_Gy2n7Ew"
              alt="Cruzr"
            />
            <div className="hap-bot-shadow" />
          </div>
          <div className="hap-bot hap-bot4">
            <img
              src="https://lh3.googleusercontent.com/d/1DjLRnfvrdrMHryqd6-sBJ9xQc4f1uGEz"
              alt="Adibot"
            />
            <div className="hap-bot-shadow" />
          </div>

          {/* ══ 3D PHONE + Alpha Mini nổi ra ngoài ══ */}
          <div className="hap-phone-wrap">
            <div className="hap-phone-3d">
              {/* Tilt perspective 3D */}
              <div className="hap-phone-tilt">
                {/* Alpha Mini robot — nổi ra TRƯỚC phone */}
                <div className="hap-alpha-pop">
                  <img src={ALPHA_MINI} alt="Alpha Mini Robot" />
                </div>

                {/* Phone body */}
                <div className="hap-p-body">
                  {/* Notch / camera */}
                  <div className="hap-p-notch">
                    <div className="hap-p-cam" />
                  </div>

                  {/* Màn hình — nội dung app UBTECH */}
                  <div className="hap-p-screen">
                    <div className="hap-p-ui">
                      <div className="hap-p-ui-top">
                        <span className="hap-p-logo">UBTECH</span>
                        <span className="hap-p-time">9:41</span>
                      </div>
                      <div className="hap-p-ui-card">
                        <div className="hap-p-ui-label">Alpha Mini</div>
                        <div className="hap-p-ui-val">Online ●</div>
                        <div className="hap-p-indicator">
                          <div className="hap-p-dot-ind active" />
                          <div className="hap-p-dot-ind active" />
                          <div className="hap-p-dot-ind active" />
                          <div className="hap-p-dot-ind" />
                        </div>
                      </div>
                      <div className="hap-p-ui-card">
                        <div className="hap-p-ui-label">Tiến độ học</div>
                        <div className="hap-p-ui-val">K1–K12 AI</div>
                        <div className="hap-p-bar">
                          <div className="hap-p-bar-fill" />
                        </div>
                        <div className="hap-p-ui-sub">72% hoàn thành</div>
                      </div>
                    </div>
                  </div>

                  {/* Home bar */}
                  <div className="hap-p-home-bar" />

                  {/* Mask che chân robot — tạo cảm giác robot đứng trong phone */}
                  <div className="hap-phone-mask" />
                </div>
              </div>
            </div>
          </div>

          {/* ══ Monitor Center ══ */}
          <div className="hap-center">
            <div className="hap-monitor">
              <div className="hap-screen" onClick={openModal}>
                <img
                  src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`}
                  alt="UBTECH Video"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      `https://img.youtube.com/vi/${YT_ID}/hqdefault.jpg`;
                  }}
                />
                <div className="hap-screen-glare" />
                <div className="hap-screen-hover">
                  <div className="hap-playbtn">
                    <svg viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="hap-monitor-chin" />
            </div>
            <div className="hap-stand-neck" />
            <div className="hap-stand-base" />
          </div>

          {/* Mug */}
          <div className="hap-mug">
            <div className="hap-mug-rim" />
            <div className="hap-mug-body">
              <div className="hap-mug-logo">UBTECH</div>
            </div>
          </div>

          {/* Stat bar */}
          <div className="hap-stats">
            {[
              ["500+", "Sản phẩm"],
              ["10.000+", "Khách hàng"],
              ["Bộ GD&ĐT", "Chứng nhận"],
              ["2019", "Độc quyền"],
            ].map(([n, l]) => (
              <div key={l} className="hap-stat">
                <div className="hap-stat-n">{n}</div>
                <div className="hap-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ══ HERO PANEL (lớp đầu, click/scroll để lật xuống) ══ */}
        <div ref={panelRef} className="hap-panel" onClick={trigger}>
          <div className="hap-pgrid" />
          <div
            className="hap-pglow"
            style={{
              width: 500,
              height: 500,
              top: -100,
              right: -80,
              background: "rgba(0,87,255,.1)",
            }}
          />
          <div
            className="hap-pglow"
            style={{
              width: 340,
              height: 340,
              bottom: -60,
              left: -60,
              background: "rgba(120,80,255,.08)",
            }}
          />

          <p className="hap-tag">
            <span className="hap-dot" />
            Nhà phân phối độc quyền UBTECH tại Việt Nam
          </p>
          <h1 className="hap-h1">
            Giải pháp
            <br />
            <em>AI &amp; Robotic</em>
            <br />
            hàng đầu thế giới
          </h1>
          <p className="hap-sub">
            Phục vụ đa ngành: giáo dục, ngân hàng, y tế và hơn thế nữa.
            <br />
            Chương trình AI &amp; Robotics K1–K12 hoàn chỉnh nhất Việt Nam.
          </p>
          <div className="hap-ctas">
            <Link href="/san-pham" className="hap-btn hap-btn-p">
              Xem sản phẩm
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/chuong-trinh-k12" className="hap-btn hap-btn-g">
              Chương trình K12
            </Link>
          </div>
          <div className="hap-hstats">
            <div>
              <div className="hap-sn">500+</div>
              <div className="hap-sl">Sản phẩm</div>
            </div>
            <div>
              <div className="hap-sn">10.000+</div>
              <div className="hap-sl">Khách hàng</div>
            </div>
            <div>
              <div className="hap-sn">Bộ GD&ĐT</div>
              <div className="hap-sl">Chứng nhận</div>
            </div>
            <div>
              <div className="hap-sn">Từ 2019</div>
              <div className="hap-sl">Độc quyền</div>
            </div>
          </div>
        </div>

        <div ref={hintRef} className="hap-hint">
          <div className="hap-chev" />
          <span>Kéo xuống</span>
        </div>

        {/* ARM SVG */}
        <div ref={armRef} className="hap-arm">
          <svg
            viewBox="0 0 520 780"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%" }}
          >
            <defs>
              <linearGradient id="ra-fa" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#b8b8c2" />
                <stop offset="18%" stopColor="#e8e8ee" />
                <stop offset="50%" stopColor="#ffffff" />
                <stop offset="80%" stopColor="#dedee4" />
                <stop offset="100%" stopColor="#a0a0aa" />
              </linearGradient>
              <linearGradient id="ra-palm" x1="0.1" y1="0" x2="0.9" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#efeff2" />
                <stop offset="70%" stopColor="#d6d6dc" />
                <stop offset="100%" stopColor="#aeaeb8" />
              </linearGradient>
              <radialGradient id="ra-jg" cx="38%" cy="32%" r="62%">
                <stop offset="0%" stopColor="#f8e8c0" />
                <stop offset="30%" stopColor="#d0a858" />
                <stop offset="65%" stopColor="#7a5520" />
                <stop offset="100%" stopColor="#3a2808" />
              </radialGradient>
              <radialGradient id="ra-jg2" cx="35%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#ffe8b8" />
                <stop offset="40%" stopColor="#b88030" />
                <stop offset="100%" stopColor="#3a2808" />
              </radialGradient>
              <linearGradient id="ra-cav" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2a2018" />
                <stop offset="50%" stopColor="#180e04" />
                <stop offset="100%" stopColor="#0a0804" />
              </linearGradient>
              <linearGradient id="ra-fng" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#b0b0ba" />
                <stop offset="20%" stopColor="#e6e6ec" />
                <stop offset="50%" stopColor="#f8f8f8" />
                <stop offset="80%" stopColor="#dadae0" />
                <stop offset="100%" stopColor="#9e9ea8" />
              </linearGradient>
              <radialGradient id="ra-wr" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#ece0d0" />
                <stop offset="25%" stopColor="#c09040" />
                <stop offset="55%" stopColor="#604010" />
                <stop offset="80%" stopColor="#201408" />
                <stop offset="100%" stopColor="#402010" />
              </radialGradient>
              <radialGradient id="ra-spec" cx="35%" cy="25%" r="55%">
                <stop offset="0%" stopColor="rgba(255,255,255,.95)" />
                <stop offset="40%" stopColor="rgba(255,255,255,.28)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
              <radialGradient id="ra-specs" cx="30%" cy="25%" r="60%">
                <stop offset="0%" stopColor="rgba(255,255,255,.8)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
              <filter id="ra-sb">
                <feGaussianBlur stdDeviation="1.5" />
              </filter>
              <filter id="ra-mb">
                <feGaussianBlur stdDeviation="0.6" />
              </filter>
            </defs>
            {/* Forearm */}
            <path
              d="M175 780 C172 700 170 640 172 590 C174 555 178 528 186 508 C192 492 200 482 210 476 L230 472 L270 472 L290 476 C300 482 308 492 314 508 C322 528 326 555 328 590 C330 640 328 700 325 780 Z"
              fill="url(#ra-fa)"
            />
            <path
              d="M175 780 C172 700 170 640 172 590 C174 555 178 528 186 508 C192 492 200 482 210 476 L220 473 C204 478 193 490 186 508 C178 528 174 555 172 590 C170 640 172 700 175 780 Z"
              fill="rgba(0,0,0,.3)"
            />
            <path
              d="M325 780 C328 700 330 640 328 590 C326 555 322 528 314 508 C308 492 300 482 290 476 L280 473 C296 478 307 490 314 508 C322 528 326 555 328 590 C330 640 328 700 325 780 Z"
              fill="rgba(0,0,0,.24)"
            />
            {/* Wrist */}
            <ellipse cx="250" cy="475" rx="72" ry="22" fill="url(#ra-wr)" />
            <ellipse cx="250" cy="475" rx="60" ry="14" fill="url(#ra-cav)" />
            <ellipse cx="250" cy="475" rx="52" ry="10" fill="#1a1208" />
            {/* Palm */}
            <path
              d="M188 472 C182 462 178 450 176 436 C174 420 174 402 176 386 C178 370 182 356 190 344 C198 332 210 322 224 318 L250 314 L276 318 C290 322 302 332 310 344 C318 356 322 370 324 386 C326 402 326 420 324 436 C322 450 318 462 312 472 Z"
              fill="url(#ra-palm)"
            />
            <path
              d="M188 472 C182 462 178 450 176 436 C174 420 174 402 176 386 C178 370 182 356 190 344 C197 333 208 323 220 318 C204 322 192 332 184 344 C176 356 172 370 170 386 C168 402 168 420 170 436 C172 450 177 463 183 473 Z"
              fill="rgba(0,0,0,.2)"
            />
            {/* Eye */}
            <circle cx="210" cy="390" r="38" fill="url(#ra-cav)" />
            <circle cx="210" cy="390" r="30" fill="#100a02" />
            <circle cx="210" cy="390" r="22" fill="url(#ra-jg)" />
            <circle cx="210" cy="390" r="15" fill="#2a1a08" />
            <circle cx="210" cy="390" r="9" fill="url(#ra-jg2)" />
            <circle cx="210" cy="390" r="4" fill="#ffe090" />
            {/* Fingers */}
            <path
              d="M224 316 C222 304 222 292 224 282 C225 275 228 270 232 268 C236 266 240 267 242 271 C244 276 245 283 244 294 C243 304 241 312 240 318 Z"
              fill="url(#ra-fng)"
            />
            <path
              d="M246 313 C244 300 244 287 246 276 C247 268 250 263 254 261 C258 259 262 260 264 265 C267 270 267 278 266 289 C265 300 263 308 262 314 Z"
              fill="url(#ra-fng)"
            />
            <path
              d="M266 318 C264 306 264 294 266 283 C267 276 270 271 274 269 C278 267 281 268 283 273 C285 278 286 286 285 296 C284 306 282 313 281 318 Z"
              fill="url(#ra-fng)"
            />
            <path
              d="M284 322 C282 312 282 302 284 293 C285 287 288 283 291 281 C294 279 297 280 299 284 C301 289 301 297 300 305 C299 313 297 318 296 322 Z"
              fill="url(#ra-fng)"
            />
            {/* Thumb */}
            <path
              d="M188 432 C178 428 168 420 162 410 C156 400 154 388 156 378 C158 368 163 360 170 355 C177 350 184 349 190 352 C195 355 198 361 200 370 C202 380 200 392 196 402 C193 412 190 422 188 432 Z"
              fill="url(#ra-fng)"
            />
            {/* Highlight */}
            <ellipse
              cx="272"
              cy="348"
              rx="20"
              ry="34"
              fill="url(#ra-spec)"
              opacity="0.3"
            />
            <ellipse
              cx="232"
              cy="548"
              rx="17"
              ry="54"
              fill="url(#ra-spec)"
              opacity="0.35"
            />
          </svg>
        </div>
      </div>
      {/* end hap */}

      {/* MODAL */}
      <div
        ref={modalRef}
        className="hap-modal"
        onClick={(e) => {
          if (e.target === modalRef.current) closeModal();
        }}
      >
        <div className="hap-minner">
          <button className="hap-mclose" onClick={closeModal}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
            Đóng (ESC)
          </button>
          <iframe
            ref={frameRef}
            src="about:blank"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title="UBTECH"
          />
        </div>
      </div>
    </>
  );
}
