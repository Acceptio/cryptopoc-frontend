import {
  basicGet,
  sellerAddressUrl,
  buyerAddressUrl,
  addressesUrl
} from './common';

export const getSellerAddress = basicGet(sellerAddressUrl);
export const getBuyerAddress = basicGet(buyerAddressUrl);
export const getAddresses = basicGet(addressesUrl);
