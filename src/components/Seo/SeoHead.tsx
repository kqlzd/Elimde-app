import React from "react";
import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Meow.az - Ev Heyvanları üçün Peşəkar Xidmətlər",
  description = "Azərbaycanda ev heyvanları üçün hotel, klinika, grooming və təlim xidmətləri.",
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};
