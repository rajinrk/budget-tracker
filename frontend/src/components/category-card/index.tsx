import { Box, Card, CardContent, Chip, LinearProgress, Typography } from "@mui/material";

export const CategoryCard:React.FC<{item:any}> = ({item})=>{

    const percent = (item.spent / item.limit) * 100;
            const overBudget = item.spent > item.limit;
            const remaining = Math.max(item.limit - item.spent, 0);
    return <Card key={item.id} className="h-full">
    <CardContent className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Typography variant="h6">{item.name}</Typography>
        <span
          className="h-3 w-3 rounded-full inline-block"
          style={{ backgroundColor: item.color }}
        />
      </div>

      <Box>
        <LinearProgress
          variant="determinate"
          value={percent > 100 ? 100 : percent}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: '#eee',
            '& .MuiLinearProgress-bar': {
              backgroundColor: overBudget ? '#f44336' : '#1976d2',
            },
          }}
        />
        <Typography variant="body2" className="mt-1 text-gray-400">
          ₹{item.spent} / ₹{item.limit}
        </Typography>
      </Box>

      <Typography variant="body2">
        Remaining: ₹{remaining}
      </Typography>

      {overBudget && (
        <Chip label="OVER BUDGET" color="error" size="small" />
      )}
    </CardContent>
  </Card>
}