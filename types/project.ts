import type { Slug } from "@sanity/types";

export interface SanityImage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _upload: any;
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export type ProjectDescriptionBlock = {
  _type: "descriptionBlock";
  children: Array<{ _type?: string; text: string; marks?: string[] }>;
  markDefs?: Array<{ _key: string; _type: string }>;
};

export default interface Project {
  _id: string;
  title: string;
  shortTitle?: string;
  slug: Slug;
  thumbnail: SanityImage;
  category: string;
  description?: ProjectDescriptionBlock[] | string;
  year: number;
  gallery: SanityImage[];
  orderRank?: string;
}
