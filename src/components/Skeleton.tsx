import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const CustomSkeleton: React.FC = () => {
    return (
        <Box display="flex" alignItems="center" p={2}>
            <Skeleton variant="circular" width={48} height={48} />
            <Box ml={2} width="100%">
                <Skeleton variant="text" width="60%" height={20} />
                <Skeleton variant="text" width="40%" height={20} />
            </Box>
        </Box>
    );
}

export default CustomSkeleton;
