import { Formik, FormikHelpers } from 'formik';
import { isEmpty } from 'lodash';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { ZodError, z } from 'zod';

import { trpc } from '@sovereign-academy/api-client';

import { Button } from '../../../atoms/Button';
import { Divider } from '../../../atoms/Divider';
import { Modal } from '../../../atoms/Modal';
import { TextInput } from '../../../atoms/TextInput';
import { useAppDispatch } from '../../../hooks';
import { userSlice } from '../../../store/slices/user.slice';
import { AuthModalState } from '../props';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  goTo: (newState: AuthModalState) => void;
}

export const SignIn = ({ isOpen, onClose, goTo }: SignInModalProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const signinSchema = z.object({
    username: z.string().min(1, t('auth.usernameRequired')),
    password: z.string().min(1, t('auth.passwordRequired')),
  });

  const login = trpc.auth.credentials.login.useMutation({
    onSuccess: (data) => {
      dispatch(
        userSlice.actions.login({
          username: data.user.username,
          accessToken: data.accessToken,
        })
      );
      onClose();
    },
  });

  const handleLogin = useCallback(
    async (
      values: {
        username: string;
        password: string;
      },
      actions: FormikHelpers<{
        username: string;
        password: string;
      }>
    ) => {
      const errors = await actions.validateForm();
      if (!isEmpty(errors)) return;
      await login.mutate(values);
    },
    [login]
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} headerText={t('auth.connect')}>
      <div className="flex flex-col items-center">
        <Button className="my-5" rounded>
          {t('auth.connectWithLn')}
        </Button>
        <Divider>{t('words.or').toUpperCase()}</Divider>
        <Formik
          initialValues={{ username: '', password: '' }}
          onSubmit={handleLogin}
          validate={(values) => {
            try {
              signinSchema.parse(values);
            } catch (error) {
              if (error instanceof ZodError) {
                return error.flatten().fieldErrors;
              }
            }
          }}
        >
          {({
            touched,
            errors,
            handleBlur,
            handleChange,
            values,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-center"
            >
              <TextInput
                name="username"
                labelText="Username*"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                className="mt-4 w-96"
                error={touched.username ? errors.username : null}
              />

              <TextInput
                name="password"
                type="password"
                labelText="Password*"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                className="mt-4 w-96"
                error={touched.password ? errors.password : null}
              />

              <Button type="submit" className="mb-5 mt-10">
                {t('auth.connect')}
              </Button>
            </form>
          )}
        </Formik>
        <p className="mb-0 text-xs">
          {t('auth.noAccountYet')}
          <button
            className="ml-1 cursor-pointer border-none bg-transparent text-xs underline"
            onClick={() => goTo(AuthModalState.Signup)}
          >
            {t('auth.createOne')}
          </button>
        </p>
        <p className="mb-0 mt-2 text-xs">
          <button
            className="cursor-pointer border-none bg-transparent text-xs underline"
            onClick={() => goTo(AuthModalState.PasswordReset)}
          >
            {t('auth.forgottenPassword')}
          </button>
        </p>
      </div>
    </Modal>
  );
};
