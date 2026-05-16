"use client";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const path = usePathname();
  return (
    <AppBar position="sticky" sx={{ bgcolor: "#0D0D1A" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
          Notify<span style={{ color: "#6C63FF" }}>Hub</span>
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant={path === "/" ? "contained" : "outlined"} size="small" onClick={() => router.push("/")}>All</Button>
          <Button variant={path === "/priority" ? "contained" : "outlined"} size="small" onClick={() => router.push("/priority")}>Priority</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}