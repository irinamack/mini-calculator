import { pathOr } from 'ramda';

import { NAME } from './constants';

export const getAnswer = pathOr({}, [NAME, 'answer']);
