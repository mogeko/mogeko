import { siteConfig } from "@/config";
import type { Entry } from "@/lib/content";

export const OgTemplate: React.FC<{ data: Entry["data"] }> = ({ data }) => {
  const author = data.author ?? siteConfig.author;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
        backgroundColor: "hsl(195 36% 11%)",
        color: "hsl(180 8% 97%)",
        border: "2rem solid hsl(12 76% 61%)",
        padding: "6rem",
        height: "100%",
        width: "100%",
        fontFamily: "SmileySans",
        fontSize: "2rem",
      }}
    >
      <h1
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          paddingBottom: "4rem",
          margin: "auto 0",
          fontSize: "4.2rem",
          lineHeight: 1.2,
          fontWeight: 800,
        }}
      >
        {data.title}
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <span>by</span>
          <span style={{ color: "hsl(12 76% 61%)" }}>{author}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ marginRight: "0.5rem", height: "2rem", width: "2rem" }}
            src={`${import.meta.env.SITE}/favicon.svg`}
          />
          {siteConfig.title}
        </div>
      </div>
    </div>
  );
};
