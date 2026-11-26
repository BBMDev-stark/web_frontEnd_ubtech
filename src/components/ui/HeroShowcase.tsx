"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

type ShowcaseImage = {
  src: string;
  caption: string;
  fit?: "cover";
};

type ShowcaseNote = {
  position: string;
  label: string;
  detail: string;
  title: string;
  description: string;
  highlights: string[];
  images: [ShowcaseImage, ...ShowcaseImage[]];
};

export const walkerShowcase: ShowcaseNote = {
  position: "humanoid",
  label: "Robot hình người",
  detail: "Khám phá Walker Tienkung",
  title: "Walker Tienkung",
  description: "Robot hình người hai chân của UBTECH dành cho đào tạo và nghiên cứu điều khiển chuyển động, thị giác máy tính và AI.",
  highlights: ["Thực hành điều khiển robot hai chân", "Lập trình với Python và ROS", "Phù hợp với phòng thí nghiệm đại học"],
  images: [
    { src: "/images/site/walker-tienkung-cutout.webp", caption: "Walker Tienkung nhìn từ phía trước" },
    { src: "/images/site/walker-tienkung-feature.webp", caption: "Cận cảnh phần thân trên của Walker Tienkung" },
    { src: "/images/products/walker-tienkung-2-434f905a65.webp", caption: "Ảnh sản phẩm Walker Tienkung" },
  ],
};

export const showcaseNotes: ShowcaseNote[] = [
  {
    position: "education",
    label: "Giáo dục AI K12",
    detail: "Chương trình từ K1 đến K12",
    title: "Chương trình AI & Robotics K12",
    description: "Lộ trình từ lớp 1 đến lớp 12 giúp học sinh làm quen với AI và lập trình qua các dự án robot phù hợp với từng cấp học.",
    highlights: ["K1–K3 · Lắp mô hình và lập trình Blockly", "K4–K9 · Cảm biến và dự án lập trình ứng dụng", "K10–K12 · Python và nghiên cứu ứng dụng AI"],
    images: [
      { src: "/images/education/ubtech-stem-classroom.webp", caption: "Học sinh trải nghiệm robot trong lớp học STEM", fit: "cover" },
      { src: "/images/education/ai-center-robot-programming.webp", caption: "Thực hành lập trình robot tại AI Center", fit: "cover" },
      { src: "/images/education/ai-center-stem-lab.webp", caption: "Không gian học tập và thực hành STEM", fit: "cover" },
    ],
  },
  walkerShowcase,
  {
    position: "kits",
    label: "Học cụ STEM",
    detail: "Bộ kit thực hành lập trình",
    title: "Bộ học cụ lập trình STEM",
    description: "Các bộ học cụ UBTECH giúp học sinh tự lắp ráp mô hình, chạy chương trình và quan sát cách robot phản hồi với môi trường.",
    highlights: ["AI UGOT · Lắp ráp robot theo mô-đun", "AI Fantasy Zoo · Lập trình mô hình động vật", "AI Smart Life · Thực hành với cảm biến"],
    images: [
      { src: "/images/site/ai-ugot.webp", caption: "Robot lắp ráp AI UGOT" },
      { src: "/images/products/ai-fantasy-zoo-2-1-5827133857.webp", caption: "Học cụ AI Fantasy Zoo" },
      { src: "/images/products/ai-smart-life-1-1-e0680b789e.webp", caption: "Học cụ AI Smart Life" },
    ],
  },
  {
    position: "service",
    label: "Robot dịch vụ",
    detail: "Giải pháp tiếp đón và hỗ trợ",
    title: "Robot dịch vụ UBTECH",
    description: "Các dòng robot phục vụ những nhu cầu khác nhau tại doanh nghiệp, từ tiếp đón khách đến vận chuyển và hỗ trợ vận hành.",
    highlights: ["Cruzr · Tiếp đón và tương tác với khách", "Cadebot L100 · Vận chuyển tự hành", "Adibot · Khử khuẩn không gian bằng UV-C"],
    images: [
      { src: "/images/site/cruzr.webp", caption: "Cruzr, robot tiếp đón và tương tác khách hàng" },
      { src: "/images/site/cadebot.webp", caption: "Cadebot L100, robot vận chuyển tự hành" },
      { src: "/images/site/adibot.webp", caption: "Adibot, robot khử khuẩn" },
    ],
  },
];

export function HeroShowcaseDialog({ note, onClose }: { note: ShowcaseNote; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const image = note.images[imageIndex];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="hap-detail"
      aria-labelledby="hap-detail-title"
      aria-describedby="hap-detail-description"
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const { left, right, top, bottom } = event.currentTarget.getBoundingClientRect();
        if (event.clientX < left || event.clientX > right || event.clientY < top || event.clientY > bottom) {
          event.currentTarget.close();
        }
      }}
    >
      <button type="button" className="hap-detail-close" aria-label="Đóng chi tiết" autoFocus onClick={() => dialogRef.current?.close()}>
        <X size={21} aria-hidden="true" />
      </button>
      <div className="hap-detail-layout">
        <div className="hap-detail-gallery">
          <figure>
            <div className="hap-detail-image" data-fit={image.fit}>
              <Image src={image.src} alt={image.caption} fill sizes="(max-width: 700px) 92vw, 520px" />
            </div>
            <figcaption className="hap-detail-caption" aria-live="polite">{image.caption}</figcaption>
          </figure>
          <div className="hap-detail-thumbnails" aria-label="Ảnh liên quan" role="group">
            {note.images.map((photo, index) => (
              <button key={photo.src} type="button" aria-label={`Xem ảnh: ${photo.caption}`} aria-pressed={index === imageIndex} onClick={() => setImageIndex(index)}>
                <Image src={photo.src} alt="" width={76} height={52} />
              </button>
            ))}
          </div>
        </div>

        <div className="hap-detail-info">
          <h2 id="hap-detail-title">{note.title}</h2>
          <p id="hap-detail-description">{note.description}</p>
          <ul>
            {note.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
          </ul>
        </div>
      </div>
    </dialog>
  );
}
