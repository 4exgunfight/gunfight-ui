import { Icon } from "@iconify/react";
import trendingUpFill from "@iconify/icons-eva/trending-up-fill";
import trendingDownFill from "@iconify/icons-eva/trending-down-fill";
// material
import {
  alpha,
  useTheme,
  experimentalStyled as styled,
} from "@material-ui/core/styles";
import { Box, Card, Typography, Stack } from "@material-ui/core";
// utils
import { fNumber, fPercent } from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const IconWrapperStyle = styled("div")(({ theme }) => ({
  width: 24,
  height: 24,
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

// ----------------------------------------------------------------------

export default function AppTotalTotalUsers({ chartData }) {
  const theme = useTheme();

  const PERCENT = chartData?.totalGrowth ? chartData?.totalGrowth / 100 : 0;
  const TOTAL_USER = chartData?.total;
  const CHART_DATA = [
    {
      data: [
        2532, 6632, 4132, 8932, 6332, 2532, 4432, 1232, 3632, 932, 3354,
      ].reverse(),
    },
  ];

  const chartOptions = {
    colors: [theme.palette.charts.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: "68%", borderRadius: 2 } },
    labels: ["1", "2", "3", "4", "5", "6", "7", "8"],
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`,
        },
      },
      marker: { show: false },
    },
  };

  return (
    <Card sx={{ display: "flex", alignItems: "center", p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5">Total de usuários </Typography>
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={{ mt: 2, mb: 1 }}
        >
          <IconWrapperStyle
            sx={{
              ...(PERCENT < 0 && {
                color: "error.main",
                bgcolor: alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Icon
              width={16}
              height={16}
              icon={PERCENT >= 0 ? trendingUpFill : trendingDownFill}
            />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle2">
            {PERCENT > 0 && "+"}
            {fPercent(PERCENT)}
          </Typography>
        </Stack>

        <Typography variant="h3">{fNumber(TOTAL_USER)}</Typography>
      </Box>
      {typeof window !== "undefined" && (
        <ReactApexChart
          type="bar"
          width={60}
          height={36}
          series={CHART_DATA}
          options={chartOptions}
        />
      )}
    </Card>
  );
}
