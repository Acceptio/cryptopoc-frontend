
export const fetchWrap = (...args) => fetch(...args);

export const abstractUrl = ({
  path
}) => `${API_BASE_URL}${path}`;

export const sellerAddressUrl = () => abstractUrl({
  path: 'seller-address'
});

export const buyerAddressUrl = () => abstractUrl({
  path: 'buyer-address'
});

export const addressesUrl = () => abstractUrl({
  path: 'contracts'
});

export const abiUrl = () => abstractUrl({
  path: 'contract-abi'
});

export const deployUrl = () => abstractUrl({
  path: 'deploy'
});

export const basicPost = url => async (payload) => {
  const response = await fetchWrap(
    url(),
    {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );
  return await response.json();
};

export const basicGet = (url) => async () => {
  const response = await fetchWrap(
    url()
  );
  return await response.json();
};
