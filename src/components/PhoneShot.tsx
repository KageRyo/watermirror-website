import Image, { type StaticImageData } from "next/image";

export function PhoneShot({
  src,
  alt,
  className = "",
  priority = false,
}: Readonly<{
  src: StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
}>) {
  return (
    <div className={`rounded-[1.75rem] bg-ink p-[7px] ${className}`}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        sizes="(min-width: 768px) 260px, 45vw"
        className="block h-auto w-full rounded-[1.35rem]"
      />
    </div>
  );
}
