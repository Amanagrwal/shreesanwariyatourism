import React, { useEffect } from "react";
import { BASE_URL } from "@/components/Helper/Base_Url";
import { useGlobalContext } from "@/Contaxt/UseGlobelcontaxt";

const FaviconUpdater = () => {
  const { contactData } = useGlobalContext();

  useEffect(() => {
    if (contactData?.brand_logo) {
      const favicon = document.querySelector("link[rel='icon']");
      if (favicon) {
        favicon.setAttribute("href", `${BASE_URL}${contactData.brand_logo}`);
      } else {
        const newFavicon = document.createElement("link");
        newFavicon.rel = "icon";
        newFavicon.type = "image/png";
        newFavicon.href = `${BASE_URL}${contactData.brand_logo}`;
        document.head.appendChild(newFavicon);
      }
    }
  }, [contactData]);

  return null;
};

export default FaviconUpdater;
