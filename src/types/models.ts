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

    export interface Coin {
        id: string;  // Coin ID
        symbol: string;  // Coin Symbol
        name: string;  // Coin Name
        web_slug: string;  // Coin Web Slug
        asset_platform_id: string;  // Asset platform ID
        platforms: Record<string, string>;  // Asset platform and contract addresses
        detail_platforms: Record<string, any>;  // Detailed platform information
        block_time_in_minutes: number;  // Blockchain block time in minutes
        hashing_algorithm: string;  // Blockchain hashing algorithm
        categories: string[];  // Coin categories
        preview_listing: boolean;  // Preview listing status
        public_notice: string;  // Public notice
        additional_notices: string[];  // Additional notices
        localization: Record<string, string>;  // Localization data (coin name in different languages)
        description: Record<string, any>;  // Coin description
        links: {
            homepage: string[];  // Homepage URL
            whitepaper: string[];  // Whitepaper URL
            blockchain_site: string[];  // Blockchain explorer URL
            official_forum_url: string[];  // Official forum URL
            chat_url: string[];  // Chat URL
            announcement_url: string[];  // Announcement URL
            snapshot_url: string;  // Snapshot URL
            twitter_screen_name: string;  // Twitter handle
            facebook_username: string;  // Facebook username
            bitcointalk_thread_identifier: string;  // BitcoinTalk thread ID
            telegram_channel_identifier: string;  // Telegram channel ID
            subreddit_url: string;  // Subreddit URL
            repos_url: Record<string, string>;  // Repository URL
        };
        image: {
            thumb: string;  // Small image URL
            large: string;  // Large image URL
        };
        country_origin: string;  // Country of origin
        genesis_date: string;  // Genesis date (timestamp)
        sentiment_votes_up_percentage: number;  // Sentiment votes up percentage
        sentiment_votes_down_percentage: number;  // Sentiment votes down percentage
        market_cap_rank: number;  // Coin's market cap rank
        market_data: {
            current_price: Record<string, number>;  // Current price in currency (e.g., USD, EUR)
            total_value_locked: number;  // Total value locked
            mcap_to_tvl_ratio: number;  // Market cap to total value locked ratio
            fdv_to_tvl_ratio: number;  // Fully diluted valuation to total value locked ratio
            roi: number;  // Return on investment (ROI)
            ath: Record<string, number>;  // All time high (ATH)
            ath_change_percentage: Record<string, number>;  // ATH change in percentage
            ath_date: Record<string, string>;  // ATH date
            atl: Record<string, number>;  // All time low (ATL)
            atl_change_percentage: Record<string, number>;  // ATL change in percentage
            atl_date: Record<string, string>;  // ATL date
            market_cap: Record<string, number>;  // Market cap in currency
            fully_diluted_valuation: Record<string, number>;  // Fully diluted valuation (FDV) in currency
            market_cap_fdv_ratio: number;  // Market cap to fully diluted valuation ratio
            total_volume: Record<string, number>;  // Total trading volume
            high_24h: Record<string, number>;  // 24h price high
            low_24h: Record<string, number>;  // 24h price low
            price_change_24h: number;  // 24h price change in currency
            price_change_percentage_24h: number;  // 24h price change percentage
            price_change_percentage_7d: number;  // 7d price change percentage
            price_change_percentage_14d: number;  // 14d price change percentage
            price_change_percentage_30d: number;  // 30d price change percentage
            price_change_percentage_60d: number;  // 60d price change percentage
            price_change_percentage_200d: number;  // 200d price change percentage
            price_change_percentage_1y: number;  // 1 year price change percentage
            market_cap_change_24h: number;  // 24h market cap change in currency
            market_cap_change_percentage_24h: number;  // 24h market cap change percentage
            price_change_percentage_1h_in_currency: Record<string, number>;  // 1h price change in currency
            price_change_percentage_24h_in_currency: Record<string, number>;  // 24h price change in currency
            price_change_percentage_7d_in_currency: Record<string, number>;  // 7d price change in currency
            price_change_percentage_14d_in_currency: Record<string, number>;  // 14d price change in currency
            price_change_percentage_30d_in_currency: Record<string, number>;  // 30d price change in currency
            price_change_percentage_60d_in_currency: Record<string, number>;  // 60d price change in currency
            price_change_percentage_200d_in_currency: Record<string, number>;  // 200d price change in currency
            price_change_percentage_1y_in_currency: Record<string, number>;  // 1y price change in currency
            market_cap_change_24h_in_currency: Record<string, number>;  // 24h market cap change in currency
            market_cap_change_percentage_24h_in_currency: Record<string, number>;  // 24h market cap change percentage
            total_supply: number | null;  // Total supply
            max_supply: number | null;  // Max supply
            circulating_supply: number | null;  // Circulating supply
            last_updated: string;  // Last updated timestamp
        };
        community_data: {
            facebook_likes: number;  // Facebook likes
            twitter_followers: number;  // Twitter followers
            reddit_average_posts_48h: number;  // Reddit average posts in 48 hours
            reddit_average_comments_48h: number;  // Reddit average comments in 48 hours
            reddit_subscribers: number;  // Reddit subscribers
            reddit_accounts_active_48h: number;  // Reddit active accounts in 48 hours
            telegram_channel_user_count: number;  // Telegram channel user count
        };
        developer_data: {
            forks: number;  // Repository forks
            stars: number;  // Repository stars
            subscribers: number;  // Repository subscribers
            total_issues: number;  // Total issues in repository
            closed_issues: number;  // Closed issues in repository
            pull_requests_merged: number;  // Merged pull requests
            pull_request_contributors: number;  // Pull request contributors
            code_additions_deletions_4_weeks: Record<string, number>;  // Code additions and deletions in 4 weeks
            commit_count_4_weeks: number;  // Commit count in the last 4 weeks
            last_4_weeks_commit_activity_series: number[];  // Commit activity in the last 4 weeks
        };
        status_updates: Record<string, any>[];  // Status updates
        tickers: Array<{
            base: string;  // Coin base currency
            target: string;  // Coin target currency
            market: Record<string, any>;  // Market data
            last: number;  // Last price
            volume: number;  // Volume
            converted_last: Record<string, number>;  // Converted last price
            converted_volume: Record<string, number>;  // Converted volume
            trust_score: string;  // Trust score
            bid_ask_spread_percentage: number;  // Bid-ask spread percentage
            timestamp: string;  // Timestamp of the ticker data
            last_traded_at: string;  // Last traded timestamp
            last_fetch_at: string;  // Last fetch timestamp
            is_anomaly: boolean;  // Is anomaly
            is_stale: boolean;  // Is stale
            trade_url: string;  // Trade URL
            token_info_url: string;  // Token info URL
            coin_id: string;  // Coin ID
            target_coin_id: string;  // Target coin ID
        }>;
    }

    export interface CoinHistoricalChart {
        prices: [number, number][];
        market_caps: [number, number][];
        total_volumes: [number, number][];
    }
}
