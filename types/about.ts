import type { Slug } from "@sanity/types";

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
  downloadFile?: {
    asset: {
      url: string;
    };
  };
}
