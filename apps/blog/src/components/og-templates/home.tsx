import { SITE_TITLE } from "astro:env/server";

export const OgTemplate: React.FC = () => {
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
        fontFamily: "Pacifico",
        fontSize: "8rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        {SITE_TITLE}
      </div>
    </div>
  );
};
