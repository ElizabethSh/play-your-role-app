import React from "react";

import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const CharactersSkeleton: React.FC = () => {
  return (
    <Box sx={{ width: "100%", mt: 4 }}>
      {[...Array(3)].map((_, i) => (
        <Box key={i} sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Skeleton variant="circular" width={48} height={48} sx={{ mr: 2 }} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="80%" height={28} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
          <Skeleton
            variant="rectangular"
            width={36}
            height={36}
            sx={{ ml: 2, borderRadius: 1 }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default CharactersSkeleton;
