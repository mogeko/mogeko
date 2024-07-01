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
        padding: "6rem",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
          fontFamily: "Pacifico",
          fontSize: "8rem",
          gap: "1rem",
        }}
      >
        <span>Mogeko's</span>
        <span style={{ color: "hsl(12 76% 61%)" }}>Blog</span>
      </div>
    </div>
  );
};
