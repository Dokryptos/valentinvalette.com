export interface SanityImage {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _upload: any;
  asset: {
    _ref: string;
    _type: "reference";
  };
}

export default interface Biographie {
  _id: string;
  description: string;
  photoProfil: SanityImage;
}
