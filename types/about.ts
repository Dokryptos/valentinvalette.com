import type { Slug } from "@sanity/types";

export type BookContenu =
  | { _type: "singleImage"; asset: { _ref: string; url?: string } }
  | {
      _type: "doubleImage";
      image1: { asset: { _ref: string; url?: string } };
      image2: { asset: { _ref: string; url?: string } };
    }
  | { _type: "descriptionBlock"; children: Array<{ text: string }> };

export default interface AboutDescription {
  fileUrl: {
    asset: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      url: any;
    };
  };
  _id: string;
  slug: Slug;
  description: string;
  year: number;
  title: string;
  contenu?: BookContenu;
  downloadFile?: {
    asset: {
      url: string;
    };
  };
}
