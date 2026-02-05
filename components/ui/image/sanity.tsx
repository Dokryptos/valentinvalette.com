import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import { HTMLProps } from "react";

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});

const urlForImage = (source: SanityImageSource) => builder.image(source);

export type UIImageSanityProps = {
  // linked asset from sanity
  asset: SanityImageSource;
  // alt for the image
  alt: string;
  // optional className
  className?: string;
} & HTMLProps<HTMLImageElement>;

export const UIImageSanity = ({
  asset,
  alt,
  className,
  ...props
}: UIImageSanityProps) => {
  if (!asset) return null;

  const imageUrl = urlForImage(asset)?.url() || "";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={imageUrl} className={className} alt={alt} {...props} />
  );
};
