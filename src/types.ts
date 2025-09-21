
export interface Certificate {
  _id: string;
  title: string;
  issuer: string;
  date: string;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
}
