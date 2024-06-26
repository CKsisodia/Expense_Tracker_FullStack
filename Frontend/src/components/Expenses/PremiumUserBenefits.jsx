import React, { useState } from "react";
import {
  Card,
  CardContent,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { FaDownload } from "react-icons/fa";

const filterExpenses = ["All", "Daily", "Weekly", "Monthly"];

const PremiumUserBenefits = () => {
  const [shake, setShake] = useState(false);

  const handleClick = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500); // Duration of the shake animation
  };

  const shakeAnimation = `
    @keyframes shake {
      0% { transform: translate(1px, 1px) rotate(0deg); }
      10% { transform: translate(-1px, -2px) rotate(-1deg); }
      20% { transform: translate(-3px, 0px) rotate(1deg); }
      30% { transform: translate(3px, 2px) rotate(0deg); }
      40% { transform: translate(1px, -1px) rotate(1deg); }
      50% { transform: translate(-1px, 2px) rotate(-1deg); }
      60% { transform: translate(-3px, 1px) rotate(0deg); }
      70% { transform: translate(3px, 1px) rotate(-1deg); }
      80% { transform: translate(-1px, -1px) rotate(1deg); }
      90% { transform: translate(1px, 2px) rotate(0deg); }
      100% { transform: translate(1px, -2px) rotate(-1deg); }
    }

    .shake {
      animation: shake 0.5s;
    }
  `;

  return (
    <Card sx={{ margin: "80px auto" }}>
      <CardContent>
        <Typography
          variant="h4"
          align="center"
          sx={{ color: "#023364", fontWeight: 700 }}
        >
          Day to Day Expenses
        </Typography>

        <FormControl variant="outlined" fullWidth margin="normal">
          <InputLabel id="category-select-label">Filter</InputLabel>
          <Select
            name="category"
            labelId="category-select-label"
            label="Filter"
            variant="outlined"
          >
            {filterExpenses.map((expense) => (
              <MenuItem key={expense} value={expense}>
                {expense}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <style>{shakeAnimation}</style>
        <Typography variant="h5">Download Your Expenses</Typography>
        <IconButton
          sx={{ color: "#38d39f" }}
          size="small"
          className={shake ? "shake" : ""}
          onClick={handleClick}
        >
           <FaDownload size="2rem" />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default PremiumUserBenefits;
