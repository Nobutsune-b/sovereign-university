import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useMemo,
  useState,
} from 'react';
import { BsExclamationTriangle, BsEye, BsEyeSlash } from 'react-icons/bs';

import { compose } from '../../utils';
import { BaseAtomProps } from '../types';

type BaseProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  BaseAtomProps;

interface TextInputProps extends BaseProps {
  labelText?: string;
  cornerHint?: string;
  error?: string | null;
}

export const TextInput = ({
  labelText,
  cornerHint,
  error,
  className,
  ...rest
}: TextInputProps) => {
  const [showValue, setShowValue] = useState(false);
  const classes = useMemo(
    () => [
      'block w-full rounded-[15px] border-0 focus:ring-2 focus:ring-inset px-3 py-4 bg-secondary-400',
      error
        ? 'text-danger-300 ring-danger-200 ring-1 placeholder:text-danger-200 focus:ring-danger-300'
        : 'text-gray-600 shadow-sm placeholder:text-gray-400 focus:ring-primary-600',
    ],
    [error]
  );

  const isPassword = rest?.type === 'password';

  const inputIcon = useMemo(() => {
    if (isPassword) {
      return showValue ? (
        <BsEyeSlash
          className="h-5 w-5 cursor-pointer"
          onClick={() => setShowValue(false)}
          aria-hidden="true"
        />
      ) : (
        <BsEye
          className="h-5 w-5 cursor-pointer"
          onClick={() => setShowValue(true)}
          aria-hidden="true"
        />
      );
    }

    if (error)
      return (
        <BsExclamationTriangle
          className="text-danger-100 h-5 w-5"
          aria-hidden="true"
        />
      );

    return null;
  }, [error, isPassword, showValue]);

  return (
    <div className={compose('mx-4 my-2', className ?? '')}>
      <div className="flex justify-between px-1 flex-col items-c text-center">
        <label
          htmlFor="email"
          className="block text-lg font-normal leading-6 text-gray-600 mb-1"
        >
          {labelText}
        </label>
        {cornerHint && (
          <span className="text-lg leading-6 text-gray-500" id="email-optional">
            {cornerHint}
          </span>
        )}
      </div>
      <div className="relative rounded-md shadow-sm">
        <input
          className={compose(...classes)}
          {...rest}
          {...(showValue && { type: 'text' })}
        />
        {/* Input right icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {inputIcon}
        </div>
      </div>
      {error && (
        <p className="text-danger-300 mt-0.5 px-1 text-sm" id="email-error">
          {error}
        </p>
      )}
    </div>
  );
};
