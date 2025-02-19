// @generated
// This file is automatically generated by Kanel. Do not modify manually.

/** Identifier type for users.accounts */
export type AccountsId = string;

/** Represents the table users.accounts */
export default interface Accounts {
  id: AccountsId;

  username: string;

  email?: string;

  password_hash?: string;

  contributor_id: string;

  created_at: number;

  updated_at: number;
}

/** Represents the initializer for the table users.accounts */
export interface AccountsInitializer {
  /** Default value: gen_random_uuid() */
  id?: AccountsId;

  username: string;

  email?: string;

  password_hash?: string;

  contributor_id: string;

  /** Default value: now() */
  created_at?: number;

  /** Default value: now() */
  updated_at?: number;
}

/** Represents the mutator for the table users.accounts */
export interface AccountsMutator {
  id?: AccountsId;

  username?: string;

  email?: string;

  password_hash?: string;

  contributor_id?: string;

  created_at?: number;

  updated_at?: number;
}
