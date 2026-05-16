"use client";
import { Card, CardContent, Typography, Chip, Box } from "@mui/material";

const colors = { Placement: "success", Result: "warning", Event: "info" };

export default function NotificationCard({ notification: n, isRead, onRead, rank }) {
  return (
    <Card onClick={() => onRead(n.ID)} sx={{
      mb: 1.5, cursor: "pointer", opacity: isRead ? 0.5 : 1,
      borderLeft: `3px solid`, borderLeftColor: isRead ? "transparent" : `${colors[n.Type]}.main`,
      transition: "all 0.2s", "&:hover": { transform: "translateX(4px)" },
    }}>
      <CardContent sx={{ py: "10px !important" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}>
          {rank && <Typography sx={{ color: "#6C63FF", fontWeight: 700 }}>#{rank}</Typography>}
          <Chip label={n.Type} color={colors[n.Type]} size="small" variant="outlined" />
          {!isRead && <Chip label="NEW" color="primary" size="small" />}
          <Typography variant="caption" sx={{ ml: "auto", color: "text.secondary" }}>
            {new Date(n.Timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ fontWeight: isRead ? 400 : 600 }}>{n.Message}</Typography>
      </CardContent>
    </Card>
  );
}