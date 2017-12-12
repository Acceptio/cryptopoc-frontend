import * as types from './types';
import {
  payloadActionCreator
} from 'utils/action-creator-factory';

export const activateContract = payloadActionCreator(
  types.ACTIVATE_CONTRACT
);

export const cancelContract = payloadActionCreator(
  types.CANCEL_CONTRACT
);

export const reviewContract = payloadActionCreator(
  types.REVIEW_CONTRACT
);

export const resolveReviewContract = payloadActionCreator(
  types.RESOLVE_REVIEW_CONTRACT
);

export const resolvePendingContract = payloadActionCreator(
  types.RESOLVE_PENDING_CONTRACT
);

export const contractStateChangeStart = payloadActionCreator(
  types.CONTRACT_CHANGE_START
);

export const contractStateChangeStop = payloadActionCreator(
  types.CONTRACT_CHANGE_STOP
);

