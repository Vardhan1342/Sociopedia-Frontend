import { Box } from "@mui/material";

import React from 'react';

const userImg = ({image,size="50px"}) => {
  return (
    <div className="">
      <Box width={size} height={size}>
        <img className="rounded-full"
        // style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={`http://localhost:3001/assests/${image}`}
        />
      </Box>
    </div>
  );
}

export default userImg;
