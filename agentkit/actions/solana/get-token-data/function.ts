import { SolanaAgentKit } from "solana-agent-kit";
import { GetTokenDataArgumentsType, GetTokenDataResultBodyType } from "./types";
import { SolanaActionResult } from "../../solana-action";
import { SolanaToken } from "@/types/solana-token";
import { getPrice } from "../utils/get-price";

/**
 * Gets the token data for a given ticker.
 *
 * @param solanaKit - The Solana agent kit instance
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenData(
  solanaKit: SolanaAgentKit,
  args: GetTokenDataArgumentsType
): Promise<SolanaActionResult<GetTokenDataResultBodyType>> {
  try {
    const response = await fetch('https://tokens.jup.ag/tokens?tags=birdeye-trending');
    if (!response.ok) {
      throw new Error('Failed to fetch trending tokens');
    }

    const token = await solanaKit.getTokenDataByTicker(args.ticker);

    if (!token) {
      throw new Error('Failed to fetch token data');
    }

    return {
      message: `Found token data for ${args.ticker}`,
      body: {
        token
      }
    };
  } catch (error) {
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}
