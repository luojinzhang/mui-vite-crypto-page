import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import PinnedCoinCard from './PinnedCoinCard';
import { Stack, Typography } from '@mui/material';

export default function PinnedCoinCardList() {
    const pinnedCoinList = useSelector((state: RootState) => state.coinsClientSlice.pinnedCoinList);

    const pinnedCoin = React.useMemo(() => {
        return pinnedCoinList.map((pinnedCoin) => {
            return <PinnedCoinCard key={pinnedCoin.id} coin={pinnedCoin} />
        })
    }, [pinnedCoinList])

    return (
        <div style={{ padding: '10px' }}>
            <Typography>
                Pinned List
            </Typography>

            <Stack gap={"10px"} sx={{
                flexDirection: { xs: "column", md: "row" }
            }}>
                {pinnedCoin}
            </Stack>
        </div>
    )
}
