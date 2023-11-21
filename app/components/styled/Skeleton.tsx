import { Skeleton, SkeletonProps, styled } from "@mui/material";

export const FullWidthSkeleton = styled(Skeleton)<SkeletonProps>(({}) => ({
  width: "100%",
  height: "64px",
}));
