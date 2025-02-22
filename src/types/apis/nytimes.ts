export interface NYTimesMultimedia {
  url: string;
  type: string;
}

export interface NYTimesByline {
  original: string | null;
  person: Array<NYTimesPerson>;
}

export interface NYTimesPerson {
  firstname: string;
  lastname: string;
}

export interface NYTimesHeadline {
  main: string;
  kicker: string | null;
  print_headline: string | null;
}

export interface NYTimesArticle {
  _id: string;
  headline: NYTimesHeadline;
  abstract: string | null;
  lead_paragraph: string | null;
  byline: NYTimesByline;
  section_name: string | null;
  pub_date: string;
  web_url: string;
  multimedia: NYTimesMultimedia[];
}