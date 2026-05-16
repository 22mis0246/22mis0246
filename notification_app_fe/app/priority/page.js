"use client";
import { useEffect, useState } from "react";
import { Box, Container, Typography, ToggleButton, ToggleButtonGroup, CircularProgress, Slider, Paper, Alert } from "@mui/material";
import Navbar from "@/components/Navbar";
import NotificationCard from "@/components/NotificationCard";
import { fetchNotifications, sortByPriority } from "@/lib/notifications";

const TYPES = ["All", "Placement", "Result", "Event"];

export default function PriorityPage() {
  const [all, setAll] = useState([]);
  const [filter, setFilter] = useState("All");
  const [topN, setTopN] = useState(10);
  const [loading, setLoading] = useState(false);
  const [readIds, setReadIds] = useState(new Set());

  useEffect(() => {
    setLoading(true);
    fetchNotifications({ limit: 100 }).then(data => {
      setAll(sortByPriority(data));
      setLoading(false);
    });
  }, []);

  const filtered = all.filter(n => filter === "All" || n.Type === filter).slice(0, topN);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={1}>⭐ Priority Inbox</Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>Placement → Result → Event → Recency</Typography>
        <Paper sx={{ p: 2, mb: 3, bgcolor: "rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.3)" }}>
          <Typography variant="body2" mb={1}>Top <strong>{topN}</strong> notifications</Typography>
          <Slider value={topN} onChange={(_, v) => setTopN(v)} min={5} max={20} step={5}
            marks={[{value:5,label:"5"},{value:10,label:"10"},{value:15,label:"15"},{value:20,label:"20"}]} />
        </Paper>
        <ToggleButtonGroup value={filter} exclusive size="small" sx={{ mb: 3 }}
          onChange={(_, v) => { if (v) setFilter(v); }}>
          {TYPES.map(t => <ToggleButton key={t} value={t}>{t}</ToggleButton>)}
        </ToggleButtonGroup>
        {loading ? <CircularProgress /> : filtered.length === 0 ? <Alert severity="info">No notifications.</Alert> :
          filtered.map((n, i) => <NotificationCard key={n.ID} notification={n} isRead={readIds.has(n.ID)}
            onRead={id => setReadIds(p => new Set([...p, id]))} rank={i + 1} />)
        }
      </Container>
    </Box>
  );
}