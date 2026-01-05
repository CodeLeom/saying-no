"use client";

import { useState, useMemo } from "react";
import {
  Container,
  Typography,
  TextField,
  Box,
  Paper,
  Chip,
  Stack,
  Grid,
  Card,
  CardContent,
  CardActions,
  InputAdornment,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GitHubIcon from "@mui/icons-material/GitHub";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import { useThemeMode } from "@/components/ThemeContext";
import reasonsData from "../../reason.json";

type Category = keyof typeof reasonsData.categories;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "All">(
    "All"
  );
  const [randomCategory, setRandomCategory] = useState<Category | "All">("All");
  const [randomReason, setRandomReason] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { mode, toggleTheme } = useThemeMode();

  const categories = Object.keys(reasonsData.categories) as Category[];

  const filteredReasons = useMemo(() => {
    let reasons: string[] = [];

    if (selectedCategory === "All") {
      categories.forEach((category) => {
        reasons.push(...reasonsData.categories[category].reasons);
      });
    } else {
      reasons = reasonsData.categories[selectedCategory].reasons;
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      reasons = reasons.filter((reason) =>
        reason.toLowerCase().includes(query)
      );
    }

    return reasons;
  }, [searchQuery, selectedCategory, categories]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSnackbarOpen(true);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  const getRandomReason = () => {
    let reasons: string[] = [];

    if (randomCategory === "All") {
      categories.forEach((category) => {
        reasons.push(...reasonsData.categories[category].reasons);
      });
    } else {
      reasons = reasonsData.categories[randomCategory].reasons;
    }

    if (reasons.length > 0) {
      const randomIndex = Math.floor(Math.random() * reasons.length);
      const selectedReason = reasons[randomIndex];
      setRandomReason(selectedReason);
      setSearchQuery("");
      setSelectedCategory(randomCategory);
      
      setTimeout(() => {
        const element = document.getElementById(`reason-${selectedReason}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: { xs: 1, sm: 2 },
        }}
      >
        <Tooltip
          title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
        >
          <IconButton
            onClick={toggleTheme}
            color="primary"
            size="small"
            sx={{
              border: 1,
              borderColor: "divider",
            }}
          >
            {mode === "light" ? (
              <DarkModeIcon fontSize="small" />
            ) : (
              <LightModeIcon fontSize="small" />
            )}
          </IconButton>
        </Tooltip>
      </Box>

      <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 } }}>
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: { xs: 1, sm: 2 },
            fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3rem" },
          }}
        >
          1000 Ways to Say No
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: { xs: 3, sm: 4 },
            fontSize: { xs: "0.875rem", sm: "1rem" },
            px: { xs: 1, sm: 0 },
          }}
        >
          Find the perfect way to decline with style, humor, or honesty
        </Typography>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 2, sm: 2 }}
          sx={{
            mb: { xs: 2, sm: 3 },
            maxWidth: { xs: "100%", sm: 800 },
            mx: "auto",
            alignItems: { xs: "stretch", sm: "flex-end" },
          }}
        >
          <TextField
            fullWidth
            placeholder="Search for a reason to say no..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: { xs: 2, sm: 3 },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: searchQuery && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearchQuery("")} size="small">
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ width: { xs: "100%", sm: "auto" }, minWidth: { sm: 280 } }}
          >
            <FormControl
              size="small"
              sx={{
                minWidth: { xs: "100%", sm: 150 },
                "& .MuiOutlinedInput-root": {
                  borderRadius: { xs: 2, sm: 3 },
                },
              }}
            >
              <InputLabel>Category</InputLabel>
              <Select
                value={randomCategory}
                label="Category"
                onChange={(e) =>
                  setRandomCategory(e.target.value as Category | "All")
                }
              >
                <MenuItem value="All">All</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<ShuffleIcon />}
              onClick={getRandomReason}
              sx={{
                borderRadius: { xs: 2, sm: 3 },
                px: { xs: 2, sm: 3 },
                whiteSpace: "nowrap",
              }}
            >
              Random
            </Button>
          </Stack>
        </Stack>

        <Box sx={{ mb: { xs: 3, sm: 4 } }}>
          <Typography
            variant="subtitle2"
            sx={{
              mb: { xs: 1.5, sm: 2 },
              fontWeight: 600,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Filter by Category:
          </Typography>
          <Stack
            direction="row"
            spacing={{ xs: 0.5, sm: 1 }}
            flexWrap="wrap"
            justifyContent="center"
            useFlexGap
            sx={{ gap: { xs: 0.5, sm: 1 } }}
          >
            <Chip
              label={`All (${reasonsData.total_reasons})`}
              onClick={() => setSelectedCategory("All")}
              color={selectedCategory === "All" ? "primary" : "default"}
              variant={selectedCategory === "All" ? "filled" : "outlined"}
              size="small"
              sx={{
                mb: { xs: 0.5, sm: 1 },
                fontSize: { xs: "0.7rem", sm: "0.8125rem" },
                height: { xs: 24, sm: 32 },
              }}
            />
            {categories.map((category) => (
              <Chip
                key={category}
                label={`${category} (${reasonsData.categories[category].count})`}
                onClick={() => setSelectedCategory(category)}
                color={selectedCategory === category ? "primary" : "default"}
                variant={selectedCategory === category ? "filled" : "outlined"}
                size="small"
                sx={{
                  mb: { xs: 0.5, sm: 1 },
                  fontSize: { xs: "0.7rem", sm: "0.8125rem" },
                  height: { xs: 24, sm: 32 },
                  maxWidth: { xs: "100%", sm: "auto" },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: { xs: 2, sm: 3 },
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
          }}
        >
          Showing {filteredReasons.length} reason
          {filteredReasons.length !== 1 ? "s" : ""}
          {selectedCategory !== "All" && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </Typography>
      </Box>

      {filteredReasons.length > 0 ? (
        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
          {filteredReasons.map((reason) => (
            <Grid item xs={12} sm={6} md={4} key={reason}>
              <Card
                id={`reason-${reason}`}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s, box-shadow 0.2s, background-color 0.3s",
                  cursor: "pointer",
                  border: randomReason === reason ? 2 : 0,
                  borderColor: randomReason === reason ? "primary.main" : "transparent",
                  backgroundColor: randomReason === reason 
                    ? (mode === "light" ? "rgba(25, 118, 210, 0.08)" : "rgba(144, 202, 249, 0.16)")
                    : "background.paper",
                  "&:hover": {
                    transform: { xs: "none", sm: "translateY(-4px)" },
                    boxShadow: { xs: 2, sm: 4 },
                  },
                  "&:active": {
                    transform: { xs: "scale(0.98)", sm: "translateY(-4px)" },
                  },
                }}
                onClick={() => {
                  copyToClipboard(reason);
                  setRandomReason(null);
                }}
              >
                <CardContent sx={{ flexGrow: 1, p: { xs: 1.5, sm: 2 } }}>
                  <Typography
                    variant="body1"
                    sx={{
                      lineHeight: 1.6,
                      fontSize: { xs: "0.875rem", sm: "1rem" },
                    }}
                  >
                    {reason}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "flex-end", p: { xs: 0.5, sm: 1 } }}
                >
                  <Tooltip title="Click card to copy">
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(reason);
                      }}
                      sx={{ color: "text.secondary" }}
                    >
                      <ContentCopyIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          sx={{
            p: { xs: 3, sm: 4 },
            textAlign: "center",
            backgroundColor: "grey.50",
          }}
        >
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            No reasons found
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 1,
              fontSize: { xs: "0.75rem", sm: "0.875rem" },
            }}
          >
            Try adjusting your search or selecting a different category
          </Typography>
        </Paper>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>

      <Box
        component="footer"
        sx={{
          mt: { xs: 6, sm: 8, md: 10 },
          pt: { xs: 3, sm: 4 },
          pb: { xs: 2, sm: 3 },
          textAlign: "center",
          borderTop: 1,
          borderColor: "divider",
        }}
      >
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.75rem", sm: "0.875rem" },
            mb: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            flexWrap: "wrap",
          }}
        >
          Made with{" "}
          <FavoriteIcon
            sx={{
              fontSize: { xs: "0.875rem", sm: "1rem" },
              color: "error.main",
              mx: 0.25,
            }}
          />{" "}
          by{" "}
          <Box
            component="a"
            href="https://github.com/CodeLeom"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              fontWeight: 600,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            @Leomofthings
          </Box>
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            fontSize: { xs: "0.7rem", sm: "0.8125rem" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            flexWrap: "wrap",
          }}
        >
          Reasons from{" "}
          <Box
            component="a"
            href="https://github.com/hotheadhacker/no-as-a-service"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "primary.main",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <GitHubIcon sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }} />
            no-as-a-service
          </Box>
        </Typography>
      </Box>
    </Container>
  );
}
