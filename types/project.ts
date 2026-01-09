import type { Slug } from "@sanity/types";

export interface SanityImage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _upload: any;
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export default interface Project {
  _id: string;
  title: string;
  shortTitle?: string;
  slug: Slug;
  thumbnail: SanityImage;
  gallery: SanityImage[];
}
