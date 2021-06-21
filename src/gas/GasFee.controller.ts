import type { Patch } from 'immer';

import EthQuery from 'eth-query';
import { v1 as random } from 'uuid';
import { BaseController } from '../BaseControllerV2';
import { safelyExecute } from '../util';
import type { RestrictedControllerMessenger } from '../ControllerMessenger';
import type {
  NetworkController,
  NetworkState,
} from '../network/NetworkController';
import {
  fetchGasEstimates as defaultFetchGasEstimates,
  fetchLegacyGasPriceEstimate as defaultFetchLegacyGasPriceEstimate,
} from './gas-util';

/**
 * @type LegacyGasPriceEstimate
 *
 * A single gas price estimate for networks and accounts that don't support EIP-1559
 *
 * @property gasPrice - A GWEI hex number, the result of a call to eth_gasPrice
 */

export interface LegacyGasPriceEstimate {
  gasPrice: string;
}

/**
 * @type Eip1559GasFee
 *
 * Data necessary to provide an estimate of a gas fee with a specific tip
 *
 * @property minWaitTimeEstimate - The fastest the transaction will take, in milliseconds
 * @property maxWaitTimeEstimate - The slowest the transaction will take, in milliseconds
 * @property suggestedMaxPriorityFeePerGas - A suggested "tip", a GWEI hex number
 * @property suggestedMaxFeePerGas - A suggested max fee, the most a user will pay. a GWEI hex number
 */

interface Eip1559GasFee {
  minWaitTimeEstimate: number; // a time duration in milliseconds
  maxWaitTimeEstimate: number; // a time duration in milliseconds
  suggestedMaxPriorityFeePerGas: string; // a GWEI hex number
  suggestedMaxFeePerGas: string; // a GWEI hex number
}

/**
 * @type GasFeeEstimates
 *
 * Data necessary to provide multiple GasFee estimates, and supporting information, to the user
 *
 * @property low - A GasFee for a minimum necessary combination of tip and maxFee
 * @property medium - A GasFee for a recommended combination of tip and maxFee
 * @property high - A GasFee for a high combination of tip and maxFee
 * @property estimatedNextBlockBaseFee - An estimate of what the base fee will be for the pending/next block. A GWEI hex number
 */

export interface GasFeeEstimates {
  low: Eip1559GasFee;
  medium: Eip1559GasFee;
  high: Eip1559GasFee;
  estimatedBaseFee: string;
}

const metadata = {
  gasFeeEstimates: { persist: true, anonymous: false },
};

/**
 * @type GasFeeState
 *
 * Gas Fee controller state
 *
 * @property legacyGasPriceEstimates - Gas fee estimate data using the legacy `gasPrice` property
 * @property gasFeeEstimates - Gas fee estimate data based on new EIP-1559 properties
 */
export type GasFeeState = {
  gasFeeEstimates:
    | GasFeeEstimates
    | LegacyGasPriceEstimate
    | Record<string, never>;
};

const name = 'GasFeeController';

export type GasFeeStateChange = {
  type: `${typeof name}:stateChange`;
  payload: [GasFeeState, Patch[]];
};

export type GetGasFeeState = {
  type: `${typeof name}:getState`;
  handler: () => GasFeeState;
};

const defaultState = {
  gasFeeEstimates: {},
};

/**
 * Controller that retrieves gas fee estimate data and polls for updated data on a set interval
 */
export class GasFeeController extends BaseController<typeof name, GasFeeState> {
  private intervalId?: NodeJS.Timeout;

  private intervalDelay;

  private pollTokens: Set<string>;

  private fetchGasEstimates;

  private fetchLegacyGasPriceEstimate;

  private getCurrentNetworkEIP1559Compatibility;

  private getCurrentAccountEIP1559Compatibility;

  private ethQuery: any;

  /**
   * Creates a GasFeeController instance
   *
   */
  constructor({
    interval = 15000,
    messenger,
    state,
    fetchGasEstimates = defaultFetchGasEstimates,
    fetchLegacyGasPriceEstimate = defaultFetchLegacyGasPriceEstimate,
    getCurrentNetworkEIP1559Compatibility,
    getCurrentAccountEIP1559Compatibility,
    getProvider,
    onNetworkStateChange,
  }: {
    interval?: number;
    messenger: RestrictedControllerMessenger<
      typeof name,
      GetGasFeeState,
      GasFeeStateChange,
      never,
      never
    >;
    state?: Partial<GasFeeState>;
    fetchGasEstimates?: typeof defaultFetchGasEstimates;
    fetchLegacyGasPriceEstimate?: typeof defaultFetchLegacyGasPriceEstimate;
    getCurrentNetworkEIP1559Compatibility: () => Promise<boolean>;
    getCurrentAccountEIP1559Compatibility?: () => boolean;
    getProvider: () => NetworkController['provider'];
    onNetworkStateChange: (listener: (state: NetworkState) => void) => void;
  }) {
    super({
      name,
      metadata,
      messenger,
      state: { ...defaultState, ...state },
    });
    this.intervalDelay = interval;
    this.fetchGasEstimates = fetchGasEstimates;
    this.fetchLegacyGasPriceEstimate = fetchLegacyGasPriceEstimate;
    this.pollTokens = new Set();
    this.getCurrentNetworkEIP1559Compatibility = getCurrentNetworkEIP1559Compatibility;
    this.getCurrentAccountEIP1559Compatibility = getCurrentAccountEIP1559Compatibility;

    const provider = getProvider();
    this.ethQuery = new EthQuery(provider);
    onNetworkStateChange(() => {
      const newProvider = getProvider();
      this.ethQuery = new EthQuery(newProvider);
    });
  }

  async getGasFeeEstimatesAndStartPolling(
    pollToken: string | undefined,
  ): Promise<string> {
    if (this.pollTokens.size === 0) {
      await this._fetchGasFeeEstimateData();
    }

    const _pollToken = pollToken || random();

    this._startPolling(_pollToken);

    return _pollToken;
  }

  /**
   * Gets and sets gasFeeEstimates in state
   *
   * @returns GasFeeEstimates
   */
  async _fetchGasFeeEstimateData(): Promise<GasFeeState | undefined> {
    let newEstimates = this.state;
    let isEIP1559Compatible;
    try {
      isEIP1559Compatible = await this.getEIP1559Compatibility();
    } catch (e) {
      console.error(e);
      isEIP1559Compatible = false;
    }
    try {
      const estimates = isEIP1559Compatible
        ? await this.fetchGasEstimates()
        : await this.fetchLegacyGasPriceEstimate(this.ethQuery);
      newEstimates = {
        gasFeeEstimates: estimates,
      };
    } catch (error) {
      console.error(error);
    } finally {
      try {
        this.update(() => {
          return newEstimates;
        });
      } catch (error) {
        console.error(error);
      }
    }
    return newEstimates;
  }

  /**
   * Remove the poll token, and stop polling if the set of poll tokens is empty
   */
  disconnectPoller(pollToken: string) {
    this.pollTokens.delete(pollToken);
    if (this.pollTokens.size === 0) {
      this.stopPolling();
    }
  }

  stopPolling() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.pollTokens.clear();
    this.resetState();
  }

  /**
   * Prepare to discard this controller.
   *
   * This stops any active polling.
   */
  destroy() {
    super.destroy();
    this.stopPolling();
  }

  // should take a token, so we know that we are only counting once for each open transaction
  private async _startPolling(pollToken: string) {
    if (this.pollTokens.size === 0) {
      this._poll();
    }
    this.pollTokens.add(pollToken);
  }

  private async _poll() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(async () => {
      await safelyExecute(() => this._fetchGasFeeEstimateData());
    }, this.intervalDelay);
  }

  private resetState() {
    this.state = defaultState;
  }

  private async getEIP1559Compatibility() {
    const currentNetworkIsEIP1559Compatible = await this.getCurrentNetworkEIP1559Compatibility();
    const currentAccountIsEIP1559Compatible =
      this.getCurrentAccountEIP1559Compatibility?.() ?? true;

    return (
      currentNetworkIsEIP1559Compatible && currentAccountIsEIP1559Compatible
    );
  }
}

export default GasFeeController;
