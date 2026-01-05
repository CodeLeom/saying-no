import { Container, Typography, Button, Box, Paper } from "@mui/material";

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          gap: 3,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            maxWidth: 600,
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Next.js
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Get started by editing{" "}
            <code style={{ background: "#f5f5f5", padding: "2px 6px", borderRadius: "4px" }}>
              src/app/page.tsx
            </code>
          </Typography>
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

