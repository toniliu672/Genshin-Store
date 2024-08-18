import React, { useEffect, useRef } from "react";
import { Typography, Card, Grid, Box, Avatar } from "@mui/material";
import DiamondIcon from "@mui/icons-material/Diamond";
import PersonIcon from "@mui/icons-material/Person";
import StarIcon from "@mui/icons-material/Star";
import LanguageIcon from "@mui/icons-material/Language"; // Import icon for server
import useDeviceSize from "../../hooks/useDeviceSize";
import { gsap } from "gsap";
import aetherIcon from '../../assets/character/Aether_Icon.webp';

const AccountSummary: React.FC = () => {
  const isMobile = useDeviceSize();
  const cardRef = useRef<HTMLDivElement>(null);

  const accountDetails = [
    { icon: <DiamondIcon />, label: "Primogems", value: "81,000+" },
    {
      icon: <PersonIcon />,
      label: "Characters",
      color: "#d3d3d3",
      value: (
        <Box>
          <Box
            style={{
              color: "#ffd700",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isMobile ? 12 : 14,
              textShadow: "0px 0px 8px rgba(255, 215, 0, 0.8)",
            }}
          >
            <Typography variant="h6" style={{ marginRight: 4 }}>
              2
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box display="flex" justifyContent="center" mb={-0.5} mt={-0.5}>
                {Array.from({ length: 3 }).map((_, index) => (
                  <span key={index} style={{ fontSize: isMobile ? 8 : 10 }}>
                    ★
                  </span>
                ))}
              </Box>
              <Box display="flex" justifyContent="center">
                {Array.from({ length: 2 }).map((_, index) => (
                  <span key={index} style={{ fontSize: isMobile ? 8 : 10 }}>
                    ★
                  </span>
                ))}
              </Box>
            </Box>
          </Box>
          <Box
            style={{
              color: "#a64ca6",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: isMobile ? 12 : 14,
              textShadow: "0px 0px 8px rgba(166, 76, 166, 0.8)",
            }}
          >
            <Typography variant="h6" style={{ marginRight: 4 }}>
              24
            </Typography>
            <Box display="flex" alignItems="center">
              {Array.from({ length: 4 }).map((_, index) => (
                <span key={index} style={{ fontSize: isMobile ? 8 : 10 }}>
                  ★
                </span>
              ))}
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      icon: <StarIcon />,
      label: "Adventure Rank",
      value: "56",
      color: "#d3d3d3",
    },
    {
      icon: <LanguageIcon />,
      label: "Server",
      value: "Asia",
      color: "#d3d3d3",
    }, // New Server Box
  ];

  useEffect(() => {
    if (cardRef.current) {
      const detailBoxes = cardRef.current.querySelectorAll(".detail-box");

      detailBoxes.forEach((box) => {
        const icon = box.querySelector(".detail-icon");
        const content = box.querySelector(".detail-content");
        const overlay = box.querySelector(".detail-overlay");

        const handleMouseEnter = () => {
          gsap.to(overlay, { opacity: 1, duration: 0.3 });
          gsap.to(content, { y: -30, opacity: 1, duration: 0.3 });
          gsap.to(icon, {
            opacity: 0.2,
            scale: 2,
            duration: 0.3,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(overlay, { opacity: 0, duration: 0.3 });
          gsap.to(content, { y: 0, opacity: 0.7, duration: 0.3 });
          gsap.to(icon, {
            opacity: 1,
            scale: 1,
            duration: 0.3,
          });
        };

        const handleClick = () => {
          gsap.to(box, {
            scale: 0.9,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          });
          gsap.to(icon, {
            scale: 1.5,
            duration: 0.2,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          });
        };

        box.addEventListener("mouseenter", handleMouseEnter);
        box.addEventListener("mouseleave", handleMouseLeave);
        box.addEventListener("click", handleClick);

        return () => {
          box.removeEventListener("mouseenter", handleMouseEnter);
          box.removeEventListener("mouseleave", handleMouseLeave);
          box.removeEventListener("click", handleClick);
        };
      });
    }
  }, []);

  return (
    <Card
      ref={cardRef}
      className="mb-5 overflow-hidden rounded-lg shadow-xl"
      style={{ backgroundColor: "#1a1a2e" }}
    >
      <Box className="p-6 text-white">
        <Grid container spacing={isMobile ? 2 : 3} alignItems="center">
          <Grid item xs={12} md={3} className="text-center">
            <Box className={`flex justify-center ${isMobile ? 'mb-4' : ''}`}>
              <Avatar
                alt="Main Character"
                src={aetherIcon}
                sx={{
                  width: isMobile ? 100 : 150,
                  height: isMobile ? 100 : 150,
                  border: "4px solid #ffd700",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              className={`font-bold mb-4 ${isMobile ? 'text-center' : ''}`}
              style={{ color: "#ffd700" }}
            >
              High Primo Acc
            </Typography>
            <Typography
              variant="body1"
              className="mb-6"
              style={{
                lineHeight: "1.8",
                color: "#d3d3d3",
                fontWeight: "300",
                textAlign: isMobile ? "center" : "left",
              }}
            >
              <span style={{ fontWeight: "bold", color: "#ffd700" }}>
                Akun High Primo
              </span>{" "}
              - murni tanpa cheat.
              <br />
              <span style={{ fontWeight: "bold" }}>
                Jual Akun Genshin Impact:
              </span>{" "}
              81,000+ Primogems, AR 56, Bebas Cheat, Aman dan Siap Main!
            </Typography>
          </Grid>
        </Grid>
        <Box mt={isMobile ? 3 : 4}>
          <Grid
            container
            spacing={isMobile ? 2 : 1.5}
            justifyContent={isMobile ? "center" : "space-between"}
          >
            {accountDetails.map((detail, index) => (
              <Grid
                item
                xs={6}
                sm={3}
                key={index}
                sx={{
                  "@media (min-width: 960px)": {
                    flexBasis: "22%", // Adjust the size to fit the remaining boxes into one row
                    maxWidth: "22%",
                  },
                }}
              >
                <Box
                  className="detail-box bg-white bg-opacity-10 rounded-lg p-4 text-center"
                  sx={{
                    padding: isMobile ? 2 : 4,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <Box
                    className="detail-overlay"
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: "rgba(255,215,0,0.2)",
                      opacity: 0,
                    }}
                  />
                  <Box
                    className="detail-icon"
                    sx={{ mb: 2, position: "relative", zIndex: 1 }}
                  >
                    {React.cloneElement(detail.icon, {
                      style: {
                        color: detail.color || "#ffd700",
                        fontSize: isMobile ? 24 : 30,
                      },
                    })}
                  </Box>
                  <Box
                    className="detail-content"
                    sx={{ position: "relative", zIndex: 2, opacity: 0.7 }}
                  >
                    <Typography
                      variant="h6"
                      className="font-semibold"
                      style={{ color: detail.color || "#ffd700" }}
                    >
                      {detail.value}
                    </Typography>
                    <Typography variant="body2" style={{ color: "#d3d3d3" }}>
                      {detail.label}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Card>
  );
};

export default AccountSummary;
