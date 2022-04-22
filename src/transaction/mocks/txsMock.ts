import { TransactionMeta, TransactionStatus } from '../TransactionController';

export const ethTxsMock = (ethTxHash: string) => [
  {
    blockNumber: '4535101',
    confirmations: '10',
    contractAddress: '',
    cumulativeGasUsed: '120607',
    from: '0xe46abaf75cfbff815c0b7ffed6f02b0760ea27f1',
    gas: '335208',
    gasPrice: '10000000000',
    gasUsed: '21000',
    hash: ethTxHash,
    input: '0x',
    isError: '0',
    nonce: '9',
    timeStamp: '1543596286',
    to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    transactionIndex: '2',
    txreceipt_status: '1',
    value: '100000000000000000',
  },
  {
    blockNumber: '4535108',
    confirmations: '3',
    contractAddress: '',
    cumulativeGasUsed: '693910',
    from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    gas: '335208',
    gasPrice: '20000000000',
    gasUsed: '21000',
    hash: '0x342e9d73e10004af41d04973339fc7219dbadcbb5629730cfe65e9f9cb15ff92',
    input: '0x',
    isError: '0',
    nonce: '0',
    timeStamp: '1543596378',
    to: '0xb2d191b6fe03c5b8a1ab249cfe88c37553357a23',
    transactionIndex: '12',
    txreceipt_status: '1',
    value: '50000000000000000',
  },
  {
    blockNumber: '4535105',
    confirmations: '4',
    contractAddress: '',
    cumulativeGasUsed: '693910',
    from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    gas: '335208',
    gasPrice: '20000000000',
    gasUsed: '21000',
    hash: '0x342e9d73e10004af41d04973339fc7219dbadcbb5629730cfe65e9f9cb15ff91',
    input: '0x',
    isError: '0',
    nonce: '1',
    timeStamp: '1543596356',
    transactionIndex: '13',
    txreceipt_status: '1',
    value: '50000000000000000',
  },
  {
    blockNumber: '4535106',
    confirmations: '4',
    contractAddress: '',
    cumulativeGasUsed: '693910',
    from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    gas: '335208',
    gasPrice: '20000000000',
    gasUsed: '21000',
    hash: '0x342e9d73e10004af41d04973139fc7219dbadcbb5629730cfe65e9f9cb15ff91',
    input: '0x11',
    isError: '0',
    nonce: '3',
    timeStamp: '1543596356',
    to: '0xb2d191b6fe03c5b8a1ab249cfe88c37553357a23',
    transactionIndex: '13',
    txreceipt_status: '1',
    value: '50000000000000000',
  },
];

export const tokenTxsMock = (tokenTxHash: string) => [
  {
    blockNumber: '8222239',
    timeStamp: '1564091067',
    hash: tokenTxHash,
    nonce: '2329',
    blockHash:
      '0x3c30a9be9aea7be13caad419444140c11839d72e70479ec7e9c6d8bd08c533bc',
    from: '0xdfa6edae2ec0cf1d4a60542422724a48195a5071',
    contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    value: '0',
    tokenName: 'Sai Stablecoin v1.0',
    tokenSymbol: 'SAI',
    tokenDecimal: '18',
    transactionIndex: '69',
    gas: '624874',
    gasPrice: '20000000000',
    gasUsed: '21000',
    cumulativeGasUsed: '3203881',
    input: 'deprecated',
    confirmations: '3659676',
  },
  {
    blockNumber: '8222250',
    timeStamp: '1564091247',
    hash: '0xdcd1c8bee545d3f76d80b20a23ad44276ba2e376681228eb4570cf3518491279',
    nonce: '2330',
    blockHash:
      '0x16986dd66bedb20a5b846ec2b6c0ecaa62f1c4b51fac58c1326101fd9126dd82',
    from: '0xdfa6edae2ec0cf1d4a60542422724a48195a5071',
    contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    value: '0',
    tokenName: 'Sai Stablecoin v1.0',
    tokenSymbol: 'SAI',
    tokenDecimal: '18',
    transactionIndex: '40',
    gas: '594268',
    gasPrice: '20000000000',
    gasUsed: '579268',
    cumulativeGasUsed: '2009011',
    input: 'deprecated',
    confirmations: '3659665',
  },
  {
    blockNumber: '8223771',
    timeStamp: '1564111652',
    hash: '0x070369e6f560b0deca52e050ff1a961fa7b688bbec5cea08435921c9d9b0f52e',
    nonce: '2333',
    blockHash:
      '0x0aff8b36881be99df6d176d7c64c2171672c0483684a10c112d2c90fefe30a0a',
    from: '0xdfa6edae2ec0cf1d4a60542422724a48195a5071',
    contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    value: '0',
    tokenName: 'Sai Stablecoin v1.0',
    tokenSymbol: 'SAI',
    tokenDecimal: '18',
    transactionIndex: '132',
    gas: '583810',
    gasPrice: '6000000000',
    gasUsed: '568810',
    cumulativeGasUsed: '6956245',
    input: 'deprecated',
    confirmations: '3658144',
  },
  {
    blockNumber: '8224850',
    timeStamp: '1564126442',
    hash: '0x8ef20ec9597c8c2e945bcc76d2668e5d3bb088b081fe8c5b5af2e1cbd315a20f',
    nonce: '31',
    blockHash:
      '0xb80d4d861ecb7a3cb14e591c0aaeb226842d0267772affa2acc1a590c7535647',
    from: '0x6c70e3563cef0c6835703bb2664c9f59a92353e4',
    contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    value: '10000000000000000000',
    tokenName: 'Sai Stablecoin v1.0',
    tokenSymbol: 'SAI',
    tokenDecimal: '18',
    transactionIndex: '169',
    gas: '78447',
    gasPrice: '2000000000',
    gasUsed: '52298',
    cumulativeGasUsed: '7047823',
    input: 'deprecated',
    confirmations: '3657065',
  },
  {
    blockNumber: '8228053',
    timeStamp: '1564168901',
    hash: '0xa0f2d7b558bb3cc28fa568f6feb8ed30eb28a01a674d7c0d4ae603fc691e6020',
    nonce: '2368',
    blockHash:
      '0x62c515ea049842c968ca67499f47a32a11394364d319d9c9cc0a0211652a7294',
    from: '0xdfa6edae2ec0cf1d4a60542422724a48195a5071',
    contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    value: '0',
    tokenName: 'Sai Stablecoin v1.0',
    tokenSymbol: 'SAI',
    tokenDecimal: '18',
    transactionIndex: '43',
    gas: '567156',
    gasPrice: '3000000000',
    gasUsed: '552156',
    cumulativeGasUsed: '3048261',
    input: 'deprecated',
    confirmations: '3653862',
  },
  {
    blockNumber: '8315335',
    timeStamp: '1565339223',
    hash: '0x464df60fe00b6dd04c9e8ab341d02af9b10a619d2fcd60fd2971f10edf12118f',
    nonce: '206760',
    blockHash:
      '0x98275388ef6708debe35ac7bf2e30143c9b1fd9e0e457ca03598fc1f4209e273',
    from: '0x00cfbbaf7ddb3a1476767101c12a0162e241fbad',
    contractAddress: '0x4dc3643dbc642b72c158e7f3d2ff232df61cb6ce',
    to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    value: '100000000000000000',
    tokenName: 'Amber',
    tokenSymbol: 'AMB',
    tokenDecimal: '18',
    transactionIndex: '186',
    gas: '60000',
    gasPrice: '2000000000',
    gasUsed: '52108',
    cumulativeGasUsed: '7490707',
    input: 'deprecated',
    confirmations: '3566580',
  },
  {
    blockNumber: '8350846',
    timeStamp: '1565815049',
    hash: '0xc0682327ad3efd56dfa33e8206b4e09efad4e419a6191076069d217e3ee2341f',
    nonce: '2506',
    blockHash:
      '0xd0aa3c0e319fdfeb21b0192cf77b9760b8668060a5977a5f10f8413531083afa',
    from: '0xdfa6edae2ec0cf1d4a60542422724a48195a5071',
    contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    value: '4',
    tokenName: 'Sai Stablecoin v1.0',
    tokenSymbol: 'SAI',
    tokenDecimal: '18',
    transactionIndex: '48',
    gas: '578737',
    gasPrice: '3000000000',
    gasUsed: '518737',
    cumulativeGasUsed: '2848015',
    input: 'deprecated',
    confirmations: '3531069',
  },
  {
    blockNumber: '8350859',
    timeStamp: '1565815221',
    hash: '0x989ea9f3ee576fa43957f44363e839adf1a4a397c3d8392a4f7cbbf7949fd0ae',
    nonce: '2',
    blockHash:
      '0xb9cf1d29c665c052e3831b5754903e539c5b0b1d33b8bcab6cd2d450764d601f',
    from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    to: '0x09cabec1ead1c0ba254b09efb3ee13841712be14',
    value: '10000000000000000000',
    tokenName: 'Sai Stablecoin v1.0',
    tokenSymbol: 'SAI',
    tokenDecimal: '18',
    transactionIndex: '31',
    gas: '60734',
    gasPrice: '1000000000',
    gasUsed: '54745',
    cumulativeGasUsed: '7833857',
    input: 'deprecated',
    confirmations: '3531056',
  },
  {
    blockNumber: '8679548',
    timeStamp: '1570244087',
    hash: '0xc0016b89b3b525b30d73f242653b0d80ec3ebf285376dff5bb52cef3261498b2',
    nonce: '3',
    blockHash:
      '0x1ceb2f8b83087f010773e2acf63d1526633c8a884bd1980f118a1bba576be69f',
    from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    to: '0xdfa6edae2ec0cf1d4a60542422724a48195a5071',
    value: '0',
    tokenName: 'Sai Stablecoin v1.0',
    tokenSymbol: 'SAI',
    tokenDecimal: '18',
    transactionIndex: '56',
    gas: '993379',
    gasPrice: '1440000000',
    gasUsed: '647253',
    cumulativeGasUsed: '3562204',
    input: 'deprecated',
    confirmations: '3202367',
  },
  {
    blockNumber: '8679548',
    timeStamp: '1570244087',
    hash: '0xc0016b89b3b525b30d73f242653b0d80ec3ebf285376dff5bb52cef3261498b2',
    nonce: '3',
    blockHash:
      '0x1ceb2f8b83087f010773e2acf63d1526633c8a884bd1980f118a1bba576be69f',
    from: '0xdfa6edae2ec0cf1d4a60542422724a48195a5071',
    contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    value: '0',
    tokenName: 'Sai Stablecoin v1.0',
    tokenSymbol: 'SAI',
    tokenDecimal: '18',
    transactionIndex: '56',
    gas: '993379',
    gasPrice: '1440000000',
    gasUsed: '647253',
    cumulativeGasUsed: '3562204',
    input: 'deprecated',
    confirmations: '3202367',
  },
  {
    blockNumber: '8694142',
    timeStamp: '1570440625',
    hash: '0xd8397138bb93d56e50d01e92a9eae99ebd3ae28844acdaa4663976a5501116cf',
    nonce: '2837',
    blockHash:
      '0xba45dd64e71e146066af9b6d2dd3bc5d72f4a3399148c155dced74c139fc3c51',
    from: '0xdfa6edae2ec0cf1d4a60542422724a48195a5071',
    contractAddress: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    value: '0',
    tokenName: 'Sai Stablecoin v1.0',
    tokenSymbol: 'SAI',
    tokenDecimal: '18',
    transactionIndex: '217',
    gas: '600632',
    gasPrice: '9000000000',
    gasUsed: '570632',
    cumulativeGasUsed: '9023725',
    input: 'deprecated',
    confirmations: '3187773',
  },
  {
    blockNumber: '10877041',
    timeStamp: '1600310867',
    hash: '0xc8bd16b6b41b4c24849eb6869702e1489c808cb5b125b01f084e38fefcb5ea77',
    nonce: '4',
    blockHash:
      '0x7fa16a022bcf1f69c2d7adf6bd7d3f058e808eec5c66aaa910dfa8016a5333d1',
    from: '0x090d4613473dee047c3f2706764f49e0821d256e',
    contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    value: '400000000000000000000',
    tokenName: 'Uniswap',
    tokenSymbol: 'UNI',
    tokenDecimal: '18',
    transactionIndex: '42',
    gas: '90038',
    gasPrice: '550000000000',
    gasUsed: '81853',
    cumulativeGasUsed: '3163540',
    input: 'deprecated',
    confirmations: '1004874',
  },
  {
    blockNumber: '10877897',
    timeStamp: '1600321973',
    hash: '0xa7162489faef826ee77862ed5210b01726524f09428f69842118dad394842d62',
    nonce: '6',
    blockHash:
      '0xa74eb9d16f65f307dde4ce58c813c981b28f242edf1090ee2ac42caac9dccaca',
    from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
    contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    to: '0x5e736f1f25992b2cad20ded179a52823d3d24b26',
    value: '400000000000000000000',
    tokenName: 'Uniswap',
    tokenSymbol: 'UNI',
    tokenDecimal: '18',
    transactionIndex: '86',
    gas: '60759',
    gasPrice: '640000000000',
    gasUsed: '25506',
    cumulativeGasUsed: '4408393',
    input: 'deprecated',
    confirmations: '1004018',
  },
];

export const txsInStateMock = (
  ethTxHash: string,
  tokenTxHash: string,
): TransactionMeta[] => [
  {
    id: 'token-transaction-id',
    chainId: '1',
    status: TransactionStatus.confirmed,
    time: 1615497996125,
    transaction: {
      from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      data: '0x',
      gas: '624874',
      gasPrice: '20000000000',
      gasUsed: '21000',
      nonce: '0x12',
      to: '0x881d40237659c251811cec9c364ef91dc08d300c',
      value: '0x0',
    },
    transactionHash: tokenTxHash,
    toSmartContract: true,
  },
  {
    id: 'eth-transaction-id',
    chainId: '1',
    status: TransactionStatus.confirmed,
    time: 1615497996125,
    transaction: {
      from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      data: '0x',
      gas: '0x51d68',
      gasPrice: '0x2540be400',
      gasUsed: '0x5208',
      nonce: '0x12',
      to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      value: '100000000000000000',
    },
    transactionHash: ethTxHash,
    toSmartContract: false,
  },
];

export const txsInStateWithOutdatedStatusMock = (
  ethTxHash: string,
  tokenTxHash: string,
): TransactionMeta[] => [
  {
    id: 'token-transaction-id',
    chainId: '1',
    status: TransactionStatus.rejected,
    time: 1615497996125,
    transaction: {
      from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      data: '0x',
      gas: '624874',
      gasPrice: '20000000000',
      gasUsed: '21000',
      nonce: '0x12',
      to: '0x881d40237659c251811cec9c364ef91dc08d300c',
      value: '0x0',
    },
    transactionHash: tokenTxHash,
    toSmartContract: true,
  },
  {
    id: 'eth-transaction-id',
    chainId: '1',
    status: TransactionStatus.rejected,
    time: 1615497996125,
    transaction: {
      from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      data: '0x',
      gas: '0x51d68',
      gasPrice: '0x2540be400',
      gasUsed: '0x5208',
      nonce: '0x12',
      to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      value: '100000000000000000',
    },
    transactionHash: ethTxHash,
    toSmartContract: false,
  },
];

export const txsInStateWithOutdatedGasDataMock = (
  ethTxHash: string,
  tokenTxHash: string,
): TransactionMeta[] => [
  {
    id: 'token-transaction-id',
    chainId: '1',
    status: TransactionStatus.confirmed,
    time: 1615497996125,
    transaction: {
      from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      data: '0x',
      gas: '624874',
      gasPrice: '20000000000',
      nonce: '0x12',
      to: '0x881d40237659c251811cec9c364ef91dc08d300c',
      value: '0x0',
    },
    transactionHash: tokenTxHash,
    toSmartContract: true,
  },
  {
    id: 'eth-transaction-id',
    chainId: '1',
    status: TransactionStatus.confirmed,
    time: 1615497996125,
    transaction: {
      from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      data: '0x',
      gas: '0x51d68',
      gasPrice: '0x2540be400',
      nonce: '0x12',
      to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      value: '100000000000000000',
    },
    transactionHash: ethTxHash,
    toSmartContract: false,
  },
];

export const txsInStateWithOutdatedStatusAndGasDataMock = (
  ethTxHash: string,
  tokenTxHash: string,
): TransactionMeta[] => [
  {
    id: 'token-transaction-id',
    chainId: '1',
    status: TransactionStatus.rejected,
    time: 1615497996125,
    transaction: {
      from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      data: '0x',
      gas: '624874',
      gasPrice: '20000000000',
      nonce: '0x12',
      to: '0x881d40237659c251811cec9c364ef91dc08d300c',
      value: '0x0',
    },
    transactionHash: tokenTxHash,
    toSmartContract: true,
  },
  {
    id: 'eth-transaction-id',
    chainId: '1',
    status: TransactionStatus.rejected,
    time: 1615497996125,
    transaction: {
      from: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      data: '0x',
      gas: '0x51d68',
      gasPrice: '0x2540be400',
      nonce: '0x12',
      to: '0x6bf137f335ea1b8f193b8f6ea92561a60d23a207',
      value: '100000000000000000',
    },
    transactionHash: ethTxHash,
    toSmartContract: false,
  },
];
