import {
  ACTIVE_STATE,
  CANCELED_STATE,
  COMPLETED_STATE,
  DISPUTE_STATE,
  INACTIVE_STATE,
  PENDING_STATE,
  REVIEW_STATE,
  BUYER_USER_TYPE, SELLER_USER_TYPE
} from './constants';
import * as types from 'actions/types';
import { contractState as contractStateActions } from 'actions';

export const currentContractStateActions = {
  [INACTIVE_STATE]: [
    {
      action: contractStateActions.activateContract,
      label: 'Activate',
      condition: ({
        contract
      }) => contract.isActivationMessageSent === false
    },
    {
      action: contractStateActions.cancelContract,
      label: 'Cancel',
      condition: ({
        contract
      }) => contract.isActivationMessageSent === false
    },
    {
      action: () => ({ type: types.NOOP_ACTION }),
      label: 'Waiting confirmation',
      isText: true,
      condition: ({
        contract
      }) => contract.isActivationMessageSent === true
    }
  ],
  [ACTIVE_STATE]: [
    {
      action: contractStateActions.reviewContract,
      label: 'Review',
      condition: ({
        userType
      }) => userType === BUYER_USER_TYPE
    },
    {
      action: contractStateActions.cancelContract,
      label: 'Cancel'
    }
  ],
  [REVIEW_STATE]: [
    {
      action: (opts) => contractStateActions.resolveReviewContract({
        ...opts,
        decision: true
      }),
      label: 'Accept',
      condition: ({
        userType
      }) => userType === SELLER_USER_TYPE
    },
    {
      action: (opts) => contractStateActions.resolveReviewContract({
        ...opts,
        decision: false
      }),
      label: 'Decline',
      condition: ({
        userType
      }) => userType === SELLER_USER_TYPE
    },
    {
      action: () => ({ type: types.NOOP_ACTION }),
      isText: true,
      label: 'Waiting confirmation',
      condition: ({
        userType
      }) => userType === BUYER_USER_TYPE
    },
  ],
  [PENDING_STATE]: [
    {
      action: (opts) => contractStateActions.resolvePendingContract({
        ...opts,
        decision: true
      }),
      label: 'Cancel contract',
      condition: ({
        contract
      }) => contract.canceledRequest === false
    },
    {
      action: (opts) => contractStateActions.resolvePendingContract({
        ...opts,
        decision: false
      }),
      label: 'Request assistance',
      condition: ({
        contract
      }) => contract.canceledRequest === false
    },
    {
      action: () => ({ type: types.NOOP_ACTION }),
      isText: true,
      label: 'Waiting confirmation',
      condition: ({
        contract
      }) => contract.canceledRequest === true
    }
  ],
  [CANCELED_STATE]: [
    {
      action: () => ({ type: types.NOOP_ACTION }),
      isText: true,
      label: 'Contract canceled',
      condition: () => true
    }
  ],
  [COMPLETED_STATE]: [
    {
      action: () => ({ type: types.NOOP_ACTION }),
      isText: true,
      label: 'Contract completed',
      condition: () => true
    }
  ],
  [DISPUTE_STATE]: [
    {
      action: () => ({ type: types.NOOP_ACTION }),
      isText: true,
      label: 'Please contact customer support to resolve ongoing dispute',
      condition: () => true
    }
  ]
};

export const CONTRACT_STATES_MAP = [
  {
    name: INACTIVE_STATE,
    value: 0
  },
  {
    name: ACTIVE_STATE,
    value: 1
  },
  {
    name: REVIEW_STATE,
    value: 2
  },
  {
    name: COMPLETED_STATE,
    value: 3
  },
  {
    name: DISPUTE_STATE,
    value: 4
  },
  {
    name: PENDING_STATE,
    value: 5
  },
  {
    name: CANCELED_STATE,
    value: 6
  }
];
