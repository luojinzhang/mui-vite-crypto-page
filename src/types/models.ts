namespace CryptoModel {
    export type CryptoCoinIDMap = {
        /**
         * Coin Id
         */
        id: string;

        /**
         * Coin Symbol
         */
        symbol: string;

        /**
        * Coin name
        */
        name: string;

        /**
         * Coin asset platform and contract address
         */
        platforms: Record<string, string>;
    }

    export type CryptoCoinMarket = {
        id: string;
        symbol: string;
        name: string;
        image: string;
        current_price: number | null;
        market_cap: number | null;
        market_cap_rank: number | null;
        fully_diluted_valuation: number | null;
        total_volume: number | null;
        high_24h: number | null;
        low_24h: number | null;
        price_change_24h: number | null;
        price_change_percentage_24h: number | null;
        market_cap_change_24h: number | null;
        market_cap_change_percentage_24h: number | null;
        circulating_supply: number | null;
        total_supply: number;
        max_supply: number;
        ath: number | null;
        ath_change_percentage: number;
        ath_date: string | null;
        atl: number | null;
        atl_change_percentage: number;
        atl_date: string | null;
        roi: number | null;
        last_updated: string | null;
        sparkline_in_7d: {
            price: number[]
        };
        price_change_percentage_1h_in_currency: number | null;
        price_change_percentage_24h_in_currency: number | null;
        price_change_percentage_7d_in_currency: number | null;
    }

    export type CryptoCoinClientReducerState = {
        coinsIdMap: CryptoCoinIDMap[];
        coinsListMarket: CryptoCoinMarket[];
    }

    export type PaginationContext = {
        /** 1-based index */
        currentPage: number;
        totalPages: number;
        rowsPerPage: number;
        setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
        setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
        setTotalPages: React.Dispatch<React.SetStateAction<number>>;
    }
}
