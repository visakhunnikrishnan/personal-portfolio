import { BlogImageLightbox } from "@/components/blog-image-lightbox";

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BlogImageLightbox>{children}</BlogImageLightbox>;
}
