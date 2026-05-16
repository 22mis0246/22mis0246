"use client";
import { useEffect, useState, useCallback } from "react";
import { Box, Container, Typography, ToggleButton, ToggleButtonGroup, CircularProgress, Chip, Pagination, Alert } from "@mui/material";
import Navbar from "@/components/Navbar";
import NotificationCard from "@/components/NotificationCard";
import { fetchNotifications } from "@/lib/notifications";

const TYPES = ["All", "Placement", "Result", "Event"];

export default function HomePage() {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [readIds, setReadIds] = useState(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    const data = await fetchNotifications({ page, limit: 10, notification_type: filter });
    setNotifications(data);
    setLoading(false);
  }, [page, filter]);

  useEffect(() => { load(); }, [load]);

  const unread = notifications.filter(n => !readIds.has(n.ID)).length;

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
          <Typography variant="h5" fontWeight={700}>All Notifications</Typography>
          {unread > 0 && <Chip label={`${unread} unread`} color="primary" size="small" />}
        </Box>
        <ToggleButtonGroup value={filter} exclusive size="small" sx={{ mb: 3 }}
          onChange={(_, v) => { if (v) { setFilter(v); setPage(1); } }}>
          {TYPES.map(t => <ToggleButton key={t} value={t}>{t}</ToggleButton>)}
        </ToggleButtonGroup>
        {loading ? <CircularProgress /> : notifications.length === 0 ? <Alert severity="info">No notifications.</Alert> : (
          <>
            {notifications.map(n => <NotificationCard key={n.ID} notification={n} isRead={readIds.has(n.ID)} onRead={id => setReadIds(p => new Set([...p, id]))} />)}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
              <Pagination count={page + (notifications.length === 10 ? 1 : 0)} page={page} onChange={(_, v) => setPage(v)} color="primary" />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
}