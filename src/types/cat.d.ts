export interface Category {
  id: number | string
  name: string;
  description?: string;
  short_description?: string;
  Meta_Description?: string;
  Meta_Title?: string;
  Canonical_Tag?: string;
  images_alt_text?: string;
  posterImageUrl?: ProductImage;
  custom_url?: string
  createdAt: Date;
  updatedAt: Date;
  last_editedBy?: string;
  Recall_Cat?: string;
}

export interface EDIT_CATEGORY extends Category {
    id?: number | string
    posterImageUrl?: ProductImage;
    createdAt?: Date;
    updatedAt?: Date;

}
