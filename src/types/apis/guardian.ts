export interface GuardianFields {
    trailText: string | null;
    bodyText: string | null;
    byline: string | null;
    thumbnail: string | null;
  }
  
  export interface GuardianArticle {
    id: string;
    webTitle: string;
    webPublicationDate: string;
    webUrl: string;
    sectionName: string | null;
    fields?: GuardianFields;
  }