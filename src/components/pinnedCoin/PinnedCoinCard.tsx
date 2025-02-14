import { Avatar, Box, Card, CardActionArea, CardContent, CardHeader, IconButton, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { coinsClientSliceActions } from '../../redux/coins/coinsClientSlice';
import { useDispatch } from 'react-redux';

interface PinnedCoinCardProps {
    coin: CryptoModel.CryptoCoinMarket;
}

export default function PinnedCoinCard({ coin }: PinnedCoinCardProps) {
    const { id, name } = coin;
    const { removePinnedCoin } = coinsClientSliceActions
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const image = React.useMemo(() => {
        return coin.image;
    }, [])

    const handleCardClicked = () => {
        navigate(`/coins/${id}`); // Navigate to the coin's detail page
    }

    const handleClickCancel: React.MouseEventHandler<HTMLButtonElement> = (evt) => {
        evt.stopPropagation();
        dispatch(removePinnedCoin(coin))
    }

    return (
        <Card sx={{
            width: '200px', '&:hover': {
                backgroundColor: '#ccc',
            },
            cursor: 'pointer'
        }
        } onClick={handleCardClicked}>
            <CardHeader action={
                <IconButton sx={{ width: '50px', height: '50px' }} onClick={handleClickCancel}>
                    <CancelIcon />
                </IconButton>
            } />

            <CardContent sx={{ height: '100%' }}>
                <Avatar src={image} alt={name} sx={{ mr: "0.5rem" }} />

                <Typography variant="h5" component="div">
                    {name}
                </Typography>
            </CardContent>
        </Card>
    )
}
