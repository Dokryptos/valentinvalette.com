import type { Slug } from "@sanity/types";

export default interface AboutDescription {
  _id: string;
  slug: Slug;
  description: string;
  year: number;
  title: string;
}
