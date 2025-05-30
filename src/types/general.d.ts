export interface RedirectUrls {
  updatedAt?: string
  createdAt?: string;
  id: number,
  url: string,
  redirectedUrl: string
}


export interface initialRedirectUrls extends Omit<RedirectUrls, "id"> {
  redirectedUrl?: string
  url?: string,
}