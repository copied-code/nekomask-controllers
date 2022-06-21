"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkController = exports.NetworksChainId = void 0;
const eth_query_1 = __importDefault(require("eth-query"));
const provider_1 = __importDefault(require("web3-provider-engine/subproviders/provider"));
const createProvider_1 = __importDefault(require("eth-json-rpc-infura/src/createProvider"));
const zero_1 = __importDefault(require("web3-provider-engine/zero"));
const async_mutex_1 = require("async-mutex");
const BaseController_1 = require("../BaseController");
const constants_1 = require("../constants");
var NetworksChainId;
(function (NetworksChainId) {
    NetworksChainId["mainnet"] = "1";
    NetworksChainId["kovan"] = "42";
    NetworksChainId["rinkeby"] = "4";
    NetworksChainId["goerli"] = "5";
    NetworksChainId["ropsten"] = "3";
    NetworksChainId["localhost"] = "";
    NetworksChainId["rpc"] = "";
    NetworksChainId["optimism"] = "10";
    NetworksChainId["optimismTest"] = "69";
})(NetworksChainId = exports.NetworksChainId || (exports.NetworksChainId = {}));
const LOCALHOST_RPC_URL = 'http://localhost:8545';
/**
 * Controller that creates and manages an Ethereum network provider
 */
class NetworkController extends BaseController_1.BaseController {
    /**
     * Creates a NetworkController instance.
     *
     * @param config - Initial options used to configure this controller.
     * @param state - Initial state to set on this controller.
     */
    constructor(config, state) {
        super(config, state);
        this.internalProviderConfig = {};
        this.mutex = new async_mutex_1.Mutex();
        /**
         * Name of this controller used during composition
         */
        this.name = 'NetworkController';
        this.defaultState = {
            network: 'loading',
            isCustomNetwork: false,
            provider: { type: constants_1.MAINNET, chainId: NetworksChainId.mainnet },
            properties: { isEIP1559Compatible: false },
        };
        this.initialize();
        this.getEIP1559Compatibility();
    }
    initializeProvider(type, rpcTarget, chainId, ticker, nickname) {
        this.update({ isCustomNetwork: this.getIsCustomNetwork(chainId) });
        switch (type) {
            case 'kovan':
            case constants_1.MAINNET:
            case 'rinkeby':
            case 'goerli':
            case 'optimism':
            case 'optimismTest':
            case 'ropsten':
                this.setupInfuraProvider(type);
                break;
            case 'localhost':
                this.setupStandardProvider(LOCALHOST_RPC_URL);
                break;
            case constants_1.RPC:
                rpcTarget &&
                    this.setupStandardProvider(rpcTarget, chainId, ticker, nickname);
                break;
            default:
                throw new Error(`Unrecognized network type: '${type}'`);
        }
    }
    refreshNetwork() {
        this.update({ network: 'loading', properties: {} });
        const { rpcTarget, type, chainId, ticker } = this.state.provider;
        this.initializeProvider(type, rpcTarget, chainId, ticker);
        this.lookupNetwork();
    }
    registerProvider() {
        this.provider.on('error', this.verifyNetwork.bind(this));
        this.ethQuery = new eth_query_1.default(this.provider);
    }
    setupInfuraProvider(type) {
        const infuraProvider = (0, createProvider_1.default)({
            network: type,
            projectId: this.config.infuraProjectId,
        });
        const infuraSubprovider = new provider_1.default(infuraProvider);
        const config = Object.assign(Object.assign({}, this.internalProviderConfig), {
            dataSubprovider: infuraSubprovider,
            engineParams: {
                blockTrackerProvider: infuraProvider,
                pollingInterval: 12000,
            },
        });
        this.updateProvider((0, zero_1.default)(config));
    }
    getIsCustomNetwork(chainId) {
        return (chainId !== NetworksChainId.mainnet &&
            chainId !== NetworksChainId.kovan &&
            chainId !== NetworksChainId.rinkeby &&
            chainId !== NetworksChainId.goerli &&
            chainId !== NetworksChainId.ropsten &&
            chainId !== NetworksChainId.localhost);
    }
    setupStandardProvider(rpcTarget, chainId, ticker, nickname) {
        const config = Object.assign(Object.assign({}, this.internalProviderConfig), {
            chainId,
            engineParams: { pollingInterval: 12000 },
            nickname,
            rpcUrl: rpcTarget,
            ticker,
        });
        this.updateProvider((0, zero_1.default)(config));
    }
    updateProvider(provider) {
        this.safelyStopProvider(this.provider);
        this.provider = provider;
        this.registerProvider();
    }
    safelyStopProvider(provider) {
        setTimeout(() => {
            provider === null || provider === void 0 ? void 0 : provider.stop();
        }, 500);
    }
    verifyNetwork() {
        this.state.network === 'loading' && this.lookupNetwork();
    }
    /**
     * Sets a new configuration for web3-provider-engine.
     *
     * TODO: Replace this wth a method.
     *
     * @param providerConfig - The web3-provider-engine configuration.
     */
    set providerConfig(providerConfig) {
        this.internalProviderConfig = providerConfig;
        const { type, rpcTarget, chainId, ticker, nickname } = this.state.provider;
        this.initializeProvider(type, rpcTarget, chainId, ticker, nickname);
        this.registerProvider();
        this.lookupNetwork();
    }
    get providerConfig() {
        throw new Error('Property only used for setting');
    }
    /**
     * Refreshes the current network code.
     */
    lookupNetwork() {
        return __awaiter(this, void 0, void 0, function* () {
            /* istanbul ignore if */
            if (!this.ethQuery || !this.ethQuery.sendAsync) {
                return;
            }
            const releaseLock = yield this.mutex.acquire();
            this.ethQuery.sendAsync({ method: 'net_version' }, (error, network) => {
                this.update({
                    network: error ? /* istanbul ignore next*/ 'loading' : network,
                });
                releaseLock();
            });
        });
    }
    /**
     * Convenience method to update provider network type settings.
     *
     * @param type - Human readable network name.
     */
    setProviderType(type) {
        const _a = this.state.provider, { rpcTarget, chainId, nickname } = _a, providerState = __rest(_a, ["rpcTarget", "chainId", "nickname"]);
        // If testnet the ticker symbol should use a testnet prefix
        const testNetTicker = constants_1.TESTNET_TICKER_SYMBOLS[type.toUpperCase()];
        this.update({
            provider: Object.assign(Object.assign({}, providerState), {
                type,
                ticker: testNetTicker || 'ETH',
                chainId: NetworksChainId[type],
            }),
        });
        this.refreshNetwork();
    }
    /**
     * Convenience method to update provider RPC settings.
     *
     * @param rpcTarget - The RPC endpoint URL.
     * @param chainId - The chain ID as per EIP-155.
     * @param ticker - The currency ticker.
     * @param nickname - Personalized network name.
     */
    setRpcTarget(rpcTarget, chainId, ticker, nickname) {
        this.update({
            provider: Object.assign(Object.assign({}, this.state.provider), { type: constants_1.RPC, ticker, rpcTarget, chainId, nickname }),
        });
        this.refreshNetwork();
    }
    getEIP1559Compatibility() {
        var _a;
        const { properties = {} } = this.state;
        if (!properties.isEIP1559Compatible) {
            if (typeof ((_a = this.ethQuery) === null || _a === void 0 ? void 0 : _a.sendAsync) !== 'function') {
                return Promise.resolve(true);
            }
            return new Promise((resolve, reject) => {
                this.ethQuery.sendAsync({ method: 'eth_getBlockByNumber', params: ['latest', false] }, (error, block) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const isEIP1559Compatible = typeof block.baseFeePerGas !== 'undefined';
                        if (properties.isEIP1559Compatible !== isEIP1559Compatible) {
                            this.update({
                                properties: {
                                    isEIP1559Compatible,
                                },
                            });
                        }
                        resolve(isEIP1559Compatible);
                    }
                });
            });
        }
        return Promise.resolve(true);
    }
}
exports.NetworkController = NetworkController;
exports.default = NetworkController;
//# sourceMappingURL=NetworkController.js.map