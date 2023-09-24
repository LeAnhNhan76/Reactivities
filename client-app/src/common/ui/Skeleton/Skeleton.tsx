import LoadingSkeleton, { SkeletonProps } from "react-loading-skeleton";

type Props = SkeletonProps;

const Skeleton = ({ ...props }: Props) => {
  return <LoadingSkeleton {...props} height={8}></LoadingSkeleton>;
};

export default Skeleton;
