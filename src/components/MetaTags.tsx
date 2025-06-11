import React from 'react';
import { Helmet } from 'react-helmet-async';

interface MetaTagsProps {
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({ title, description, imageUrl, url }) => {
  return (
    <Helmet>
      {/* Standar Meta Tags */}
      <title>{title} - SDN Tunas Harapan</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="SDN Tunas Harapan" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default MetaTags;