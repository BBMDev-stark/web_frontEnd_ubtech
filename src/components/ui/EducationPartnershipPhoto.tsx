import Image from 'next/image';

export default function EducationPartnershipPhoto() {
  return (
    <figure className="overflow-hidden rounded-2xl border border-white/20 bg-white/10">
      <Image
        src="/images/education/ippg-fpt-ai-partnership.jpg"
        alt="Đại diện IPPG và FPT Fschools tại lễ ký kết hợp tác giáo dục AI"
        width={600}
        height={415}
        className="h-auto w-full"
      />
      <figcaption className="px-4 py-3 text-sm text-blue-100">
        IPPG và FPT Fschools ký kết hợp tác phát triển bộ sách AI. Ảnh IPPG.
      </figcaption>
    </figure>
  );
}
