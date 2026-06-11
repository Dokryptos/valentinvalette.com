export interface SanityImage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _upload: any;
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export type BiographyDescriptionBlock = {
  _type: "descriptionBlock";
  children: Array<{ _type?: string; text: string; marks?: string[] }>;
  markDefs?: Array<{ _key: string; _type: string }>;
};

export default interface Biographie {
  _id: string;
  description?: BiographyDescriptionBlock[] | string;
  photoProfil: SanityImage;
}
